import _ from 'lodash';
import withPrefix from './withPrefix';

type PostType = {
  title: string;
  seo?: {
    title: string;
    description: string;
    robots: string[];
    extra: string[];
  };
  post?: '__metadata.urlPath';
};

export default function getPageUrl(post: PostType, { withPrefix: addPrefix = false } = {}): string {
  const urlPath: string = _.get(post, '__metadata.urlPath');
  return addPrefix ? withPrefix(urlPath) : urlPath;
}
