import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useSiteMetadata } from '../../hooks';

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { subtitle, url, author } = useSiteMetadata();

  const {
    photo,
    contacts,
  } = author;

  const seo = {
    title,
    description: description || subtitle,  
    image: `${url}${image || photo}`,
    url: `${url}${pathname}`,
  }

  return (
    <Helmet title={seo.title} titleTemplate={title}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {contacts.twitter && (
        <meta name="twitter:creator" content={contacts.twitter} />
      )}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  article: false,
}

export default SEO