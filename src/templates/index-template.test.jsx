import React from 'react';
import { render, cleanup } from '@testing-library/react';
import IndexTemplate from './index-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark';
import pageContext from '../../jest/__fixtures__/page-context';

describe('IndexTemplate', () => {
  const props = {
    data: {
      ...allMarkdownRemark,
    },
    ...pageContext,
  };

  beforeEach(() => {
    cleanup();
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  describe('Layout', () => {
    it('Should show the Layout container', () => {
      const { getByTestId } = render(<IndexTemplate {...props} />);
      getByTestId('layout-image');
    });
  });

  describe('Sidebar', () => {
    it('Should show author context', () => {
      const { getByTestId, getByText, getByAltText } = render(
        <IndexTemplate {...props} />
      );
      const { author } = siteMetadata;
      getByTestId('author');
      getByText(author.name);
      getByText(author.bio);
      getByAltText(author.name);
    });

    it('Should show contacts', () => {
      const { getByTestId } = render(<IndexTemplate {...props} />);
      getByTestId('my-contacts');
    });

    it('Should show copyright', () => {
      const { copyright } = siteMetadata;
      const { getByTestId, getByText } = render(<IndexTemplate {...props} />);
  
      getByTestId('copyright');
      getByText(copyright);
    });
  });

  describe('Page', () => {
    it('Should show the title', () => {
      const { getByTestId } = render(<IndexTemplate {...props} />);
      getByTestId('page-container');
    });
  });

  describe('Feed', () => {
    it('Should show the Feed container', () => {
      const { getByTestId } = render(<IndexTemplate {...props} />);
      getByTestId('feed');
    });
  });

  describe('Pagination', () => {
    it('Should show the Pagination container', () => {
      const { getByTestId } = render(<IndexTemplate {...props} />);
      getByTestId('pagination');
    })
  })
});
