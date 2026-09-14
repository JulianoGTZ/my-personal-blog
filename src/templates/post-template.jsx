import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Seo from '../components/Seo';
import { useSiteMetadata } from '../hooks';

const PostTemplate = ({ data }) => (
  <Layout>
    <Post post={data.markdownRemark} />
  </Layout>
);

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        socialImage
      }
    }
  }
`;

PostTemplate.propTypes = {
  data: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    markdownRemark: PropTypes.any.isRequired,
  }).isRequired,
};

// Head takes its props from Gatsby, not from a caller, and it cannot carry
// propTypes: Gatsby strips this export out of the browser bundle, which would
// leave a `Head.propTypes = {}` statement next to it referencing nothing -
// "Head is not defined" at runtime in develop.
/* eslint-disable react/prop-types */
export const Head = ({ data, location }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { title: postTitle, description, socialImage } = data.markdownRemark.frontmatter;

  return (
    <Seo
      title={`${postTitle} - ${siteTitle}`}
      description={description !== null ? description : siteSubtitle}
      image={socialImage}
      pathname={location.pathname}
      article
    />
  );
};


/* eslint-enable react/prop-types */

export default PostTemplate;
