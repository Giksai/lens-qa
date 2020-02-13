declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  CLIENT_NAME    : 'regression test client',
  NEW_CLIENT_NAME: 'UPDATED regression test client',
  COMMENTS       : 'TEST comment',
  NEW_COMMENT    : 'UPDATED TEST comment'
};

xdescribe('Client. Editing', function () {
  beforeEach(async function () {
    allure.feature('Client');
    allure.story('Editing');
    await Steps.navigationSteps.goToEntityCreation('Clients', 'Add New Client');
    await Steps.submitNewEntity({
      name    : TestData.CLIENT_NAME,
      comments: TestData.COMMENTS
    });
    await Check.isOnPage(TestData.CLIENT_NAME);
    await Check.isCurrentEntityDataEqual({ comments: TestData.COMMENTS });
  });

  afterEach(async function () {
    //deletion with name confirmation and check
    await Steps.navigationSteps.goToEntityManagement('Clients', 'Manage Clients');
    await Steps.filteringSteps.filterGridBy({ name: TestData.NEW_CLIENT_NAME });
    await Check.isGridResultsCount(1);
    await Steps.deleteFirstGridRow('', { confirm: TestData.NEW_CLIENT_NAME });
    await Check.isOnPage('MANAGE CLIENTS');
    await Check.isNoGridResults();
  });

  it('14.1 - Can edit Client page (Name and comments fields)', async function () {
    await Steps.updateCurrentEntity({
      name    : TestData.NEW_CLIENT_NAME,
      comments: TestData.NEW_COMMENT
    });
    await Check.isOnPage(TestData.NEW_CLIENT_NAME);
    await Check.isCurrentEntityDataEqual({ comments: TestData.NEW_COMMENT });
  });
});