import entityViewPage       from "../../page-objects/entity/entity-view-page.po";
import grid                 from "../../page-objects/components/grid/grid.po";
import dataDownload         from "../../page-objects/reports/data-download.po";
import editableEntityFields from "../../page-objects/entity/editable-entity-fields.po";
import Steps                from "./steps";

type DataObject = { [key: string]: string };

export default class DataDownloadSteps {

  /**
   * Downloads report from Data Download page with selected file extension
   */
  async downloadDataWithFileExtension(extension: string, entityData: DataObject, bigDataMessageSubject: string = null, messageWaitTimeout = 60000): Promise<void> {
    const result = { foundMessage: null };
    if (bigDataMessageSubject) {
      await Steps.fileFromMessageDownloadSteps.startLookingForMessage(bigDataMessageSubject, result, messageWaitTimeout);
    }

    await editableEntityFields.setFieldValues(entityData);
    await dataDownload.clickRadioBtnWithLabel(extension);
    await dataDownload.generateBtn.click();
    await Steps.modalDialogSteps.confirmIfAsked();
    await Steps.modalDialogSteps.cancelIfAsked();

    if (bigDataMessageSubject) {
      await Steps.fileFromMessageDownloadSteps.getFoundMessage(result, messageWaitTimeout);
    }
  }

  /**
   * Saves a new Data Download template
   */
  async createNewDataDownloadTemplate(entityData: DataObject, templateData: DataObject): Promise<void> {
    await editableEntityFields.setFieldValues(entityData);
    await dataDownload.saveAsBtn.click();
    await editableEntityFields.setFieldValues(templateData);
    await dataDownload.saveTemplateBtn.click();
  }

  /**
   * DATA DOWNLOAD page
   * Updates custom template:
   * - Removes Nth checkbox in Measurements, Calculations and Availability columns
   * - Sets new value in last 3 dropdowns in Measurements and Availability columns
   * - updates name and description
   */
  async updateDataDownloadTemplate({ numberOfCheckbox, numberOfDropdowns, gridName }: { numberOfCheckbox: number; numberOfDropdowns: number; gridName: string }, templateData: DataObject, values: string[]): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;

    await currentGrid.selectNthCheckboxInColumn(numberOfCheckbox, 1); //selects Nth checkbox in Measurements column
    await currentGrid.selectNthCheckboxInColumn(numberOfCheckbox, 2); //selects Nth checkbox in Calculations column
    await currentGrid.selectNthCheckboxInColumn(numberOfCheckbox, 3); //selects Nth checkbox in Availability column

    await currentGrid.updateRetrievalModeDropdownInColumn(numberOfDropdowns, 1, values); //Updates number of dropdowns in Measurements column
    await currentGrid.updateRetrievalModeDropdownInColumn(numberOfDropdowns, 2, values); //Updates number of dropdowns in Calculations column
    await currentGrid.updateRetrievalModeDropdownInColumn(numberOfDropdowns, 3, values); //Updates number of dropdowns in Availability column

    await dataDownload.saveBtn.click();
    await editableEntityFields.setFieldValues(templateData);
    await dataDownload.updateBtn.click();
  }
}

