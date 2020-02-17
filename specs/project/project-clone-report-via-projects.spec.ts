declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData                    = {
  PORTFOLIO_NAME        : 'regression test portfolio',
  INITIAL_PROJECT_NAME  : 'regression test project',
  CLONED_PROJECT_NAME   : 'cloned project name',
  INITIAL_CLIENT        : '38 Degrees North',
  ASSIGNEE              : '_ Support at Radian',
  DC_RATING             : '500',
  AC_RATING             : '600',
  INSTALLATION_TYPE     : 'Rooftop Fixed Tilt',
  TILT                  : '177',
  AZIMUTH               : '270',
  GCR                   : '23',
  GROUP                 : 'Dudley',
  INVERTER_EFFICIENCY   : '50',
  LOSSES                : '11',
  ADDRESS_1             : 'test address',
  CITY                  : 'New York',
  STATE                 : 'Alaska',
  POSTAL_CODE           : '10000',
  COUNTRY               : 'Afghanistan',
  BILLING_COUNTRY       : 'Afghanistan',
  LATITUDE              : '53.9',
  LONGITUDE             : '27.566',
  ACCESS_INFO           : 'Full access',
  TIME_ZONE             : '(GMT+00:00) Dublin',
  BILLING_NAME          : 'John Snow',
  INVOICE_TERMS         : '50',
  BILLING_STREET_1      : 'Billing test address',
  BILLING_CITY          : 'Minsk',
  BILLING_STATE_REGION  : 'Alaska',
  BILLING_POSTAL_CODE   : '220000',
  BILLING_TEXT          : 'Billing test text',
  EXTERNAL_LINK_NAME    : 'tut',
  EXTERNAL_LINK_USERNAME: 'tut',
  EXTERNAL_LINK_PASSWORD: '12345',
  EXTERNAL_LINK_URL     : 'https://lens-qa.radiangen.com',
  NTP                   : 'Jul 26, 2059',
  COD                   : 'Jul 26, 2059',
  IN_SERVICE_DATE       : 'Jul 26, 2059',
  MECHANICAL_COMPLETION : 'Jul 26, 2059',
  SUBSTANTIAL_COMPLETION: 'Jul 26, 2059',
  FINAL_COMPLETION      : 'Jul 26, 2059',
  PPA_TERM              : '500'
};
const PROJECT                     = 'Project';
const createdProject              = {
  columnNumber: 1,
  text        : TestData.INITIAL_PROJECT_NAME,
  gridName    : PROJECT
};
const allFieldsForCreatingProject = {
  'name'                  : TestData.INITIAL_PROJECT_NAME,
  'dc rating'             : TestData.DC_RATING,
  'ac rating'             : TestData.AC_RATING,
  'installation type'     : TestData.INSTALLATION_TYPE,
  'tilt'                  : TestData.TILT,
  'azimuth'               : TestData.AZIMUTH,
  'gcr'                   : TestData.GCR,
  'groups'                : TestData.GROUP,
  'inverter efficiency'   : TestData.INVERTER_EFFICIENCY,
  'losses'                : TestData.LOSSES,
  'buyer name'            : TestData.BILLING_NAME,
  'invoice terms'         : TestData.INVOICE_TERMS,
  'external link name'    : TestData.EXTERNAL_LINK_NAME,
  'external link username': TestData.EXTERNAL_LINK_USERNAME,
  'external link password': TestData.EXTERNAL_LINK_PASSWORD,
  'external link url'     : TestData.EXTERNAL_LINK_URL,
  'ntp'                   : TestData.NTP,
  'in service date'       : TestData.IN_SERVICE_DATE,
  'mechanical completion' : TestData.MECHANICAL_COMPLETION,
  'substantial completion': TestData.SUBSTANTIAL_COMPLETION,
  'final completion'      : TestData.FINAL_COMPLETION,
};
const fieldsForCloning            = {
  'dc rating'             : TestData.DC_RATING,
  'ac rating'             : TestData.AC_RATING,
  'installation type'     : TestData.INSTALLATION_TYPE,
  'tilt'                  : TestData.TILT,
  'azimuth'               : TestData.AZIMUTH,
  'gcr'                   : TestData.GCR,
  'losses'                : TestData.LOSSES,
  'buyer name'            : TestData.BILLING_NAME,
  'invoice terms'         : TestData.INVOICE_TERMS,
  'ntp'                   : TestData.NTP,
  'in service date'       : TestData.IN_SERVICE_DATE,
  'mechanical completion' : TestData.MECHANICAL_COMPLETION,
  'substantial completion': TestData.SUBSTANTIAL_COMPLETION,
  'final completion'      : TestData.FINAL_COMPLETION,
};
const notToCloneFields            = {
  'name'                  : TestData.INITIAL_PROJECT_NAME,
  'external link name'    : TestData.EXTERNAL_LINK_NAME,
  'external link username': TestData.EXTERNAL_LINK_USERNAME,
  'external link password': TestData.EXTERNAL_LINK_PASSWORD,
  'external link url'     : TestData.EXTERNAL_LINK_URL,
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
  });

  afterEach(async function () {
    await Steps.navigationSteps.goToDashboard();
  });

  it('7.6 - Can clone Project via Portfolio page (name and external links are not cloned)', async function () {

    await Steps.addNewChildEntity(PROJECT, allFieldsForCreatingProject);
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    await Check.isGridHaveResult(createdProject);
    await Steps.cloneEntityFromGrid(createdProject);
    await Check.isOnPage('ADD NEW PROJECT');

    await Check.isClonedDataBlank(notToCloneFields);

    //cleanup
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');

  });

  it('7.7 - Can clone Project via Portfolio page (needed fields are cloned)', async function () {
    await Steps.addNewChildEntity(PROJECT, allFieldsForCreatingProject);
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    await Check.isGridHaveResult(createdProject);
    await Steps.cloneEntityFromGrid(createdProject);
    await Check.isOnPage('ADD NEW PROJECT');

    await Steps.submitNewEntity({ name: TestData.CLONED_PROJECT_NAME }); //saves cloned project
    await Check.isOnPage(TestData.CLONED_PROJECT_NAME);

    await Check.isCurrentEntityDataEqual(fieldsForCloning); // checks if needed fields are cloned in view mode

    //cleanup
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');

  });

  it('7.8 - Can go to Project performance report via Portfolio page', async function () {
    await Steps.addNewChildEntity(PROJECT, { name: TestData.INITIAL_PROJECT_NAME });
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    await Check.isGridHaveResult(createdProject);
    await Steps.openReportsFromGrid(createdProject);
    await Check.isOnPage('PROJECT PERFORMANCE REPORT');
    await Check.isPerformanceReportDataEqual({ project: TestData.INITIAL_PROJECT_NAME });

    //cleanup
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });
});