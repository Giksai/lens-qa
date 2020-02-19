declare const allure: any;
import Actions from '../../utils/actions';
import Steps   from '../../utils/steps/steps';
import Check   from '../../utils/check';

const TestData = {
  PORTFOLIO_NAME     : 'regression test portfolio',
  CLIENT             : '38 Degrees North',
  ASSIGNEE           : '_ Support at Radian',
  TASK_TITLE         : 'regression test task title',
  TASK_DESCRIPTION   : 'description',
  DUE_DATE           : 'Dec 8, 2018',
  ASSIGN_TASK_TO     : '_CI _Support',
  PROJECT_NAME       : 'regression test project',
  TICKET_DEFAULT_NAME: 'INCIDENT'
};
const PROJECT  = 'Project';
const TASKS    = 'Tasks';
const TICKETS  = 'Tickets';

describe('Portfolio. Entities displayed in grids.', function () {
  beforeAll(async function () {
    await Steps.createPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      client  : TestData.CLIENT,
      assignee: TestData.ASSIGNEE
    });
  });

  beforeEach(async function () {
    allure.feature('Portfolio');
    allure.story('Entities displayed in grids');
  });

  afterEach(async function () {
    await Actions.scrollPageUp();
  });

  afterAll(async function () {
    await Steps.deleteCurrentlyViewedEntity(); // deleting portfolio
    await Steps.navigationSteps.goToDashboard();
  });

  it('6.1 - Can assign task to the project and delete project with assigned task', async function () {
    await Steps.addNewChildEntity(PROJECT, { name: TestData.PROJECT_NAME });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.addNewChildEntity(TASKS, { // TODO - consider currying such methods to get more readable name
      'title'      : TestData.TASK_TITLE,
      'description': TestData.TASK_DESCRIPTION,
      'due date'   : TestData.DUE_DATE,
      'assign to'  : TestData.ASSIGN_TASK_TO
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    const createdTask    = {
      columnNumber: 1,
      text        : TestData.TASK_TITLE,
      gridName    : TASKS
    };
    const createdProject = {
      columnNumber: 1,
      text        : TestData.PROJECT_NAME,
      gridName    : PROJECT
    };

    await Steps.clickOnRowSteps.clickOnGridResultWith(createdTask);
    await Steps.updateCurrentEntity({ project: TestData.PROJECT_NAME }); // adding project on task page
    await Check.isViewedEntityHasField(PROJECT);

    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME); // TODO - consider clicking project link here instead
    await Steps.clickOnRowSteps.clickOnGridResultWith(createdProject);
    await Check.isOnPage(TestData.PROJECT_NAME);
    await Check.isGridHaveResult(createdTask);
    await Steps.clickOnRowSteps.clickOnGridResultWith(createdTask); //falls here
    await Check.isOnPage(TestData.TASK_TITLE); // checking that link between project and task established correctly

    //cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteCurrentlyViewedEntity(); // deleting Project, moving to Portfolio page
    await Check.isNoGridResults(createdTask); // checking that created task is gone with the project
  });

  it('6.2 - Can create and delete tasks on portfolio', async function () {
    await Steps.addNewChildEntity(TASKS, {
      'title'      : TestData.TASK_TITLE,
      'description': TestData.TASK_DESCRIPTION,
      'due date'   : TestData.DUE_DATE,
      'assign to'  : TestData.ASSIGN_TASK_TO
    });
    await Check.isOnPage(TestData.TASK_TITLE);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

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

  it('6.3 - Can create and delete tickets on portfolio', async function () {
    await Check.isFilteredGridResultsCount(0, TICKETS);
    await Steps.addNewChildEntity(TICKETS, {});
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PORTFOLIO_NAME);
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    await Check.isFilteredGridResultsCount(1, TICKETS);
    await Steps.clickOnRowSteps.clickViewOnFirstRowWith({
      gridName : TICKETS
    });
    await Check.isOnPage(TestData.TICKET_DEFAULT_NAME + ' AT ' + TestData.PORTFOLIO_NAME);

    // cleanup and checks
    await Steps.navigationSteps.goBack();
    await Steps.deleteFirstFilteredGridRow(TICKETS);
    await Check.isFilteredGridResultsCount(0, TICKETS);
  });

  it('6.4 - Created tasks is not assigned to the project by default', async function () {
    await Steps.addNewChildEntity(PROJECT, { name: TestData.PROJECT_NAME });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);
    await Steps.addNewChildEntity(TASKS, { // creating task not assigned to project
      'title'      : TestData.TASK_TITLE,
      'description': TestData.TASK_DESCRIPTION,
      'due date'   : TestData.DUE_DATE,
      'assign to'  : TestData.ASSIGN_TASK_TO
    });
    await Steps.navigationSteps.goBackUntilPageIs(TestData.PORTFOLIO_NAME);

    const createdTask    = {
      columnNumber: 1,
      text        : TestData.TASK_TITLE,
      gridName    : TASKS
    };
    const createdProject = {
      columnNumber: 1,
      text        : TestData.PROJECT_NAME,
      gridName    : PROJECT
    };

    await Steps.clickOnRowSteps.clickOnGridResultWith(createdTask);
    await Check.isNoFieldOnEntityViewWithLabel(PROJECT);

    // cleanup and checks
    await Steps.navigationSteps.goBack(); // to Portfolio
    await Steps.deleteGridResultWith(createdProject);
    await Steps.deleteGridResultWith(createdTask);
  });
});