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
        <div className={styles.feed__itemMetaTime}>
          <time
            className={styles.feed__itemMetaTime}
            data-testid={`edge-item-meta-time-${index}`}
            dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}
          >
            {formatDate({ date: edge.node.frontmatter.date })}
          </time>
          <span className={styles.feed__itemMetaDivider} />
          <span className={styles.feed_itemMetaCategory}>
            <Link
              to={edge.node.fields.categorySlug}
              data-testid={`category-slug-link-${index}`}
              className={styles.feed__itemMetaCategoryLink}
            >
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={styles.feed__itemTitle}>
          <Link
            className={styles.feed__itemTitleLink}
            to={edge.node.fields.slug}
            data-testid={`link-title-link-${index}`}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p className={styles.feed__itemDescription}>
          {edge.node.frontmatter.description}
        </p>
        <Link
          className={styles.feed__itemReadmore}
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
      tagSlugs: PropTypes.arrayOf(PropTypes.string),
    }),
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string.isRequired,
    }),
    id: PropTypes.string,
    html: PropTypes.string,
  }),
});

Feed.propTypes = {
  edges: PropTypes.arrayOf(edge),
};

export default Feed;
