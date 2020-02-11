/**
 * Full-format grid, for example grid on "Manage Projects" page
 */
import { $, ElementFinder, ElementArrayFinder, by, element, browser } from 'protractor';
import Actions                                                        from "../../../utils/actions";

export class Grid {
  constructor(public rootElement: ElementFinder = $(Grid.rootElementSelector)) {
  }

  static get rootElementSelector(): string {
    return 'div.table-bordered';
  }

  static get headerSelector(): string {
    return '.row.h2';
  }

  private clickableRowSelector                  = 'tr[clickable-row]';
  private clickableEquipmentRowSelector         = 'li[ui-tree-node]';
  private viewBtnSelector                       = '.fa-eye';
  private deleteBtnSelector                     = '.rg-bin';
  private reportBtnSelector                     = '.fa-area-chart';
  private cloneBtnSelector                      = '.fa-clone';
  private editBtnSelector                       = '.rg-pen';
  private checkboxSelector                      = '.icheckbox_square-grey';
  private retrievalModeDropdownSelector         = '#retrieval_mode';
  private selectedRetrievalModeDropdownSelector = '#retrieval_mode option[selected=selected]';
  private filteredGridRowSelector               = '.ui-grid-disable-selection.clickable';

  /**
   * Add new button on the full-format grid
   */
  get addNewOnManagePage(): ElementFinder {
    return element(by.cssContainingText('.btn-default.addnew', 'Add New'));
  }

  /**
   * Message about having no results
   */
  get noRecordsFoundMessage(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('td', 'No records found'));
  }

  /**
   * Message about having no results in the grid with filters by columns
   */
  get noRecordsInFilteredGridMsg(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.no-record.watermark', 'No records found'));
  }

  /**
   * Message about having blank equipment list
   */
  get noEquipmentFoundMessage(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('td', 'Your list of equipment is currently empty'));
  }

  /**
   * All result row elements of the current grid
   */
  get resultRows(): ElementArrayFinder {
    return this.rootElement.$$(this.clickableRowSelector);
  }

  /**
   * All result row elements of the current FILTERED grid
   */
  get resultRowsInFilteredGrid(): ElementArrayFinder {
    return this.rootElement.$$(this.filteredGridRowSelector);
  }

  /**
   * All result equipment elements of the current grid
   */
  get equipmentResultRows(): ElementArrayFinder {
    return this.rootElement.$$(this.clickableEquipmentRowSelector);
  }

  get allCheckboxes(): ElementArrayFinder {
    return this.rootElement.$$(this.checkboxSelector);
  }

  getAllCheckboxesFromColumnNumber(columnNumber: number): ElementArrayFinder {
    return this.rootElement.$$(`td:nth-of-type(${columnNumber})`).$$(this.checkboxSelector);
  }

  getAllRetrievalModeDropDownsInColumnNumber(columnNumber: number): ElementArrayFinder {
    return this.rootElement.$$(`td:nth-of-type(${columnNumber})`).$$(this.retrievalModeDropdownSelector);
  }

  getAllSelectedDropDownsInColumnNumber(columnNumber: number): ElementArrayFinder {
    return this.rootElement.$$(`td:nth-of-type(${columnNumber})`).$$(this.selectedRetrievalModeDropdownSelector);
  }

  /**
   * Gets result row element by exact text in column with given number (numbers starts from 1)
   */
  getResultRowByColumnText(columnNumber: number, text: string): ElementFinder {
    return this.rootElement.element(by.childTextIgnoringCase(this.clickableRowSelector, `td:nth-of-type(${columnNumber})`, text));
  }

  /**
   * Gets result equipment elements by exact text
   */
  getEquipmentResultRow(text: string): ElementFinder {
    return this.rootElement.element(by.cssContainingText(`a`, text));
  }

  async getShownRecordsQuantity(): Promise<number> {
    return this.resultRows.count();
  }

  async getShownEquipmentsQuantity(): Promise<number> {
    return this.equipmentResultRows.count();
  }

  async getCheckboxesQuantity(): Promise<number> {
    return this.allCheckboxes.count();
  }

  async getDropDownsFromColumnQuantity(columnNumber: number): Promise<number> {
    return this.getAllRetrievalModeDropDownsInColumnNumber(columnNumber).count();
  }

  async getFilteredGridRowsQuantity(): Promise<number> {
    return this.resultRowsInFilteredGrid.count();
  }

  async deleteFirstResult(): Promise<void> {
    await browser.executeScript('arguments[0].click()', this.resultRows.first().$(this.deleteBtnSelector));
  } //TODO - script added to avoid overlapping by Support menu. Remove when issue with menu is fixed.

  async editFirstResult(): Promise<void> {
    const editIcon = this.resultRows.first().$(this.editBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(editIcon);
  }

  async clickViewOnFirstRow(): Promise<void> {
    const viewIcon = this.rootElement.$(this.viewBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(viewIcon);
  }

  async deleteFirstRowInFilteredGrid(): Promise<void> {
    const deleteIcon = this.rootElement.$(this.deleteBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(deleteIcon);
  }

  async editFirstRowInFilteredGrid(): Promise<void> {
    const editIcon = this.rootElement.$(this.editBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(editIcon);
  }

  /**
   * Deletes result with given text in given column number (numbers starts from 1)
   */
  async pressDeleteOnResultWith(columnNumber: number, text: string): Promise<void> {
    const targetResult = this.getResultRowByColumnText(columnNumber, text);
    const deleteIcon   = targetResult.$(this.deleteBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(deleteIcon);
  }

  /**
   * Clicks report icon with given text in given column number (numbers starts from 1)
   */
  async pressReportResultWith(columnNumber: number, text: string): Promise<void> {
    const targetResult = this.getResultRowByColumnText(columnNumber, text);
    const reportIcon   = targetResult.$(this.reportBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(reportIcon);
  }

  async pressCloneIcon(columnNumber: number, text: string): Promise<void> {
    const targetResult = this.getResultRowByColumnText(columnNumber, text);
    const cloneIcon    = targetResult.$(this.cloneBtnSelector);
    await Actions.scrollUpUntilElemIsVisibleAndClick(cloneIcon);
  }

  /**
   * Clicks on result with given text in given column number (numbers starts from 1)
   */
  async clickOnResultWith(columnNumber: number, text: string): Promise<void> {
    const targetResult = this.getResultRowByColumnText(columnNumber, text);
    await Actions.scrollUpUntilElemIsVisibleAndClick(targetResult);
  }

  /**
   * Clicks on result with given row index (indexes starts from 0)
   */
  async clickOnRow(rowIndex: number): Promise<void> {
    const targetResult = await this.resultRows.get(rowIndex);
    await Actions.scrollUpUntilElemIsVisibleAndClick(targetResult);
  }

  /**
   * Clicks on equipment result with given row index (indexes starts from 0)
   */
  async clickOnEquipmentRow(text: string): Promise<void> {
    await this.getEquipmentResultRow(text).click();
  }

  async pressAddTicketFromEquipmentGrid(): Promise<void> {
    await this.getEquipmentResultRow('Add Ticket').click();
  }

  /**
   * Selects several projects in grid if they are not selected
   */
  async selectCheckboxesFromGrid(numberOfCheckboxes: number): Promise<void> {
    if (numberOfCheckboxes === 0) {
      throw new Error('Number of projects must be greater than zero');
    }

    const availableCheckboxes = await this.getCheckboxesQuantity();
    if (availableCheckboxes === 0) {
      throw new Error('Grid has no checkboxes');
    }

    for (let count = 0; count < numberOfCheckboxes; count++) {
      const isCheckboxEnabled = (await this.allCheckboxes.get(count).getAttribute('class')).includes('checked');
      if (!isCheckboxEnabled) {
        await this.allCheckboxes.get(count).click();
      }
    }
  }

  /**
   * Removes first checkbox from grid if it's checked
   */
  async removeFirstCheckboxFromGrid(): Promise<void> {
    const maximumNumberOfCheckboxes = 8;
    for (let count = 0; count < maximumNumberOfCheckboxes; count++) {
      const isCheckboxEnabled = (await this.allCheckboxes.get(count).getAttribute('class')).includes('checked');
      if (isCheckboxEnabled) {
        await this.allCheckboxes.get(count).click();
        break;
      }
    }
  }

  /**
   * Clicks on Nth checkbox in grid
   */
  async selectNthCheckbox(numberOfCheckbox: number): Promise<void> {
    await this.allCheckboxes.get(numberOfCheckbox).click();
  }

  /**
   * Clicks on Nth checkbox in grid in Nth column
   */
  async selectNthCheckboxInColumn(numberOfCheckbox: number, columnNumber: number): Promise<void> {
    await this.getAllCheckboxesFromColumnNumber(columnNumber).get(numberOfCheckbox).click();
  }

  /**
   * Check if Nth checkbox in grid in Nth column is not checked
   */
  async isNthCheckboxInColumnNotChecked(numberOfCheckbox: number, columnNumber: number): Promise<boolean> {
    const isCheckboxEnabled = (await this.getAllCheckboxesFromColumnNumber(columnNumber).get(numberOfCheckbox).getAttribute('class')).includes('checked');
    return !isCheckboxEnabled;
  }

  /**
   * DATA DOWNLOAD page
   * Updates selected number of last retrieval mode dropdown in Nth column with another value
   */
  async updateRetrievalModeDropdownInColumn(numberOfDropdowns: number, columnNumber: number, values: string[]): Promise<void> {
    let dropdownsCount = await this.getDropDownsFromColumnQuantity(columnNumber);

    let value = values[columnNumber - 1];

    if (dropdownsCount === 0) throw new Error('No dropdowns found');
    if (dropdownsCount > 2) {
      for (let count = dropdownsCount; count > dropdownsCount - numberOfDropdowns; count--) {
        await this.getAllRetrievalModeDropDownsInColumnNumber(columnNumber).get(count - 1).sendKeys(value);
      }
    } else {
      await this.getAllRetrievalModeDropDownsInColumnNumber(columnNumber).get(dropdownsCount - 1).sendKeys(value);
    }
  }

  /**
   * DATA DOWNLOAD page
   * Gets selected number of last retrieval mode dropdown values in Nth column
   */
  async getRetrievalModeDropdownValueInColumn(numberOfDropdowns: number, columnNumber: number): Promise<string[]> {
    let dropdownsCount = await this.getDropDownsFromColumnQuantity(columnNumber);

    let dropdownValue: string[] = [];
    if (dropdownsCount === 0) throw new Error('No dropdowns found');
    if (dropdownsCount > 2) {
      let index = 0;
      for (let count = dropdownsCount; count > dropdownsCount - numberOfDropdowns; count--) {
        dropdownValue[index] = await this.getAllSelectedDropDownsInColumnNumber(columnNumber).get(count - 1).getText();
        index++;
      }
    } else {
      dropdownValue[0] = await this.getAllSelectedDropDownsInColumnNumber(columnNumber).get(dropdownsCount - 1).getText();
    }

    return dropdownValue;
  }
}

export default new Grid();