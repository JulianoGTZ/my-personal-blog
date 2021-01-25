import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'gatsby';
import { formatDate } from '../../utils';
import styles from './Feed.module.scss';

const Feed = ({ edges }) => (
  <div data-testid="feed" className={styles.feed}>
    {edges.map((edge, index) => (
      <div
        data-testid={`edge-field-${index}`}
        className={styles.feed__item}
        key={edge.node.fields.slug}
      >
        <div className={styles['feed__item-meta']}>
          <time
            className={styles['feed__item-meta-time']}
            data-testid={`edge-item-meta-time-${index}`}
            dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}
          >
            {formatDate({ date: edge.node.frontmatter.date })}
          </time>
          <span className={styles['feed__item-meta-divider']} />
          <span className={styles['feed__item-meta-category']}>
            <Link
              to={edge.node.fields.categorySlug}
              data-testid={`category-slug-link-${index}`}
              className={styles['feed__item-meta-category-link']}
            >
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={styles['feed__item-title']}>
          <Link
            className={styles['feed__item-title-link']}
            to={edge.node.fields.slug}
            data-testid={`link-title-link-${index}`}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p className={styles['feed__item-description']}>
          {edge.node.frontmatter.description}
        </p>
        <Link
          className={styles['feed__item-readmore']}
          data-testid={`link-read-more-${index}`}
          to={edge.node.fields.slug}
        >
          Read
        </Link>
      </div>
    ))}
  </div>
);

const edge = PropTypes.shape({
  node: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      tagSlugs: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      title: PropTypes.string.isRequired,
    }),
    id: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  }),
});

Feed.propTypes = {
  edges: PropTypes.arrayOf(edge).isRequired,
};

export default Feed;
