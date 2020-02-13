declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  GROUP_NAME               : 'regression TEST Group',
  INITIAL_CLIENT           : '38 Degrees North',
  INITIAL_GROUP_DESCRIPTION: 'Initial TEST group description'
};
const numberOfProjects = 5;

xdescribe('Group. Creation and deletion - positive cases', function () {
  beforeEach(async function () {
    allure.feature('Group');
    allure.story('Creation and deletion - positive cases');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard();
  });

  it('16.1 - Can create and delete a group', async function () {
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Group');
    await Check.isOnPage('ADD NEW GROUP');

    await Steps.groupSteps.submitGroupWith(numberOfProjects, {
      'client'           : TestData.INITIAL_CLIENT,
      'name'             : TestData.GROUP_NAME,
      'group description': TestData.INITIAL_GROUP_DESCRIPTION
    });

    await Check.isOnPage(TestData.GROUP_NAME);

    //deletion and check
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW GROUP');
  });
});