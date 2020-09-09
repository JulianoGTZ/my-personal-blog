import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Author from './Author';
import siteMetadata from '../../../../jest/__fixtures__/site-metadata';

describe('Author', () => {
  beforeEach(() => {
    cleanup();
  });

  const { author } = siteMetadata;

  it('Should show the author biograph', () => {
    const { getByTestId } = render(<Author />);
    const authorBio = getByTestId('author-bio-paragraph');
    expect(authorBio.textContent).toContain(author.bio);
  });

  it('Should show a link to twitter', () => {
    const { getByTestId } = render(<Author />);
    const authorBioTwitter = getByTestId('author-bio-twitter');
    expect(authorBioTwitter.textContent).toBe('juju  on Twitter');

    expect(authorBioTwitter).toHaveProperty(
      'href',
      'https://www.twitter.com/#'
    );
  });
});
