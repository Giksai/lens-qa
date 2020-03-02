import ConfigManager            from './configManager';
import Actions                  from './actions';
const axios = require('axios').default;

type MailMessage = { [key: string]: string };

class MailManager {
  private address = ConfigManager.mailConfig.address;
  private requestGetAllMail = this.address + '/messages';
  private requestGetMailContent(mailId): string {
    return this.address + `/messages/${mailId}:id.json`;
  }

  async isWorking(): Promise<boolean> {
    if(this.address === "") {
      return undefined;
    }
    try {
      const response = await axios.get(this.requestGetAllMail);
      return response ? (response.status === 200 ? true : false) : false;
    } catch {
      return false;
    }
  }

  async startLookingForMessage(searchingPredicate: Function, searchData: string, result: { foundMessage: MailMessage }, timeout = 60000, askingFrequency = 2000): Promise<void> {
    const prevMatchingMessage = await this.searchBy(searchingPredicate, searchData);
    if (!prevMatchingMessage) {
      result.foundMessage = await this.waitForMessage(searchingPredicate, searchData, timeout, askingFrequency);
    } else {
      let foundMessage;
      const waitResult = await Actions.waitFor(async () => {
        foundMessage = await this.searchBy(searchingPredicate, searchData);
        return foundMessage.id !== prevMatchingMessage.id ? true : false;
      }, timeout, askingFrequency);
      waitResult ? result.foundMessage = foundMessage : result.foundMessage = undefined;
    }
  }

  async waitForMessage(searchingPredicate: Function, searchData: string, timeout = 60000, askingFrequency = 2000): Promise<MailMessage> { 
    let foundMessage;
    const waitResult = await Actions.waitFor(async () => {
      foundMessage = await this.searchBy(searchingPredicate, searchData);
      return foundMessage ? true : false;
    }, timeout, askingFrequency);
    return waitResult ? foundMessage : undefined;
  }

  async getAllMessagesArray(): Promise<MailMessage[]> {
    const response = await axios.get(this.requestGetAllMail);
    return response.data.reverse();
  }

  async getBodyOfMessage(message: MailMessage): Promise<string> {
    const messageContents = await axios.get(this.requestGetMailContent(message.id));
    return messageContents.data.source;
  }

  async searchBy(predicate: Function, searchData: string): Promise<MailMessage> {
    const allMessages = await this.getAllMessagesArray();
    for (const message of allMessages) {
      if (predicate(message, searchData)) {
        return message;
      }
    }
    return undefined;
  }

  searchingPredicates = {
    subject: (message: MailMessage, searchData: string): boolean => {
      return message.subject === searchData ? true : false;
    }
  }
}

export default new MailManager();