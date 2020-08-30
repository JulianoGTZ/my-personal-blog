import React from 'react';
import { render } from '@testing-library/react';
import Sidebar from './Sidebar';
import siteMetadata from '../../../jest/__fixtures__/site-metadata';

describe('Sidebar', () => {
  const props = {
    isIndex: true,
  };

  it('Should show a sidebar', () => {
    const { getByTestId } = render(<Sidebar {...props} />);
    getByTestId('sidebar');
  });

  it('Should show author context', () => {
    const { getByTestId, getByText, getByAltText } = render(
      <Sidebar {...props} />
    );
    const { author } = siteMetadata;
    getByTestId('author');
    getByText(author.name);
    getByText(author.bio);
    getByAltText(author.name);
  });

  it('Should show menu context', () => {
    const { getByTestId } = render(<Sidebar {...props} />);
    getByTestId('menu-navbar');
  });

  it('Should show contacts', () => {
    const { getByTestId } = render(<Sidebar {...props} />);
    getByTestId('my-contacts');
  });

  it('Should show copyright', () => {
    const { copyright } = siteMetadata;
    const { getByTestId, getByText } = render(<Sidebar {...props} />);

    getByTestId('copyright');
    getByText(copyright);
  });
});
