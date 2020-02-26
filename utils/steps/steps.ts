/**
 * Collection of BDD-style hi-level steps to be used in specs.
 * ! Meaningless for business processes application actions should remain in Page Objects !
 */

import { browser, protractor, ElementFinder } from 'protractor';
import Actions                                from '../actions';
import DataDownloadSteps                      from './data-download.steps';
import FileFromMessageDownloadSteps           from './file-from-message-download.steps';
import FilteringSteps                         from './filtering.steps';
import LogInLogOutSteps                       from "./log-in-log-out.steps";
import NavigationSteps                        from "./navigation.steps";
import ModalDialogSteps                       from "./modal-dialog.steps";
import GroupSteps                             from "./group.steps";
import PortfolioSteps                         from "./portfolio.steps";
import ProjectSteps                           from "./project.steps";
import ClickOnRowSteps                        from "./click-on-row.steps";
import addNewEntityPage                       from '../../page-objects/entity/add-new-entity-page.po';
import editableEntityFields                   from '../../page-objects/entity/editable-entity-fields.po';
import editEntityPage                         from '../../page-objects/entity/edit-entity-page.po';
import entityViewPage                         from '../../page-objects/entity/entity-view-page.po';
import grid                                   from '../../page-objects/components/grid/grid.po';


type DataObject = { [key: string]: string };

export default class Steps {

  static get dataDownloadSteps(): DataDownloadSteps {
    return new DataDownloadSteps;
  }

  static get fileFromMessageDownloadSteps(): FileFromMessageDownloadSteps {
    return new FileFromMessageDownloadSteps;
  }

  static get filteringSteps(): FilteringSteps {
    return new FilteringSteps;
  }

  static get logInLogOutSteps(): LogInLogOutSteps {
    return new LogInLogOutSteps;
  }

  static get navigationSteps(): NavigationSteps {
    return new NavigationSteps;
  }

  static get modalDialogSteps(): ModalDialogSteps {
    return new ModalDialogSteps;
  }

  static get groupSteps(): GroupSteps {
    return new GroupSteps;
  }

  static get portfolioSteps(): PortfolioSteps {
    return new PortfolioSteps;
  }

  static get projectSteps(): ProjectSteps {
    return new ProjectSteps;
  }

  static get clickOnRowSteps(): ClickOnRowSteps {
    return new ClickOnRowSteps;
  }


  /**
   * --------------- ADD / CREATE / SUBMIT ENTITY ---------------
   */

  /**
   * Adds new entity from Full-format grid (for example grid on "Manage Projects") by click on "Add New" button
   * If no entity data given, just clicks "Add New" button
   */
  static async addNewEntityFromManagePage(entityData?: DataObject): Promise<void> { //TODO add other needed entities
    await grid.addNewOnManagePage.click();
    if (entityData) {
      await Steps.submitNewEntity(entityData);
    }
  }

  /**
   * Adds new entity to current entity by click on "Add New" button of entity Grid
   * If no entity data given, just clicks "Add New" button
   */
  static async addNewChildEntity(entityGridName: string, entityData?: DataObject): Promise<void> {
    const addNewButton = entityViewPage.getGrid(entityGridName).addNewBtn;
    await browser.wait( //Added to improve stability and spontaneous falls
      protractor.ExpectedConditions.elementToBeClickable(addNewButton),
      5 * 1000,
      'Add New Button is not clickable'
    );
    await Actions.scrollUpUntilElemIsVisibleAndClick(addNewButton);
    if (entityData) {
      await Steps.submitNewEntity(entityData);
    }
  }

  /**
   * Works like "submitPortfolioUnderManagement", but previously opens "ADD NEW PORTFOLIO" page and closes confirmation dialog afterwards
   */
  static async createSimpleProject(args: DataObject): Promise<void> {
    await Steps.navigationSteps.goToEntityCreation('Projects', 'Add New Project');
    await Steps.submitNewEntity(args);
  }

  /**
   * Only submit form with given data, don't close the dialogs after submit
   * If used without params will try to submit empty form
   * @param {Object} [entityData] - collection of key-value pairs, for example:
   *                   {name: 'foo', 'installation type': 'bar'}
   */
  static async submitNewEntity(entityData?: DataObject): Promise<void> {
    if (entityData) {
      const str = JSON.stringify({ name: 'regression test project' });
      if (JSON.stringify(entityData) === str) { //TODO this is a Workaround to avoid an issue with required Buyer Name when creating project. Remove when fixed
        let buyerName: ElementFinder = editableEntityFields.getFieldElement('buyer name');
        await editableEntityFields.setFieldValues(entityData);
        await Actions.isVisible(buyerName);
        await buyerName.sendKeys('Buyer Test Name');
      } else {
        await editableEntityFields.setFieldValues(entityData)
      }
    }
    const submitBtn = await Actions.isVisible(addNewEntityPage.submitBtn) ? addNewEntityPage.submitBtn : addNewEntityPage.createBtn;
    await submitBtn.click();
  }

  /**
   * Works like "submitPortfolioUnderManagement", but previously opens "ADD NEW PORTFOLIO" page and closes confirmation dialog afterwards
   */
  static async createPortfolioUnderManagement(args: DataObject): Promise<void> {
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Steps.portfolioSteps.submitPortfolioUnderManagement(args);
    await Steps.modalDialogSteps.confirmModalDialog();
  }

  /**
   * Works like "submitSimplePortfolio", but previously opens "ADD NEW PORTFOLIO" page and closes confirmation dialog afterwards
   */
  static async createSimplePortfolio(args: DataObject): Promise<void> {
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Steps.portfolioSteps.submitSimplePortfolio(args);
    await Steps.modalDialogSteps.confirmModalDialog();
  }

  /**
   * --------------- DELETION ---------------
   */

  /**
   * Deletes entity which is currently open
   * ! Only invoke this step while test is on some entity view page !
   */
  static async deleteCurrentlyViewedEntity(entityData?: DataObject): Promise<void> {
    await entityViewPage.deleteBtn.click();
    if (entityData) {
      await editableEntityFields.setFieldValues(entityData)
    }
    await Steps.modalDialogSteps.confirmIfAsked();
  }

  static async deleteGridResultWith({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.pressDeleteOnResultWith(columnNumber, text);
    await Steps.modalDialogSteps.confirmIfAsked();
  }

  static async deleteFirstGridRow(gridName?: string, entityData?: DataObject): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.deleteFirstResult();
    await Actions.confirmAlert();
    if (entityData) {
      await editableEntityFields.setFieldValues(entityData);
    }
    await Steps.modalDialogSteps.confirmIfAsked();
  }

  static async deleteFirstFilteredGridRow(gridName?: string, entityData?: DataObject): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.deleteFirstRowInFilteredGrid();
    await Actions.confirmAlert();
    if (entityData) {
      await editableEntityFields.setFieldValues(entityData);
    }
    await Steps.modalDialogSteps.confirmIfAsked();
  }

  /**
   * --------------- UPDATE / EDIT ---------------
   */

  static async updateFirstGridRow(dataObj?: DataObject, gridName?: string): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.editFirstResult();
    if (dataObj) {
      await editableEntityFields.setFieldValues(dataObj);
      await editEntityPage.updateBtn.click();
    }
  }

  static async updateFirstFilteredGridRow(dataObj?: DataObject, gridName?: string): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.editFirstRowInFilteredGrid();
    if (dataObj) {
      await editableEntityFields.setFieldValues(dataObj);
      await editEntityPage.updateBtn.click();
    }
  }

  /**
   * Edit currently opened entity, setting given data in target fields.
   * ! Did not press "Update" button, so changes wouldn't be made !
   * Params is used just like in "submitSimplePortfolio" method
   * If no data is passed just goes to edit page
   */
  static async editCurrentEntity(dataObj?: DataObject): Promise<void> {
    await entityViewPage.editBtn.click();
    if (dataObj) {
      await editableEntityFields.setFieldValues(dataObj);
    }
  }

  /**
   * Updates currently opened entity, setting given data in target fields, and presses "Update"
   * Params is used just like in "submitSimplePortfolio" method
   */
  static async updateCurrentEntity(dataObj: DataObject): Promise<void> {
    await Steps.editCurrentEntity(dataObj);
    await editEntityPage.updateBtn.click();
  }

  /**
   * Reverts data changes in entity editing and returns to entity view page.
   */
  static async cancelEntityChanges(): Promise<void> {
    await editEntityPage.cancelBtn.click();
  }

  /**
   * --------------- CLONE / VIEW / REPORTS ICONS IN GRID ---------------
   */

  static async cloneCurrentlyViewedEntity(): Promise<void> {
    await entityViewPage.cloneBtn.click();
  }

  static async cloneEntityFromGrid({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.pressCloneIcon(columnNumber, text);
  }

  static async openReportsFromGrid({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.pressReportResultWith(columnNumber, text);
  }

   /**
   * --------------- DOWNLOAD ---------------
   */

  static async downloadGridElement({ columnNumber, text, gridName }: { columnNumber: number, text: string, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.pressDownloadIcon(columnNumber, text);
  }
}