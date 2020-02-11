/**
 * Content which appears on every content page (which are represented by other Page Objects)
 * Replaces needs for inheritance in Page Objects so they can be more simple
 */

import { $$, element, by, ElementFinder } from 'protractor';

class MainContent {
  /**
   * Fist header on the page. Used to check on which page test is now
   */
  get mainHeader(): ElementFinder {
    return $$('h1.page-header').first();
  }

  /**
   * Gets red asterisk element of given field (ignores case of field name)
   */
  async getAsteriskElementFor(fieldName: string): Promise<ElementFinder> {
    // Case agnostic locator used because of 2 reasons:
    // 1. label text case can differ for user and Protractor,
    // 2. it's easier not to focus on case of test data object properties in tests
    const generalEntityElement = element(by.fieldLabel(fieldName));
    const projectPageElement   = element(by.cssContainingText('.col-lg-3.col-md-6.col-sm-6.col-xs-12 label', fieldName)); //Works only for Client and Portfolio elements on the project page for now
    if (await generalEntityElement.isPresent()) {
      return generalEntityElement.$('.red-asterisk');
    } else {
      return projectPageElement.$('.red-asterisk');
    }
  }
}

export default new MainContent();