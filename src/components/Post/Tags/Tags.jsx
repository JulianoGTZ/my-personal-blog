import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './Tags.module.scss';

const Tags = ({ tags, tagSlugs }) => (
  <div className={styles.tags}>
    <ul className={styles.tags__list}>
      {tagSlugs &&
        tagSlugs.map((slug, i) => (
          <li className={styles['tags__list-item']} key={tags[i]}>
            <Link to={slug} className={styles['tags__list-item-link']}>
              {tags[i]}
            </Link>
          </li>
        ))}
    </ul>
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  tagSlugs: PropTypes.arrayOf(PropTypes).isRequired,
};

export default Tags;
