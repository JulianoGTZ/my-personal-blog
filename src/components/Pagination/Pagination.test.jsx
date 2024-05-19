import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { PAGINATION } from '../../constants';
import Pagination from './Pagination';

describe('Pagination', () => {
  const props = {
    prevPagePath: '/page/1',
    nextPagePath: '/page/3',
    hasNextPage: true,
    hasPrevPage: true,
  };

  beforeEach(() => {
    cleanup();
  });

  describe('Previous Page Context', () => {
    const { prevPagePath } = props;

    it('The link should aim to the previous Page when has Previous Page', () => {
      const { getByTestId } = render(<Pagination {...props} />);
      const previousPageLink = getByTestId('link-to-previous-page');

      expect(previousPageLink.textContent).toBe(PAGINATION.PREV_PAGE);
      expect(previousPageLink).toHaveProperty(
        'href',
        `http://localhost${prevPagePath}`
      );
    });

    it('The link should aim to "/" when there\'s no previous page"', () => {
      const propsWithoutPreviousPage = { ...props, hasPrevPage: false };
      const { getByTestId } = render(
        <Pagination {...propsWithoutPreviousPage} />
      );
      const previousPageLink = getByTestId('link-to-previous-page');

      expect(previousPageLink.textContent).toBe(PAGINATION.PREV_PAGE);
      expect(previousPageLink).toHaveProperty('href', 'http://localhost/');
    });
  });

  describe('Next Page Context', () => {
    const { nextPagePath } = props;

    it('The link should aim to the next Page when has next Page', () => {
      const { getByTestId } = render(<Pagination {...props} />);
      const previousPageLink = getByTestId('link-to-next-page');

      expect(previousPageLink.textContent).toBe(PAGINATION.NEXT_PAGE);
      expect(previousPageLink).toHaveProperty(
        'href',
        `http://localhost${nextPagePath}`
      );
    });

    it('The link should aim to "/" when there\'s no next page"', () => {
      const propsWithoutNextPage = { ...props, hasNextPage: false };
      const { getByTestId } = render(<Pagination {...propsWithoutNextPage} />);
      const nextPageLink = getByTestId('link-to-next-page');

      expect(nextPageLink.textContent).toBe(PAGINATION.NEXT_PAGE);
      expect(nextPageLink).toHaveProperty('href', 'http://localhost/');
    });
  });
});
