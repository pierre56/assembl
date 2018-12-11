import React from 'react';
import { Translate } from 'react-redux-i18n';
import { compose, graphql } from 'react-apollo';
import { filter } from 'graphql-anywhere';
import { Grid, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import { displayLanguageMenu } from '../actions/adminActions';
import { updateVoteSessionPage, updateVoteModules, updateVoteProposals } from '../actions/adminActions/voteSession';
import { updatePhases } from '../actions/adminActions/timeline';
import { updateSections } from '../actions/adminActions/adminSections';
import { updateLandingPageModules } from '../actions/adminActions/landingPage';
import { updateTextFields } from '../actions/adminActions/profileOptions';
import manageErrorAndLoading from '../components/common/manageErrorAndLoading';
import mergeLoadingAndError from '../components/common/mergeLoadingAndError';
import Menu from '../components/administration/menu';
import LanguageMenu from '../components/administration/languageMenu';
import SectionsQuery from '../graphql/SectionsQuery.graphql';
import TextFields from '../graphql/TextFields.graphql';
import LegalContentsQuery from '../graphql/LegalContents.graphql';
import VoteSessionQuery from '../graphql/VoteSession.graphql';
import LandingPageModules from '../graphql/LandingPageModules.graphql';
import TimelineQuery from '../graphql/Timeline.graphql';
import { convertEntriesToEditorState } from '../utils/draftjs';
import { getPhaseId } from '../utils/timeline';
import { fromGlobalId } from '../utils/globalFunctions';
import { addEnumSuffixToModuleTitles } from '../components/administration/landingPage/addEnumSuffixToModuleTitles';

const SECTIONS_WITHOUT_LANGUAGEMENU = ['1', '6'];

class Administration extends React.Component {
  constructor(props) {
    super(props);
    this.putVoteSessionInStore = this.putVoteSessionInStore.bind(this);
    this.putLandingPageModulesInStore = this.putLandingPageModulesInStore.bind(this);
    this.putTextFieldsInStore = this.putTextFieldsInStore.bind(this);
    this.state = {
      showLanguageMenu: true
    };
  }

  componentDidMount() {
    // we need to use the redux store for administration data to be able to use a
    // "global" save button that will do all the mutations "at once"
    this.putSectionsInStore(this.props.sections);
    this.putVoteSessionInStore(this.props.voteSession);
    this.putVoteModulesInStore(this.props.voteSession);
    this.putVoteProposalsInStore(this.props.voteSession);
    const isHidden =
      this.props.identifier === 'discussion' && SECTIONS_WITHOUT_LANGUAGEMENU.includes(this.props.location.query.section);
    this.props.displayLanguageMenu(isHidden);
    this.putLandingPageModulesInStore(this.props.landingPageModules);
    this.putTextFieldsInStore(this.props.textFields);
    this.putTimelinePhasesInStore(this.props.timeline);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sections !== this.props.sections) {
      this.putSectionsInStore(nextProps.sections);
    }

    if (nextProps.voteSession !== this.props.voteSession) {
      this.putVoteSessionInStore(nextProps.voteSession);
      this.putVoteModulesInStore(nextProps.voteSession);
      this.putVoteProposalsInStore(nextProps.voteSession);
    }

    if (nextProps.landingPageModules !== this.props.landingPageModules) {
      this.putLandingPageModulesInStore(nextProps.landingPageModules);
    }

    const isHidden =
      nextProps.identifier === 'discussion' && SECTIONS_WITHOUT_LANGUAGEMENU.includes(nextProps.location.query.section);
    this.props.displayLanguageMenu(isHidden);

    if (nextProps.textFields !== this.props.textFields) {
      this.putTextFieldsInStore(nextProps.textFields);
    }

    if (nextProps.timeline !== this.props.timeline) {
      this.putTimelinePhasesInStore(nextProps.timeline);
    }
  }

  putVoteSessionInStore(voteSession) {
    const emptyVoteSession = {
      id: '',
      titleEntries: [],
      seeCurrentVotes: false,
      subTitleEntries: [],
      instructionsSectionTitleEntries: [],
      instructionsSectionContentEntries: [],
      propositionsSectionTitleEntries: [],
      headerImage: {
        externalUrl: '',
        mimeType: '',
        title: ''
      },
      publicVote: true,
      modules: []
    };
    const filteredVoteSession = filter(VoteSessionQuery, { voteSession: voteSession || emptyVoteSession });
    const voteSessionForStore = {
      ...filteredVoteSession.voteSession,
      instructionsSectionContentEntries: filteredVoteSession.voteSession.instructionsSectionContentEntries
        ? convertEntriesToEditorState(filteredVoteSession.voteSession.instructionsSectionContentEntries)
        : null
    };
    this.props.updateVoteSessionPage(voteSessionForStore);
  }

  putTimelinePhasesInStore(timeline) {
    if (timeline) {
      const filteredPhases = filter(TimelineQuery, { timeline: timeline });
      const phasesForStore = filteredPhases.timeline.map(phase => ({
        ...phase,
        start: moment(phase.start),
        end: moment(phase.end)
      }));
      this.props.updatePhases(phasesForStore);
    }
  }

  putVoteModulesInStore(voteSession) {
    const filteredVoteSession = filter(VoteSessionQuery, { voteSession: voteSession });
    const modules =
      filteredVoteSession.voteSession && filteredVoteSession.voteSession.modules ? filteredVoteSession.voteSession.modules : [];
    this.props.updateVoteModules(modules);
  }

  putVoteProposalsInStore(voteSession) {
    const proposals = voteSession ? filter(VoteSessionQuery, { voteSession: voteSession }).voteSession.proposals : [];
    const proposalsForStore = proposals.map(proposal => ({
      ...proposal,
      descriptionEntries: proposal.descriptionEntries ? convertEntriesToEditorState(proposal.descriptionEntries) : null
    }));
    this.props.updateVoteProposals(proposalsForStore);
  }

  putSectionsInStore(sections) {
    if (sections) {
      const filteredSections = filter(SectionsQuery, {
        sections: sections.filter(section => section.sectionType !== 'ADMINISTRATION')
      });
      this.props.updateSections(filteredSections.sections);
    }
  }

  putLandingPageModulesInStore(landingPageModules) {
    if (landingPageModules) {
      const filtered = filter(LandingPageModules, { landingPageModules: landingPageModules });
      const landingPageModulesWithUpdatedTitles = addEnumSuffixToModuleTitles(filtered.landingPageModules);
      this.props.updateLandingPageModules(landingPageModulesWithUpdatedTitles);
    }
  }

  putTextFieldsInStore(textFields) {
    if (textFields) {
      const filtered = filter(TextFields, { textFields: textFields });
      this.props.updateTextFields(filtered.textFields);
    }
  }

  render() {
    const {
      children,
      locale,
      params,
      refetchTabsConditions,
      refetchSections,
      refetchLegalContents,
      refetchVoteSession,
      refetchLandingPageModules,
      refetchTextFields,
      refetchTimeline,
      timeline
    } = this.props;
    const { phase } = params;
    const phaseId = getPhaseId(timeline, phase);
    const discussionPhaseId = phaseId ? fromGlobalId(phaseId) : null;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        discussionPhaseId: discussionPhaseId,
        locale: locale,
        refetchTabsConditions: refetchTabsConditions,
        refetchVoteSession: refetchVoteSession,
        refetchSections: refetchSections,
        refetchLandingPageModules: refetchLandingPageModules,
        refetchLegalContents: refetchLegalContents,
        refetchTextFields: refetchTextFields,
        refetchTimeline: refetchTimeline
      })
    );
    return (
      <div className="administration">
        <div className="save-bar">
          <div className="max-container">
            <Grid fluid>
              <Row>
                <Col xs={12} md={3} />
                <Col xs={12} md={8}>
                  {/* save button is moved here via a ReactDOM portal */}
                  <div id="save-button" />
                </Col>
                <Col xs={12} md={1} />
              </Row>
            </Grid>
          </div>
        </div>
        <div className="max-container">
          <Grid fluid>
            <Row>
              <Col xs={12} md={3}>
                <div className="admin-menu-container">
                  <Menu timeline={timeline} locale={locale} requestedPhase={phase} />
                </div>
              </Col>
              <Col xs={12} md={8}>
                {!timeline ? (
                  <div>
                    <Translate value="administration.noTimeline" />
                  </div>
                ) : null}
                {childrenWithProps}
              </Col>
              <Col xs={12} md={1}>
                <LanguageMenu />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeline: state.timeline,
  locale: state.i18n.locale
});

const mapDispatchToProps = dispatch => ({
  updateSections: sections => dispatch(updateSections(sections)),
  updateVoteModules: voteModules => dispatch(updateVoteModules(voteModules)),
  updateVoteSessionPage: voteSession => dispatch(updateVoteSessionPage(voteSession)),
  updateVoteProposals: voteProposals => dispatch(updateVoteProposals(voteProposals)),
  displayLanguageMenu: isHidden => dispatch(displayLanguageMenu(isHidden)),
  updateLandingPageModules: landingPageModules => dispatch(updateLandingPageModules(landingPageModules)),
  updateTextFields: textFields => dispatch(updateTextFields(textFields)),
  updatePhases: phases => dispatch(updatePhases(phases))
});

const isNotInAdminSection = adminSectionName => props => !props.router.getCurrentLocation().pathname.endsWith(adminSectionName);

const isNotInDiscussionAdmin = isNotInAdminSection('discussion');
const isNotInLandingPageAdmin = isNotInAdminSection('landingPage');

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(VoteSessionQuery, {
    skip: ({ params, timeline }) => !timeline || params.phase !== 'voteSession',
    options: ({ locale, timeline, params }) => {
      const phaseId = getPhaseId(timeline, params.phase);
      const discussionPhaseId = phaseId ? fromGlobalId(phaseId) : null;
      return {
        variables: { discussionPhaseId: discussionPhaseId, lang: locale }
      };
    },
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          voteSessionMetadata: {
            error: data.error,
            loading: data.loading
          }
        };
      }

      return {
        voteSessionMetadata: {
          error: data.error,
          loading: data.loading
        },
        voteSession: data.voteSession,
        refetchVoteSession: data.refetch
      };
    }
  }),
  graphql(SectionsQuery, {
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          sectionsMetadata: {
            error: data.error,
            loading: data.loading
          }
        };
      }

      return {
        sectionsMetadata: {
          error: data.error,
          loading: data.loading
        },
        refetchSections: data.refetch,
        sections: data.sections
      };
    },
    skip: isNotInDiscussionAdmin
  }),
  graphql(LegalContentsQuery, {
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          legalContentsMetadata: {
            error: data.error,
            loading: data.loading
          }
        };
      }

      return {
        legalContentsMetadata: {
          error: data.error,
          loading: data.loading
        },
        refetchLegalContents: data.refetch,
        legalContents: data.legalContents
      };
    },
    skip: isNotInDiscussionAdmin
  }),
  graphql(TimelineQuery, {
    options: ({ locale }) => ({
      variables: { lang: locale }
    }),
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          timelineMetadata: {
            error: data.error,
            loading: data.loading
          }
        };
      }

      return {
        timelineMetadata: {
          error: data.error,
          loading: data.loading
        },
        refetchTimeline: data.refetch,
        timeline: data.timeline
      };
    },
    skip: props => isNotInLandingPageAdmin(props) && isNotInDiscussionAdmin(props)
  }),
  graphql(LandingPageModules, {
    options: ({ locale }) => ({
      variables: { lang: locale }
    }),
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          landingPageModulesMetadata: {
            error: data.error,
            loading: data.loading
          },
          landingPageModules: []
        };
      }

      return {
        landingPageModulesMetadata: {
          error: data.error,
          loading: data.loading
        },
        refetchLandingPageModules: data.refetch,
        landingPageModules: data.landingPageModules
      };
    },
    skip: isNotInLandingPageAdmin
  }),
  graphql(TextFields, {
    options: ({ locale }) => ({
      variables: { lang: locale }
    }),
    props: ({ data }) => {
      if (data.error || data.loading) {
        return {
          textFieldsMetadata: {
            error: data.error,
            loading: data.loading
          }
        };
      }

      return {
        textFieldsMetadata: {
          error: data.error,
          loading: data.loading
        },
        refetchTextFields: data.refetch,
        textFields: data.textFields
      };
    },
    skip: props => isNotInDiscussionAdmin(props) || props.router.getCurrentLocation().search !== '?section=3'
  }),
  mergeLoadingAndError([
    'voteSessionMetadata',
    'sectionsMetadata',
    'legalContentsMetadata',
    'timelineMetadata',
    'landingPageModulesMetadata',
    'textFieldsMetadata'
  ]),
  manageErrorAndLoading({ displayLoader: true })
)(Administration);