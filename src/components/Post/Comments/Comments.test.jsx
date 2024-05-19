import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Comments from './Comments';

describe('Comments', () => {
  beforeEach(() => {
    cleanup();
  });

  const props = {
    postTitle: 'Clojure - the best language ever',
    postSlug: '/test',
  };

  it('Should render the comments', () => {
    const { getByTestId } = render(<Comments {...props} />);
    getByTestId('post-comment');
  });
});
