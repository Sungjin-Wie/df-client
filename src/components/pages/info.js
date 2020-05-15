import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { key, infoUrl } from 'lib';
import {
  Context,
  INFO_FETCH_SUCCESS,
  INFO_FETCH_START,
  INFO_FETCH_FAILED,
} from 'lib/reducer';

const Info = () => {
  const { store, dispatch } = useContext(Context);
  const { info } = store;
  const { server, id } = useParams();
  const infoFetch = async (server, id) => {
    await dispatch({
      type: INFO_FETCH_START,
    });
    let res = await axios.get(infoUrl(server, id));
    try {
      await dispatch({
        type: INFO_FETCH_SUCCESS,
        payload: {
          name: 'data',
          value: res.data,
        },
      });
    } catch {
      dispatch({
        type: INFO_FETCH_FAILED,
        payload: {
          name: 'data',
          value: [],
        },
      });
    }
  };
  window.onload = (e) => {
    let url = key + `/info?server=${server}&id=${id}`;
    infoFetch(server, id);
  };

  return (
    <div style={{ margin: 'auto' }}>
      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
};

export default Info;
