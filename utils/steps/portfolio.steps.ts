import editableEntityFields                   from '../../page-objects/entity/editable-entity-fields.po';
import addNewEntityPage                       from '../../page-objects/entity/add-new-entity-page.po';

type DataObject = { [key: string]: string };

export default class PortfolioSteps {
  /**
   * Works just like "submitSimplePortfolio", but checks "is Under Management" checkbox and fills corresponding fields
   * ! Do not use this method if "ADD NEW PORTFOLIO" page state is polluted and checkbox is already checked
   */
  async submitPortfolioUnderManagement({ name, client, assignee }: DataObject = {}): Promise<void> {
    await editableEntityFields.fillSimplePortfolioData({
      name,
      client
    });
    await editableEntityFields.enableUnderManagementCheckbox();
    await addNewEntityPage.assignAllManagementRolesTo(assignee);
    await addNewEntityPage.submitBtn.click();
  }

  /**
   * Only submit form with given data, don't close the dialogs after submit
   * If used without params will try to submit empty form
   * @param {Object} - collection of key-value pairs, for example:
   *                   {name: 'foo', client: 'bar'}
   */
  async submitSimplePortfolio({ name, client }: DataObject = {}): Promise<void> {
    await editableEntityFields.fillSimplePortfolioData({
      name,
      client
    });
    await addNewEntityPage.submitBtn.click();
  }

  /**
   * Clicks on given portfolio field and trigger options to appear (only for select fields)
   */
  async showOptionsForPortfolioUnderManagementField(fieldName: string): Promise<void> {
    await editableEntityFields.enableUnderManagementCheckbox();
    await editableEntityFields.getFieldElement(fieldName).click();
  }
}