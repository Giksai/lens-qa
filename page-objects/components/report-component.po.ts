/**
 * represents every component in create report page
 */

import { $$, $, by, ElementFinder, browser, element } from 'protractor';

type ComponentsArrayElement = { [componentName: string]: ReportComponent };

class ReportComponent {
  private static rootElement(componentName: string): ElementFinder {
    return element(by.partOfChildTextIgnoringCase('div[ui-tree-node]', 'span', componentName));
  }

  private static positioningBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).$('i[ui-tree-handle]');
  }

  private static nameLabel(componentName: string): ElementFinder {
    return this.rootElement(componentName).$(`span:contains('${componentName}')`);
  }

  private static previewBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).element(by.childTextIgnoringCase('button', 'span', 'Preview'));
  }
  
  private static hideBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).element(by.childTextIgnoringCase('button', 'span', 'Hide'));
  }

  private static addToReportBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).element(by.childTextIgnoringCase('button', 'span', 'Add to Report'));
  }
  
  private static removeFromReportBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).element(by.childTextIgnoringCase('button', 'span', 'Remove from Report'));
  }

  private static addTextBlockBtn(componentName: string): ElementFinder {
    return this.rootElement(componentName).element(by.cssContainingText(''));
  }

  static async isTextBlockAdded(componentName: string): Promise<boolean> {
    if(await this.isAddedToReport(componentName)) {

    }
    return false;
  }

  static async isAddedToReport(componentName: string): Promise<boolean> {
    return await this.removeFromReportBtn(componentName).isDisplayed();
  }

  /**
   * Drags current component to component with given name
   * Note: if dragging up - it will move above target component, but when moving down - it won't
   */
  static async dragToComponent(componentName: string, dragToComponent: string): Promise<void> {
    await browser.actions()
      .dragAndDrop(this.positioningBtn(componentName), this.nameLabel(dragToComponent))
      .perform();
  }
  
  // static async getAllComponents(): Promise<ComponentsArrayElement[]> {
  //   const allComponentLabels = $$(`span[data-ng-bind]`);
  //   const componentsArray: ComponentsArrayElement[] = [];
  //   for (const componentLabel of await allComponentLabels.getWebElements()) {
  //     const componentsArrayElement = {};
  //     componentsArrayElement[await componentLabel.getText()] = new ReportComponent(await componentLabel.getText());
  //     componentsArray.push(componentsArrayElement);
  //   }
  //   return componentsArray;
  // }
}

export default ReportComponent;