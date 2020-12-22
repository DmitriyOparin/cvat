// Copyright (C) 2020 Intel Corporation
//
// SPDX-License-Identifier: MIT

/// <reference types="cypress" />

const { imageGenerator } = require('../plugins/imageGenerator/addPlugin');
const { createZipArchive } = require('../plugins/createZipArchive/addPlugin');
const path = require('path');
const downloadDirectory = path.join(__dirname, '..', 'fixtures');

module.exports = (on, config) => {
    require('@cypress/code-coverage/task')(on, config);
    on('task', { imageGenerator });
    on('task', { createZipArchive });
    on('task', {
        log(message) {
            console.log(message);
            return null;
        },
    });
    // Try to resolve "Cypress failed to make a connection to the Chrome DevTools Protocol"
    // https://github.com/cypress-io/cypress/issues/7450
    on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
            // change download directory
            launchOptions.preferences.default['download'] = { default_directory: downloadDirectory };
            if (browser.isHeadless) {
                launchOptions.args.push('--disable-gpu');
            }
            return launchOptions;
        }
    });
    return config;
};
