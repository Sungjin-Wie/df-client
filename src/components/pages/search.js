import React, { useState, useEffect, useContext } from 'react';
import { key, Context } from 'lib';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import { CharacterImage } from 'lib/util/key';

const useStyles = makeStyles({
  wrapper: {},
  card: {
    marginTop: 50,
    width: 300,
    textAlign: 'center',
  },
  image: {
    display: 'inline-block',
    marginLeft: -63,
    marginTop: -70,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Search = () => {
  const { store, dispatch } = useContext(Context);
  const { server, value } = store.home;
  const { isLoaded, data } = store.search;
  const css = useStyles();
  useEffect(() => {
    const fetch = async () => {
      let url = key + `/search?server=${server}&name=${value}`;
      let res = await axios.get(url);
      console.log(res.data.rows);
      dispatch({
        type: 'search',
        state: 'data',
        value: res.data.rows,
      });
      dispatch({
        type: 'search',
        state: 'isLoaded',
        value: true,
      });
    };
    fetch();
  }, []);

  useEffect(() => {
    // if (store.home.data.length !== 0) {
    //   toggleLoaded(true);
    // }
  }, [store]);

  const handleClick = (c) => {
    let path = `#/info/${c.serverId}/${c.characterId}`;
    window.location.assign(path);
  };

  return (
    <div className={css.wrapper}>
      {!isLoaded ? (
        <div></div>
      ) : isLoaded && data.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        data.map((c) => {
          return (
            <Card
              onClick={() => handleClick(c)}
              className={css.card}
              variant='outlined'
              key={c.characterId}
            >
              <CardContent className={css.image}>
                {CharacterImage(c.serverId, c.characterId)}
              </CardContent>
              <CardContent>{c.characterName}</CardContent>
              <CardContent>{c.jobGrowName}</CardContent>
              <CardContent>
                {c.serverId} {c.characterId}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default Search;
