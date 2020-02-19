/**
 *  Navigation menu on the page left
 */

import { $, browser, by } from 'protractor';
import Actions            from '../../utils/actions';
import mainContent        from '../main-content.po';

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
    let actualPageHeader = await mainContent.mainHeader.getText();
    do {
      try {
        await browser.actions()
        .mouseMove(rootOptionElement)
        .perform();
        await Actions.waitToBeInteractable(nestedOptionElement, 500);
        await nestedOptionElement.click();
        actualPageHeader = await mainContent.mainHeader.getText();
      } catch {}
    } while (!this.checkIfOnDesiredPage(actualPageHeader, nestedOptionName));
  }

  private checkIfOnDesiredPage(currentPage: string, desiredPage: string): boolean { //TODO: remove this when DATA DOWNLOAD page will become DATA DOWNLOADS
    if(currentPage.toUpperCase() === "DATA DOWNLOAD"
        && desiredPage.toUpperCase() === "DATA DOWNLOADS") {
        return true;
    }
    if(currentPage.toUpperCase() === desiredPage.toUpperCase()) {
      return true;
    } else {
      return false;
    }
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
    await rootOptionElement.click();
  }
}

export default new Sidebar();