/**
 * Page for Performance report only
 */

import { $, ElementFinder } from 'protractor';

class PerformanceReport {
  getFieldById(text: string): ElementFinder {
    return $(`#${text}`);
  }

  /**
   * Gets value of given field (ignores case of field name)
   */
  async getFieldValue(fieldName: string): Promise<string> {
    return this.getFieldById(fieldName).getText();
  }

}

export default new PerformanceReport();

