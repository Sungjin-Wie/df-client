import React from 'react';

const ShowJSON = ({ json }) => {
  return (
    <>
      <div style={{ clear: 'both' }}></div>
      <pre>{JSON.stringify(json, null, 2)}</pre>
    </>
  );
};

export default ShowJSON;
