import { protractor } from "protractor";
import Actions        from "../actions";
import modalDialog    from '../../page-objects/components/modal-dialog.po';

export default class ModalDialogSteps {
  /**
   * Confirms custom application dialog. To confirmIfAsked browser alert see actions.js#confirmAlert
   */
  async confirmModalDialog(): Promise<void> {
    const confirmBtn = await Actions.isVisible(modalDialog.okBtn) ? modalDialog.okBtn : modalDialog.yesBtn;
    await confirmBtn.click();
  }

  /**
   * Skips custom application dialog. To confirmIfAsked browser alert see actions.js#confirmAlert
   */
  async skipModalDialog(): Promise<void> {
    await Actions.isVisible(modalDialog.skipBtn);
    const skipBtn = modalDialog.skipBtn;
    await skipBtn.click();
  }

  /**
   * Confirms modal dialog or alert if something of it is present on the page
   */
  async confirmIfAsked() {
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
}