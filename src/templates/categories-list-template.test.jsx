import React from 'react';
import { render, cleanup } from '@testing-library/react';
import CategoriesListTemplate, { Head } from './categories-list-template';
import categoriesMetadata from '../../jest/__fixtures__/categories-metadata';

describe('CategoriesListTemplate', () => {
  beforeEach(() => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    cleanup();
  });

  it('Should show the layout', () => {
    const { getByTestId } = render(<CategoriesListTemplate />);
    getByTestId('layout-image');
  });

  it('Should show the sidebar', () => {
    const { getByTestId } = render(<CategoriesListTemplate />);
    getByTestId('sidebar');
  });

  it('Should show all of the categories', () => {
    const { getByTestId, getByText } = render(<CategoriesListTemplate />);

    categoriesMetadata.forEach((category) => {
      getByTestId(`category-${category.fieldValue}`);
      getByText(`${category.fieldValue} (${category.totalCount})`);
    });
  });

  describe('Head', () => {
    it('Should title the document with the page and the site', () => {
      const { container } = render(<Head location={{ pathname: '/categories/' }} />);

      expect(container.querySelector('title').textContent).toBe(
        'Categories - Test title',
      );
    });
  });
});
