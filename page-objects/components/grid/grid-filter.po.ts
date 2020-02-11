/**
 * Page Object for Grid filter on the page right
 */

import { $, by, ElementFinder } from 'protractor';

class GridFilter {
  private rootElement = $('.filter-box ');

  /**
   * Btn which enables advanced search
   */
  get advancedFilterBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('[show-advance-filters]', 'Advanced Filter'));
  }

  get basicFilterBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('[show-advance-filters]', 'Basic Filter'));
  }

  get closeBtn(): ElementFinder {
    return this.rootElement.$('[show-filters].close');
  }

  get clearBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('a', 'Clear'));
  }

  /**
   * The only search field in simple mode
   */
  get searchField(): ElementFinder {
    return this.rootElement.$('#filter-basic');
  }

  /**
   * Button on grid which shows filter.
   * Logical, not structural, part of the filter.
   */
  get showFilterBtn(): ElementFinder {
    return $('.filter.wish-button');
  }

  /**
   * Gets advanced search field element with given name (which appears on field label)
   */
  getAdvancedField(fieldName: string): ElementFinder {
    return this.rootElement.all(by.childTextIgnoringCase('div', 'label[for*="filter"]', fieldName)).first().$('input[id*="filter"]');
  }
}

export default new GridFilter();