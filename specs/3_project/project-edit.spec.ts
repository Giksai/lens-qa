declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME      : 'Test_portfolio_do_not_touch',
  INITIAL_PROJECT_NAME: 'regression test project',
  NEW_PROJECT_NAME    : 'new test project',
  INITIAL_CLIENT      : '38 Degrees North',
  NEW_BILLER_NAME     : 'Tyrion Lannister',
  BILLING_NAME        : 'John Snow',
  NEW_CLIENT          : 'DC Solar',
  INITIAL_ASSIGNEE    : '_ Support at Radian',
  NEW_ASSET_MANAGER   : '_CI _Support'
};

describe('Project. Editing', function () {
  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Editing');
    await Steps.navigationSteps.goToEntityCreation('Projects', 'Add New Project');
    await Steps.submitNewEntity({
      'name'      : TestData.INITIAL_PROJECT_NAME,
      'client'    : TestData.INITIAL_CLIENT,
      'portfolio' : TestData.PORTFOLIO_NAME,
      'buyer name': TestData.BILLING_NAME
    });
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual({ portfolio: TestData.PORTFOLIO_NAME });
  });

  afterEach(async function () {
    await Steps.deleteCurrentlyViewedEntity();
  });

  it('10.1 - Can edit project name', async function () {
    await Steps.updateCurrentEntity({ name: TestData.NEW_PROJECT_NAME });
    await Check.isOnPage(TestData.NEW_PROJECT_NAME);
  });

  it('10.2 - Can edit client name', async function () {
    await Steps.updateCurrentEntity({
      client   : TestData.NEW_CLIENT,
      portfolio: TestData.PORTFOLIO_NAME
    });
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.NEW_CLIENT });
  });

  it('10.3 - Can cancel data editing', async function () {
    await Steps.editCurrentEntity({
      name  : TestData.NEW_PROJECT_NAME,
      client: TestData.NEW_CLIENT
    });
    await Steps.cancelEntityChanges();
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.INITIAL_CLIENT });
  }); // add more variations if needed

  it('10.4 - Can edit another information on Project page (Biller Name field)', async function () {
    await Steps.updateCurrentEntity({ 'biller name': TestData.NEW_BILLER_NAME });
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual({
      'client'     : TestData.INITIAL_CLIENT,
      'portfolio'  : TestData.PORTFOLIO_NAME,
      'buyer name' : TestData.BILLING_NAME,
      'biller name': TestData.NEW_BILLER_NAME
    });
  }); // TODO add more tests on editing other assignee fields if needed

  it('10.5 - Can edit a Project information via manage projects page (Biller Name field)', async function () {
    await Steps.navigationSteps.goToEntityManagement('Projects', 'Manage Projects');
    await Steps.filteringSteps.filterGridByColumnName({ project: TestData.INITIAL_PROJECT_NAME });
    await Check.isFilteredGridResultsCount(1);

    await Steps.updateFirstFilteredGridRow({ 'biller name': TestData.NEW_BILLER_NAME });

    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual({
      'client'     : TestData.INITIAL_CLIENT,
      'portfolio'  : TestData.PORTFOLIO_NAME,
      'buyer name' : TestData.BILLING_NAME,
      'biller name': TestData.NEW_BILLER_NAME
    });
  }); // TODO add more tests on editing other assignee fields if needed
});