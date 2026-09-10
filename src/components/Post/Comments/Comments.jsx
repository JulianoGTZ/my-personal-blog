import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionEmbed } from 'disqus-react';
import { useSiteMetadata } from '../../../hooks';

const Comments = ({ postTitle, postSlug }) => {
  const { url, disqusShortname } = useSiteMetadata();

  if (!disqusShortname) {
    return null;
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      data-testid="post-comment"
      config={{
        url: url + postSlug,
        identifier: postTitle,
        title: postTitle,
      }}
    />
  );
};

Comments.propTypes = {
  postTitle: PropTypes.string.isRequired,
  postSlug: PropTypes.string.isRequired,
};

export default Comments;
