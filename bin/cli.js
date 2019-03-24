#!/usr/bin/env node

'use strict';

const api = require('../lib/api');
const bs = require('browser-sync').create();
const console = require('console');
const getPort = require('get-port');
const program = require('commander');

function build(options) {
  return api.load(process.cwd(), options)
  .then(book => {
    return api.write(book, 'build');
  })
  .catch(error => {
    console.error(error.message);
  });
}

program.command('build').action(() => {
  build();
});

program.command('watch').action(() => {
  const portOptions = {
    port: 3000
  };

  getPort(portOptions)
  .then(port => {
    const buildOptions = {
      baseURL: `http://localhost:${port}`
    };

    build(buildOptions)
    .then(() => {
      const watchOptions = {
        ignored: 'build',
        ignoreInitial: true
      };

      bs.watch('.', watchOptions)
      .on('all', () => {
        build(buildOptions)
        .then(() => {
          bs.reload('*.html');
        });
      });

      bs.init({
        server: 'build',
        port,
        ui: false,
        notify: false,
        logLevel: 'silent'
      });
    });
  });
});

program.parse(process.argv);
