import ConfigManager            from './configManager';
import Actions                  from './actions';
const axios = require('axios').default;

class MailManager {
  private address = ConfigManager.mailConfig.address;
  private request_getAllMail = this.address + '/messages';
  private request_getMailContent(mailId) {
    return this.address + `/messages/${mailId}:id.json`;
  }

  async isWorking(): Promise<boolean> {
    try {
      let response = await axios.get(this.request_getAllMail);
      return response ? (response.status === 200 ? true : false) : false;
    } catch {
      return false;
    }
  }

  async startLookingForMessage(searchingPredicate: Function, searchData: any, result: { foundMessage: any }, timeout = 60000, askingFrequency = 2000) {
    let prevMatchingMessage = await this.searchBy(searchingPredicate, searchData);
    if (!prevMatchingMessage) {
      result.foundMessage = await this.waitForMessage(searchingPredicate, searchData, timeout, askingFrequency);
    } else {
      let foundMessage;
      let waitResult = await Actions.waitFor(async () => {
        foundMessage = await this.searchBy(searchingPredicate, searchData);
        return foundMessage.id !== prevMatchingMessage.id ? true : false;
      }, timeout, askingFrequency);
      waitResult ? result.foundMessage = foundMessage : result.foundMessage = undefined;
    }
  }

  async waitForMessage(searchingPredicate: Function, searchData: string, timeout = 60000, askingFrequency = 2000) { 
    let foundMessage;
    let waitResult = await Actions.waitFor(async () => {
      foundMessage = await this.searchBy(searchingPredicate, searchData);
      return foundMessage ? true : false;
    }, timeout, askingFrequency);
    return waitResult ? foundMessage : undefined;
  }

  async getAllMessagesArray(): Promise<any[]> {
    let response = await axios.get(this.request_getAllMail);
    return response.data.reverse();
  }

  async getBodyOfMessage(message: any): Promise<string> {
    let messageContents = await axios.get(this.request_getMailContent(message.id));
    return messageContents.data.source;
  }

  async searchBy(predicate: Function, searchData: any): Promise<any> {
    let allMessages = await this.getAllMessagesArray();
    for (let message of allMessages) {
      if (predicate(message, searchData)) {
        return message;
      }
    }
    return undefined;
  }

  searchingPredicates = {
    subject: (message, searchData) => {
      return message.subject === searchData ? true : false;
    }
  }
}

export default new MailManager();