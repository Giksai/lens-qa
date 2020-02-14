declare const allure: any;

import Actions from '../../utils/actions';
import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData         = {
  PORTFOLIO_NAME              : 'Perseus',
  CLIENT                      : '38 Degrees North',
  PROJECT_NAME                : 'Barton Acres Solar, LLC',
  INITIAL_TEMPLATE_NAME       : 'initial test template',
  INITIAL_TEMPLATE_DESCRIPTION: 'initial test template description',
  HOURLY_TIME_INTERVAL        : 'Hourly',
  FIFTEEN_MIN_TIME_INTERVAL   : '15 minutes',
  DAILY_TIME_INTERVAL         : 'Daily',
  RAW_TIME_INTERVAL           : 'Raw'
};
const CUSTOM_TEMPLATES = 'Custom templates';
const initialTemplate  = {
  columnNumber: 1,
  text        : TestData.INITIAL_TEMPLATE_NAME,
  gridName    : CUSTOM_TEMPLATES
};

describe('Data Download. Templates - Creation and deletion.', function () {
  beforeEach(async function () {
    allure.feature('Data Download');
    allure.story('Templates - Creation and deletion.');
  });

  afterEach(async function () {
    await Actions.scrollPageUp();
  });

  it('19.1 - Can create and delete new template with hourly time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
    await Steps.dataDownloadSteps.createNewDataDownloadTemplate({
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    }, {
      'data download template name'       : TestData.INITIAL_TEMPLATE_NAME,
      'data download template description': TestData.INITIAL_TEMPLATE_DESCRIPTION
    });

    await Check.isGridHaveResult(initialTemplate);

    //Deletion and check
    await Steps.deleteGridResultWith(initialTemplate);
    await Check.isNoGridResults(initialTemplate);
  });

  it('19.2 - Can create and delete new template with 15min time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
    await Steps.dataDownloadSteps.createNewDataDownloadTemplate({
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    }, {
      'data download template name'       : TestData.INITIAL_TEMPLATE_NAME,
      'data download template description': TestData.INITIAL_TEMPLATE_DESCRIPTION,
      'data download template time int'   : TestData.FIFTEEN_MIN_TIME_INTERVAL
    });

    await Check.isGridHaveResult(initialTemplate);

    //Deletion and check
    await Steps.deleteGridResultWith(initialTemplate);
    await Check.isNoGridResults(initialTemplate);
  });

  it('19.3 - Can create and delete new template with Daily time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
    await Steps.dataDownloadSteps.createNewDataDownloadTemplate({
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    }, {
      'data download template name'       : TestData.INITIAL_TEMPLATE_NAME,
      'data download template description': TestData.INITIAL_TEMPLATE_DESCRIPTION,
      'data download template time int'   : TestData.DAILY_TIME_INTERVAL
    });

    await Check.isGridHaveResult(initialTemplate);

    //Deletion and check
    await Steps.deleteGridResultWith(initialTemplate);
    await Check.isNoGridResults(initialTemplate);
  });

  it('19.4 - Can create and delete new template with Raw time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
    await Steps.dataDownloadSteps.createNewDataDownloadTemplate({
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    }, {
      'data download template name'       : TestData.INITIAL_TEMPLATE_NAME,
      'data download template description': TestData.INITIAL_TEMPLATE_DESCRIPTION,
      'data download template time int'   : TestData.RAW_TIME_INTERVAL
    });

    await Check.isGridHaveResult(initialTemplate);

    //Deletion and check
    await Steps.deleteGridResultWith(initialTemplate);
    await Check.isNoGridResults(initialTemplate);
  });
});