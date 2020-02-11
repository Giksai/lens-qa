/**
 * Add screenshot to allure report on every failed expectation.
 * Useful with soft assertion (which is default in Jasmine), when different assertions can be made on different pages within one test.
 */

declare const allure: any; // TODO - migrate on new allure-js with typings
import { browser } from 'protractor';

const ScreenshotOnFailedExpectationPlugin = {
  onPrepare: async function () {
    const originalAddExpectationResult = jasmine['Spec'].prototype.addExpectationResult;

    jasmine['Spec'].prototype.addExpectationResult = function () {
      if (!arguments[0]) {
        const failureMsg = arguments[1].message;
        browser.takeScreenshot().then(png => {
          allure.createAttachment(
            `Screenshot of expectation failure: ${failureMsg}`,
            () => Buffer.from(png, 'base64'),
            'image/png'
          )();
        });
      }

      // This event loop hack fixes protractor and jasmine 2 integration issue which sometimes makes createAttachment function to fail
      // (with "Cannot read property 'currentStep' of undefined"). This must be because of race conditions between allure, jasmine and protractor.
      // Hopefully it will be fixed when protractor migrates to jasmine 3,
      // but for now there is no way to make async screenshot attachment process to work stable with sync addExpectationResult function.
      // There is more stable options to do screenshot on AfterEach, but in this case AfterEach actions result would be present on the screenshot, which is not desired.
      // See more details and discussions about this problem here: https://github.com/angular/protractor/issues/1938, https://github.com/jasmine/jasmine/issues/842
      // TODO - consider migration to mocha if numbers of tests will grow faster then protractor migrates to Jasmine 3, and this timeout will slow down test runs
      // (but it seems like mocha+chai do not have soft assertions, so it's not lossless decision)
      require('deasync').sleep(500); // very dark magic

      return originalAddExpectationResult.apply(this, arguments);
    };
  }
};

module.exports = ScreenshotOnFailedExpectationPlugin;