import { Nullable } from "../../type";

export const getQueryString = ({
  baseURL,
  pageSize,
  nextPageToken,
  filter,
  queryParams,
  orderBy,
}: {
  baseURL: string;
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  filter?: Nullable<string>;
  orderBy?: Nullable<string>;

  // Just pure query params, the function will handle tialing '&'
  queryParams?: string;
}) => {
  let url = baseURL;

  if (pageSize || nextPageToken || filter || orderBy || queryParams) {
    // Check if the baseURL already has a query string
    if (baseURL.includes("?")) {
      url += "&";
    } else {
      url += "?";
    }
  }

  if (pageSize) {
    url += `pageSize=${pageSize}&`;
  }

  if (nextPageToken) {
    url += `pageToken=${nextPageToken}&`;
  }

  if (filter) {
    url += `filter=${filter}&`;
  }

  if (orderBy) {
    url += `orderBy=${orderBy}&`;
  }

  if (queryParams) {
    url += `${queryParams}&`;
  }

  if (url.endsWith("&")) {
    url = url.slice(0, -1);
  }

  return url;
};
