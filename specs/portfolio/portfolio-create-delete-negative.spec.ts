declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const UNDER_MANAGEMENT_PORTFOLIO_REQUIRED_FIELDS = [
  'Name',
  'Client',
  'Asset Manager',
  'Compliance Lead',
  'Financial Preparer',
  'Financial Reviewer',
  'Technical Lead',
  'Assignee for Autogenerated Tickets'
];
const SIMPLE_PORTFOLIO_REQUIRED_FIELDS           = [
  'Name',
  'Client'
];

describe('Portfolio. Creation and deletion - negative cases', function () {
  beforeEach(async function () {
    allure.feature('Portfolio');
    allure.story('Creation and deletion - negative cases');
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  afterEach(async function () {
    return Steps.navigationSteps.goToDashboard(); // test state cleanup
  });

  it('2.1 - Cannot create portfolio under management without all required information', async function () {
    await Steps.portfolioSteps.submitPortfolioUnderManagement(); // trying to create empty portfolio
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please enter portfolio name',
      'Please select a client',
      'Please select Asset Manager',
      'Please select Compliance Lead',
      'Please select Financial Preparer',
      'Please select Financial Reviewer',
      'Please select Technical Lead',
      'Please select Assignee for Autogenerated Tickets'
    ]);
    await Check.isFieldsMarkedRequired(UNDER_MANAGEMENT_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('2.2 - Cannot create portfolio under management without assignee information', async function () {
    await Steps.portfolioSteps.submitPortfolioUnderManagement({ assignee: 'Support at Radian' });
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please enter portfolio name',
      'Please select a client'
    ]);
    await Check.isFieldsMarkedRequired(UNDER_MANAGEMENT_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });
  // add more combinations if needed

  it('2.3 - Cannot create portfolio under management without name and client information', async function () {
    await Steps.portfolioSteps.submitPortfolioUnderManagement({
      name  : 'regression test portfolio',
      client: '38 Degrees North'
    });
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please select Asset Manager',
      'Please select Compliance Lead',
      'Please select Financial Preparer',
      'Please select Financial Reviewer',
      'Please select Technical Lead',
      'Please select Assignee for Autogenerated Tickets'
    ]);
    await Check.isFieldsMarkedRequired(UNDER_MANAGEMENT_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('2.4 - Cannot create simple portfolio without all required information', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio(); // trying to create empty portfolio
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please enter portfolio name',
      'Please select a client'
    ]);
    await Check.isFieldsMarkedRequired(SIMPLE_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('2.5 - Cannot create simple portfolio without client information', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio({ name: 'regression test portfolio' });
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please select a client'
    ]);
    await Check.isFieldsMarkedRequired(SIMPLE_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('2.6 - Cannot create simple portfolio without name', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio({ client: '38 Degrees North' });
    await Check.isNoDialogs();
    await Check.isValidationErrorsShown([
      'Please enter portfolio name'
    ]);
    await Check.isFieldsMarkedRequired(SIMPLE_PORTFOLIO_REQUIRED_FIELDS);
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });
});