import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Content from './Content';

describe('Content', () => {
  const props = {
    title: 'A great title',
    body: '<p>A great content.</p>',
  };

  beforeEach(() => {
    cleanup();
  });

  it('Should show a title', () => {
    const { getByText } = render(<Content {...props} />);
    const { title } = props;
    getByText(title);
  });

  it('Should show the content on body', () => {
    const { getByText } = render(<Content {...props} />);
    getByText('A great content.');
  });
});
