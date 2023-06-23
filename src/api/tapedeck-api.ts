import { UseQueryOptions, useQuery } from 'react-query';

type ApiTape = { [id: string]: { [property: string]: string }[] };

export type Tape = {
  id: string;
  page?: string;
  img?: string;
  thumb?: string;
  playingTime?: string;
  type?: string;
  brand?: string;
  color?: string;
} & {
  [extra: string]: string;
};

export const TAPE_MAP: Record<
  keyof Pick<Tape, 'brand' | 'color' | 'playingTime' | 'type'> | string,
  string
> = {
  brand: 'Brand',
  color: 'Color',
  playingTime: 'Play Time',
  type: 'Type',
};

export const TAPE_SORT_OPTIONS = Object.keys(TAPE_MAP).map((mapping) => ({
  value: mapping,
  label: TAPE_MAP[mapping],
}));

export const TAPE_FILTER_CATEGORIES = Object.keys(TAPE_MAP);

export const getTapeAttributeHR = (attribute: string) => TAPE_MAP[attribute];
export const getPlayTimeHR = (playTime: string) =>
  playTime.charAt(0) === '0' ? ' ' + playTime.substring(1) : playTime;
export const sanitize = (potentialLink: string) =>
  potentialLink.startsWith('http:') ? potentialLink.replace('http', 'https') : potentialLink;

const keyOf = (object: object) => Object.keys(object)[0];
const transformData = (data: ApiTape[]): Tape[] =>
  data.map((tape) => {
    const id = keyOf(tape);
    const tapeAttributes = tape[id].reduce((acc, tapeAttribute) => {
      const attributeKey = keyOf(tapeAttribute);
      const attributeValue =
        attributeKey !== 'playingTime'
          ? sanitize(tapeAttribute[attributeKey])
          : getPlayTimeHR(tapeAttribute[attributeKey]);
      return { ...acc, [attributeKey]: attributeValue };
    }, {});
    return {
      id,
      ...tapeAttributes,
    };
  });

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const QUERY_OPTIONS: UseQueryOptions<Tape[]> = {
  retry: 1,
  suspense: true,
  staleTime: 5 * 60 * 1000,
  refetchOnWindowFocus: false,
  useErrorBoundary: true,
};

const fetchWithApiKey = (url: string) =>
  fetch(url, { headers: { 'x-api-key': API_KEY || '' } }).then((response) => response.json());

export const getTapes = (): Promise<ApiTape[]> => fetchWithApiKey(API_URL);

export const useTapes = () =>
  useQuery<Tape[]>(
    'tapes',
    () => getTapes().then((response) => transformData(response)),
    QUERY_OPTIONS
  );
