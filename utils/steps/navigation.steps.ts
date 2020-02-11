import { browser } from "protractor";
import sidebar     from '../../page-objects/components/sidebar.po';
import mainContent from '../../page-objects/main-content.po';

export default class NavigationSteps {

  /**
   * Presses "back" button of the browser
   */
  async goBack(): Promise<void> {
    await browser.navigate().back();
  }

  /**
   * Presses "back" button of the browser
   */
  async goBackUntilPageIs(pageName: string): Promise<void> {
    let counter = 0;
    while ((await mainContent.mainHeader.getText()).trim().toUpperCase() !== pageName.toUpperCase()) {
      counter++;
      if (counter > 9) {
        throw new Error('Too many steps back, perhaps error in the test logic');
      }
      await browser.navigate().back();
    }
  }

  async goToDashboard(): Promise<void> {
    await sidebar.selectRootOption('Dashboard');
  }

  /**
   * Goes to entity creation directly from side menu
   */
  async goToEntityCreation(rootOptionName: string, nestedOptionName: string): Promise<void> {
    await sidebar.selectNestedOption(rootOptionName, nestedOptionName);
  }

  /**
   * Goes to entity management directly from side menu
   */
  async goToEntityManagement(rootOptionName: string, nestedOptionName: string): Promise<void> {
    await sidebar.selectNestedOption(rootOptionName, nestedOptionName);
  }


}