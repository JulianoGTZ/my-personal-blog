import React from 'react';
import PropTypes from 'prop-types';
import { useSiteMetadata } from '../../hooks';

// Rendered from each template's `Head` export, not from the page body:
// Gatsby's Head API only collects elements returned by that export.
const Seo = ({ title, description, image, article, pathname }) => {
  const { url, title: siteTitle, author } = useSiteMetadata();

  // siteMetadata.url carries the path prefix and a trailing slash
  // (https://host/my-personal-blog/), which makes the two joins below differ:
  //
  //  - asset paths (/media/x.png) are prefix-less, so they hang off the full
  //    site url;
  //  - location.pathname already includes the prefix, so it hangs off the
  //    origin. Joining it to the full url is what produced
  //    /my-personal-blog/my-personal-blog/... before.
  const siteUrl = url.replace(/\/+$/, '');
  const { origin } = new URL(siteUrl);
  const join = (base, p) => (p ? `${base}${p.startsWith('/') ? p : `/${p}`}` : null);

  const metaImage = join(siteUrl, image || author.photo);
  const canonical = join(origin, pathname);

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      {canonical && <meta property="og:url" content={canonical} />}
      {metaImage && <meta property="og:image" content={metaImage} />}

      <meta name="twitter:card" content={article ? 'summary_large_image' : 'summary'} />
      {author.contacts.twitter && (
        <meta name="twitter:creator" content={author.contacts.twitter} />
      )}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}
    </>
  );
};

Seo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  article: PropTypes.bool,
  pathname: PropTypes.string,
};

Seo.defaultProps = {
  image: null,
  article: false,
  pathname: null,
};

export default Seo;
