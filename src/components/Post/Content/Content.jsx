import React from 'react';
import PropTypes from 'prop-types';
import styles from './Content.module.scss';

const Content = ({ body, title }) => (
  <div className={styles.content} data-testid="post-content">
    <h1 className={styles.content__title} data-testid="post-content-title">{title}</h1>
    <div
      className={styles.content__body}
      data-testid="post-content-body"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

Content.propTypes = {
  body: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default Content;
