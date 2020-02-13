declare const allure: any;
import Actions from '../../utils/actions';
import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData = {
  CLIENT_NAME           : 'regression test client',
  PORTFOLIO_NAME        : 'regression test portfolio',
  TEMP_PORTFOLIO_NAME   : 'TEMP test portfolio',
  PROJECT_NAME          : 'regression test project',
  TEMP_PROJECT_NAME     : 'TEMP test test project',
  ASSIGNEE              : '_ Support at Radian',
  TICKET_DEFAULT_NAME   : 'INCIDENT',
  BILLING_NAME          : 'John Snow',
  EQUIPMENT_MANUFACTURER: 'ABB',
  EQUIPMENT_TYPE        : 'Transformer - ABB F73X148JVV'

};

const PORTFOLIOS = 'Portfolios';
const PROJECT    = 'Project';
const TICKETS    = 'Tickets';
const EQUIPMENT  = 'Equipment';

xdescribe('Client. Entities displayed in grids.', function () {
  beforeAll(async function () {
    await Steps.navigationSteps.goToEntityCreation('Clients', 'Add New Client');
    await Steps.submitNewEntity({ name: TestData.CLIENT_NAME });
    await Check.isOnPage(TestData.CLIENT_NAME);
  });

  beforeEach(async function () {
    allure.feature('Clients');
    allure.story('Entities displayed in grids');
  });

  afterEach(async function () {
    await Actions.scrollPageUp();
  });

  afterAll(async function () {
    await Steps.deleteCurrentlyViewedEntity({ confirm: TestData.CLIENT_NAME });
    await Steps.navigationSteps.goToDashboard();
  });

  it('15.1 - Can create and delete Portfolio via Client view page', async function () {
    await Check.isGridResultsCount(0, PORTFOLIOS);
    await Steps.addNewChildEntity(PORTFOLIOS, { name: TestData.PORTFOLIO_NAME });
    await Check.isDialogOpen(`New Portfolio - ${TestData.PORTFOLIO_NAME}`);
    await Steps.modalDialogSteps.confirmModalDialog();
    await Check.isOnPage(TestData.PORTFOLIO_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(1, PORTFOLIOS);

    // // cleanup and checks
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);
    await Steps.deleteFirstGridRow(PORTFOLIOS);
    await Check.isNoGridResults({ gridName: PORTFOLIOS });
  });

  it('15.2 - Can create and delete Project via Client view page', async function () {
    await Steps.createPortfolioUnderManagement({ //creates temporary portfolio to create project
      name    : TestData.TEMP_PORTFOLIO_NAME,
      client  : TestData.CLIENT_NAME,
      assignee: TestData.ASSIGNEE
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(0, PROJECT);
    await Steps.addNewChildEntity(PROJECT, {
      'name'      : TestData.PROJECT_NAME,
      'portfolio' : TestData.TEMP_PORTFOLIO_NAME,
      'buyer name': TestData.BILLING_NAME
    });
    await Check.isOnPage(TestData.PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(1, PROJECT);

    // cleanup and checks
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);
    await Steps.deleteFirstGridRow(PROJECT);
    await Check.isNoGridResults({ gridName: PROJECT });
    await Steps.deleteFirstGridRow(PORTFOLIOS);
    await Check.isNoGridResults({ gridName: PORTFOLIOS });
  });

  it('15.3 - Can create and delete Ticket via Client view page', async function () {
    await Steps.createPortfolioUnderManagement({ //creates temporary portfolio to add ticket
      name    : TestData.TEMP_PORTFOLIO_NAME,
      client  : TestData.CLIENT_NAME,
      assignee: TestData.ASSIGNEE
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Steps.createSimpleProject({ //creates temporary project to add ticket
      'name'      : TestData.TEMP_PROJECT_NAME,
      'client'    : TestData.CLIENT_NAME,
      'portfolio' : TestData.TEMP_PORTFOLIO_NAME,
      'buyer name': TestData.BILLING_NAME,
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(0, TICKETS);
    await Steps.addNewChildEntity(TICKETS, {
      portfolio: TestData.TEMP_PORTFOLIO_NAME,
      project  : TestData.TEMP_PROJECT_NAME
    });
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.TEMP_PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(1, TICKETS);
    await Steps.clickOnRowSteps.clickOnGridResultWith({
      rowNumber: 1,
      gridName : TICKETS
    });
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.TEMP_PROJECT_NAME);

    // cleanup and checks
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);
    await Steps.deleteFirstGridRow(TICKETS);
    await Check.isNoGridResults({ gridName: TICKETS });
    await Steps.deleteFirstGridRow(PROJECT);
    await Check.isNoGridResults({ gridName: PROJECT });
    await Steps.deleteFirstGridRow(PORTFOLIOS);
    await Check.isNoGridResults({ gridName: PORTFOLIOS });
  });

  it('15.4 - Can create and delete Equipment via Client view page', async function () {
    await Steps.createPortfolioUnderManagement({ //creates temporary portfolio to add ticket
      name    : TestData.TEMP_PORTFOLIO_NAME,
      client  : TestData.CLIENT_NAME,
      assignee: TestData.ASSIGNEE
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Steps.createSimpleProject({ //creates temporary project to add ticket
      'name'      : TestData.TEMP_PROJECT_NAME,
      'client'    : TestData.CLIENT_NAME,
      'portfolio' : TestData.TEMP_PORTFOLIO_NAME,
      'buyer name': TestData.BILLING_NAME,
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(0, EQUIPMENT);
    await Steps.addNewChildEntity(EQUIPMENT, {
      'portfolio'   : TestData.TEMP_PORTFOLIO_NAME,
      'project'     : TestData.TEMP_PROJECT_NAME,
      'manufacturer': TestData.EQUIPMENT_MANUFACTURER,
      'asset type'  : TestData.EQUIPMENT_TYPE
    });
    await Check.isOnPage(TestData.EQUIPMENT_TYPE.toUpperCase());
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);

    await Check.isGridResultsCount(1, EQUIPMENT);
    await Steps.clickOnRowSteps.clickOnGridResultWith({
      rowNumber: 1,
      gridName : EQUIPMENT
    });

    await Check.isOnPage(TestData.EQUIPMENT_TYPE.toUpperCase());

    // deletion and checks
    await Steps.navigationSteps.goBackUntilPageIs(TestData.CLIENT_NAME);
    await Steps.deleteFirstGridRow(EQUIPMENT);
    await Check.isNoGridResults({ gridName: EQUIPMENT });
    await Steps.deleteFirstGridRow(PROJECT);
    await Check.isNoGridResults({ gridName: PROJECT });
    await Steps.deleteFirstGridRow(PORTFOLIOS);
    await Check.isNoGridResults({ gridName: PORTFOLIOS });
  });
});