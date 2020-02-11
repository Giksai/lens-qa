import grid                 from '../../page-objects/components/grid/grid.po';
import editEntityPage       from '../../page-objects/entity/edit-entity-page.po';
import addNewEntityPage     from '../../page-objects/entity/add-new-entity-page.po';
import editableEntityFields from '../../page-objects/entity/editable-entity-fields.po';

type DataObject = { [key: string]: string };

export default class GroupSteps {

  /**
   * Submits a new group with needed amount of projects
   */
  async submitGroupWith(numberOfProjects: number, entityData: DataObject): Promise<void> {
    await editableEntityFields.setFieldValues(entityData);
    await grid.selectCheckboxesFromGrid(numberOfProjects);
    await addNewEntityPage.createBtn.click();
  }

  /**
   * Changes group client with needed amount of projects
   */
  async changeCurrentGroupClient(numberOfProjects: number): Promise<void> {
    await grid.selectCheckboxesFromGrid(numberOfProjects);
    await editEntityPage.updateBtn.click();
  }

  /**
   * Removes first project from group
   */
  async removeFirstProjectFromCurrentGroup(): Promise<void> {
    await grid.removeFirstCheckboxFromGrid();
    await editEntityPage.updateBtn.click();
  }
}