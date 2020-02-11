/**
 * Collection of BDD-style hi-level checks to be used in specs.
 * ! Do not use it in Page Objects, it's considered to be anti-pattern !
 */

import { $$, browser, by, element } from 'protractor';
import Actions                      from '../utils/actions';
import loginPage                    from '../page-objects/login-page.po';
import mainContent                  from '../page-objects/main-content.po';
import modalDialog                  from '../page-objects/components/modal-dialog.po';
import performanceReport            from '../page-objects/reports/performance-report.po';
import entityViewPage               from '../page-objects/entity/entity-view-page.po';
import grid                         from '../page-objects/components/grid/grid.po';
import editableEntityFields         from "../page-objects/entity/editable-entity-fields.po";
import * as fs                      from 'fs';
import * as path                    from 'path';

type DataObject = { [key: string]: string };

export default class Check {
  /**
   * Checks that currently opened entity has values, given in method param
   * @param {Object} expectedDataObj - collection of key-value pairs, where key is the name of the entity field,
   *                                   and the value is expected value of that field on a page. For example:
   *                                   {client: 'foo', 'compliance lead': 'bar', 'Asset manager': 'baz'} // ignores case
   */
  static async isCurrentEntityDataEqual(expectedDataObj: DataObject): Promise<void> {
    for (let key of Object.keys(expectedDataObj)) {
      const actualValue = await entityViewPage.getFieldValue(key);
      expect(actualValue.trim()).toBe(expectedDataObj[key], `Entity data for "${key}" field differs from expected`);
    }
  }

  static async isClonedDataBlank(expectedDataObj: DataObject): Promise<void> { // edit mode
    for (let key of Object.keys(expectedDataObj)) {
      const actualValue = await editableEntityFields.getFieldElement(key).getAttribute('value');
      expect(actualValue.trim().length).toBe(0, `Entity data for "${key}" is not blank`);
    }
  }

  static async isPerformanceReportDataEqual(expectedDataObj: DataObject): Promise<void> {
    for (let key of Object.keys(expectedDataObj)) {
      const actualValue = await performanceReport.getFieldValue(key);
      expect(actualValue.trim()).toBe(expectedDataObj[key], `Entity data for "${key}" field differs from expected`);
    }
  }

  /**
   * Checks if dialog with given header is present in a page
   */
  static async isDialogOpen(headerText: string): Promise<void> {
    expect(await modalDialog.header.getText()).toContain(headerText);
  }

  static async isGridResultsCount(count: number, gridName?: string): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await currentGrid.getShownRecordsQuantity()).toBe(count, 'Grid results count differ from expected');
    if (count !== 0) {
      expect(await Actions.isVisible(currentGrid.noRecordsFoundMessage)).toBe(false, 'Message about no found result is present');
    }
  }

  static async isFilteredGridResultsCount(count: number, gridName?: string): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await currentGrid.getFilteredGridRowsQuantity()).toBe(count, 'Grid results count differ from expected');
    if (count !== 0) {
      expect(await Actions.isVisible(currentGrid.noRecordsInFilteredGridMsg)).toBe(false, 'Message about no found result is present');
    }
  }


  /**
   * Project page
   */
  static async isEquipmentGridResultsCount(count: number, gridName?: string): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await currentGrid.getShownEquipmentsQuantity()).toBe(count, 'Grid results count differ from expected');
    if (count !== 0) {
      expect(await Actions.isVisible(currentGrid.noEquipmentFoundMessage)).toBe(false, 'Message about no found result is present');
    }
  }

  /**
   * Project page
   * Checks that equipment grid have result with given text
   */
  static async isEquipmentGridHaveResult({ text, gridName }: { text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await Actions.isVisible(currentGrid.getEquipmentResultRow(text))).toBe(true, `Result with text "${text}" is not present`);
  }

  /**
   * Checks that specified (or the only one on the page) grid have result with given text in column with given number (numbers start with 1)
   */
  static async isGridHaveResult({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await Actions.isVisible(currentGrid.getResultRowByColumnText(columnNumber, text))).toBe(true, `Result with text "${text}" in column №"${columnNumber}" is not present`);
  }

  /**
   * Checks that specified (or the only one on the page) grid have no result with given text in column with given number (numbers start with 1)
   */
  static async isGridHaveNoResult({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await Actions.isVisible(currentGrid.getResultRowByColumnText(columnNumber, text))).toBe(false, `Result with text "${text}" in column №"${columnNumber}" is present`);
  }

  /**
   * Project page
   * Checks that equipment grid have no result
   */
  static async iEquipmentGridHaveNoResult({ text, gridName }: { text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    expect(await Actions.isVisible(currentGrid.getEquipmentResultRow(text))).toBe(false, `Result with text "${text}" is present`);
  }

  /**
   * Checks that email is shown in options from editable fields. Options must be present
   */
  static async isEmailInOptions(): Promise<void> {
    expect(await Actions.isVisible($$('.user-email-option').first())).toBe(true, 'Emails in options is not visible');
  }

  /**
   * Checks that red asterisks are shown on the page for given fields
   */
  static async isFieldsMarkedRequired(fieldNames: string[]): Promise<void> {
    for (let fieldName of fieldNames) {
      const asteriskElement = await mainContent.getAsteriskElementFor(fieldName);
      expect(await Actions.isVisible(asteriskElement)).toBe(true, `Red Asterisk for the field "${fieldName}" is not shown`);
      expect(await asteriskElement.getText()).toBe('*', `Red Asterisk for the field "${fieldName}" is not shown correctly`);
    }
  }

  /**
   * Checks that currently viewed entity has field with given label.
   * ! Make this check only on entity view page !
   */
  static async isViewedEntityHasField(fieldLabel): Promise<void> {
    expect(await Actions.isVisible(entityViewPage.getFieldGeneral(fieldLabel))).toBe(true, `Field with label "${fieldLabel}" is not shown`);
  }

  /**
   * Checks that test is logged out from the application
   */
  static async isLoggedOut(): Promise<void> {
    expect(await browser.getCurrentUrl()).toBe(browser.baseUrl + '/#/login');
    expect(await Actions.isVisible(loginPage.loginField)).toBe(true, 'Login field is not visible after logging out');
    expect(await Actions.isVisible(loginPage.passwordField)).toBe(true, 'Password field is not visible after logging out');
    expect(await Actions.isVisible(loginPage.loginBtn)).toBe(true, 'Login button is not visible after logging out');
  }

  /**
   * Checks that warning message is displayed
   */
  static async isInvalidLoginWarningDisplayed(): Promise<void> {
    expect(await Actions.isVisible(loginPage.invalidLoginWarning)).toBe(true, 'Warning message is not displayed');
  }

  /**
   * Checks that page with a given header is opened now
   */
  static async isOnPage(pageName: string): Promise<void> {
    const actualPageHeader = await mainContent.mainHeader.getText();
    expect(actualPageHeader.toUpperCase()).toBe(pageName.toUpperCase());
  }

  /**
   * Checks that given error messages are shown on the page. Also checks exclamation mark presence near a message
   */
  static async isValidationErrorsShown(messages: string[]): Promise<void> {
    await Actions.scrollPageUp(); // Scrolling to the errors to make them visible on screenshots
    for (let message of messages) {
      const validationErrorElement = element(by.cssContainingText('.form-validation-error', message));
      const errorMarker            = validationErrorElement.$('.fa-exclamation-circle');
      expect(await Actions.isVisible(validationErrorElement))
        .toBe(true, `Form validation error message with text "${message}" didn't appeared`);
      expect(await Actions.isVisible(errorMarker))
        .toBe(true, `Validation error marker near the message "${message}" did't appear`);
    }
  }

  /**
   * Checks that there is no custom application dialogs on a page
   */
  static async isNoDialogs(): Promise<void> {
    expect(await modalDialog.isShown()).toBe(false, 'Dialog is present');
  }

  /**
   * Checks that email is not shown in options from editable fields. Options must be present
   */
  static async isNoEmailInOptions(): Promise<void> {
    expect(await Actions.isVisible($$('.user-email-option').first())).toBe(false, 'Email in options is visible');
  }

  /**
   * Checks that there is no field with given label on currently opened entity view page
   */
  static async isNoFieldOnEntityViewWithLabel(fieldLabel): Promise<void> {
    expect(await Actions.isVisible(entityViewPage.getFieldGeneral(fieldLabel))).toBe(false, `Field with label "${fieldLabel}" is shown`);
  }

  /**
   * Checks that there is no grid results which fulfill given criteria.
   * If no criteria other then gridName given, will check that target grid has no results.
   * If text and columnNumber given, will search for such text in given column, and checks that nothing is found.
   * If no gridName specified, will work with first of grids found on the page.
   */
  static async isNoGridResults({ columnNumber, text, gridName }: { columnNumber?: number, text?: string, gridName?: string } = {}): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await Actions.scrollTo(currentGrid.rootElement); // for screen-shots
    if (!text && !columnNumber) {
      expect(await Actions.isVisible(currentGrid.noRecordsFoundMessage)).toBe(true, 'Message about no found result is absent');
      expect(await currentGrid.getShownRecordsQuantity()).toBe(0, 'Grid results count differ 0');
    }
    if (!text && columnNumber) {
      throw new Error('Method behaviour with this parameters combination was not implemented yet'); // TODO implement
    }
    if (text && columnNumber) {
      expect(await Actions.isVisible(currentGrid.getResultRowByColumnText(columnNumber, text))).toBe(false, `Result with text "${text}" in row №"${columnNumber}" is present`);
    }
  }

  /**
   * Checks that file is downloaded
   */
  static async isDownloadedFileExist(extension: string): Promise<void> {
    const filePath = await path.resolve(__dirname, '../../downloads/');

    let targetFile;

    await browser.wait(async function () {
      let files          = await fs.readdirSync(filePath);
      let allTargetFiles = await files.filter(file => file.endsWith('.' + extension));
      if (allTargetFiles.length > 0) {
        targetFile = allTargetFiles[0];
        return true;
      }
      return false;
    }, 30000, "File has not downloaded within 30 seconds");

    expect(await fs.existsSync(path.join(filePath, targetFile))).toBe(true, `File with extension "${extension}" does not exist in "${filePath}"`);
  }

  /**
   * DATA DOWNLOAD page
   * checks if updated template data equal
   */
  static async isUpdatedTemplateDataEqual
  ({ numberOfCheckbox, numberOfDropdowns, gridName }: { numberOfCheckbox: number, numberOfDropdowns: number, gridName: string }, values: string[]): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;

    expect(await currentGrid.isNthCheckboxInColumnNotChecked(numberOfCheckbox, 1)).toBe(true, `Target checkbox is still checked in column 1`);
    expect(await currentGrid.isNthCheckboxInColumnNotChecked(numberOfCheckbox, 2)).toBe(true, `Target checkbox is still checked in column 2`);
    expect(await currentGrid.isNthCheckboxInColumnNotChecked(numberOfCheckbox, 3)).toBe(true, `Target checkbox is still checked in column 3`);

    for (let value of await currentGrid.getRetrievalModeDropdownValueInColumn(numberOfDropdowns, 1)) {
      expect(value).toBe(values[0], `Values in the updated dropdowns in column 1 do not match with test data`);
    }
    for (let value of await currentGrid.getRetrievalModeDropdownValueInColumn(numberOfDropdowns, 2)) {
      expect(value).toBe(values[1], `Values in the updated dropdowns in column 2 do not match with test data`);
    }
    for (let value of await currentGrid.getRetrievalModeDropdownValueInColumn(numberOfDropdowns, 3)) {
      expect(value).toBe(values[2], `Values in the updated dropdowns in column 3 do not match with test data`);
    }
  }
}
