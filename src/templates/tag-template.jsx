import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';

const TagTemplate = ({ data, pageContext }) => {
  const {
    tag,
    prevPagePath,
    nextPagePath,
    hasPrevPage,
    hasNextPage,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <Sidebar />
      <Page title={tag}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagPage($tag: String, $postsLimit: Int!, $postsOffset: Int!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(
        limit: $postsLimit,
        skip: $postsOffset,
        filter: { frontmatter: { tags: { in: [$tag] }, template: { eq: "post" }, draft: { ne: true } } },
        sort: { frontmatter: { date: DESC } }
      ){
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

TagTemplate.propTypes = {
  data: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    allMarkdownRemark: PropTypes.any.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    prevPagePath: PropTypes.string.isRequired,
    nextPagePath: PropTypes.string.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }).isRequired,
};

// Head takes its props from Gatsby, not from a caller, and it cannot carry
// propTypes: Gatsby strips this export out of the browser bundle, which would
// leave a `Head.propTypes = {}` statement next to it referencing nothing -
// "Head is not defined" at runtime in develop.
/* eslint-disable react/prop-types */
export const Head = ({ pageContext, location }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { tag, currentPage } = pageContext;
  const pageTitle = currentPage > 0
    ? `All Posts tagged as "${tag}" - Page ${currentPage} - ${siteTitle}`
    : `All Posts tagged as "${tag}" - ${siteTitle}`;

  return (
    <Seo
      title={pageTitle}
      description={siteSubtitle}
      pathname={location.pathname}
    />
  );
};


/* eslint-enable react/prop-types */

export default TagTemplate;
