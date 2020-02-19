declare const allure: any;
import Actions from '../../utils/actions';
import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME     : 'Perseus',
  CLIENT             : '38 Degrees North',
  PROJECT_NAME       : 'Barton Acres Solar, LLC'
};

describe('Data Download. File format.', function () {
  beforeEach(async function () {
    allure.feature('Data Download');
    allure.story('File format');
    await Actions.removeAllDownloadedFiles();
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');
  });

  afterEach(async function () {
    await Actions.scrollPageUp();
    await Actions.removeAllDownloadedFiles();
  });

  it('18.1 - Can download file in CSV format', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('csv', {
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    });
    await Check.isDownloadedFileExist('csv');
  });

  it('18.2 - Can download file in XLSX format', async function () {
    await Steps.dataDownloadSteps.downloadDataWithFileExtension('xlsx', {
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    });
    await Check.isDownloadedFileExist('xlsx');
  });

});