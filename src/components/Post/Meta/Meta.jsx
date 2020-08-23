import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './Meta.module.scss';

const Meta = ({ date }) => (
  <div className={styles.meta}>
    <p className={styles.meta__date}>
      Published
      {moment(date).format('D MMM YYYY')}
    </p>
  </div>
);

Meta.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Meta;
