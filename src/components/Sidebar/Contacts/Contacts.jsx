import React from 'react';
import PropTypes from 'prop-types';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Contacts.module.scss';

const Contacts = ({ contacts }) => (
  <div data-testid="my-contacts" className={styles.contacts}>
    <ul data-testid="my-contacts-list" className={styles.contacts__list}>
      {Object.keys(contacts).map((name) =>
        !contacts[name] ? null : (
          <li
            data-testid={`contact-item-${name}`}
            className={styles['contacts__list-item']}
            key={name}
          >
            <a
              className={styles['contacts__list-item-link']}
              href={getContactHref(name, contacts[name])}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon
                testId={`contact-icon-${name}`}
                name={name}
                icon={getIcon(name)}
              />
            </a>
          </li>
        )
      )}
    </ul>
  </div>
);

Contacts.propTypes = {
  contacts: PropTypes.shape({
    email: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    vkontakte: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired,
    rss: PropTypes.string.isRequired,
    telegram: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contacts;
