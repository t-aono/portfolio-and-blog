import _ from 'lodash';
import withPrefix from './withPrefix';

type PostType = {
  post: '__metadata.urlPath';
};

export default function getPageUrl(post: PostType, { withPrefix: addPrefix = false } = {}): string {
  const urlPath: string = _.get(post, '__metadata.urlPath');
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
