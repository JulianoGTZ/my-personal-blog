import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './Tags.module.scss';

const Tags = ({ tags, tagSlugs }) => (
  <div className={styles.tags} data-testid='tags-container'>
    <ul className={styles.tags__list} data-testid='tags-link-list'>
      {tagSlugs &&
        tagSlugs.map((slug, index) => (
          <li className={styles['tags__list-item']} key={tags[index]}>
            <Link to={slug} className={styles['tags__list-item-link']} data-testid={`tag-link-${index}`}>
              {tags[index]}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

Tags.defaultProps = { 
  tagSlugs: undefined,
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagSlugs: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
