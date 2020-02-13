declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const PROJECT_REQUIRED_FIELDS = [
  'Name',
  'Client',
  'Portfolio',
  'Buyer Name',
  'Biller Name'
];

const TestData = {
  PROJECT_NAME: 'regression test project',
  CLIENT      : '38 Degrees North'
};

xdescribe('Project. Creation and deletion - negative cases', function () {
  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Creation and deletion - negative cases');
    await Steps.navigationSteps.goToEntityCreation('Projects', 'Add New Project');
    await Check.isOnPage('ADD NEW PROJECT');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard(); // test state cleanup
  });

  it('8.1 - Cannot create a project without all required information', async function () {
    await Steps.submitNewEntity(); // trying to create empty project
    await Check.isValidationErrorsShown([
      'Please enter a name for your project',
      'Please select a client',
    ]);
    await Steps.submitNewEntity({ //selected name and client
      name  : TestData.PROJECT_NAME,
      client: TestData.CLIENT
    });

    await Check.isValidationErrorsShown([
      'Please select a portfolio',
      'Please enter Buyer Name for billing address',
    ]);
    await Check.isFieldsMarkedRequired(PROJECT_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PROJECT');
  });
});