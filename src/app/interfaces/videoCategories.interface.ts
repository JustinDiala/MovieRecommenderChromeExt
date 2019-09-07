export namespace YoutubeCategories {
  export interface Snippet {
    channelId: string;
    title: string;
    assignable: boolean;
  }

  export interface Item {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
  }

  export interface Result {
    kind: string;
    etag: string;
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

  export interface CategoryFetched {
    result: Result;
    body: string;
    headers: Headers;
    status: number;
    statusText?: any;
  }

  export interface ICategory {
    categoryID: string;
    categoryTitle: string;
  }
}
