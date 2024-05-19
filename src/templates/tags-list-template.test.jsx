import React from 'react';
import { render, cleanup } from '@testing-library/react';
import TagsListTemplate from './tags-list-template';
import siteMetadata from '../../jest/__fixtures__/site-metadata';
import allMarkdownRemark from '../../jest/__fixtures__/all-markdown-remark';
import categoriesMetadata from '../../jest/__fixtures__/categories-metadata';

describe('TagsListTemplate', () => {
  const props = {
    ...siteMetadata,
    ...allMarkdownRemark,
  };

  beforeEach(() => {
    cleanup();
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  describe('Layout', () => {
    it('Should show the Layout container', () => {
      const { getByTestId } = render(<TagsListTemplate {...props} />);
      getByTestId('layout-image');
    });
  });

  describe('Page', () => {
    it('Should show the title', () => {
      const { getByTestId } = render(<TagsListTemplate {...props} />);
      const title = getByTestId('page-title');
      
      getByTestId('page-container');
      expect(title.textContent).toBe('Tags');
    });

    describe('Tag links', () => {
      it('Should show all of the tag links', () => {
        const { getByTestId, getByText } = render(<TagsListTemplate />);
    
        categoriesMetadata.forEach((category, index) => {
          getByTestId(`list-template-link-${index}`);
          getByText(`${category.fieldValue} (${category.totalCount})`);
        });
      });
  
      it('All of the links should redirect to link', () => {
        const { getByTestId } = render(<TagsListTemplate />);
    
        categoriesMetadata.forEach((category, index) => {
          const templateLink = getByTestId(`list-template-link-${index}`);
          expect(templateLink).toHaveProperty(
            'href',
            `http://localhost/tag/${category.fieldValue.toLowerCase()}/`
          );
        });
      });
    });
  });

  
});
