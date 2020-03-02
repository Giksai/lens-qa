/**
 * Data Download Page
 */

import { by, element, ElementFinder } from 'protractor';
import Actions                           from "../../utils/actions";

class DataDownload {
  get generateBtn(): ElementFinder {
    return element(by.cssContainingText('.btn', 'Generate Data File'));
  }

  get saveAsBtn(): ElementFinder {
    return element(by.cssContainingText('.btn', 'Save as new template'));
  }

  get saveTemplateBtn(): ElementFinder {
    return element(by.cssContainingText('.btn', 'Save template'));
  }

  get saveBtn(): ElementFinder {
    return element(by.cssContainingText('.btn', 'Save'));
  }

  get updateBtn(): ElementFinder {
    return element(by.cssContainingText('.btn', 'Update template'));
  }

  async clickRadioBtnWithLabel(extension: string): Promise<void> {
    const radioBtn = element(by.css(`label[for="${extension}"]`));
    await Actions.scrollUpUntilElemIsVisibleAndClick(radioBtn);
  }
}

export default new DataDownload();

