import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-ui/core';
import { key, Loading } from 'lib';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {},
  container: {
    display: 'flex',
    margin: 10,
  },
  formControl: {
    width: 80,
  },
  selectEmpty: {},
  searchbutton: {
    marginLeft: 10,
  },
});

const Auction = () => {
  const css = useStyles();
  const [value, setValue] = useState('');
  const [enter, toggle] = useState(false);
  const [data, setData] = useState([]);
  const [isEmpty, toggleEmpty] = useState(true);
  const [isLoading, toggleLoading] = useState(false);
  const handleEnterKey = (target) => {
    if (target.charCode === 13) {
      toggle(true);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      toggleLoading(true);
      let url = key + `/auction?name=${value}`;
      let res = await axios.get(url);
      setData(res.data.rows);
      if (res.data.rows.length !== 0) {
        toggleEmpty(false);
      } else {
        toggleEmpty(true);
      }
      toggle(false);
      toggleLoading(false);
      return 0;
    };

    if (enter === true) {
      fetch();
    }
  }, [enter]);

  return (
    <div className={css.wrapper}>
      <Input
        value={value}
        onKeyPress={(e) => handleEnterKey(e)}
        onChange={(e) => setValue(e.target.value)}
      ></Input>
      <Button
        variant='contained'
        color='primary'
        onClick={(e) => toggle(!enter)}
        className={css.searchbutton}
      >
        검색하기
      </Button>
      {isLoading ? (
        <Loading />
      ) : isEmpty ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default Auction;
