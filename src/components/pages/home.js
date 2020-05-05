import React, { useState, useContext, useEffect } from 'react';
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { serverList, Context, useDebounce, key } from 'lib';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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

  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 200);
  useEffect(() => {
    dispatch({
      type: 'home',
      state: 'name',
      value: debouncedValue,
    });
  }, [debouncedValue]);

  const handleEnterKey = (target) => {
    if (target.charCode === 13) {
      const fetch = async () => {
        dispatch({
          type: 'search',
          state: 'isLoaded',
          value: false,
        });
        dispatch({
          type: 'home',
          state: 'name',
          value: value,
        });
        console.log('fetch started');
        let url = key + `/search?server=${server}&name=${value}`;
        let res = await axios.get(url);
        console.log(res);
        if (res.data.rows) {
          dispatch({
            type: 'search',
            state: 'data',
            value: res.data.rows,
          });
        } else {
          dispatch({
            type: 'search',
            state: 'data',
            value: [],
          });
        }
        dispatch({
          type: 'search',
          state: 'isLoaded',
          value: true,
        });
      };
      fetch();
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
    const fetch = async () => {
      dispatch({
        type: 'search',
        state: 'isLoaded',
        value: false,
      });
      console.log('fetch started');
      let url = key + `/search?server=${server}&name=${name}`;
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
              type: 'home',
              state: 'server',
              value: e.target.value,
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
