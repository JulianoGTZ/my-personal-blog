import siteMetadata from '../../__fixtures__/site-metadata';

const useSiteMetadata = jest.fn().mockImplementation(() => ({
  ...siteMetadata,
}));

export default useSiteMetadata;
