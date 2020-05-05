import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { key, Context } from 'lib';

const Info = () => {
  const { store, dispatch } = useContext(Context);
  const { info } = store;
  const { server, id } = useParams();

  useEffect(() => {
    const infoFetch = async () => {
      dispatch({
        type: 'info',
        state: 'isLoaded',
        value: false,
      });
      let url = key + `/info?server=${server}&id=${id}`;
      let res = await axios.get(url);
      console.log(res);
      dispatch({
        type: 'info',
        state: 'data',
        value: res.data,
      });
      dispatch({
        type: 'info',
        state: 'isLoaded',
        value: true,
      });
    };
    if (!info.isLoaded) {
      infoFetch();
    }
  }, [info]);

  return (
    <div style={{ margin: 'auto' }}>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default Info;
