/**
 * Page on root app url when user is not logged in
 */

import { $, element, by, browser, ElementFinder } from 'protractor';

class LoginPage {
  get loginField(): ElementFinder {
    return $('#email');
  }

  get loginBtn(): ElementFinder {
    return $('[value="Login"]');
  }

  get passwordField(): ElementFinder {
    return $('#password');
  }

  get invalidLoginWarning(): ElementFinder {
    return element(by.cssContainingText('.alert.alert-danger', 'Invalid login credentials'));
  }

  async login({ login = browser.params.defaultUser.login, password = browser.params.defaultUser.password }: { login?: string, password?: string } = {}) {
    await this.loginField.sendKeys(login);
    await this.passwordField.sendKeys(password);
    await this.loginBtn.click();
  }
}

export default new LoginPage();