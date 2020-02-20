/**
 * Custom dialog of the application. For browser alerts see actions.js
 */

import { $, by, ElementFinder } from 'protractor';
import Actions                  from '../../utils/actions';

class ModalDialog {
  private rootElement = $('.modal-dialog .modal-content');

  get header(): ElementFinder {
    return this.rootElement.$('.modal-header');
  }

  get okBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'OK'));
  }

  get yesBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'Yes'));
  }

  get noBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'No'));
  }

  get skipBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'SKIP'));
  }

  get proceedBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'Proceed'));
  }

  get cancelBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'Cancel'));
  }

  get closeBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.btn', 'Close'));
  }

  /**
   * Resolvers to true, if dialog is shown on the page. Otherwise resolves to false
   */
  async isShown(): Promise<boolean> {
    return Actions.isVisible(this.rootElement);
  }
}

export default new ModalDialog();