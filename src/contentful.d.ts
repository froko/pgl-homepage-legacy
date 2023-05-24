import type { Asset, Entry, EntryFields } from 'contentful';

export interface TypeAudioArchivFields {
  titel: EntryFields.Symbol;
  coverFront: Asset;
  coverBack?: Asset;
  audioFiles: Asset[];
}

export type TypeAudioArchiv = Entry<TypeAudioArchivFields>;

export interface TypeInternAllgemeinFields {
  titel: EntryFields.Symbol;
  dokument: Asset;
}

export type TypeInternAllgemein = Entry<TypeInternAllgemeinFields>;

export interface TypeInternAufnahmenFields {
  titel: EntryFields.Symbol;
  audiofile: Asset;
}

export type TypeInternAufnahmen = Entry<TypeInternAufnahmenFields>;

export interface TypeInternEinladungenFields {
  titel: EntryFields.Symbol;
  datum: EntryFields.Date;
  dokument?: Asset;
}

export type TypeInternEinladungen = Entry<TypeInternEinladungenFields>;

export interface TypeInternKalenderFields {
  anlass: EntryFields.Symbol;
  datum: EntryFields.Date;
  ort: EntryFields.Symbol;
}

export type TypeInternKalender = Entry<TypeInternKalenderFields>;

export interface TypeInternNewsletterFields {
  titel: EntryFields.Symbol;
  dokument: Asset;
}

export type TypeInternNewsletter = Entry<TypeInternNewsletterFields>;

export interface TypeInternNotenFields {
  titel: EntryFields.Symbol;
  register: 'Bass' | 'Klarinette' | 'Lyra' | 'Posaune1' | 'Posaune2' | 'Trompete1' | 'Trompete2';
  dokument: Asset;
}

export type TypeInternNoten = Entry<TypeInternNotenFields>;

export interface TypeMediaFields {
  titel: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  jahr: EntryFields.Integer;
  archiv: EntryFields.Boolean;
  vorschaubild: Asset;
  youtubeLinks?: EntryFields.Symbol[];
  bilder: Asset[];
}

export type TypeMedia = Entry<TypeMediaFields>;

export interface TypeMitgliederFields {
  name: EntryFields.Symbol;
  instrument: 'Bass' | 'Cinelle' | 'Drums' | 'Klarinette' | 'Lyra' | 'Pauke' | 'Posaune' | 'Tambourmajor' | 'Trompete';
  eintrittsjahr?: EntryFields.Integer;
  funktion?: EntryFields.Symbol;
  portrait: Asset;
}

export type TypeMitglieder = Entry<TypeMitgliederFields>;

export interface TypeNewsFields {
  titel: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  mediaSlug?: EntryFields.Symbol;
  datum: EntryFields.Date;
  autor?: EntryFields.Symbol;
  text: EntryFields.Document;
  vorschaubild: Asset;
  bilder?: Asset[];
}

export type TypeNews = Entry<TypeNewsFields>;
