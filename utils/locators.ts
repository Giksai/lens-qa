/**
 * Custom locators for use in tests like "element(by.myLocatorName(...))".
 * Functions will run inside browser, see Web API for details.
 * All selectors in params are css-selectors.
 * Last argument (parentElement) is element from which search will start, for example:
 * $('.foo').element(by.myLocatorName('.bar', 'baz')) // parentElement will be tag with class "foo"
 * TODO - add locator types to get auto-complete for them
 *
 * ! ES6 in locator functions would cause errors in Internet Explorer, so use ES5 !
 */

import { by } from 'protractor';

/**
 * Finds element which has descending element with given text (ignoring case)
 */
by.addLocator('childTextIgnoringCase', function (cssSelector: string, childTextCssSelector: string, childText: string, parentElement: HTMLElement | null) {
  var parent         = parentElement || document;
  var targetElements = parent.querySelectorAll(cssSelector);

  return Array.prototype.filter.call(targetElements, function (targetElement) {
    var childElement = targetElement.querySelector(childTextCssSelector);
    try {
      return childElement.textContent.trim().toLowerCase() === childText.toLowerCase();
    } catch (error) {
      if (error.message.includes('Cannot read property \'textContent\' of null')) {
        return false;
      }
      throw error;
    }
  });
});

/**
 * Finds element by exact text
 */
by.addLocator('exactText', function (cssSelector: string, text: string, parentElement: HTMLElement | null) {
  var parent         = parentElement || document;
  var targetElements = parent.querySelectorAll(cssSelector);

  return Array.prototype.filter.call(targetElements, function (targetElement) {
    return targetElement.textContent === text;
  });
});

/**
 * Finds field element by label with exact text (ignoring label case and asterisks in label)
 */
by.addLocator('fieldLabel', function (label: string, parentElement: HTMLElement | null) {
  var parent         = parentElement || document;
  var targetElements = parent.querySelectorAll('.form-group.clearfix');

  return Array.prototype.filter.call(targetElements, function (targetElement) {
    var childElement = targetElement.querySelector('label');
    try {
      return childElement.textContent.trim().toLowerCase().replace(/\*/g, '') === label.toLowerCase();
    } catch (error) {
      if (error.message.includes('Cannot read property \'textContent\' of null')) {
        return false;
      }
      throw error;
    }
  });
});

/**
 * Finds element which has descending element which includes given text (ignoring case)
 */
by.addLocator('partOfChildTextIgnoringCase', function (cssSelector: string, childTextCssSelector: string, childText: string, parentElement: HTMLElement | null) {
  var parent         = parentElement || document;
  var targetElements = parent.querySelectorAll(cssSelector);

  return Array.prototype.filter.call(targetElements, function (targetElement) {
    var childElement = targetElement.querySelector(childTextCssSelector);
    try {
      return childElement.textContent.trim().toLowerCase().indexOf(childText.toLowerCase()) !== -1;
    } catch (error) {
      if (error.message.includes('Cannot read property \'textContent\' of null')) {
        return false;
      }
      throw error;
    }
  });
});

/**
 * Finds element by it text (ignoring case and line-brakes before/after it)
 */
by.addLocator('textIgnoringCase', function (cssSelector: string, text: string, parentElement: HTMLElement | null) {
  var parent         = parentElement || document;
  var targetElements = parent.querySelectorAll(cssSelector);

  return Array.prototype.filter.call(targetElements, function (targetElement) {
    return targetElement.textContent.trim().toLowerCase() === text.trim().toLowerCase();
  })
});