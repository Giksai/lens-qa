declare const allure: any;

import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';
import Actions from '../../utils/actions';

const TestData                   = {
  STANDART_CLIENT                      : '38 Degrees North',
  BIG_DATA_CLIENT                      : 'Goldman Sachs Renewable Power, LLC',

  STANDART_PORTFOLIO_NAME              : 'Perseus',
  BIG_DATA_PORTFOLIO_NAME              : 'URHRP - Utah Red Hills Renewable Park',

  STANDART_PROJECT_NAME                : 'Barton Acres Solar, LLC',
  BIG_DATA_PROJECT_NAME                : 'Utah Red Hills Renewable Park',

  MONTH_DATE_RANGE                     : '12/01/2019 - 12/31/2019',
  DAY_DATE_RANGE                       : '12/01/2019 - 12/01/2019',
};

describe('Data Download.', function () {
  beforeEach(async function () {
    allure.feature('Data Download');
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

  it('20.2 - Can download the hourly data report + 31 day date range (Big Projects)', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('csv', {
        'client'    : TestData.BIG_DATA_CLIENT,
        'portfolio' : TestData.BIG_DATA_PORTFOLIO_NAME,
        'project'   : TestData.BIG_DATA_PROJECT_NAME,
        'date range': TestData.MONTH_DATE_RANGE
      });
      //TODO: add email link check
  });

  it('20.3 - Can download the hourly data report + 1 day date range (Standard Projects)', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('csv', {
        'client'    : TestData.STANDART_CLIENT,
        'portfolio' : TestData.STANDART_PORTFOLIO_NAME,
        'project'   : TestData.STANDART_PROJECT_NAME,
        'date range': TestData.DAY_DATE_RANGE
      });
    await Check.isDownloadedFileExist('csv');
  });

  it('20.4 - Can download the hourly data report + 1 day date range (Big Data Projects)', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('csv', {
        'client'    : TestData.BIG_DATA_CLIENT,
        'portfolio' : TestData.BIG_DATA_PORTFOLIO_NAME,
        'project'   : TestData.BIG_DATA_PROJECT_NAME,
        'date range': TestData.DAY_DATE_RANGE
      });
      //TODO: add email link check
  });
});