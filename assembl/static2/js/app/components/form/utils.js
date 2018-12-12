// @flow
import { EditorState } from 'draft-js';
import type { ApolloClient } from 'react-apollo';
import moment from 'moment';
import { I18n } from 'react-redux-i18n';
import flatMap from 'lodash/flatMap';

import type {
  I18nValue,
  FileValue,
  FileVariable,
  MutationsPromises,
  I18nRichTextValue,
  SaveStatus,
  DatePickerInput
} from './types.flow';
import { convertEditorStateToHTML, convertEntriesToEditorState, uploadNewAttachments } from '../../utils/draftjs';
import { displayAlert } from '../../utils/utilityManager';
import { runSerial } from '../administration/saveButton';
import UploadDocument from '../../graphql/mutations/uploadDocument.graphql';

export function i18nValueIsEmpty(v: I18nValue): boolean {
  return (
    !v ||
    Object.keys(v)
      .map(key => v[key]) // flow doesn't treat Object.values as expected, see: https://github.com/facebook/flow/issues/2221
      .every(s => s.length === 0)
  );
}

export function richTextI18nValueIsEmpty(v: I18nRichTextValue): boolean {
  return (
    !v ||
    Object.keys(v)
      .map(key => v[key]) // flow doesn't treat Object.values as expected, see: https://github.com/facebook/flow/issues/2221
      .every(es => !es || !es.getCurrentContent().hasText())
  );
}

// [{ localeCode: 'fr', value: 'foo' }] => { fr: 'foo' }
export function convertEntriesToI18nValue<T>(
  _entries: Array<{
    localeCode: string,
    value: T
  }>
): { [string]: T } {
  const entries = _entries || [];
  return entries.reduce((result, item) => {
    const { localeCode, value } = item;
    return {
      ...result,
      [localeCode]: value
    };
  }, {});
}

export function convertEntriesToI18nRichText(entries: RichTextLangstringEntries): I18nRichTextValue {
  return convertEntriesToI18nValue(convertEntriesToEditorState(entries));
}

export function convertISO8601StringToDateTime(_entry: string): DatePickerInput {
  if (_entry) {
    const t = moment(_entry, moment.ISO_8601).utc();
    if (t.isValid()) {
      return { time: t };
    }
  }
  return { time: null };
}

export function convertDateTimeToISO8601String(_entry: DatePickerInput): string | null {
  try {
    if (_entry && _entry.time) return _entry.time.utc().toISOString();
    return null;
  } catch (e) {
    return null;
  }
}

export function getValidationState(error: ?string, touched: ?boolean): ?string {
  return touched && error ? 'error' : null;
}

export const createSave = (successMsgId: string) => async (mutationsPromises: MutationsPromises): Promise<SaveStatus> => {
  let status = 'PENDING';
  await runSerial(mutationsPromises)
    .then(() => {
      status = 'OK';
      displayAlert('success', I18n.t(successMsgId));
    })
    .catch((error) => {
      status = 'KO';
      displayAlert('danger', error.message, false, 30000);
    });

  return status;
};

export function convertToEntries(valuesByLocale: I18nValue): LangstringEntries {
  return Object.keys(valuesByLocale).map(locale => ({
    localeCode: locale,
    value: valuesByLocale[locale]
  }));
}

type RichTextVariables = {
  attachments: Array<string>,
  entries: LangstringEntries
};

/*
  Upload new attachments and return variables for mutation
*/
export async function convertRichTextToVariables(
  valuesByLocale: I18nRichTextValue,
  client: ApolloClient
): Promise<RichTextVariables> {
  const uploadDocument = options => client.mutate({ mutation: UploadDocument, ...options });
  const results = Object.keys(valuesByLocale).map(async (locale) => {
    const result = await uploadNewAttachments(valuesByLocale[locale], uploadDocument);
    const { documentIds, contentState } = result;
    return {
      documentIds: documentIds,
      localeCode: locale,
      value: convertEditorStateToHTML(EditorState.createWithContent(contentState))
    };
  });

  const variables = await Promise.all(results);
  const attachments = flatMap(variables, v => v.documentIds);
  const entries = variables.map(v => ({
    localeCode: v.localeCode,
    value: v.value
  }));

  return {
    attachments: attachments,
    entries: entries
  };
}

export function getFileVariable(img: ?FileValue, initialImg: ?FileValue): FileVariable {
  if (initialImg && !img) {
    return 'TO_DELETE';
  }

  // If thematic.img.externalUrl is a File,
  // we need to send image: null if we didn't change the image.
  const variab = img && img.externalUrl instanceof File ? img.externalUrl : null;
  return variab;
}