import axios from 'axios';
import { IResponse, IResult } from '@/interfaces';
import { getArrayFromNumber } from '@/helpers';

const { REACT_APP_API } = process.env;

export const getCharacters = async () => {
  const chars: IResult[] = [];
  const responseFirst = await axios.get(REACT_APP_API!);
  const charsList: IResponse = responseFirst.data;
  chars.push(...charsList.results);
  const arr = getArrayFromNumber(charsList.info.pages).slice(1);
  await axios.all(arr.map((item) => axios.get(`${REACT_APP_API}?page=${item}`))).then(
    axios.spread((...responses) => responses.forEach((response) => {
      const { results } = response.data as IResponse;
      chars.push(...results);
    })),
  );

  return chars.map((item) => ({
    ...item,
    liked: null,
  }));
};
