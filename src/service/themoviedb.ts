const API_KEY = 'a90d99d87d52ef1f55e06af62b50fadc';
const BASE_URL = 'https://api.themoviedb.org/';
const VERSION = '3';

export const getPersonOverview = (person: string): string => `${BASE_URL}${VERSION}/search/person?api_key=${API_KEY}&query=${person}`