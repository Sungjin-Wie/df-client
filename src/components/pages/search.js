import React, { useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { CharacterImage, searchUrl, infoUrl } from 'lib';
import { useParams, useHistory } from 'react-router-dom';
import {
  Context,
  SEARCH,
  SEARCH_FETCH_START,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILED,
  INFO_FETCH_START,
  INFO_FETCH_SUCCESS,
  INFO_FETCH_FAILED,
} from 'lib/reducer';

const useStyles = makeStyles({
  wrapper: {
    // textAlign: 'center',
    // margin: 'auto',
  },
  card: {
    marginTop: 60,
    marginLeft: 80,
    marginRight: 30,
    marginBottom: 10,
    width: 280,
    textAlign: 'center',
    float: 'left',
    display: 'inline-block',
    cursor: 'pointer',
  },
  image: {
    display: 'inline-block',
    marginLeft: -73,
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
    margin: 20,
  },
  characterName: {
    fontSize: 20,
  },
});

const Search = () => {
  const { store, dispatch } = useContext(Context);
  const { search } = store;
  const { data, page, pageSize } = search;
  const { server, name } = useParams();
  const css = useStyles();
  const history = useHistory();
  const searchFetch = async (server, name) => {
    dispatch({
      type: SEARCH_FETCH_START,
    });
    let res = await axios.get(searchUrl(server, name));
    try {
      dispatch({
        type: SEARCH_FETCH_SUCCESS,
        payload: {
          name: 'data',
          value: res.data.rows,
        },
      });
    } catch {
      dispatch({
        type: SEARCH_FETCH_FAILED,
        payload: {
          name: 'data',
          value: [],
        },
      });
    }
  };
  const infoFetch = async (server, id) => {
    dispatch({
      type: INFO_FETCH_START,
    });
    let res = await axios.get(infoUrl(server, id));
    try {
      dispatch({
        type: INFO_FETCH_SUCCESS,
        payload: {
          name: 'data',
          value: res.data.rows,
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
    searchFetch(server, name);
  };

  const handleClick = (c) => {
    let path = `/info/${c.serverId}/${c.characterId}`;
    infoFetch(c.serverId, c.characterId);
    history.push(path);
  };

  return (
    <div className={css.wrapper}>
      {data.length === 0 ? (
        <div>{JSON.stringify(search, null, 2)}</div>
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
            size='large'
          />
        </Grid>
      </div>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default Search;
