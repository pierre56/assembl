// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import { Translate } from 'react-redux-i18n';
import { Grid } from 'react-bootstrap';
import type { Map } from 'immutable';

import { updateContentLocale } from '../actions/contentLocaleActions';
import manageErrorAndLoading from '../components/common/manageErrorAndLoading';
import Header from '../components/common/header';
import Question from '../components/debate/survey/question';
import Navigation from '../components/debate/survey/navigation';
import Proposals from '../components/debate/survey/proposals';
import { getIsPhaseCompletedById } from '../utils/timeline';
import ThematicQuery from '../graphql/ThematicQuery.graphql';
import { get as getRoute } from '../utils/routeMap';
import HeaderStatistics, { statContributions, statMessages, statParticipants } from '../components/common/headerStatistics';

type PostNode = {
  node: {
    id: string,
    originalLocale: string
  }
};

type QuestionType = {
  id: string,
  posts: {
    edges: Array<PostNode>
  },
  title: string
};

type Props = {
  timeline: Timeline,
  defaultContentLocaleMapping: Map, // eslint-disable-line react/no-unused-prop-types
  imgUrl: string,
  numContributors: number,
  numPosts: number,
  phaseId: string,
  questions: Array<QuestionType>,
  refetchThematic: Function,
  title: string,
  description: string,
  synthesisTitle: string,
  id: string,
  slug: string,
  totalSentiments: number,
  updateContentLocaleMapping: Function // eslint-disable-line react/no-unused-prop-types
};

type State = {
  isScroll: boolean,
  questionIndex: number | null,
  showModal: boolean
};

class Survey extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isScroll: false,
      showModal: false,
      questionIndex: null
    };
  }

  componentWillMount() {
    this.updateContentLocaleMappingFromProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.questions !== this.props.questions) {
      this.updateContentLocaleMappingFromProps(nextProps);
    }
  }

  updateContentLocaleMappingFromProps(props) {
    const { defaultContentLocaleMapping, updateContentLocaleMapping, questions } = props;
    const contentLocaleMappingData = {};
    questions.forEach((question) => {
      question.posts.edges.forEach((edge) => {
        const post = edge.node;
        const { id, originalLocale } = post;
        const contentLocale = defaultContentLocaleMapping.get(originalLocale, originalLocale);
        contentLocaleMappingData[id] = {
          contentLocale: contentLocale,
          originalLocale: originalLocale
        };
      });
    });

    updateContentLocaleMapping(contentLocaleMappingData);
  }

  getIfProposals = (questions) => {
    if (!questions) return false;
    let isProposals = false;
    questions.forEach((question) => {
      if (question.posts.edges.length > 0) isProposals = true;
    });
    return isProposals;
  };

  scrollToQuestion = (isScroll, questionIndex) => {
    this.setState({
      isScroll: isScroll,
      questionIndex: questionIndex
    });
  };

  render() {
    const {
      id,
      imgUrl,
      numPosts,
      numContributors,
      phaseId,
      questions,
      refetchThematic,
      title,
      description,
      synthesisTitle,
      slug,
      totalSentiments,
      timeline
    } = this.props;

    const isPhaseCompleted = getIsPhaseCompletedById(timeline, phaseId);
    const phaseUrl = `${getRoute('debate', { slug: slug, phase: 'survey' })}`;
    let statElements = [];
    const numContributions = numPosts + totalSentiments;
    statElements = [statMessages(numPosts), statContributions(numContributions), statParticipants(numContributors)];
    return (
      <div className="survey">
        <div className="relative">
          <Header
            title={title}
            synthesisTitle={synthesisTitle}
            subtitle={description}
            imgUrl={imgUrl}
            phaseId={phaseId}
            type="idea"
          >
            <HeaderStatistics statElements={statElements} />
          </Header>
          <div className="questions">
            {questions &&
              questions.map((question, index) => (
                <Question
                  isPhaseCompleted={isPhaseCompleted}
                  title={question.title}
                  index={index + 1}
                  key={index}
                  questionsLength={questions.length}
                  questionId={question.id}
                  scrollToQuestion={this.scrollToQuestion}
                  refetchTheme={refetchThematic}
                />
              ))}
          </div>
          {questions && (
            <Navigation
              questionsLength={questions.length}
              questionIndex={this.state.questionIndex}
              isScroll={this.state.isScroll}
              scrollToQuestion={this.scrollToQuestion}
              isPhaseCompleted={isPhaseCompleted}
            />
          )}
          <div className="proposals" style={{ minHeight: '100px' }}>
            <section className={isPhaseCompleted ? 'shown' : 'proposals-section'} id="proposals">
              <Grid fluid className="background-light">
                {numPosts > 0 ? (
                  <div className="max-container">
                    <div className="question-title">
                      <div className="title-hyphen">&nbsp;</div>

                      <h1 className="dark-title-1">
                        <Translate value="debate.survey.proposalsTitle" />
                      </h1>
                    </div>

                    <div className="center">
                      {questions &&
                        questions.map((question, index) => (
                          <Proposals
                            nbPostsToShow={3}
                            questionsLength={questions.length}
                            themeId={id}
                            title={question.title}
                            posts={question.posts.edges}
                            questionIndex={index + 1}
                            questionId={question.id}
                            isPhaseCompleted={isPhaseCompleted}
                            phaseUrl={phaseUrl}
                            key={index}
                          />
                        ))}
                    </div>

                    <div className="margin-xl">&nbsp;</div>
                  </div>
                ) : null}
              </Grid>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeline: state.timeline,
  defaultContentLocaleMapping: state.defaultContentLocaleMapping,
  lang: state.i18n.locale,
  slug: state.debate.debateData.slug
});

const mapDispatchToProps = dispatch => ({
  updateContentLocaleMapping: data => dispatch(updateContentLocale(data))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(ThematicQuery, {
    props: ({ data, ownProps }) => {
      if (data.error || data.loading) {
        return {
          error: data.error,
          loading: data.loading
        };
      }

      const { thematic: { questions, numContributors, numPosts, totalSentiments }, refetch } = data;
      return {
        error: data.error,
        loading: data.loading,
        imgUrl: ownProps.headerImgUrl,
        numContributors: numContributors,
        numPosts: numPosts,
        questions: questions,
        refetchThematic: refetch,
        title: ownProps.title,
        description: ownProps.description,
        synthesisTitle: ownProps.synthesisTitle,
        totalSentiments: totalSentiments
      };
    }
  }),
  manageErrorAndLoading({ color: 'black', displayLoader: true })
)(Survey);