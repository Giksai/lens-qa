declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const adminCredentials = {
  login   : '',
  password: ''
};
const userCredentials  = {
  login   : '',
  password: ''
};
const TestData         = {
  PORTFOLIO_NAME    : 'regression test portfolio',
  CLIENT            : '38 Degrees North',
  ASSIGNEE_FOR_ADMIN: '_ Support at Radian',
  ASSIGNEE_FOR_USER : 'Client Test Client'
};

xdescribe('Portfolio. Email visibility', function () {
  beforeEach(async function () {
    allure.feature('Portfolio');
    allure.story('Email visibility');
    await Steps.logInLogOutSteps.logout();
  });

  afterEach(async function () {
    await Steps.logInLogOutSteps.logout();
    await Steps.logInLogOutSteps.login();
  });

  it('5.1 - Emails are not visible to the user on "ADD NEW PORTFOLIO" page.', async function () {
    await Steps.logInLogOutSteps.login(userCredentials);
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Steps.portfolioSteps.showOptionsForPortfolioUnderManagementField('Asset Manager');
    await Check.isNoEmailInOptions();
  });

  it('5.2 - Emails are not visible to the user on portfolio edit page', async function () {
    await Steps.logInLogOutSteps.login(userCredentials);
    await Steps.createPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      assignee: TestData.ASSIGNEE_FOR_USER
    });
    await Steps.editCurrentEntity();
    await Steps.portfolioSteps.showOptionsForPortfolioUnderManagementField('Asset Manager');
    await Check.isNoEmailInOptions();

    // test state cleanup
    await Steps.cancelEntityChanges();
    await Steps.deleteCurrentlyViewedEntity();
  });

  it('5.3 - Emails are visible to the admin on "ADD NEW PORTFOLIO" page.', async function () {
    await Steps.logInLogOutSteps.login(adminCredentials);
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Steps.portfolioSteps.showOptionsForPortfolioUnderManagementField('Asset Manager');
    await Check.isEmailInOptions();
  });

  it('5.4 - Emails are visible to the admin on portfolio edit page.', async function () {
    await Steps.logInLogOutSteps.login(adminCredentials);
    await Steps.createPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      client  : TestData.CLIENT,
      assignee: TestData.ASSIGNEE_FOR_ADMIN
    });
    await Steps.editCurrentEntity();
    await Steps.portfolioSteps.showOptionsForPortfolioUnderManagementField('Asset Manager');
    await Check.isEmailInOptions();

    // test state cleanup
    await Steps.cancelEntityChanges();
    await Steps.deleteCurrentlyViewedEntity();
  });
});