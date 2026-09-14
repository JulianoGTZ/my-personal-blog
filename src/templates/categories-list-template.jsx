import React from 'react';
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

// Head takes its props from Gatsby, not from a caller, and it cannot carry
// propTypes: Gatsby strips this export out of the browser bundle, which would
// leave a `Head.propTypes = {}` statement next to it referencing nothing -
// "Head is not defined" at runtime in develop.
/* eslint-disable react/prop-types */
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


/* eslint-enable react/prop-types */

export default CategoriesListTemplate;
