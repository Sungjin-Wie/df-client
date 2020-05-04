import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { serverList } from 'lib';
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
  const css = useStyles();
  const history = useHistory();
  const [name, setName] = useState('');
  const [server, setServer] = useState('all');

  const handleEnterKey = (target) => {
    if (target.charCode === 13) {
      history.push(`searchresult/${server}/${name}`);
    }
  };

  const handleName = (newValue) => {
    if (newValue.charAt(newValue.length - 1) === ' ') {
      return;
    } else {
      setName(newValue);
    }
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
          onChange={(e) => setServer(e.target.value)}
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
        value={name}
        onKeyPress={(e) => handleEnterKey(e)}
        onChange={(e) => handleName(e.target.value)}
      />
      <Button
        className={css.search}
        variant='contained'
        color='primary'
        href={`#/searchresult/${server}/${name}`}
      >
        검색하기
      </Button>
    </div>
  );
};

export default Home;
