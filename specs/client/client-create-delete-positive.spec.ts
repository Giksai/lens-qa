declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  CLIENT_NAME: 'regression test client'
};

describe('Client. Creation and deletion - positive cases', function () {
  beforeEach(async function () {
    allure.feature('Client');
    allure.story('Creation and deletion - positive cases');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard();
  });

  it('13.1 - Can create and delete a client', async function () {
    await Steps.navigationSteps.goToEntityCreation('Clients', 'Add New Client');
    await Check.isOnPage('ADD NEW CLIENT');

    await Steps.submitNewEntity({ name: TestData.CLIENT_NAME });
    await Check.isOnPage(TestData.CLIENT_NAME);

    //deletion with name confirmation and check
    await Steps.deleteCurrentlyViewedEntity({ confirm: TestData.CLIENT_NAME });
    await Check.isOnPage('ADD NEW CLIENT');
  });

  it('13.2 - Can create and delete a client via Manage clients page', async function () {
    await Steps.navigationSteps.goToEntityManagement('Clients', 'Manage Clients');
    await Steps.addNewEntityFromManagePage({ name: TestData.CLIENT_NAME });
    await Check.isOnPage(TestData.CLIENT_NAME);

    await Steps.navigationSteps.goToEntityManagement('Clients', 'Manage Clients');
    await Steps.filteringSteps.filterGridBy({ name: TestData.CLIENT_NAME });
    await Check.isGridResultsCount(1);

    //deletion with name confirmation and check
    await Steps.deleteFirstGridRow('', { confirm: TestData.CLIENT_NAME });
    await Check.isOnPage('MANAGE CLIENTS');
    await Check.isNoGridResults();
  });
});