/**
 * Page Object for filter inside grid (filter by column name)
 */

import { element, by, ElementFinder } from 'protractor';

class GridFilterByColumn {
// TODO implement check if column is displayed, enable this column if not displayed and complex selection (e.g. dropdowns)

  /**
   * Gets column filter element with simple text input with given name (which appears on column label)
   */
  getSimpleTextFilter(fieldName: string): ElementFinder {
    return element(by.childTextIgnoringCase('.ui-grid-header-cell', '.ui-grid-header-cell-label', fieldName)).$('input[type="text"]');
  }
}

export default new GridFilterByColumn();