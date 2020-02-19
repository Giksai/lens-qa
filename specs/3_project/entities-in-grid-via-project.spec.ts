declare const allure: any;
import Actions from '../../utils/actions';
import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME        : 'Test_portfolio_do_not_touch',
  CLIENT                : '38 Degrees North',
  ASSIGNEE              : '_ Support at Radian',
  TASK_TITLE            : 'title',
  TASK_DESCRIPTION      : 'description',
  DUE_DATE              : 'Dec 8, 2018',
  ASSIGN_TASK_TO        : '_CI _Support',
  PROJECT_NAME          : 'regression test project',
  TICKET_DEFAULT_NAME   : 'INCIDENT',
  BILLING_NAME          : 'John Snow',
  NOTE_TITLE            : 'Test Note Title',
  NOTE_DATE             : 'Jul 25, 2019 12:00 AM',
  NOTE_TYPE             : 'Call',
  NOTE_DESCRIPTION      : 'Note description',
  EQUIPMENT_MANUFACTURER: 'ABB',
  EQUIPMENT_TYPE        : 'Transformer - ABB F73X148JVV'

};

const TASKS     = 'Tasks';
const TICKETS   = 'Tickets';
const NOTES     = 'Notes';
const EQUIPMENT = 'Equipment';

describe('Project. Entities displayed in grids.', function () {
  beforeAll(async function () {
    await Steps.createSimpleProject({
      'name'      : TestData.PROJECT_NAME,
      'client'    : TestData.CLIENT,
      'portfolio' : TestData.PORTFOLIO_NAME,
      'buyer name': TestData.BILLING_NAME,
    });
  });

  beforeEach(async function () {
    allure.feature('Project');
    allure.story('Entities displayed in grids');
  });

  afterEach(async function () {
    await Actions.scrollPageUp();
  });

  afterAll(async function () {
    await Steps.deleteCurrentlyViewedEntity();
    await Steps.navigationSteps.goToDashboard();
  });

  it('11.3 - Can create and delete Tasks on the project', async function () {
    await Steps.addNewChildEntity(TASKS, {
      'title'      : TestData.TASK_TITLE,
      'description': TestData.TASK_DESCRIPTION,
      'due date'   : TestData.DUE_DATE,
      'assign to'  : TestData.ASSIGN_TASK_TO
    });
    await Check.isOnPage(TestData.TASK_TITLE);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PROJECT_NAME);

    const createdTask = {
      columnNumber: 1,
      text        : TestData.TASK_TITLE,
      gridName    : TASKS
    };

    await Check.isGridHaveResult(createdTask);
    await Steps.clickOnRowSteps.clickOnGridResultWith(createdTask);
    await Check.isOnPage(TestData.TASK_TITLE);

    // cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteGridResultWith(createdTask);
    await Check.isNoGridResults(createdTask);
  });

  it('11.4 - Can create and delete Notes on the project', async function () {
    await Check.isGridResultsCount(0, NOTES);
    await Steps.addNewChildEntity(NOTES, {
      title: TestData.NOTE_TITLE,
      dated: TestData.NOTE_DATE,
      type : TestData.NOTE_TYPE
    });
    await Check.isOnPage(TestData.PROJECT_NAME);
    await Check.isGridResultsCount(1, NOTES);
    await Steps.clickOnRowSteps.clickOnGridResultWith({
      rowNumber: 1,
      gridName : NOTES
    });
    await Check.isOnPage(TestData.NOTE_TITLE);

    // cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteFirstGridRow(NOTES);
    await Check.isNoGridResults({ gridName: NOTES });
  });

  it('11.5 - Can create and delete Tickets on the project', async function () {
    await Check.isFilteredGridResultsCount(0, TICKETS);
    await Steps.addNewChildEntity(TICKETS, {});
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PROJECT_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PROJECT_NAME);

    await Check.isFilteredGridResultsCount(1, TICKETS);
    await Steps.clickOnRowSteps.clickViewOnFirstRowWith({
      gridName : TICKETS
    });
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PROJECT_NAME);

    // cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteFirstFilteredGridRow(TICKETS);
    await Check.isFilteredGridResultsCount(0, TICKETS);
  });

  it('11.6 - Can create and delete Equipment on the project', async function () {
    await Check.isEquipmentGridResultsCount(0, EQUIPMENT);
    await Steps.addNewChildEntity(EQUIPMENT, {
      'manufacturer': TestData.EQUIPMENT_MANUFACTURER,
      'asset type'  : TestData.EQUIPMENT_TYPE
    });
    await Check.isOnPage(TestData.EQUIPMENT_TYPE.toUpperCase());
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PROJECT_NAME);

    await Check.isEquipmentGridResultsCount(1, EQUIPMENT);
    await Check.isEquipmentGridHaveResult({
      text    : TestData.EQUIPMENT_TYPE,
      gridName: EQUIPMENT
    });

    await Steps.projectSteps.clickOnEquipmentGridResultWith({
      text    : TestData.EQUIPMENT_TYPE,
      gridName: EQUIPMENT
    });
    await Check.isOnPage(TestData.EQUIPMENT_TYPE.toUpperCase());

    // deletion and checks
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage(TestData.PROJECT_NAME);
    await Check.iEquipmentGridHaveNoResult({
      text    : TestData.EQUIPMENT_TYPE,
      gridName: EQUIPMENT
    })
  });

  it('11.7 - Can create a Ticket via Equipment on the project page', async function () {
    await Check.isEquipmentGridResultsCount(0, EQUIPMENT);
    await Steps.addNewChildEntity(EQUIPMENT, {
      'manufacturer': TestData.EQUIPMENT_MANUFACTURER,
      'asset type'  : TestData.EQUIPMENT_TYPE
    });
    await Check.isOnPage(TestData.EQUIPMENT_TYPE.toUpperCase());
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PROJECT_NAME);

    await Check.isEquipmentGridResultsCount(1, EQUIPMENT);
    await Check.isEquipmentGridHaveResult({
      text    : TestData.EQUIPMENT_TYPE,
      gridName: EQUIPMENT
    });

    await Steps.projectSteps.addTicketFromEquipmentGrid(EQUIPMENT);
    await Steps.submitNewEntity();
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PROJECT_NAME);

    await Steps.navigationSteps.goBackUntilPageIs(TestData.PROJECT_NAME);

    await Check.isFilteredGridResultsCount(1, TICKETS);
    await Steps.clickOnRowSteps.clickViewOnFirstRowWith({
      gridName : TICKETS
    });
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PROJECT_NAME);

    // cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteFirstFilteredGridRow(TICKETS);
    await Check.isFilteredGridResultsCount(0, TICKETS);
  });
});