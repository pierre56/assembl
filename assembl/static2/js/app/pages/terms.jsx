import React from 'react';
import { graphql } from 'react-apollo';
import LargeTextParagraph from '../components/common/largeTextParagraph';
import TermsQuery from '../graphql/LegalNoticesQuery.graphql';

const Terms = ({ text, title }) => {
  return <LargeTextParagraph headerTitle={title} text={text} />;
};

export default graphql(TermsQuery, {
  props: ({ data }) => {
    return {
      text: data.text,
      title: data.title
    };
  }
})(Terms);