import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import { useSiteMetadata, useTagsList } from '../hooks';

const TagsListTemplate = () => {
  const tags = useTagsList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Tags">
        <ul>
          {tags.map((tag, index) => (
            <li key={tag.fieldValue}>
              <Link to={`/tag/${kebabCase(tag.fieldValue)}/`} data-testid={`list-template-link-${index}`}>
                {tag.fieldValue}
                {' '}
                (
                {tag.totalCount}
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
      title={`Tags - ${title}`}
      description={subtitle}
      pathname={location.pathname}
    />
  );
};


/* eslint-enable react/prop-types */

export default TagsListTemplate;
