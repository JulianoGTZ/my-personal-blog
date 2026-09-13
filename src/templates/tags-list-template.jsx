import React from 'react';
import PropTypes from 'prop-types';
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

Head.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default TagsListTemplate;
