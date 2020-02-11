/**
 *  Page for entity editing.
 *  For view page see entity-view-page.po.
 *  For editable fields see editable-entity-fields.po.
 */

import { element, $, by, ElementFinder } from 'protractor';

class EditEntityPage {
  get cancelBtn(): ElementFinder {
    return $('.cancel_btn');
  }

  get updateBtn(): ElementFinder {
    return element(by.textIgnoringCase('button', 'Update'));
  }
}

export default new EditEntityPage();