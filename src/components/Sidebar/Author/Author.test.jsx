import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Author from './Author';

describe('Author', () => {
  const props = {
    author: {
      name: 'Juju',
      photo: '/photo.jpg',
      bio: 'test',
    },
    isIndex: false,
  };

  beforeEach(() => {
    cleanup();
  });

  describe('Should show the author image', () => {
    it('Should have a link to the photo', () => {
      const { getByTestId } = render(<Author {...props} />);
      expect(getByTestId('author-img')).toHaveProperty(
        'src',
        'http://localhost/photo.jpg'
      );
    });

    it('Should have an alt describing the image', () => {
      const { getByAltText } = render(<Author {...props} />);

      getByAltText(props.author.name);
    });
  });

  describe('Should show the author name', () => {
    it('Should show a larger text when its index', () => {
      const propsWithIsIndexTrue = { ...props, isIndex: true };
      const { getByTestId } = render(<Author {...propsWithIsIndexTrue} />);
      getByTestId('author-title-link-h1');
      expect(getByTestId('author-title-link').textContent).toBe(
        props.author.name
      );
    });

    it('Should shown a medium message when its not index', () => {
      const { getByTestId } = render(<Author {...props} />);
      getByTestId('author-title-link-h2');
      expect(getByTestId('author-title-link').textContent).toBe(
        props.author.name
      );
    });
  });

  describe('Should show the last Paragraph', () => {
    it('Should show the author bio', () => {
      const { getByTestId } = render(<Author {...props} />);
      expect(getByTestId('author-bio').textContent).toBe(props.author.bio);
    });
  });
});
