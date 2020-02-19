declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME      : 'regression test portfolio',
  INITIAL_PROJECT_NAME: 'regression test project',
  NEW_PROJECT_NAME    : 'second regression test project',
  INITIAL_CLIENT      : '38 Degrees North',
  NEW_CLIENT          : 'Axium Infrastructure',
  ASSIGNEE            : '_ Support at Radian',
  GROUP               : 'Dudley',
  DC_RATING           : '23023',
  AC_RATING           : '11111',
  INSTALLATION_TYPE   : 'Horizontal Tracker',
  GCR                 : '23',
  AXIS_AZIMUTH        : 'tracker',
  EAST_RANGE          : '93',
  WEST_RANGE          : '111',
  TRACKING_MODE       : 'Backtracking',
  LOSSES              : '11'
};

describe('Project. Actions with project via Portfolio.', function () {
  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Actions with project via Portfolio');
    await Steps.createPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      client  : TestData.INITIAL_CLIENT,
      assignee: TestData.ASSIGNEE
    });
    await Steps.addNewChildEntity('Project');
  });

  afterEach(async function () {
    await Steps.navigationSteps.goToDashboard();
  });

  it('7.1 - Can correctly edit Project created via Portfolio page', async function () {
    const notRequiredFieldsDataInput = {
      'groups'           : TestData.GROUP,
      'dc rating'        : TestData.DC_RATING,
      'ac rating'        : TestData.AC_RATING,
      'installation type': TestData.INSTALLATION_TYPE,
      'gcr'              : TestData.GCR,
      'axis azimuth'     : TestData.AXIS_AZIMUTH,
      'east range'       : TestData.EAST_RANGE,
      'west range'       : TestData.WEST_RANGE,
      'tracking mode'    : TestData.TRACKING_MODE,
      'losses'           : TestData.LOSSES
    };
    await Steps.submitNewEntity({ name: TestData.INITIAL_PROJECT_NAME });
    await Steps.updateCurrentEntity({ name: TestData.NEW_PROJECT_NAME, ...notRequiredFieldsDataInput });
    await Check.isOnPage(TestData.NEW_PROJECT_NAME);
    await Check.isCurrentEntityDataEqual(notRequiredFieldsDataInput);

    // test state cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.deleteCurrentlyViewedEntity();
  });

  it('7.3 - Can find and delete project on the Project Management page', async function () {
    await Steps.submitNewEntity({ name: TestData.INITIAL_PROJECT_NAME });
    await Steps.navigationSteps.goToEntityManagement('Projects', 'Manage Projects');
    await Steps.filteringSteps.filterGridByColumnName({ project: TestData.INITIAL_PROJECT_NAME });
    await Check.isFilteredGridResultsCount(1);

    // test state cleanup
    await Steps.deleteFirstFilteredGridRow();
    await Check.isFilteredGridResultsCount(0);
    await Steps.navigationSteps.goToEntityManagement('Portfolios', 'Manage Portfolios');
    await Steps.filteringSteps.filterGridByColumnName({ name: TestData.PORTFOLIO_NAME });
    await Steps.deleteFirstFilteredGridRow();
    await Check.isFilteredGridResultsCount(0);
  });
});