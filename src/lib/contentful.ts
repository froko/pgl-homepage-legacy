import pkg, { ContentfulClientApi } from 'contentful';
const { createClient } = pkg;

export type CONTENT_TYPE =
  | 'audioArchiv'
  | 'internAllgemein'
  | 'internAufnahmen'
  | 'internEinladungen'
  | 'internKalender'
  | 'internNewsletter'
  | 'internNoten'
  | 'media'
  | 'mitglieder'
  | 'news';

export default class ContentService {
  static get instance() {
    return new ContentService(
      createClient({
        space: import.meta.env.CONTENTFUL_SPACE_ID,
        accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
        host: 'cdn.contentful.com'
      })
    );
  }

  private constructor(private readonly client: ContentfulClientApi) {}

  async getEntriesByType<T>(type: CONTENT_TYPE) {
    return (
      await this.client.getEntries<T>({
        content_type: type
      })
    ).items;
  }
}
