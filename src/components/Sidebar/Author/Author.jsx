import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

const Author = ({ author, isIndex }) => (
  <div data-testid="author" className={styles.author}>
    <Link data-testid="author-link" to="/">
      <img
        data-testid="author-img"
        src={withPrefix(author.photo)}
        className={styles.author__photo}
        width="75"
        height="75"
        alt={author.name}
      />
    </Link>

    {isIndex === true ? (
      <h1 className={styles.author__title} data-testid="author-title-link-h1">
        <Link
          data-testid="author-title-link"
          className={styles['author__title-link']}
          to="/"
        >
          {author.name}
        </Link>
      </h1>
    ) : (
      <h2 className={styles.author__title} data-testid="author-title-link-h2">
        <Link
          data-testid="author-title-link"
          className={styles['author__title-link']}
          to="/"
        >
          {author.name}
        </Link>
      </h2>
    )}
    <p data-testid="author-bio" className={styles.author__subtitle}>
      {author.bio}
    </p>
  </div>
);

Author.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
  isIndex: PropTypes.bool.isRequired,
};

export default Author;
