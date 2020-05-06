import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { key } from 'lib';
import { Context, INFO } from 'lib/reducer';

const Info = () => {
  const { store, dispatch } = useContext(Context);
  const { info } = store;
  const { server, id } = useParams();

  window.onload = (e) => {
    let url = key + `/info?server=${server}&id=${id}`;
    const infoFetch = async (url) => {
      let res = await axios.get(url);
      console.log(res);
      return res;
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
      dispatch({
        type: INFO,
        payload: {
          name: 'isLoaded',
          value: false,
        },
      });
      infoFetch(url)
        .then((res) => {
          dispatch({
            type: INFO,
            payload: {
              name: 'data',
              value: res.data,
            },
          });
        })
        .then(() =>
          dispatch({
            type: INFO,
            payload: {
              name: 'isLoaded',
              value: true,
            },
          })
        );
    }
  };

  return (
    <div style={{ margin: 'auto' }}>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
};

export default Info;
