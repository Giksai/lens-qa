/**
 * Works with equipment grip on Project page
 */

import entityViewPage from "../../page-objects/entity/entity-view-page.po";
import grid           from "../../page-objects/components/grid/grid.po";

export default class ProjectSteps {

  async clickOnEquipmentGridResultWith({ text, gridName }: { text?: string; gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.clickOnEquipmentRow(text);
  }

  async addTicketFromEquipmentGrid(entityGridName: string): Promise<void> {
    const currentGrid = entityGridName ? entityViewPage.getGrid(entityGridName) : grid;
    await currentGrid.pressAddTicketFromEquipmentGrid();
  }

}