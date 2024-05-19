import React from 'react';
import { render } from '@testing-library/react';
import Copyright from './Copyright';

describe('Copyright', () => {
  it('renders correctly', () => {
    const props = {
      copyright: 'some-copyright',
    };

    const { getByText } = render(<Copyright {...props} />);
    getByText(props.copyright);
  });
});
