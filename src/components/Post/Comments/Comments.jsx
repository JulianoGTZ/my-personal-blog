import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import { useSiteMetadata } from '../../../hooks';

const Comments = ({ postTitle, postSlug }) => {
  const { url, disqusShortname } = useSiteMetadata();

  if (!disqusShortname) {
    return null;
  }

  return (
    <ReactDisqusComments
      shortname={disqusShortname}
      data-testid="post-comment"
      identifier={postTitle}
      title={postTitle}
      url={url + postSlug}
    />
  );
};

Comments.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
};

export default Comments;
