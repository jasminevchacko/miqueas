import fetch from 'isomorphic-unfetch';
import config from '../../config';
import apiRoute from './util';

export const searchQuery = async (searchText, res) => fetch(
  apiRoute(res, config.apis.searchQuery) + `?text=${searchText}`, {
      method: 'get',
      mode: 'same-origin',
      credentials: 'include',
    },
  )
    .then((response) => response.json())
    .then((json) => {
      if (json == null) {
        throw new Error('Could not connect to API!');
      } else if (!json.success) {
        throw new Error(json.message);
      }
  
      return json.payload;
    });