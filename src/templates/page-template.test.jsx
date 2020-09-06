import React from 'react';
import { render, cleanup } from '@testing-library/react';
import PageTemplate from './page-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import markdownRemark from '../../jest/__fixtures__/markdown-remark';

describe('PageTemplate', () => {
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
      const { getByTestId } = render(<PageTemplate {...props} />);
      getByTestId('layout-image');
    });
  });

  describe('Sidebar', () => {
    it('Should show author context', () => {
      const { getByTestId, getByText, getByAltText } = render(
        <PageTemplate {...props} />
      );
      const { author } = siteMetadata;
      getByTestId('author');
      getByText(author.name);
      getByText(author.bio);
      getByAltText(author.name);
    });

    it('Should show contacts', () => {
      const { getByTestId } = render(<PageTemplate {...props} />);
      getByTestId('my-contacts');
    });

    it('Should show copyright', () => {
      const { copyright } = siteMetadata;
      const { getByTestId, getByText } = render(<PageTemplate {...props} />);
  
      getByTestId('copyright');
      getByText(copyright);
    });
  });

  describe('Page', () => {
    it('Should show the title', () => {
      const { getByTestId } = render(<PageTemplate {...props} />);
      getByTestId('page-container');
    });
  });
});
