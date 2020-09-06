import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Post from './Post';

describe('Post', () => {
  beforeEach(() => {
    cleanup();
  });

  const props = {
    post: {
      id: 'test-123',
      html: '<p>How to download a graphic board</p>',
      fields: {
        slug: '/test',
        categorySlug: '/test-category',
        tagSlugs: ['/test_0', '/test_1'],
      },
      frontmatter: {
        date: '2020-09-01',
        tags: ['clojure_0', 'dumb_1'],
        title: 'how its possible',
      },
    },
  };

  describe('Post header', () => {
    it('Should show a message relative to the other articles', () => {
      const { getByTestId } = render(<Post {...props} />);
      const postHeader = getByTestId('post-header');
  
      expect(postHeader.textContent).toBe('All Articles');
    });

    it('Should redirect to the first page', () => {
      const { getByTestId } = render(<Post {...props} />);
      const postHeader = getByTestId('post-header');

      expect(postHeader).toHaveProperty(
        'href',
        'http://localhost/'
      );
    });
  });

  describe('Post content', () => {
    it('Should show the post title', () => {
      const { title } = props.post.frontmatter;
      const { getByTestId } = render(<Post {...props} />);
      const postContentTitle = getByTestId('post-content-title');
    
      expect(postContentTitle.textContent).toBe(title);
    });

    it('Should show the post content', () => {
      const { getByTestId } = render(<Post {...props} />);
      const postContentBody = getByTestId('post-content-body');
    
      expect(postContentBody.textContent).toBe('How to download a graphic board');
    });
  });

  describe('Post Footer', () => {
      it('Should show tags when it exists', () => {
        const { getByTestId } = render(<Post {...props} />);
        getByTestId('tags-container');
      });

      it('Should not show tags whet it doesn\'t exits', () => {
        const { post } = props;
        // eslint-disable-next-line no-multi-assign
        post.fields.tagSlugs = undefined;
        const propsWithoutTags = {...props, post};
        
        const { queryByTestId } = render(<Post {...propsWithoutTags} />);
        expect(queryByTestId('tags-container')).toBe(null);
      });
  });

  describe('Post comments', () => {
    it('Should show the comment', () => {
      const { getByTestId } = render(<Post {...props} />);
      getByTestId('post-comment');
    });
  })
});
