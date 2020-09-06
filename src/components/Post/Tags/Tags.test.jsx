import React from 'react';
import { render } from '@testing-library/react';
import Tags from './Tags';

describe('Tags', () => {
  const props = {
    tags: ['goats', 'with-lasers'],
    tagSlugs: ['/goats', '/with-lasers'],
  };

  describe('Where there are tags', () => {
    it('Should show the tags section', () => {
      const { getByTestId } = render(<Tags {...props} />);
      getByTestId('tags-container');
    });

    it('Should show the tag links', () => {
      const { tags } = props;
      const { getByTestId } = render(<Tags {...props} />);

      tags.forEach((tag, index) => {
        const tagElement = getByTestId(`tag-link-${index}`);
        expect(tagElement.textContent).toBe(tag);
      });
    });

    it('The tags should redirect to the right slugs', () => {
      const { tagSlugs } = props;
      const { getByTestId } = render(<Tags {...props} />);

      tagSlugs.forEach((tagSlug, index) => {
        const tagElement = getByTestId(`tag-link-${index}`);
        expect(tagElement).toHaveProperty(
          'href',
          `http://localhost${tagSlug}`
        );
      });
    });

  });

  describe('When there\'s no tags', () => {
    const propsWithoutTags = {...props, tagSlugs: undefined};
      
    it('Should show the tags section', () => {
      const { getByTestId } = render(<Tags {...propsWithoutTags} />);
      getByTestId('tags-container');
    })

    it('Should not render the tag list', () => {
      const { queryByTestId } = render(<Tags {...propsWithoutTags} />);

      expect(queryByTestId('tags-link-1')).toBe(null);
      expect(queryByTestId('tags-link-2')).toBe(null);
    })
  });
});
