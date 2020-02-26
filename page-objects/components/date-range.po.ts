/**
 * Date range calendar
 */

import { $, ElementFinder } from 'protractor';

class DateRange {
  private rootElement = $('div.daterangepicker');
  private buttonRow = this.rootElement.$('div.drp-buttons');

  get applyBtn(): ElementFinder {
    return this.buttonRow.$('button.applyBtn');
  }

  get cancelBtn(): ElementFinder {
    return this.buttonRow.$('button.cancelBtn');
  }
}

export default new DateRange();