// @flow
import React from 'react';
import isEqualWith from 'lodash/isEqualWith';
import { type ApolloClient, compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import arrayMutators from 'final-form-arrays';

import AdminForm from '../../form/adminForm';
import { compareEditorState } from '../../form/utils';
import LoadSaveReinitializeForm from '../../form/LoadSaveReinitializeForm';
import Navbar from '../navbar';
import Step1 from './step1';
import Export from './export';
import ConfigureThematicForm from './configureThematicForm';
import { load, postLoadFormat } from './load';
import { createMutationsPromises, save } from './save';
import validate from './validate';
import Loader from '../../common/loader';

type Props = {
  client: ApolloClient,
  phaseIdentifier: string,
  section: string,
  thematicId: string,
  debateId: string,
  discussionPhaseId: string,
  editLocale: string,
  locale: string
};

const loading = <Loader />;

const steps = ['1', '2'];

const DumbSurveyAdminForm = ({
  client,
  phaseIdentifier,
  section,
  thematicId,
  discussionPhaseId,
  debateId,
  editLocale,
  locale
}: Props) => {
  if (!discussionPhaseId) {
    return loading;
  }
  return (
    <LoadSaveReinitializeForm
      load={(fetchPolicy: FetchPolicy) => load(client, fetchPolicy, discussionPhaseId, locale)}
      loading={loading}
      postLoadFormat={postLoadFormat}
      createMutationsPromises={createMutationsPromises(client, discussionPhaseId)}
      save={save}
      validate={validate}
      mutators={{
        ...arrayMutators
      }}
      render={({ handleSubmit, submitting, values, initialValues }) => {
        // the form is splitted to multiple subforms: We must calculate the global pristine.
        // Don't use final form pristine here
        const pristine = isEqualWith(initialValues, values, compareEditorState);
        return (
          <React.Fragment>
            <div className="admin-content">
              <AdminForm handleSubmit={handleSubmit} pristine={pristine} submitting={submitting}>
                {section === '1' && <Step1 editLocale={editLocale} locale={locale} discussionPhaseId={discussionPhaseId} />}
                {section === 'configThematics' && (
                  <ConfigureThematicForm
                    phaseIdentifier={phaseIdentifier}
                    thematicId={thematicId}
                    editLocale={editLocale}
                    values={values}
                  />
                )}
                {section === '2' && <Export debateId={debateId} locale={locale} />}
              </AdminForm>
            </div>
            {steps.includes(section) && (
              <Navbar
                steps={steps}
                currentStep={section}
                totalSteps={3}
                phaseIdentifier={phaseIdentifier}
                beforeChangeSection={() => (pristine || submitting) && handleSubmit()}
              />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};

const mapStateToProps = state => ({
  debateId: state.context.debateId,
  editLocale: state.admin.editLocale,
  locale: state.i18n.locale
});

export default compose(connect(mapStateToProps), withApollo)(DumbSurveyAdminForm);