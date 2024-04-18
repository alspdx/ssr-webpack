import { SearchResponse } from 'types';

export async function search(q: string) {
  return fetch(`https://mobile-staging.gametime.co/v1/search?q=${q}`)
    .then(res => res.json())
    .then((data: SearchResponse) => data);
}
