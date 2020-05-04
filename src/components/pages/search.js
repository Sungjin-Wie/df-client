import React, { useState, useEffect } from 'react';
import { key, Loading } from 'lib';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardMedia, Link } from '@material-ui/core';
import { CharacterImage } from 'lib/util/key';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles({
  wrapper: {},
  card: {
    marginTop: 50,
    width: 300,
    textAlign: 'center',
  },
  image: {
    display: 'inline-block',
    marginLeft: -63,
    marginTop: -70,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Search = () => {
  const css = useStyles();
  const { server, name } = useParams();
  const [isLoaded, toggleLoaded] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      let url = key + `/search?server=${server}&name=${name}`;
      let res = await axios.get(url);
      console.log(res.data.rows);
      setData(res.data.rows);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      toggleLoaded(true);
    }
  }, [data]);

  const handleClick = (c) => {
    let path = `#/info/${c.serverId}/${c.characterId}`;
    window.location.assign(path);
  };

  return (
    <div className={css.wrapper}>
      {!isLoaded ? (
        <div></div>
      ) : isLoaded && data.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        data.map((c) => {
          return (
            <Card
              onClick={() => handleClick(c)}
              className={css.card}
              variant='outlined'
              key={c.characterId}
            >
              <CardContent className={css.image}>
                {CharacterImage(c.serverId, c.characterId)}
              </CardContent>
              <CardContent>{c.characterName}</CardContent>
              <CardContent>{c.jobGrowName}</CardContent>
              <CardContent>
                {c.serverId} {c.characterId}
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default Search;
