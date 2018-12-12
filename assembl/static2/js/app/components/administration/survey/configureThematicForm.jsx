// @flow
import React from 'react';
import { I18n } from 'react-redux-i18n';
import { Field } from 'react-final-form';
import { connect } from 'react-redux';

import { get, goTo } from '../../../utils/routeMap';
import MultilingualTextFieldAdapter from '../../form/multilingualTextFieldAdapter';
import MultilingualRichTextFieldAdapter from '../../form/multilingualRichTextFieldAdapter';
import FileUploaderFieldAdapter from '../../form/fileUploaderFieldAdapter';
import SelectFieldAdapter from '../../form/selectFieldAdapter';
import { deleteThematicImageTooltip } from '../../common/tooltips';
import Helper from '../../common/helper';
import type { ThemesAdminValues, ThemeValue, ThemesValue } from './types.flow';
import { PHASES, MESSAGE_VIEW, modulesTranslationKeys } from '../../../constants';
import SurveyFields from './surveyFields';

type Props = {
  editLocale: string,
  thematicId: string,
  slug: string,
  values: ?ThemesAdminValues
};

export function getFieldData(themeId: string, values: ThemesValue, fieldName: string): { name: string, value: ?ThemeValue } {
  let result = { name: '', value: null };
  let index = 0;
  let value = values[index];
  while (!result.name && value) {
    if (value.id === themeId) {
      result = { name: `${fieldName}[${index}]`, value: value };
    } else if (value.children) {
      const childrenResult = getFieldData(themeId, value.children, 'children');
      if (childrenResult.name) {
        result = { name: `${fieldName}[${index}].${childrenResult.name}`, value: value[childrenResult.name] };
      }
    }
    index += 1;
    value = values[index];
  }
  return result;
}

class ConfigureThematicForm extends React.PureComponent<Props> {
  getName = () => {
    const { values, thematicId, slug } = this.props;
    const fieldData = getFieldData(thematicId, values ? values.themes : [], 'themes');
    if (!fieldData.name) {
      goTo(get('administration', { slug: slug, id: PHASES.survey }, { section: 1 }));
    }
    return fieldData;
  };

  render() {
    const { editLocale } = this.props;
    const { name, value: theme } = this.getName();
    const upperCaseLocale = editLocale.toUpperCase();
    const titleName = `${name}.title`;
    const descriptionName = `${name}.description`;
    const imageName = `${name}.img`;
    const messageViewOverrideName = `${name}.messageViewOverride`;
    const announcementTitleName = `${name}.announcement.title`;
    const announcementBodyName = `${name}.announcement.body`;
    return (
      <div className="form-container" key={name}>
        <Helper
          label={I18n.t('administration.headerTitle')}
          helperUrl="/static2/img/helpers/helper1.png"
          helperText={I18n.t('administration.tableOfThematics.bannerHeader')}
          classname="title"
        />
        <Field
          required
          editLocale={editLocale}
          name={titleName}
          component={MultilingualTextFieldAdapter}
          label={`${I18n.t('administration.tableOfThematics.thematicTitle')} ${upperCaseLocale}`}
        />
        <Field
          key={`${descriptionName}-${editLocale}`}
          editLocale={editLocale}
          name={descriptionName}
          component={MultilingualTextFieldAdapter}
          label={`${I18n.t('administration.tableOfThematics.bannerSubtitleLabel')} ${upperCaseLocale}`}
        />
        <Field
          deleteTooltip={deleteThematicImageTooltip}
          name={imageName}
          component={FileUploaderFieldAdapter}
          label={I18n.t('administration.tableOfThematics.bannerImagePickerLabel')}
        />
        <div className="title">{I18n.t('administration.tableOfThematics.moduleTypeLabel')}</div>
        <Field
          name={messageViewOverrideName}
          component={SelectFieldAdapter}
          isSearchable={false}
          // label={I18n.t('administration.tableOfThematics.moduleTypeLabel')}
          options={modulesTranslationKeys.map(key => ({ value: key, label: I18n.t(`administration.modules.${key}`) }))}
        />
        <Helper
          label={I18n.t('administration.instructions')}
          helperUrl="/static2/img/helpers/helper_BM_1.png"
          helperText={I18n.t('administration.tableOfThematics.instructionHeader')}
          classname="title"
        />
        <Field
          key={`${announcementTitleName}-${editLocale}`}
          editLocale={editLocale}
          name={announcementTitleName}
          label={`${I18n.t('administration.tableOfThematics.sectionTitleLabel')} ${upperCaseLocale}`}
          component={MultilingualTextFieldAdapter}
          required
        />
        <Field
          key={`${announcementBodyName}-${editLocale}`}
          editLocale={editLocale}
          name={announcementBodyName}
          label={`${I18n.t('administration.tableOfThematics.instructionLabel')} ${upperCaseLocale}`}
          withAttachment
          component={MultilingualRichTextFieldAdapter}
        />
        {theme && theme.messageViewOverride.value === MESSAGE_VIEW.survey ? (
          <SurveyFields editLocale={editLocale} fieldPrefix={name} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  slug: state.debate.debateData.slug
});

export default connect(mapStateToProps)(ConfigureThematicForm);