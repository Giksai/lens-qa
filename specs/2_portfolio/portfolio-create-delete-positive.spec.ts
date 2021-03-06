declare const allure: any;
import Steps from '../../utils/steps/steps';
import Check from '../../utils/check';

const TestData        = {
  PORTFOLIO_NAME : 'regression test portfolio',
  CLIENT         : '38 Degrees North',
  ASSIGNEE       : '_ Support at Radian',
  AUTO_TASK_TITLE: 'Add projects to portfolio'
};
const TASKS           = 'Tasks';
const autoCreatedTask = {
  columnNumber: 1,
  text        : TestData.AUTO_TASK_TITLE,
  gridName    : TASKS
};

describe('Portfolio. Creation and deletion - positive cases', function () {
  beforeEach(async function () {
    allure.feature('Portfolio');
    allure.story('Creation and deletion - positive cases');
    await Steps.navigationSteps.goToEntityCreation('Portfolios', 'Add New Portfolio');
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('3.1 - Can create and delete portfolio under management', async function () {
    await Steps.portfolioSteps.submitPortfolioUnderManagement({
      name    : TestData.PORTFOLIO_NAME,
      client  : TestData.CLIENT,
      assignee: TestData.ASSIGNEE
    });
    await Check.isDialogOpen(`New Portfolio - ${TestData.PORTFOLIO_NAME}`);
    await Steps.modalDialogSteps.confirmModalDialog();
    await Check.isOnPage(TestData.PORTFOLIO_NAME);
    await Check.isCurrentEntityDataEqual({
      'Client'                            : TestData.CLIENT,
      'Asset Manager'                     : TestData.ASSIGNEE,
      'Compliance Lead'                   : TestData.ASSIGNEE,
      'Financial Preparer'                : TestData.ASSIGNEE,
      'Financial Reviewer'                : TestData.ASSIGNEE,
      'Technical Lead'                    : TestData.ASSIGNEE,
      'Assignee For Autogenerated Tickets': TestData.ASSIGNEE
    });

    //cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('3.2 - Can create and delete simple portfolio', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio({
      name  : TestData.PORTFOLIO_NAME,
      client: TestData.CLIENT
    });
    await Check.isDialogOpen(`New Portfolio - ${TestData.PORTFOLIO_NAME}`);
    await Steps.modalDialogSteps.confirmModalDialog();
    await Check.isOnPage(TestData.PORTFOLIO_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.CLIENT });

    //cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('3.3 - Can create Portfolio without an autogenerated task', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio({
      name  : TestData.PORTFOLIO_NAME,
      client: TestData.CLIENT
    });
    await Check.isDialogOpen(`New Portfolio - ${TestData.PORTFOLIO_NAME}`);
    await Steps.modalDialogSteps.skipModalDialog();
    await Check.isOnPage(TestData.PORTFOLIO_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.CLIENT });

    await Check.isGridHaveNoResult(autoCreatedTask);

    //cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });

  it('3.4 - Can create Portfolio with an autogenerated task', async function () {
    await Steps.portfolioSteps.submitSimplePortfolio({
      name  : TestData.PORTFOLIO_NAME,
      client: TestData.CLIENT
    });
    await Check.isDialogOpen(`New Portfolio - ${TestData.PORTFOLIO_NAME}`);
    await Steps.modalDialogSteps.confirmModalDialog();
    await Check.isOnPage(TestData.PORTFOLIO_NAME);
    await Check.isCurrentEntityDataEqual({ client: TestData.CLIENT });

    await Check.isGridHaveResult(autoCreatedTask);

    //cleanup
    await Steps.deleteCurrentlyViewedEntity();
    await Check.isOnPage('ADD NEW PORTFOLIO');
  });
});