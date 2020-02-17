import gridFilter         from "../../page-objects/components/grid/grid-filter.po";
import gridFilterByColumn from "../../page-objects/components/grid/grid-filter-by-column.po";
import Actions                  from '../../utils/actions';

type DataObject = { [key: string]: string };

export default class FilteringSteps {

  /**
   * Performs grid filtering
   * @param condition - if string, will perform search via basic filter, if object - via advanced for each field in object
   */
  async filterGridBy(condition: DataObject | string): Promise<void> {
    await gridFilter.showFilterBtn.click();
    if (typeof condition === 'string') { // searching via basic filter
      await Actions.waitToBeInteractable(gridFilter.searchField);
      await gridFilter.searchField.clear();
      await gridFilter.searchField.sendKeys(condition);
    } else { // searching via advanced filter
      await Actions.waitToBeInteractable(gridFilter.advancedFilterBtn);
      await gridFilter.advancedFilterBtn.click();
      for (let fieldName of Object.keys(condition)) {
        const advancedField = gridFilter.getAdvancedField(fieldName);
        await advancedField.clear();
        await advancedField.sendKeys(condition[fieldName]);
      }
    }
    await gridFilter.closeBtn.click();
  }

  /**
   * Performs grid filtering by column name
   */
  async filterGridByColumnName(condition: DataObject): Promise<void> {
    for (let fieldName of Object.keys(condition)) {
      const searchField = gridFilterByColumn.getSimpleTextFilter(fieldName);
      await searchField.clear();
      await searchField.sendKeys(condition[fieldName]);
    }
  }
}
