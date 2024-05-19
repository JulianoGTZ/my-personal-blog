import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PostTemplate from './post-template';
import markdownRemark from '../../jest/__fixtures__/markdown-remark';

describe('PostTemplate', () => {
  const props = {
    data: {
      ...markdownRemark,
    },
  };

  beforeEach(() => {
    cleanup();
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  describe('Layout', () => {
    it('Should show the Layout container', () => {
      const { getByTestId } = render(<PostTemplate {...props} />);
      getByTestId('layout-image');
    });
  });

  describe('Post', () => {
    it('Should show the Post container', () => {
      const { getByTestId } = render(<PostTemplate {...props} />);
      getByTestId('post-page');
    });
  });
});
