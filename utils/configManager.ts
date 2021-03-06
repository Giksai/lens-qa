import * as fs from "fs";

export default class ConfigManager {
  private static jsonContents = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

  static get mailConfig(): { address: string } {
    return this.jsonContents.mailManagerConfig;
  }
}