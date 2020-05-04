import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    backgroundColor: 'white',
    height: 70,
    width: 'inherit',
  },
});
const Navigation = () => {
  const css = useStyles();
  return (
    <div className={css.wrapper}>
      <Button href='#'>Home</Button>
      <Button href='#/auction'>경매장</Button>
    </div>
  );
};

export default Navigation;
