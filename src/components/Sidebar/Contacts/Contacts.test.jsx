import React from 'react';
import { render } from '@testing-library/react';
import Contacts from './Contacts';

describe('Contacts', () => {
  const props = {
    contacts: {
      email: '#',
      twitter: '#',
      vkontakte: '#',
      github: '#',
      rss: '#',
      telegram: '#',
    },
  };

  it('Should render the right container', () => {
    const { getByTestId } = render(<Contacts {...props} />);
    getByTestId('my-contacts');
  });

  it('Should render all of the contacts', () => {
    const { contacts } = props;
    const { getByTestId } = render(<Contacts {...props} />);

    getByTestId('my-contacts-list');

    Object.keys(contacts).forEach((contact) => {
      expect(getByTestId(`contact-item-${contact}`).textContent).toBe(contact);
      getByTestId(`contact-icon-${contact}`);
    });
  });
});
