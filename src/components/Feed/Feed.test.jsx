import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { formatDate } from '../../utils';
import Feed from './Feed';

describe('Feed', () => {
  beforeEach(() => {
    cleanup();
  });

  const props = {
    edges: [
      {
        node: {
          fields: {
            slug: '/test_0',
            categorySlug: '/test_0',
            tagSlugs: ['/test-1', '/test-2'],
          },
          frontmatter: {
            date: '2016-09-01',
            description: 'test_0',
            category: 'test_0',
            tags: ['test-1', 'test-2'],
            title: 'test_0',
          },
          id: 'test-123',
          html: '<p>test</p>',
        },
      },
      {
        node: {
          fields: {
            slug: '/test_1',
            categorySlug: '/test_1',
            tagSlugs: ['/test-1', '/test-2'],
          },
          frontmatter: {
            date: '2020-09-05',
            description: 'Gr',
            category: 'test_1',
            tags: ['test-1', 'test-2'],
            title: 'test_1',
          },
          id: 'test-321',
          html: '<p>test</p>',
        },
      },
    ],
  };

  it('Should show the fields', () => {
    const { getByTestId } = render(<Feed {...props} />);
    props.edges.forEach((edge, index) => {
      getByTestId(`edge-field-${index}`);
    });
  });

  it('Should show the Meta Time', () => {
    const { getByText } = render(<Feed {...props} />);
    props.edges.forEach((edge) => {
      getByText(formatDate({ date: edge.node.frontmatter.date }));
    });
  });

  it('Should show a link for each node', () => {
    const { getByTestId } = render(<Feed {...props} />);
    props.edges.forEach((edge, index) => {
      const categorySlugLink = getByTestId(`category-slug-link-${index}`);

      expect(categorySlugLink).toHaveProperty(
        'href',
        `http://localhost${edge.node.fields.slug}`
      );
      expect(categorySlugLink.textContent).toBe(edge.node.frontmatter.category);
    });
  });

  it('Should show a link to "Feed Title"', () => {
    const { getByTestId } = render(<Feed {...props} />);
    props.edges.forEach((edge, index) => {
      const titleLink = getByTestId(`link-title-link-${index}`);

      expect(titleLink).toHaveProperty(
        'href',
        `http://localhost${edge.node.fields.slug}`
      );
      expect(titleLink.textContent).toBe(edge.node.frontmatter.title);
    });
  });

  it('Should show a link to "Read More"', () => {
    const { getByTestId } = render(<Feed {...props} />);
    props.edges.forEach((edge, index) => {
      const categorySlugLink = getByTestId(`link-read-more-${index}`);

      expect(categorySlugLink).toHaveProperty(
        'href',
        `http://localhost${edge.node.fields.slug}`
      );
      expect(categorySlugLink.textContent).toBe('Read');
    });
  });
});
