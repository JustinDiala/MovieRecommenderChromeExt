export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface RelatedPlaylists {
  likes: string;
  favorites: string;
  uploads: string;
  watchHistory: string;
  watchLater: string;
}

export interface ContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  contentDetails: ContentDetails;
}

export interface Result {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: Item[];
}

export interface Headers {
  date: string;
  "content-encoding": string;
  server: string;
  etag: string;
  "content-type": string;
  vary: string;
  "cache-control": string;
  "content-length": string;
  expires: string;
}

export interface RootObject {
  result: Result;
  body: string;
  headers: Headers;
  status: number;
  statusText?: any;
}

export interface IFetchedMyPlaylistTypings {
  body: string;
  headers: Headers;
  result: Result;
  status: Number;
  statusText: string;
}
