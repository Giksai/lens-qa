import Actions     from '../actions';
import mailManager from "../mailManager";

export default class FileFromMessageDownloadSteps {
  /**
   * Monitors mailcatcher for new messages with given subject 
   */
  async startLookingForMessage(bigDataMessageSubject: string = null, result: { foundMessage: undefined }, messageWaitTimeout: number = 60000): Promise<void> {
    if (!(await mailManager.isWorking())) {
      fail(' Mail catcher error');
    } else {
      mailManager.startLookingForMessage(
        mailManager.searchingPredicates.subject,
        bigDataMessageSubject,
        result,
        messageWaitTimeout);
    }
  }

  /**
    * Gets result from message waiting
    */
  async getFoundMessage(result: { foundMessage: undefined }, messageWaitTimeout: number = 60000): Promise<void> {
    await Actions.waitFor(async () => {
      return result.foundMessage ? true : false;
    }, messageWaitTimeout);
    if (result.foundMessage) {
      await Actions.downloadFileByLink(
        Actions.extractLinkFromMessageBody(
          await mailManager.getBodyOfMessage(result.foundMessage)));
    } else {
      fail(' Timed out waiting for message');
    }
  }
}

