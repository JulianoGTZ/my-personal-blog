import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  const props = {
    children: <div>Some rich content</div>,
    description: 'A great description wich makes me cry',
    title: 'Why Corinthians is the best team?',
    socialImage: 'some-path.jpg',
  };

  beforeEach(() => {
    cleanup();
  });

  it('Should show the content', () => {
    const { getByTestId, getByText } = render(<Layout {...props} />);
    getByTestId('layout-image');
    getByText('Some rich content');
  });
});
