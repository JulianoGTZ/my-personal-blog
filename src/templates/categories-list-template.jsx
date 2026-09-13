import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Page from '../components/Page';
import { useSiteMetadata, useCategoriesList } from '../hooks';

const CategoriesListTemplate = () => {
  const categories = useCategoriesList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link
                data-testid={`category-${category.fieldValue}`}
                to={`/category/${kebabCase(category.fieldValue)}/`}
              >
                {category.fieldValue}
                {' '}
                (
                {category.totalCount}
                )
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const Head = ({ location }) => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <Seo
      title={`Categories - ${title}`}
      description={subtitle}
      pathname={location.pathname}
    />
  );
};

Head.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default CategoriesListTemplate;
