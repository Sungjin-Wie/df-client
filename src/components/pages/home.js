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
import { serverList, Context, useDebounce } from 'lib';
import { useHistory } from 'react-router-dom';

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
  const [value, setValue] = useState('');
  const { server } = store.home;
  const css = useStyles();
  const history = useHistory();
  const debouncedValue = useDebounce(value, 200);

  const handleEnterKey = (target) => {
    if (target.charCode === 13) {
      history.push(`searchresult/`);
    }
  };

  const handleName = (newValue) => {
    if (newValue.charAt(newValue.length - 1) === ' ') {
      return;
    } else {
      setValue(newValue);
    }
  };

  useEffect(() => {
    dispatch({
      type: 'home',
      state: 'value',
      value: value,
    });
  }, [debouncedValue]);

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
      >
        검색하기
      </Button>
      <pre>{JSON.stringify(store, null, 2)}</pre>
    </div>
  );
};

export default Home;
