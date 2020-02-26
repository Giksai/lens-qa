declare const allure: any;

import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData                   = {
  PORTFOLIO_NAME              : 'Perseus',
  CLIENT                      : '38 Degrees North',
  PROJECT_NAME                : 'Barton Acres Solar, LLC',
  INITIAL_TEMPLATE_NAME       : 'initial test template',
  UPDATED_TEMPLATE_NAME       : 'updated test template',
  INITIAL_TEMPLATE_DESCRIPTION: 'initial test template description',
  UPDATED_TEMPLATE_DESCRIPTION: 'updated test template description',
  HOURLY_TIME_INTERVAL        : 'Hourly',
  FIFTEEN_MIN_TIME_INTERVAL   : '15 minutes',
  DAILY_TIME_INTERVAL         : 'Daily',
  RAW_TIME_INTERVAL           : 'Raw',
  NUMBER_OF_CHECKBOX          : 2,
  NUMBER_OF_DROPDOWNS         : 3
};
const CUSTOM_TEMPLATES           = 'Custom templates';
const TEMPLATE_FORM              = 'Template form';
const initialTemplate            = {
  columnNumber: 1,
  text        : TestData.INITIAL_TEMPLATE_NAME,
  gridName    : CUSTOM_TEMPLATES
};
const updatedTemplate            = {
  columnNumber: 1,
  text        : TestData.UPDATED_TEMPLATE_NAME,
  gridName    : CUSTOM_TEMPLATES
};
const updatedTemplateDescription = {
  columnNumber: 2,
  text        : TestData.UPDATED_TEMPLATE_DESCRIPTION,
  gridName    : CUSTOM_TEMPLATES
};
const newRetrievalValues         = [
  'Sum',
  'Average',
  'Cyclical'
];

describe('Data Download. Templates.', function () {
  beforeEach(async function () {
    allure.feature('Data Download');
    allure.story('Templates');
  });

  afterEach(async function () {
    await Steps.navigationSteps.goToDashboard();
  });

  it('19.9 -  Can update template and download file with hourly time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');

    //Create
    await Steps.dataDownloadSteps.createNewDataDownloadTemplate({
      client   : TestData.CLIENT,
      portfolio: TestData.PORTFOLIO_NAME,
      project  : TestData.PROJECT_NAME
    }, {
      'data download template name'       : TestData.INITIAL_TEMPLATE_NAME,
      'data download template description': TestData.INITIAL_TEMPLATE_DESCRIPTION
    });
    await Check.isGridHaveResult(initialTemplate);

    //Update
    await Steps.dataDownloadSteps.updateDataDownloadTemplate({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,//Removes second checkbox in Measurements, Calculations and Availability columns
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,//Updates 3 last dropdowns in Measurements, Calculations and last one in Availability
        gridName         : TEMPLATE_FORM
      },
      {
        'data download template name'       : TestData.UPDATED_TEMPLATE_NAME,
        'data download template description': TestData.UPDATED_TEMPLATE_DESCRIPTION
      },
      newRetrievalValues
    );

    await Check.isGridHaveResult(updatedTemplate);
    await Check.isGridHaveResult(updatedTemplateDescription);

    await Check.isUpdatedTemplateDataEqual({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,
        gridName         : TEMPLATE_FORM
      },
      newRetrievalValues
    );

    //Download
    await Steps.downloadGridElement(updatedTemplate);
    await Check.isDownloadedFileExist('csv');

    // Deletion and check
    await Steps.deleteGridResultWith(updatedTemplate);
    await Check.isNoGridResults(updatedTemplate);
  });

  it('19.10 -  Can update template and download file with 15min time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');

    //Create
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

    //Update
    await Steps.dataDownloadSteps.updateDataDownloadTemplate({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,//Removes second checkbox in Measurements, Calculations and Availability columns
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,//Updates 3 last dropdowns in Measurements, Calculations and last one in Availability
        gridName         : TEMPLATE_FORM
      },
      {
        'data download template name'       : TestData.UPDATED_TEMPLATE_NAME,
        'data download template description': TestData.UPDATED_TEMPLATE_DESCRIPTION

      },
      newRetrievalValues
    );

    await Check.isGridHaveResult(updatedTemplate);
    await Check.isGridHaveResult(updatedTemplateDescription);

    await Check.isUpdatedTemplateDataEqual({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,
        gridName         : TEMPLATE_FORM
      },
      newRetrievalValues
    );

    //Download
    await Steps.downloadGridElement(updatedTemplate);
    await Check.isDownloadedFileExist('csv');

    // Deletion and check
    await Steps.deleteGridResultWith(updatedTemplate);
    await Check.isNoGridResults(updatedTemplate);
  });

  it('19.11 -  Can update template and download file with Daily time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');

    //Create
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

    //Update
    await Steps.dataDownloadSteps.updateDataDownloadTemplate({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,//Removes second checkbox in Measurements, Calculations and Availability columns
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,//Updates 3 last dropdowns in Measurements, Calculations and last one in Availability
        gridName         : TEMPLATE_FORM
      },
      {
        'data download template name'       : TestData.UPDATED_TEMPLATE_NAME,
        'data download template description': TestData.UPDATED_TEMPLATE_DESCRIPTION

      },
      newRetrievalValues
    );

    await Check.isGridHaveResult(updatedTemplate);
    await Check.isGridHaveResult(updatedTemplateDescription);

    await Check.isUpdatedTemplateDataEqual({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,
        gridName         : TEMPLATE_FORM
      },
      newRetrievalValues
    );

    //Download
    await Steps.downloadGridElement(updatedTemplate);
    await Check.isDownloadedFileExist('csv');

    // Deletion and check
    await Steps.deleteGridResultWith(updatedTemplate);
    await Check.isNoGridResults(updatedTemplate);
  });

  it('19.12 -  Can update template and download file with Raw time interval', async function () {
    await Steps.navigationSteps.goToEntityManagement('Reports', 'Data Downloads');

    //Create
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

    //Update
    await Steps.dataDownloadSteps.updateDataDownloadTemplate({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,//Removes second checkbox in Measurements, Calculations and Availability columns
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,//Updates 3 last dropdowns in Measurements, Calculations and last one in Availability
        gridName         : TEMPLATE_FORM
      },
      {
        'data download template name'       : TestData.UPDATED_TEMPLATE_NAME,
        'data download template description': TestData.UPDATED_TEMPLATE_DESCRIPTION

      },
      newRetrievalValues
    );

    await Check.isGridHaveResult(updatedTemplate);
    await Check.isGridHaveResult(updatedTemplateDescription);

    await Check.isUpdatedTemplateDataEqual({
        numberOfCheckbox : TestData.NUMBER_OF_CHECKBOX,
        numberOfDropdowns: TestData.NUMBER_OF_DROPDOWNS,
        gridName         : TEMPLATE_FORM
      },
      newRetrievalValues
    );

    //Download
    await Steps.downloadGridElement(updatedTemplate);
    await Check.isDownloadedFileExist('csv');

    // Deletion and check
    await Steps.deleteGridResultWith(updatedTemplate);
    await Check.isNoGridResults(updatedTemplate);
  });
});