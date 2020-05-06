import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { CharacterImage } from 'lib/util/key';
import { useParams, useHistory } from 'react-router-dom';
import { key, ShowJSON } from 'lib';
import { Context, SEARCH, HOME, INFO } from 'lib/reducer';

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
  },
  card: {
    marginTop: 50,
    margin: 75,
    width: 240,
    textAlign: 'center',
    float: 'left',
    display: 'inline-block',
    cursor: 'hand',
  },
  image: {
    display: 'inline-block',
    marginLeft: -93,
    marginTop: -90,
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
  characterName: {
    fontSize: 20,
  },
});

const Search = () => {
  const { store, dispatch } = useContext(Context);
  const { server, name } = useParams();
  const { isLoaded, data, page, pageSize } = store.search;
  const css = useStyles();
  const history = useHistory();
  const pageNationChange = (event, value) => {
    dispatch({
      type: SEARCH,
      payload: {
        name: 'page',
        value: value,
      },
    });
  };

  window.onload = (e) => {
    const fetch = async () => {
      dispatch({
        type: SEARCH,
        payload: {
          name: 'isLoaded',
          value: false,
        },
      });
      dispatch({
        type: HOME,
        payload: {
          name: 'name',
          value: name,
        },
      });
      console.log('fetch started');
      let url = key + `/search?server=${server}&name=${name}`;
      let res = await axios.get(url);
      console.log(res);
      if (res.data.rows) {
        dispatch({
          type: SEARCH,
          payload: {
            name: 'data',
            value: res.data.rows,
          },
        });
      } else {
        dispatch({
          type: SEARCH,
          payload: {
            name: 'data',
            value: [],
          },
        });
      }
      dispatch({
        type: SEARCH,
        payload: {
          name: 'isLoaded',
          value: true,
        },
      });
    };
    fetch();
  };

  const handleClick = (c) => {
    let path = `/info/${c.serverId}/${c.characterId}`;
    const infoFetch = async () => {
      dispatch({
        type: INFO,
        payload: {
          name: 'isLoaded',
          value: false,
        },
      });
      let url = key + `/info?server=${c.serverId}&id=${c.characterId}`;
      let res = await axios.get(url);
      console.log(res);
      dispatch({
        type: INFO,
        payload: {
          name: 'data',
          value: res.data,
        },
      });
      dispatch({
        type: INFO,
        payload: {
          name: 'isLoaded',
          value: true,
        },
      });
    };
    infoFetch();
    history.push(path);
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
                <CardContent className={css.characterName}>
                  {c.characterName}
                </CardContent>
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
