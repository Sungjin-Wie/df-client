import axios from 'axios';

const fetcher = (url) =>
  axios
    .get(url)
    .then((r) => r.data)
    .then((data) => data.rows);

export default fetcher;
