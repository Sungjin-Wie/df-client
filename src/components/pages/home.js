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
import { serverList, CenterWrapper } from 'lib';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Home = (props) => {
  const css = useStyles();
  const [name, setName] = useState('');
  const [server, setServer] = useState('all');

  const handleEnterKey = (target) => {
    const { history } = props;
    if (target.charCode === 13) {
      history.push(`searchresult/${server}/${name}`);
    }
  };

  return (
    <>
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
            return <MenuItem value={server.eng}>{server.kor}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Input
        value={name}
        onKeyPress={(e) => handleEnterKey(e)}
        onChange={(e) => setName(e.target.value)}
      ></Input>
      <Button
        variant='contained'
        color='primary'
        href={`#/searchresult/${server}/${name}`}
        prefetch
      >
        검색하기
      </Button>
    </>
  );
};

export default withRouter(CenterWrapper(Home));
