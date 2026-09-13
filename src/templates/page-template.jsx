/* eslint-disable react/prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const PageTemplate = ({ data }) => {
  const { html: pageBody } = data.markdownRemark;
  const { title: pageTitle } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <Sidebar />
      <Page title={pageTitle}>
        <div dangerouslySetInnerHTML={{ __html: pageBody }} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage
      }
    }
  }
`;

PageTemplate.defaultProps = {
  data: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    allMarkdownRemark: PropTypes.any.isRequired,
  }).isRequired,
};

export const Head = ({ data, location }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title: pageTitle, description, socialImage } = data.markdownRemark.frontmatter;

  return (
    <Seo
      title={`${pageTitle} - ${siteTitle}`}
      description={description !== null ? description : siteSubtitle}
      image={socialImage}
      pathname={location.pathname}
    />
  );
};

export default PageTemplate;
