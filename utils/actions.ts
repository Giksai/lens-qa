/**
 * Collection of complex or non-standard WebDriver actions
 */
import { browser, $, protractor, ElementFinder } from 'protractor';
import * as fs                                   from 'fs';
import * as path                                 from 'path';

export default class Actions {
  /**
   * Confirms native browser alert
   */
  static async confirmAlert(): Promise<void> {
    const alert = await browser.switchTo().alert();
    return alert.accept();
  }

  /**
   * Checks is element both present in DOM and visible
   * Needed because isDisplayed check on non-existing element cause errors in tests
   */
  static async isVisible(elem: ElementFinder): Promise<boolean> {
    const isElementPresent = await elem.isPresent();
    if (!isElementPresent) {
      return false;
    }
    let isElementDisplayed;
    try {
      isElementDisplayed = await elem.isDisplayed(); // not returning in one-line because catch will let errors pass
    } catch (e) { // if element disappears between isPresent and isDisplayed checks
      return false;
    }
    return isElementDisplayed;
  }

  /**
   * Waits for an element to be interactable
   * Usable when some elements appear with animation, during which they are not interactable
   */
  static async waitToBeInteractable(elem: ElementFinder, timeout = 5000): Promise<void> {
    await browser.wait( //Added to improve stability and spontaneous falls
      protractor.ExpectedConditions.elementToBeClickable(elem),
      timeout,
      'Element is not interactable'
    );
  }

  /**
   * Performs scrolling to the top of the page by pressing "Home" button
   */
  static async scrollPageUp(): Promise<void> {
    await $('body').sendKeys(protractor.Key.HOME);
  }

  /**
   * Performs scrolling to the bottom of the page by pressing "End" button
   */
  static async scrollPageDown(): Promise<void> {
    await $('body').sendKeys(protractor.Key.END);
  }

  /**
   * Performs scrolling to the given element location
   */
  static async scrollTo(elem: ElementFinder): Promise<void> {
    await browser.executeScript('arguments[0].scrollIntoView()', elem.getWebElement());
  }

  /**
   * Performs scrolling to the given element location and click on it
   * Added to avoid some "element click intercepted" errors when target element is overlapped
   */
  static async scrollUpUntilElemIsVisibleAndClick(elem: ElementFinder): Promise<void> {
    const location   = await elem.getLocation();
    let newLocationY = location.y;
    for (let i = 0; i < 10; i++) {
      newLocationY = newLocationY - 50;
      try {
        await elem.click();
        break;
      } catch (error) {
        if (i === 9) {
          throw new Error('Scrolling didn`t show element, check page and test logic');
        }
        if (error.message.includes('element click intercepted')) {
          await browser.driver.executeScript(`window.scrollTo(${location.x}, ${newLocationY})`);
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Deletes all files from /downloads if exist
   */
  static async removeAllDownloadedFiles(): Promise<void> {
    const filePath = await path.resolve(__dirname, '../../downloads');
    const files      = await fs.readdirSync(filePath);
    if (files.length > 0) {
      for (const file of files) {
        await fs.unlinkSync(path.join(filePath, file))
      }
    }
  }

  /**
   * Universal function to wait for a custom condition
   * @param predicate custom condition
   * @param timeout time in milliseconds before function will fail
   */
  static async waitFor(predicate: Function, timeout = 5000, askingFrequency = 500): Promise<boolean> {
    while (await predicate() === false) {
      await browser.sleep(askingFrequency);
      timeout -= askingFrequency
      if (timeout <= 0) return false;
    }
    return true;
  }

  /**
   * Automatically opens a new window, downloads a file and closes it
   */
  static async downloadFileByLink(link: string): Promise<void> {
    await browser.executeScript(`window.open(arguments[0], '_blank')`, link);
  }

  /**
   * Gets a correct report download link from mail message
   */
  static extractLinkFromMessageBody(body: string): string {
    body = body
      .replace(/=\r\n/g, '')    //removes ENTERS and '='
      .replace(/&amp;/g, '&')   //removes excessive symbols
      .replace(/=3D/g, '=');    //removes excessive symbols
    const regex = /((https?:\/\/|ftp:\/\/|www\.|[^\s:=]+@www\.).*?[a-z_\/0-9\-\#=&])(?=(\.|,|;|\?|\!)?("|'|«|»|\[|\s|\r|\n|$))/gm;
    const allLinks = body.match(regex);
    return allLinks[5];
  }

  /**
   * Opens a separate window and switches to it
   */
  static async openNewWindow(): Promise<void> {
    await browser.executeScript('window.open()');
    const handles = await browser.getAllWindowHandles();
    await this.switchToWindow({
      windowHandle: handles[handles.length - 1]
    });
  }

  /**
   * Switches to the window with the given index or window handle
   */
  static async switchToWindow({ index = null, windowHandle = null }: { index?: number; windowHandle?: string }): Promise<void> {
    let targetWindowHandle: string;
    if (index) {
      const handles = await browser.getAllWindowHandles();
      targetWindowHandle = handles[index];
    }
    if (windowHandle) {
      targetWindowHandle = windowHandle;
    }
    await browser.switchTo().window(targetWindowHandle);
  }

  static async closeCurrentWindow(): Promise<void> {
    await browser.driver.close();
  }
}