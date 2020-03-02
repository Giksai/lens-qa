import { protractor } from "protractor";
import Actions        from "../actions";
import modalDialog    from '../../page-objects/components/modal-dialog.po';

export default class ModalDialogSteps {
  /**
   * Confirms custom application dialog. To confirmIfAsked browser alert see actions.js#confirmAlert
   */
  async confirmModalDialog(): Promise<void> {
    let confirmBtn;
    if (await Actions.isVisible(modalDialog.okBtn)) {
      confirmBtn = modalDialog.okBtn;
    }
    if (await Actions.isVisible(modalDialog.yesBtn)) {
      confirmBtn = modalDialog.yesBtn;
    }
    if (await Actions.isVisible(modalDialog.proceedBtn)) {
      confirmBtn = modalDialog.proceedBtn;
    }
    await confirmBtn.click();
  }

  async cancelModalDialog(): Promise<void> {
    let cancelBtn;
    if (await Actions.isVisible(modalDialog.noBtn)) {
      cancelBtn = modalDialog.noBtn;
    }
    if (await Actions.isVisible(modalDialog.cancelBtn)) {
      cancelBtn = modalDialog.cancelBtn;
    }
    if (await Actions.isVisible(modalDialog.closeBtn)) {
      cancelBtn = modalDialog.closeBtn;
    }
    await cancelBtn.click();
  }

  /**
   * Skips custom application dialog. To confirmIfAsked browser alert see actions.js#confirmAlert
   */
  async skipModalDialog(): Promise<void> {
    await Actions.waitToBeInteractable(modalDialog.skipBtn);
    const skipBtn = modalDialog.skipBtn;
    await skipBtn.click();
  }

  /**
   * Confirms modal dialog or alert if something of it is present on the page
   */
  async confirmIfAsked(): Promise<void> {
    try {
      if (await protractor.ExpectedConditions.alertIsPresent()()) {
        await Actions.confirmAlert();
      }
    } catch (error) {
      if (error.name !== 'NoSuchAlertError') {
        throw error;
      }
    } finally {
      if (await modalDialog.isShown()) {
        await this.confirmModalDialog();
      }
    }
  }

  async cancelIfAsked(): Promise<void> {
    try {
      if (await protractor.ExpectedConditions.alertIsPresent()()) {
        await Actions.confirmAlert();
      }
    } catch (error) {
      if (error.name !== 'NoSuchAlertError') {
        throw error;
      }
    } finally {
      if (await modalDialog.isShown()) {
        await this.cancelModalDialog();
      }
    }
  }
}