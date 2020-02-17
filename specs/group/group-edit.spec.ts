declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData         = {
  GROUP_NAME               : 'regression TEST Group',
  INITIAL_CLIENT           : '38 Degrees North',
  NEW_CLIENT               : 'Axium Infrastructure',
  INITIAL_GROUP_DESCRIPTION: 'Initial TEST group description',
  NEW_GROUP_NAME           : 'UPDATED regression TEST Group',
  NEW_GROUP_DESCRIPTION    : 'UPDATED TEST group description',
};
const numberOfProjects = 3;
const PROJECT          = 'Project';

describe('Group. Editing', function () {
  beforeEach(async function () {
    allure.feature('Group');
    allure.story('Editing');
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Group');
    await Steps.groupSteps.submitGroupWith(numberOfProjects, {
      'client'           : TestData.INITIAL_CLIENT,
      'name'             : TestData.GROUP_NAME,
      'group description': TestData.INITIAL_GROUP_DESCRIPTION
    });
    await Check.isOnPage(TestData.GROUP_NAME);
    await Check.isCurrentEntityDataEqual({
      client     : TestData.INITIAL_CLIENT,
      name       : TestData.GROUP_NAME,
      description: TestData.INITIAL_GROUP_DESCRIPTION
    });
    await Check.isGridResultsCount(numberOfProjects, PROJECT);
  });

  afterEach(async function () {
    await Steps.deleteCurrentlyViewedEntity();
  });

  it('17.1 - Can edit group name', async function () {
    await Steps.updateCurrentEntity({ name: TestData.NEW_GROUP_NAME });
    await Check.isOnPage(TestData.NEW_GROUP_NAME);
  });

  it('17.2 - Can edit client', async function () {
    await Steps.editCurrentEntity({
      client: TestData.NEW_CLIENT
    });
    await Steps.groupSteps.changeCurrentGroupClient(numberOfProjects);
    await Check.isOnPage(TestData.GROUP_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.NEW_CLIENT });
  });

  it('17.3 - Can edit group description', async function () {
    await Steps.updateCurrentEntity({ 'group description': TestData.NEW_GROUP_DESCRIPTION });
    await Check.isOnPage(TestData.GROUP_NAME);
    await Check.isCurrentEntityDataEqual({ description: TestData.NEW_GROUP_DESCRIPTION });
  });

  it('17.4 - Can edit project quantity', async function () {
    await Steps.editCurrentEntity();
    await Steps.groupSteps.removeFirstProjectFromCurrentGroup();
    await Check.isOnPage(TestData.GROUP_NAME);
    await Check.isGridResultsCount(numberOfProjects - 1, PROJECT);
  });
});