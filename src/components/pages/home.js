import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { serverList, useDebounce, searchUrl } from 'lib';
import {
  Context,
  HOME,
  SEARCH_FETCH_START,
  SEARCH_FETCH_SUCCESS,
  SEARCH_FETCH_FAILED,
} from 'lib/reducer';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: 10,
  },
  formControl: {
    width: 80,
  },
  selectEmpty: {},
  search: {
    margin: 10,
  },
}));

const Home = () => {
  const { store, dispatch } = useContext(Context);
  const { server, name } = store.home;
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
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 200);
  useEffect(() => {
    dispatch({
      type: HOME,
      payload: {
        name: 'name',
        value: debouncedValue,
      },
    });
  }, [debouncedValue]);

  const handleEnterKey = (target) => {
    if (target.charCode === 13) {
      searchFetch(server, value);
      history.push(`searchresult/${server}/${value}`);
    }
  };

  const handleName = (newValue) => {
    if (newValue.charAt(newValue.length - 1) === ' ') {
      return;
    } else {
      setValue(newValue);
    }
  };

  const handleClick = (e) => {
    searchFetch(server, value);
    history.push(`searchresult/${server}/${value}`);
  };

  return (
    <div className={css.container}>
      <FormControl className={css.formControl}>
        <InputLabel shrink id='demo-simple-select-placeholder-label-label'>
          서버
        </InputLabel>
        <Select
          labelId='demo-simple-select-placeholder-label-label'
          id='demo-simple-select-placeholder-label'
          value={server}
          onChange={(e) => {
            dispatch({
              type: HOME,
              payload: {
                name: 'server',
                value: e.target.value,
              },
            });
          }}
          displayEmpty
          className={css.selectEmpty}
        >
          {serverList.map((server) => {
            const { eng, kor } = server;
            return (
              <MenuItem value={eng} key={eng}>
                {kor}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Input
        className={css.search}
        value={value}
        onKeyPress={(e) => handleEnterKey(e)}
        onChange={(e) => handleName(e.target.value)}
      />
      <Button
        className={css.search}
        variant='contained'
        color='primary'
        href={`#/searchresult/${server}/${value}`}
        onClick={(e) => handleClick(e)}
      >
        검색하기
      </Button>
    </div>
  );
};

export default Home;
