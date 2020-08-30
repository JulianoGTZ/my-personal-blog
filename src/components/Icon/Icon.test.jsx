import React from 'react';
import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon', () => {
  const props = {
    name: 'some cool icon name',
    icon: {
      viewBox: '0 0 0 0',
      path: '',
    },
  };

  it('Should show the right name', () => {
    const { getByText } = render(<Icon {...props} />);
    getByText(props.name);
  });

  it('Should show a svg', () => {
    const { container } = render(<Icon {...props} />);
    const iconSvg = container.querySelector(
      `[viewBox="${props.icon.viewBox}"]`
    );
    expect(iconSvg).not.toBe(null);
  });
});
