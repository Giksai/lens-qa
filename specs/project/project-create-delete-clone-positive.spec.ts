declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData                    = {
  PORTFOLIO_NAME        : 'Test_portfolio_do_not_touch',
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
const allFieldsForCreatingProject = {
  'name'                  : TestData.INITIAL_PROJECT_NAME,
  'client'                : TestData.INITIAL_CLIENT,
  'portfolio'             : TestData.PORTFOLIO_NAME,
  'dc rating'             : TestData.DC_RATING,
  'ac rating'             : TestData.AC_RATING,
  'installation type'     : TestData.INSTALLATION_TYPE,
  'tilt'                  : TestData.TILT,
  'azimuth'               : TestData.AZIMUTH,
  'gcr'                   : TestData.GCR,
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


xdescribe('Project. Creation and deletion - positive cases', function () {
  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Creation and deletion - positive cases');
    await Steps.navigationSteps.goToEntityCreation('Projects', 'Add New Project');
    await Check.isOnPage('ADD NEW PROJECT');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard(); // test state cleanup
  });

  it('9.1 - Can clone a project (name and external links are not cloned)', async function () {
    await Steps.submitNewEntity(allFieldsForCreatingProject);
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);

    await Steps.cloneCurrentlyViewedEntity();
    await Check.isClonedDataBlank(notToCloneFields);

    //cleanup
    await Steps.navigationSteps.goBackUntilPageIs(TestData.INITIAL_PROJECT_NAME);
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PROJECT');
  });

  it('9.2 - Can clone a project (needed fields are cloned)', async function () {
    await Steps.submitNewEntity(allFieldsForCreatingProject);
    await Check.isOnPage(TestData.INITIAL_PROJECT_NAME);

    await Steps.cloneCurrentlyViewedEntity();

    await Steps.submitNewEntity({ name: TestData.CLONED_PROJECT_NAME }); //saves cloned project
    await Check.isOnPage(TestData.CLONED_PROJECT_NAME);

    await Check.isCurrentEntityDataEqual(fieldsForCloning);

    //cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PROJECT');
    await Steps.navigationSteps.goBackUntilPageIs(TestData.INITIAL_PROJECT_NAME);
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PROJECT');
  });

});