import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Seo from '../components/Seo';
import { useSiteMetadata } from '../hooks';

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const { title: postTitle, description: postDescription, socialImage } = frontmatter;
  const metaDescription = postDescription !== null ? postDescription : siteSubtitle;

  return (
    <Layout title={`${postTitle} - ${siteTitle}`} description={metaDescription} socialImage={socialImage}>
      <Seo title={siteTitle} description={metaDescription} image={socialImage} article />
      <Post post={data.markdownRemark} />
    </Layout>
  );
};

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

export default PostTemplate;
