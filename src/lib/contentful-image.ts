export type ContentfulImageSource =
  | string
  | { url: string }
  | { file: { url: string } }
  | { fields: { file: { url: string } } };

export type ContentfulImageOptionsFormat = 'jpg' | 'png' | 'webp' | 'gif' | 'avif' | 'jpg/progressive' | 'png/png8';
export type ContentfulImageOptionsFit = 'pad' | 'fill' | 'scale' | 'crop' | 'thumb';
export type ContentfulImageOptionsFocusArea =
  | 'center'
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'top_right'
  | 'bottom_right'
  | 'top_left'
  | 'bottom_left'
  | 'face'
  | 'faces';
export type ContentfulImageOptionsHeight = number;
export type ContentfulImageOptionsWidth = number;
export type ContentfulImageOptionsRadius = number | 'max';
export type ContentfulImageOptionsQuality = number;
export type ContentfulImageOptionsBackgroundColor = string;

export type ContentfulImageOptions = {
  format?: ContentfulImageOptionsFormat;
  width?: ContentfulImageOptionsWidth;
  height?: ContentfulImageOptionsHeight;
  fit?: ContentfulImageOptionsFit;
  focusArea?: ContentfulImageOptionsFocusArea;
  radius?: ContentfulImageOptionsRadius;
  quality?: ContentfulImageOptionsQuality;
  backgroundColor?: ContentfulImageOptionsBackgroundColor;
};

export const getContentfulImageSrcUrl = (src: ContentfulImageSource) => {
  // Get provided raw URL string
  let url =
    typeof src === 'string' ? src : 'fields' in src ? src.fields.file.url : 'file' in src ? src.file.url : src.url;

  // Prepend https: if necessary
  if (url.startsWith('//')) url = 'https:' + url;

  // Remove query
  if (url.includes('?')) url = url.split('?')[0];

  return url;
};

const optionQueryKeys: Record<keyof ContentfulImageOptions, string[]> = {
  backgroundColor: ['bg'],
  quality: ['q'],
  radius: ['r'],
  focusArea: ['f'],
  fit: ['fit'],
  height: ['h'],
  width: ['w'],
  format: ['fm', 'fl']
};

const transformers: Partial<Record<keyof ContentfulImageOptions, (value: string) => string>> = {
  backgroundColor: (value) => 'rgb:' + value.replace('#', '')
};

export const getContentfulImageQuery = (options: ContentfulImageOptions) => {
  return Object.entries(options)
    .map(([key, value]) => {
      // Get list of all parameter names for current option
      const queryKeys = optionQueryKeys[key as keyof ContentfulImageOptions];

      // Get transformer for preprocessing before applying to query if exists.
      const transformer = transformers[key as keyof ContentfulImageOptions];

      // Convert value to string, apply transformer if exists and split
      // into list of values at "/".
      const values = (transformer ? transformer(value.toString()) : value.toString()).split('/');

      // By index, match each parameter name and value to a "{name}={value}"
      // pair. If either the name or value for a pair is falsy, omit it.
      return queryKeys
        .map((name, i) => {
          if (!name || !values[i]) return '';
          return name + '=' + values[i];
        })
        .filter((_) => !!_); // Remove all empty values
    })
    .flat() // Flatten array
    .join('&'); // Join all {name}={value} pairs with "&" to a query string.
};

const contentfulImage = (src: ContentfulImageSource, options: ContentfulImageOptions = {}) => {
  // Get URL from src and query from options.
  const url = getContentfulImageSrcUrl(src);
  const query = getContentfulImageQuery(options);

  // Append query if one constructed
  return url + (query ? `?${query}` : '');
};

export default contentfulImage;
