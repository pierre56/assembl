// @flow
import * as React from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import { Row, Col, FormGroup, Button } from 'react-bootstrap';
import { Translate, I18n } from 'react-redux-i18n';
import { EditorState } from 'draft-js';
import { PublicationStates } from '../../../constants';

import uploadDocumentMutation from '../../../graphql/mutations/uploadDocument.graphql';
import updatePostMutation from '../../../graphql/mutations/updatePost.graphql';
import { displayAlert, inviteUserToLogin } from '../../../utils/utilityManager';
import { getConnectedUserId } from '../../../utils/globalFunctions';
import {
  convertToEditorState,
  convertContentStateToHTML,
  editorStateIsEmpty,
  uploadNewAttachments,
  type UploadNewAttachmentsPromiseResult
} from '../../../utils/draftjs';
import RichTextEditor from '../../common/richTextEditor';
import { TextInputWithRemainingChars } from '../../common/textInputWithRemainingChars';
import { TEXT_INPUT_MAX_LENGTH, BODY_MAX_LENGTH } from './topPostForm';

type EditPostFormProps = {
  originalLocale: string,
  body: string,
  id: string,
  subject: string,
  readOnly: boolean,
  modifiedOriginalSubject: string,
  goBackToViewMode: Function,
  client: Object,
  uploadDocument: Function,
  updatePost: Function,
  onSuccess: Function,
  postSuccessMsgId?: string,
  editTitleLabelMsgId?: string,
  bodyDescriptionMsgId?: string,
  fillBodyLabelMsgId?: string,
  childrenUpdate?: boolean,
  bodyMaxLength?: number,
  draftable?: boolean,
  draftSuccessMsgId?: string
};

type EditPostFormState = {
  subject: string,
  body: EditorState
};

class EditPostForm extends React.PureComponent<EditPostFormProps, EditPostFormState> {
  static defaultProps = {
    postSuccessMsgId: 'debate.thread.postSuccess',
    editTitleLabelMsgId: 'debate.edit.title',
    bodyDescriptionMsgId: 'debate.edit.body',
    fillBodyLabelMsgId: 'debate.thread.fillBody',
    childrenUpdate: true,
    bodyMaxLength: BODY_MAX_LENGTH,
    onSuccess: () => {},
    draftable: false,
    draftSuccessMsgId: null
  };

  constructor(props: EditPostFormProps) {
    super(props);
    const { subject } = props;
    const body = props.body || '';
    this.state = {
      body: convertToEditorState(body),
      subject: subject
    };
  }

  updateSubject = (e: SyntheticInputEvent<HTMLInputElement>): void => {
    this.setState({ subject: e.target.value });
  };

  updateBody = (body: EditorState): void => {
    this.setState({ body: body });
  };

  handleCancel = (): void => {
    this.props.goBackToViewMode();
  };

  handleInputFocus = () => {
    const isUserConnected = getConnectedUserId(); // TO DO put isUserConnected in the store
    if (!isUserConnected) {
      inviteUserToLogin();
    }
  };

  handleSubmit = (publicationState) => {
    const { uploadDocument, updatePost, postSuccessMsgId, childrenUpdate, draftSuccessMsgId, fillBodyLabelMsgId } = this.props;
    const { subject, body } = this.state;
    const subjectIsEmpty = subject.length === 0;
    const bodyIsEmpty = editorStateIsEmpty(body);
    if (!subjectIsEmpty && !bodyIsEmpty) {
      // first we upload the new documents
      const uploadDocumentsPromise = uploadNewAttachments(body, uploadDocument);
      uploadDocumentsPromise.then((result: UploadNewAttachmentsPromiseResult) => {
        if (!result.contentState) {
          return;
        }

        const variables = {
          contentLocale: this.props.originalLocale,
          postId: this.props.id,
          subject: subject || '',
          body: convertContentStateToHTML(result.contentState),
          attachments: result.documentIds,
          publicationState: publicationState
        };
        displayAlert('success', I18n.t('loading.wait'));
        const oldSubject = this.props.subject;
        updatePost({ variables: variables })
          .then(() => {
            const successMsgId = publicationState === PublicationStates.DRAFT ? draftSuccessMsgId : postSuccessMsgId;
            displayAlert('success', I18n.t(successMsgId));
            this.props.goBackToViewMode();
            this.props.onSuccess(variables.subject, variables.body, variables.publicationState);
            if (childrenUpdate && oldSubject !== subject) {
              // If we edited the subject, we need to reload all descendants posts,
              // we do this by refetch all Post queries.
              // Descendants are actually a subset of Post queries, so we overfetch here.
              // This is fine, editing a subject should be a rare action.
              const queryManager = this.props.client.queryManager;
              queryManager.queryIdsByName.Post.forEach((queryId) => {
                queryManager.observableQueries[queryId].observableQuery.refetch();
              });
            }
          })
          .catch((error) => {
            displayAlert('danger', `${error}`);
          });
      });
    } else if (subjectIsEmpty) {
      displayAlert('warning', I18n.t('debate.thread.fillSubject'));
    } else if (bodyIsEmpty) {
      displayAlert('warning', I18n.t(fillBodyLabelMsgId));
    }
  };

  render() {
    const { subject, body } = this.state;
    const { editTitleLabelMsgId, modifiedOriginalSubject, bodyDescriptionMsgId, bodyMaxLength } = this.props;

    return (
      <Row>
        <Col xs={12} md={12}>
          <div className="color margin-left-9">
            <span className="assembl-icon-edit" />&nbsp;<Translate value={editTitleLabelMsgId} className="sm-title" />
          </div>
        </Col>
        <Col xs={12} md={12}>
          <div className="answer-form-inner">
            {this.props.readOnly ? (
              <div>
                <h3 className="dark-title-3">{modifiedOriginalSubject}</h3>
                <div className="margin-m" />
              </div>
            ) : (
              <TextInputWithRemainingChars
                alwaysDisplayLabel
                label={I18n.t('debate.edit.subject')}
                value={subject}
                handleTxtChange={this.updateSubject}
                maxLength={TEXT_INPUT_MAX_LENGTH}
                name="top-post-title"
              />
            )}
            <FormGroup>
              <RichTextEditor
                editorState={body}
                placeholder={I18n.t(bodyDescriptionMsgId)}
                onChange={this.updateBody}
                maxLength={bodyMaxLength}
                withAttachmentButton
              />

              <div className="button-container">
                <Button className="button-cancel button-dark btn btn-default left" onClick={this.handleCancel}>
                  <Translate value="cancel" />
                </Button>
                <Button
                  className="button-submit button-dark btn btn-default right"
                  onClick={() => this.handleSubmit(PublicationStates.PUBLISHED)}
                >
                  <Translate value="debate.post" />
                </Button>
                {this.props.draftable ? (
                  <Button
                    className="button-submit button-dark btn btn-default right btn-draft"
                    onClick={() => this.handleSubmit(PublicationStates.DRAFT)}
                  >
                    <Translate value="debate.brightMirror.saveDraft" />
                  </Button>
                ) : null}
              </div>
            </FormGroup>
          </div>
        </Col>
      </Row>
    );
  }
}

export default compose(
  graphql(uploadDocumentMutation, { name: 'uploadDocument' }),
  graphql(updatePostMutation, { name: 'updatePost' }),
  withApollo
)(EditPostForm);