import fetch from 'isomorphic-unfetch';
import config from '../../config';
import apiRoute from './util';

export const getTransactions = async (res) => fetch(
  apiRoute(res, config.apis.getTransactions), {
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

export const getTransaction = async (id) => fetch(
  apiRoute(res, config.apis.getTransaction), {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id
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

export const getTransactionItem = async (id, res) => fetch(
  apiRoute(res, config.apis.getTransactionItem), {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id
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

export const deleteTransaction = async (id, res) => fetch(
  apiRoute(res, config.apis.deleteTransaction), {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id
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

export const deleteTransactionItem = async (itemId, transactionId, res) => fetch(
  apiRoute(res, config.apis.deleteTransactionItem), {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      transactionId,
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

export const updateTransactionItem = async (itemId, newTransaction, res) => fetch(
  apiRoute(res, config.apis.updateTransactionItem), {
    method: 'post',
    mode: 'same-origin',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemId,
      newTransaction,
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
