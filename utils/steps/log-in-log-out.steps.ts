import { browser } from "protractor";
import header      from '../../page-objects/components/header.po';
import modalDialog from '../../page-objects/components/modal-dialog.po';
import loginPage   from '../../page-objects/login-page.po';

export default class LogInLogOutSteps {

  /**
   * Logs into the application.
   * Will use default user if no credentials are passed (see protractor.conf).
   * ! Will not work correctly if already logged in !
   */
  async login(credentials: { login?: string; password?: string } = {}): Promise<void> {
    await browser.get('/');
    await loginPage.login(credentials);

    // closing dialog on staging
    const isDialogShown = await modalDialog.isShown();
    if (isDialogShown) {
      await modalDialog.noBtn.click();
    }
  }

  /**
   * Logs out from the application
   */
  async logout(): Promise<void> {
    await header.profileImage.click();
    await header.selectMenuOption('Logout');
  }
}
