import contentful from 'contentful';
import type { Asset, EntryFields } from 'contentful';

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

const contentfulClient = contentful.createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
  host: 'cdn.contentful.com'
});

export async function fetchFromContentful<T>(contentTypeId: CONTENT_TYPE): Promise<T[]> {
  const topic = await contentfulClient.getEntries({ content_type: contentTypeId });
  return topic.items.map((i) => i.fields) as unknown as T[];
}

export type NewsItem = {
  titel: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  mediaSlug?: EntryFields.Symbol;
  datum: EntryFields.Date;
  autor?: EntryFields.Symbol;
  text: any;
  vorschaubild: Asset;
  bilder?: Asset[];
};

export type MediaItem = {
  titel: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  jahr: EntryFields.Integer;
  archiv: EntryFields.Boolean;
  vorschaubild: Asset;
  youtubeLinks?: EntryFields.Symbol[];
  bilder: Asset[];
};

export type AudioArchivItem = {
  titel: EntryFields.Symbol;
  coverFront: Asset;
  coverBack?: Asset;
  audioFiles: Asset[];
};

export type Mitglied = {
  name: EntryFields.Symbol;
  instrument: 'Bass' | 'Cinelle' | 'Drums' | 'Klarinette' | 'Lyra' | 'Pauke' | 'Posaune' | 'Tambourmajor' | 'Trompete';
  eintrittsjahr?: EntryFields.Integer;
  funktion?: EntryFields.Symbol;
  portrait: Asset;
};

export type InternAufnahme = {
  titel: EntryFields.Symbol;
  audiofile: Asset;
};

export type InternCalendarItem = {
  anlass: EntryFields.Symbol;
  datum: EntryFields.Date;
  ort: EntryFields.Symbol;
};

export type InternDokument = {
  titel: EntryFields.Symbol;
  dokument: Asset;
};

export type InternNewsletterItem = {
  titel: EntryFields.Symbol;
  dokument: Asset;
};

export type InternNotenItem = {
  titel: EntryFields.Symbol;
  register: 'Alle' | 'Bass' | 'Klarinette' | 'Lyra' | 'Posaune1' | 'Posaune2' | 'Trompete1' | 'Trompete2';
  dokument: Asset;
};
