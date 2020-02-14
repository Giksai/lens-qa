declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const CLIENT_REQUIRED_FIELDS = [
  'Name'
];

const TestData = {
  CLIENT_NAME: 'regression test client',
  LATITUDE   : 'TEST LATITUDE',
  LONGITUDE  : 'TEST LONGITUDE'
};

describe('Client. Creation and deletion - negative cases', function () {
  beforeEach(async function () {
    allure.feature('Client');
    allure.story('Creation and deletion - negative cases');
    await Steps.navigationSteps.goToEntityCreation('Clients', 'Add New Client');
    await Check.isOnPage('ADD NEW CLIENT');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard(); // test state cleanup
  });

  it('12.1 - Cannot create a client without name', async function () {
    await Steps.submitNewEntity();
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please enter client name'
    ]);
    await Check.isFieldsMarkedRequired(CLIENT_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW CLIENT');
  });

  it('12.2 - Cannot create a client with a letters in Latitude and Longitude fields', async function () { //TODO remove x when issue with logo is fixed. Skipped for now
    await Steps.submitNewEntity({
      name     : TestData.CLIENT_NAME,
      latitude : TestData.LATITUDE,
      longitude: TestData.LONGITUDE
    });
    await Check.isValidationErrorsShown([ //TODO add correct messages when issue with text logo is fixed
      'Please enter a valid latitude',
      'Please enter a valid longitude',
    ]);
    await Check.isOnPage('ADD NEW CLIENT');
  });
});