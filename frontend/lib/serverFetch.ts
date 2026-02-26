import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ServerFetchOptions<T = unknown> {
  method?: HttpMethod;
  body?: T;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

export async function serverFetch<ResponseType = unknown, BodyType = unknown>(
  url: string,
  options: ServerFetchOptions<BodyType> = {},
): Promise<ResponseType> {
  const { method = "GET", body, headers, cache = "no-store", next } = options;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(url, {
    method,
    cache,
    next,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`,
    );
  }

  return response.json() as Promise<ResponseType>;
}
