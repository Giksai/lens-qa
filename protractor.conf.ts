/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
import { Config, browser } from 'protractor';
import CredentialsManager from './utils/credentialsManager';
import {SpecReporter} from 'jasmine-spec-reporter';

const path          = require('path');
const downloadsPath = path.resolve(__dirname, '../downloads');

const conf: Config = {
  params: {
    defaultUser: CredentialsManager.adminUser
  },

  // would be added to every GET request via Protractor
  baseUrl: 'https://lens-qa.radiangen.com',
  // baseUrl: 'https://lens-staging.radiangen.com',

  SELENIUM_PROMISE_MANAGER: false,

  framework: 'jasmine',

  capabilities: {
    browserName  : 'chrome',
    chromeOptions: {
      prefs: {
        download: {
          prompt_for_download: false,
          directory_upgrade  : true,
          default_directory  : downloadsPath
        }
      }
    }
  },

  suites: {
    all: './specs/**/*.spec.js'
  },

  onPrepare: async function () {
    const env = jasmine.getEnv();

    // adding allure reporter
    const Allure = require('jasmine-allure-reporter');
    env.addReporter(new Allure({ resultsDir: './artifacts/test-reports/allure-src' }));
    env.addReporter(
      new SpecReporter({
        // Defaults: https://github.com/bcaudan/jasmine-spec-reporter#default-options
        // Configuration: https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
        suite: {
          displayNumber: true,    // display each suite number (hierarchical)
        },
        spec: {
          displayPending: true,   // display each pending spec
          displayDuration: true,  // display each spec duration
        },
        summary: {
          displayErrorMessages: true, // display summary of all successes after execution
          displayStacktrace: true,
          displaySuccessful: true,
          displayDuration: true,
          displayFailed: false,    // display summary of all failures after execution
          displayPending: false,   // display summary of all pending specs after execution
        },
      })
    );

    require('./utils/locators'); // adding custom locators to Protractor

    await browser.driver.manage().window().maximize(); // setting browser window to full screen

    // logging in into the application as default user (see params.defaultUser above)
    const Steps = require('./utils/steps/steps').default; // Protractor didn't work with some imports in config correctly
    await Steps.logInLogOutSteps.login();
  },

  plugins: [
    {
      path: 'utils/plugins/screenshot-on-failed-expectation.js'
    }
  ],

  getPageTimeout: 120000, // timeout for page loading

  allScriptsTimeout: 120000, // timeout for running script in browser

  jasmineNodeOpts: {
    showColors            : true, // If true, print colors to the terminal.
    defaultTimeoutInterval: 600000 // Default time to wait in ms before a test fails.
  }
};

exports.config = conf;