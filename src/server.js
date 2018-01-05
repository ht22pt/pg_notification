/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */
/* eslint-disable no-console, no-shadow */

import https from 'https';
import http from 'http';
import fs from 'fs';

import db from './db';
import app from './app';

const port = process.env.PORT || 3000;
const host = process.env.HOSTNAME || '0.0.0.0';
const keysPath = process.env.KEYS_PATH || '';
let useHttps = (keysPath !== '' && process.env.HTTPS !== 'false');

let key;
let cert;

if (useHttps) {
  try {
    key = fs.readFileSync(keysPath + '/ssl-key.pem');
    cert = fs.readFileSync(keysPath + '/ssl-cert.pem');
  } catch(err) {
    useHttps = false;
  }
}

// Launch Node.js server
let server = null;
if (useHttps) {
  let https_options = {
    key: key,
    cert: cert
  };
  server = https.createServer(https_options, app).listen(port, host);
  console.log(`Node.js API server HTTPS is listening on https://${host}:${port}/`);
} else {
  server = app.listen(port, host, () => {
    console.log(`Node.js API server HTTP is listening on http://${host}:${port}/`);
  });
}


// Shutdown Node.js app gracefully
function handleExit(options, err) {
  if (options.cleanup) {
    const actions = [server.close, db.destroy, redis.quit];
    actions.forEach((close, i) => {
      try {
        close(() => { if (i === actions.length - 1) process.exit(); });
      } catch (err) { if (i === actions.length - 1) process.exit(); }
    });
  }
  if (err) console.log(err.stack);
  if (options.exit) process.exit();
}

process.on('exit', handleExit.bind(null, { cleanup: true }));
process.on('SIGINT', handleExit.bind(null, { exit: true }));
process.on('SIGTERM', handleExit.bind(null, { exit: true }));
process.on('uncaughtException', handleExit.bind(null, { exit: true }));
