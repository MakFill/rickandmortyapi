interface Info {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

interface Planet {
  name: string;
  url: string;
}

export interface IResultWithLike {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Planet;
  location: Planet;
  image: string;
  episode: string[];
  url: string;
  created: string;
  liked: boolean | null;
}

export type IResult = Omit<IResultWithLike, 'liked'>;

export interface IResponse {
  info: Info;
  results: IResult[];
}

export interface IInfinite {
  items: IResultWithLike[];
  hasMore: boolean;
}
