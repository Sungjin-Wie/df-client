import React from 'react';
import { fetcher, key, CenterWrapper } from 'lib';
import useSWR from 'swr';

const Search = ({ match }) => {
  const { server, name } = match.params;
  let url = key + `/search?server=${server}&name=${name}`;
  const { data, error } = useSWR(url, fetcher);
  if (error) {
    console.log(error);
  }
  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default CenterWrapper(Search);
