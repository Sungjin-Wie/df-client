import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const CenterWrapper = (BaseComponent) => (props) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BaseComponent {...props} />
      </div>
      <div style={{ clear: 'both' }}></div>
    </>
  );
};

export default CenterWrapper;
