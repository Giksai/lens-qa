/**
 * Interactive blue header on the top of every page
 */

import { $, by, ElementFinder } from 'protractor';

class Header {
  private rootElement = $('header.header');

  get dropdownMenu(): ElementFinder {
    return this.rootElement.$('ul.dropdown-menu');
  }

  get profileImage(): ElementFinder {
    return this.rootElement.$('img[alt="Profile"]');
  }

  /**
   * Clicks on the dropdown menu option with given name (menu must be previously opened).
   */
  async selectMenuOption(optionName: string): Promise<void> {
    await this.dropdownMenu.element(by.exactText('a', optionName)).click();
  }
}

export default new Header();