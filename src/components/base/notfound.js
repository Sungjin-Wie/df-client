import React, { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '#';
    }, 4000);
  }, []);

  return (
    <>
      <h1>404 Not Found</h1>
      <p>{window.location.href}</p>
    </>
  );
};

export default NotFound;
