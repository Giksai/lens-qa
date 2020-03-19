import Actions     from '../actions';
import mailManager from "../mailManager";

export default class FileFromMessageDownloadSteps {
  /**
   * Monitors mailcatcher for new messages with given subject 
   */
  async startLookingForMessage(bigDataMessageSubject: string = null, result: { foundMessage: undefined }, messageWaitTimeout = 60000): Promise<void> {
    switch(await mailManager.isWorking()) {
      case false: {
        fail(' Mail catcher address is not working');
        break;
      }
      case undefined: {
        pending(' Mail catcher address is empty');
        break;
      }
      default: {
        mailManager.startLookingForMessage(
          mailManager.searchingPredicates.subject,
          bigDataMessageSubject,
          result,
          messageWaitTimeout);
        break;
      }
    }
  }

  /**
    * Gets result from message waiting
    */
  async getFoundMessage(result: { foundMessage: undefined }, messageWaitTimeout = 60000): Promise<void> {
    await Actions.waitFor(async () => {
      return result.foundMessage ? true : false;
    }, messageWaitTimeout);
    if (result.foundMessage) {
      await Actions.downloadFileByLink(
        this.extractLinkFromMessageBody(
          await mailManager.getBodyOfMessage(result.foundMessage)));
    } else {
      fail(' Timed out waiting for message');
    }
  }

    /**
   * Gets a correct report download link from mail message
   */
  extractLinkFromMessageBody(body: string): string {
    body = body
      .replace(/=\r\n/g, '')    //removes ENTERS and '='
      .replace(/&amp;/g, '&')   //removes excessive symbols
      .replace(/=3D/g, '=');    //removes excessive symbols
    const regex = /((https?:\/\/|ftp:\/\/|www\.|[^\s:=]+@www\.).*?[a-z_\/0-9\-\#=&])(?=(\.|,|;|\?|\!)?("|'|«|»|\[|\s|\r|\n|$))/gm;
    const allLinks = body.match(regex);
    return allLinks[5];
  }
}
