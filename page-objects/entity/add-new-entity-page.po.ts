/**
 * Page for adding new entity.
 * For interactions with entity itself see entity-view-page.po, edit-entity-page.po and editable-entity-fields.po
 */

import { $, browser, protractor, by, element, ElementFinder } from 'protractor';

import editableEntityFields from './editable-entity-fields.po';

class AddNewEntityPage {
  get createBtn(): ElementFinder {
    return element(by.textIgnoringCase('button', 'Create'));
  }

  get submitBtn(): ElementFinder {
    return $('[name="submit_btn"]');
  }

  /**
   * Sets all fields which required only for "under management portfolio" to given value.
   * Only first use on page will fill all required fields with same given data
   * Allowed to use only after activating isUnderManagementCheckbox
   */
  async assignAllManagementRolesTo(assignee: string): Promise<void> {
    const assetManagerFieldElement = editableEntityFields.getFieldElement('Asset Manager');
    await browser.wait(
      protractor.ExpectedConditions.elementToBeClickable(assetManagerFieldElement),
      2000,
      'Cannot assign management roles: asset manager field is not clickable.'
    );
    await assetManagerFieldElement.click();
    if (assignee) { // if needed for negative tests where no assignee is set
      await element(by.cssContainingText('.ui-select-choices-row-inner', assignee)).click();
    }
  }
}

export default new AddNewEntityPage();