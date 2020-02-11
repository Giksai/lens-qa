declare const allure: any;
import Steps from '../utils/steps/steps';
import Check from '../utils/check';

const adminCredentials   = {
  login   : '',
  password: ''
};
const userCredentials    = {
  login   : '',
  password: ''
};
const invalidCredentials = {
  login   : '',
  password: ''
};


describe('Authentication. Logging in and out.', function () {
  beforeEach(async function () {
    allure.feature('Authentication');
    allure.story('Logging in and out');
    await Steps.logInLogOutSteps.logout();
  });

  afterEach(async function () {
    await Steps.logInLogOutSteps.login();
  });

  it('1.1 - Can login as admin user', async function () {
    await Steps.logInLogOutSteps.login(adminCredentials);
    await Check.isOnPage('DASHBOARD');

    await Steps.logInLogOutSteps.logout(); // additional cleanup of test state before "afterEach"
  });

  it('1.2 - Can login as non admin user', async function () {
    await Steps.logInLogOutSteps.login(userCredentials);
    await Check.isOnPage('DASHBOARD');

    await Steps.logInLogOutSteps.logout(); // additional cleanup of test state before "afterEach"
  });

  it('1.3 - Can logout correctly', async function () {
    await Check.isLoggedOut();
  });

  it('1.4 - Cannot login with invalid password', async function () {
    await Steps.logInLogOutSteps.login(invalidCredentials);
    await Check.isInvalidLoginWarningDisplayed();
  });
});