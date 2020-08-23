import React from 'react';
import PropTypes from 'prop-types';
import styles from './Icon.module.scss';

const Icon = ({ name, icon }) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default Icon;
