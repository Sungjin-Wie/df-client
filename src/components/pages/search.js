import React, { useState, useEffect, useContext } from 'react';
import { key, Context, ShowJSON } from 'lib';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { CharacterImage } from 'lib/util/key';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
  },
  card: {
    marginTop: 50,
    margin: 20,
    width: 300,
    textAlign: 'center',
    float: 'left',
    display: 'inline-block',
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
  pageNationWrapper: {
    marginTop: 20,
  },
});

const Search = () => {
  const { store, dispatch } = useContext(Context);
  const { server, name } = useParams();
  const { isLoaded, data, page, pageSize } = store.search;
  const css = useStyles();

  const pageNationChange = (event, value) => {
    dispatch({
      type: 'search',
      state: 'page',
      value: value,
    });
  };

  const handleClick = (c) => {
    let path = `#/info/${c.serverId}/${c.characterId}`;
    const infoFetch = async () => {
      dispatch({
        type: 'info',
        state: 'isLoaded',
        value: false,
      });
      let url = key + `/info?server=${c.serverId}&id=${c.characterId}`;
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
    infoFetch();
    window.location.assign(path);
  };

  return (
    <div className={css.wrapper}>
      {!isLoaded ? (
        <div></div>
      ) : isLoaded && data.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        data
          .map((c) => {
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
              </Card>
            );
          })
          .slice((page - 1) * pageSize, page * pageSize)
      )}
      <div className={css.pageNationWrapper}>
        <Grid container justify='center'>
          <Pagination
            count={Math.ceil(data.length / pageSize)}
            page={page}
            onChange={pageNationChange}
            variant='outlined'
            shape='rounded'
            showFirstButton
            showLastButton
          />
        </Grid>
      </div>
    </div>
  );
};

export default Search;
