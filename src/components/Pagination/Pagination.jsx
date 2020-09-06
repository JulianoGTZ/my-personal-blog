import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import { PAGINATION } from '../../constants';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
}) => {
  const prevClassName = cx({
    'pagination__prev-link': true,
    'pagination__prev-link--disable': !hasPrevPage,
  });

  const nextClassName = cx({
    'pagination__next-link': true,
    'pagination__next-link--disable': !hasNextPage,
  });

  return (
    <div className={styles.pagination} data-testid="pagination">
      <div className={styles.pagination__prev}>
        <Link
          rel="prev"
          data-testid="link-to-previous-page"
          to={hasPrevPage ? prevPagePath : '/'}
          className={prevClassName}
        >
          {PAGINATION.PREV_PAGE}
        </Link>
      </div>
      <div className={styles.pagination__next}>
        <Link
          rel="next"
          data-testid="link-to-next-page"
          to={hasNextPage ? nextPagePath : '/'}
          className={nextClassName}
        >
          {PAGINATION.NEXT_PAGE}
        </Link>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  prevPagePath: PropTypes.string.isRequired,
  nextPagePath: PropTypes.string.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
};

export default Pagination;
