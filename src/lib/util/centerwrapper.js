import React from 'react';

const CenterWrapper = (BaseComponent) => () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BaseComponent />
      </div>
    </>
  );
};

export default CenterWrapper;
