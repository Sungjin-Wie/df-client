import React from 'react';
import { Button } from '@material-ui/core';
import { CenterWrapper } from 'lib';

const Navigation = () => {
  return (
    <>
      <Button href='#/'>Home</Button>
    </>
  );
};

export default CenterWrapper(Navigation);
