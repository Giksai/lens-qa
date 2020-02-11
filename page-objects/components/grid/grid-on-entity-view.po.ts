/**
 * Page Object for different Grids on the bottom of the entity view page
 */

import { by, ElementFinder } from 'protractor';
import { Grid }              from './grid.po';

export default class GridOnEntityView extends Grid {
  constructor(rootElement: ElementFinder) {
    super(rootElement);
  };

  get addNewBtn(): ElementFinder {
    return this.rootElement.element(by.cssContainingText('.header-button', 'Add New'));
  }
}