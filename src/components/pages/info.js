import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { key } from 'lib';

const Info = () => {
  const { server, id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    console.log(server, id);
    const fetch = async () => {
      let url = key + `/info?server=${server}&id=${id}`;
      let res = await axios.get(url);
      console.log(JSON.parse(res.data.status));
      setData(JSON.parse(res.data.status));
    };
    fetch();
  }, []);

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Info;
