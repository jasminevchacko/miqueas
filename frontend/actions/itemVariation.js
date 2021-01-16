import fetch from 'isomorphic-unfetch';
import config from '../../config';
import apiRoute from './util';

export const addItemVariation = async (itemVariation, res) => fetch(
  apiRoute(res, config.apis.addItemVariation), {
      method: 'post',
      mode: 'same-origin',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemVariation,
      }),
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

export const updateItemVariation = async (itemVariation, res) => fetch(
  apiRoute(res, config.apis.updateItemVariation), {
      method: 'post',
      mode: 'same-origin',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemVariation,
      }),
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

export const getItemVariation = async (name, res) => fetch(
  apiRoute(res, config.apis.getItemVariation) + `?url=${name}`, {
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