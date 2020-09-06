import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';

const Post = ({ post }) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles.post} data-testid="post-page">
      <Link className={styles['post__home-button']} to="/" data-testid="post-header">
        All Articles
      </Link>

      <div className={styles.post__content} data-testid="post-content-container">
        <Content body={html} title={title} />
      </div>

      <div className={styles.post__footer} data-testid="post-footer">
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles.post__comments} data-testid="post-comments">
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
      tagSlugs: PropTypes.arrayOf(PropTypes.string),
    }),
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
