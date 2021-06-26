import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'gatsby';
import { formatDate } from '../../utils';
import { feed, feed__itemMeta, feed__item, feed__itemMetaTime, feed__itemMetaDivider, feed__itemMetaCategoryLink, feed__itemMetaCategory,
feed__ItemTitle, feed__itemTitleLink, feed__itemDescription, feed__itemReadmore} from './Feed.module.scss';


const Feed = ({ edges }) => (
  <div data-testid="feed" className={feed}>
    {edges.map((edge, index) => (
      <div
        data-testid={`edge-field-${index}`}
        className={feed__item}
        key={edge.node.fields.slug}
      >
        <div className={feed__itemMeta}>
          <time
            className={feed__itemMetaTime}
            data-testid={`edge-item-meta-time-${index}`}
            dateTime={moment(edge.node.frontmatter.date).format('MMMM D, YYYY')}
          >
            {formatDate({ date: edge.node.frontmatter.date })}
          </time>
          <span className={feed__itemMetaDivider} />
          <span className={feed__itemMetaCategory}>
            <Link
              to={edge.node.fields.categorySlug}
              data-testid={`category-slug-link-${index}`}
              className={feed__itemMetaCategoryLink}
            >
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>
        <h2 className={feed__ItemTitle}>
          <Link
            className={feed__itemTitleLink}
            to={edge.node.fields.slug}
            data-testid={`link-title-link-${index}`}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p className={feed__itemDescription}>
          {edge.node.frontmatter.description}
        </p>
        <Link
          className={feed__itemReadmore}
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
