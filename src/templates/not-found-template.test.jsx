import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFoundTemplate from './not-found-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';

describe('NotFoundTemplate', () => {
  beforeEach(() => {
    cleanup();
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  describe('Layout', () => {
    it('Should show the Layout container', () => {
      const { getByTestId } = render(<NotFoundTemplate />);
      getByTestId('layout-image');
    });
  });

  describe('Sidebar', () => {
    it('Should show author context', () => {
      const { getByTestId, getByText, getByAltText } = render(
        <NotFoundTemplate />
      );
      const { author } = siteMetadata;
      getByTestId('author');
      getByText(author.name);
      getByText(author.bio);
      getByAltText(author.name);
    });
    it('Should show copyright', () => {
      const { copyright } = siteMetadata;
      const { getByTestId, getByText } = render(<NotFoundTemplate />);
  
      getByTestId('copyright');
      getByText(copyright);
    });
  });

  describe('Page', () => {
    it('Should show NOT FOUND as title', () => {
      const { getByTestId } = render(<NotFoundTemplate  />);
      const title = getByTestId('page-title');
      expect(title.textContent).toBe('NOT FOUND');
    });
  });
});
