import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Menu from './Menu';

describe('Menu', () => {
  const props = {
    menu: [
      {
        label: 'Item 0',
        path: '/#0/',
      },
      {
        label: 'Item 1',
        path: '/#1/',
      },
    ],
  };

  beforeEach(() => {
    cleanup();
  });

  it('Should show a menu navbar', () => {
    const { getByTestId } = render(<Menu {...props} />);
    getByTestId('menu-navbar');
  });

  it('Should render all of the items on Menu', () => {
    const dataTestIds = ['menu-list-item-0', 'menu-list-item-1'];
    const { getByTestId } = render(<Menu {...props} />);

    getByTestId('menu-items');

    dataTestIds.forEach((testId, index) => {
      expect(getByTestId(testId).textContent).toBe(`Item ${index}`);
    });
  });
});
