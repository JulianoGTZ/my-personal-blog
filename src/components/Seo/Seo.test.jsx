import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Seo from './Seo';
import useSiteMetadata from '../../hooks/use-site-metadata';

// The production siteMetadata.url carries a path prefix and a trailing slash.
// The fixture does not, which is exactly the shape that used to hide the
// double-prefix bug in og:image and og:url, so state it explicitly here.
const withSiteUrl = (url) =>
  useSiteMetadata.mockImplementation(() => ({
    url,
    title: 'Blog by Juliano Lima',
    subtitle: 'Test subtitle',
    author: {
      photo: '/photo.png',
      contacts: { twitter: 'julianodgtz' },
    },
  }));

const meta = (container, selector) => {
  const el = container.querySelector(selector);
  return el === null ? null : el.getAttribute('content');
};

describe('Seo', () => {
  beforeEach(() => {
    cleanup();
    withSiteUrl('https://example.com/blog/');
  });

  it('Should join asset paths onto the prefixed site url, once', () => {
    const { container } = render(
      <Seo title="T" description="D" image="/media/x.png" />,
    );

    expect(meta(container, 'meta[property="og:image"]')).toBe(
      'https://example.com/blog/media/x.png',
    );
    expect(meta(container, 'meta[name="twitter:image"]')).toBe(
      'https://example.com/blog/media/x.png',
    );
  });

  it('Should build the canonical url from the origin, since pathname already carries the prefix', () => {
    const { container } = render(
      <Seo title="T" description="D" pathname="/blog/posts/hello/" />,
    );

    expect(meta(container, 'meta[property="og:url"]')).toBe(
      'https://example.com/blog/posts/hello/',
    );
  });

  it('Should fall back to the author photo when no image is given', () => {
    const { container } = render(<Seo title="T" description="D" />);

    expect(meta(container, 'meta[property="og:image"]')).toBe(
      'https://example.com/blog/photo.png',
    );
  });

  it('Should mark posts as article and everything else as website', () => {
    const post = render(<Seo title="T" description="D" article />);
    expect(meta(post.container, 'meta[property="og:type"]')).toBe('article');
    cleanup();

    const page = render(<Seo title="T" description="D" />);
    expect(meta(page.container, 'meta[property="og:type"]')).toBe('website');
  });

  it('Should title the page and the og/twitter cards identically', () => {
    const { container } = render(
      <Seo title="A Post - Blog by Juliano Lima" description="D" />,
    );

    expect(meta(container, 'meta[property="og:title"]')).toBe(
      'A Post - Blog by Juliano Lima',
    );
    expect(meta(container, 'meta[name="twitter:title"]')).toBe(
      'A Post - Blog by Juliano Lima',
    );
    expect(meta(container, 'meta[property="og:site_name"]')).toBe(
      'Blog by Juliano Lima',
    );
  });
});
