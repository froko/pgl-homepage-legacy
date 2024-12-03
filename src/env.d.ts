/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="../.astro/types.d.ts" />
/// <reference types="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly CONTENTFUL_SPACE_ID: string
  readonly CONTENTFUL_ACCESS_TOKEN: string
  readonly PUBLIC_AUTH0_DOMAIN: string
  readonly PUBLIC_AUTH0_CLIENTID: string
  readonly PUBLIC_AUTH0_CALLBACK: string
}
