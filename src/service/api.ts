export const API_KEY = 'a90d99d87d52ef1f55e06af62b50fadc';
export const IMAGES_URL = 'https://image.tmdb.org/t/p/w500';
export const BASE_URL = 'https://api.themoviedb.org/';
export const VERSION = '3';


export const searchPerson = (query: string, page = 1): string => `${BASE_URL}${VERSION}/search/person?api_key=${API_KEY}&query=${query}&page=${page}`

export const searchPersonDetail = (id: string): string => `${BASE_URL}${VERSION}/person/${id}/combined_credits?api_key=${API_KEY}`
