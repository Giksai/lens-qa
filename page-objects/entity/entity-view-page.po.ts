/**
 * Page with read-only entity information, for editing see edit-entity-page.po
 */

import { $, by, element, ElementFinder } from 'protractor';
import GridOnEntityView                  from '../components/grid/grid-on-entity-view.po';

class EntityViewPage {
  get deleteBtn(): ElementFinder {
    return $('.lnk-delete');
  }

  get editBtn(): ElementFinder {
    return element(by.cssContainingText('.lnk-edit', 'edit'));
  }

  get cloneBtn(): ElementFinder {
    return element(by.cssContainingText('.lnk-edit', 'Clone'));
  }

  /**
   * Returns Page Object of grid with giver text in header
   */
  getGrid(gridName: string): GridOnEntityView {
    return new GridOnEntityView(element(by.partOfChildTextIgnoringCase(
      GridOnEntityView.rootElementSelector, GridOnEntityView.headerSelector, gridName)));
  }

  getFieldGeneral(labelText: string): ElementFinder {
    return element(by.partOfChildTextIgnoringCase('.form-group.clearfix', 'label', labelText));
  }

  getFieldCustom(labelText: string): ElementFinder {
    return element(by.partOfChildTextIgnoringCase('.col-md-3.col-sm-6.col-xs-12', 'label', labelText)); // Example custom fields: comments on client page
  }

  /**
   * Gets value of given field (ignores case of field name)
   */
  async getFieldValue(fieldName: string): Promise<string> {
    // Case agnostic locator used because of 2 reasons:
    // 1. label text case can differ for user and Protractor,
    // 2. it's easier not to focus on case of test data object properties in tests
    const generalField = this.getFieldGeneral(fieldName).$('p');
    const customField  = this.getFieldCustom(fieldName).$('p');
    if (await generalField.isPresent()) {
      return generalField.getText();
    } else {
      return customField.getText();
    }
  }
}

export default new EntityViewPage();