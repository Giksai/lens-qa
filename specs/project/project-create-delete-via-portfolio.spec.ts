declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME: 'regression test portfolio',
  PROJECT_NAME  : 'regression test project',
  CLIENT        : '38 Degrees North',
  ASSIGNEE      : '_ Support at Radian'
};

xdescribe('Project. Actions with project via Portfolio.', function () {
  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Actions with project via Portfolio');
    await Steps.createPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      client  : TestData.CLIENT,
      assignee: TestData.ASSIGNEE
    });
    await Steps.addNewChildEntity('Project');
  });

  afterEach(async function () {
    await Steps.navigationSteps.goBack(); // going to current portfolio page
    await Steps.deleteCurrentlyViewedEntity();
    await Steps.navigationSteps.goToDashboard();
  });

  it('7.2 - Can create Project through Portfolio page', async function () {
    await Steps.submitNewEntity({ name: TestData.PROJECT_NAME });
    await Check.isOnPage(TestData.PROJECT_NAME);
    await Steps.deleteCurrentlyViewedEntity();
  });

  it('7.4 - Can go to "ADD NEW PROJECT" page through Portfolio page', async function () {
    await Check.isOnPage('ADD NEW PROJECT');
  });

  it('7.5 - Cannot create Project without name', async function () {
    await Steps.submitNewEntity();
    await Check.isValidationErrorsShown(['Please enter a name for your project']);
  });
});