/**
 *  Navigation menu on the page left
 */

import { $, browser, by } from 'protractor';

class Sidebar {
  private rootElement            = $('#sidebar');
  private ROOT_OPTION_SELECTOR   = 'li[hover-menu]';
  private NESTED_OPTION_SELECTOR = 'li[data-ng-repeat="item in nav.sub_menu"]';

  /**
   * Selects inner option on sidebar, which is inside another option
   * (Option names is visible if sidebar is expanded, but Protractor can find it by name even in collapsed state)
   * Works with partial names but be careful of name collisions - in that case first option will be selected
   */
  async selectNestedOption(rootOptionName: string, nestedOptionName: string): Promise<void> {
    if (!rootOptionName) {
      throw new Error('sidebar root option name is not specified');
    }
    if (!nestedOptionName) {
      throw new Error('sidebar nested option name not specified');
    }
    const rootOptionElement   = this.rootElement.element(by.cssContainingText(this.ROOT_OPTION_SELECTOR, rootOptionName));
    const nestedOptionElement = this.rootElement.element(by.cssContainingText(this.NESTED_OPTION_SELECTOR, nestedOptionName));
    await browser.actions()
      .mouseMove(rootOptionElement)
      .mouseMove(nestedOptionElement)
      .perform();
    return nestedOptionElement.click();
  }

  /**
   * Selects root option on sidebar
   * (Option names is visible if sidebar is expanded, but Protractor can find it by name even in collapsed state)
   * Works with partial names but be careful of name collisions - in that case first option will be selected
   */
  async selectRootOption(optionName: string): Promise<void> {
    if (!optionName) {
      throw new Error('sidebar root option name is not specified');
    }
    const rootOptionElement = this.rootElement.element(by.cssContainingText(this.ROOT_OPTION_SELECTOR, optionName));
    return rootOptionElement.click();
  }
}

export default new Sidebar();