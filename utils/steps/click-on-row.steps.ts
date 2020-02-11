/**
 * Clicks on row in different grids.
 */

import entityViewPage from "../../page-objects/entity/entity-view-page.po";
import grid           from "../../page-objects/components/grid/grid.po";

export default class ClickOnRowSteps {
  /**
   * If rowNumber is set, clicks on row with given number (starts with 1).
   * Else if columnNumber and text are both set clicks on result with given text in given column
   */
  async clickOnGridResultWith({ columnNumber, text, rowNumber, gridName }: { columnNumber?: number, text?: string, rowNumber?: number, gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    if (rowNumber === 0) {
      throw new Error('Row numbers must start with 1, not 0!')
    }
    if (rowNumber !== undefined) {
      await currentGrid.clickOnRow(rowNumber - 1);
    } else if (columnNumber !== undefined && text !== undefined) {
      await currentGrid.clickOnResultWith(columnNumber, text);
    } else {
      throw new Error(`Wrong parameters combination in method "clickOnGridResultWith": ${arguments}`);
    }
  }

  async clickViewOnFirstRowWith({ gridName }: { gridName?: string }): Promise<void> {
    const currentGrid = gridName ? entityViewPage.getGrid(gridName) : grid;
    await currentGrid.clickViewOnFirstRow();
  }
}