const _ = require('lodash');
const pathPrefix: string = require('../../content/data/config.json').path_prefix;

export default function withPrefix(url: string) {
  if (!url) {
    return url;
  }

  if (_.startsWith(url, '#') || _.startsWith(url, 'http://') || _.startsWith(url, 'https://')) {
    return url;
  }
  const basePath = _.trim(pathPrefix, '/');
  return '/' + _.compact([basePath, _.trimStart(url, '/')]).join('/');
}
