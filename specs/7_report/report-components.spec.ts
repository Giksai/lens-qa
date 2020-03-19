declare const allure: any;

import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';
import Actions from '../../utils/actions';

const TestData = {
  STANDART_CLIENT: '38 Degrees North',
};

const AllComponentsNames = {
  
}


describe('Data Download.', function () {
  beforeEach(async function () {
    allure.feature('Report');
    allure.story('Components');
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
  });

  afterEach(async function () {
    await Steps.navigationSteps.goToDashboard();
    await Actions.removeAllDownloadedFiles();
  });

  it('20.1 - Can download the hourly data report + 31 day date range (Standard Projects)', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('csv', {
        'client'    : TestData.STANDART_CLIENT,
        'portfolio' : TestData.STANDART_PORTFOLIO_NAME,
        'project'   : TestData.STANDART_PROJECT_NAME,
        'date range': TestData.MONTH_DATE_RANGE
      });
    await Check.isDownloadedFileExist('csv');
  });
});