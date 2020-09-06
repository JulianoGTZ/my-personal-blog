import React from 'react';
import PropTypes from 'prop-types';
import styles from './Icon.module.scss';

const Icon = ({ name, icon, testId }) => (
  <svg className={styles.icon} viewBox={icon.viewBox} data-testid={testId}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

Icon.defaultProps = {
  testId: 'icon',
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  testId: PropTypes.string,
};

export default Icon;
