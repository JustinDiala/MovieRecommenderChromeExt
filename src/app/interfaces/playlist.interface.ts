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

//////////////

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface Medium {
  url: string;
  width: number;
  height: number;
}

export interface High {
  url: string;
  width: number;
  height: number;
}

export interface Standard {
  url: string;
  width: number;
  height: number;
}

export interface Maxres {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Default;
  medium: Medium;
  high: High;
  standard: Standard;
  maxres: Maxres;
}

export interface ResourceId {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceId;
}

export interface ContentDetails {
  videoId: string;
  videoPublishedAt: Date;
}

export interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
}

export interface RootObject {
  kind: string;
  etag: string;
  nextPageToken: string;
  pageInfo: PageInfo;
  items: Item[];
}

