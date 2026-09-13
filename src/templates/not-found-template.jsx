import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => (
  <Layout>
    <Sidebar />
    <Page title="NOT FOUND">
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Page>
  </Layout>
);

export const Head = ({ location }) => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Seo
      title={`Not Found - ${title}`}
      description={subtitle}
      pathname={location.pathname}
    />
  );
};

Head.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default NotFoundTemplate;
