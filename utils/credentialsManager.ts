import * as fs from "fs";

export default class CredentialsManager {
  private static jsonContents = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

  static get adminUser(): { login?: string; password?: string } {
    return this.jsonContents.adminUser;
  }

  static get defaultUser(): { login?: string; password?: string } {
    return this.jsonContents.defaultUser;
  }

  static get fakeUser(): { login?: string; password?: string } {
    return this.jsonContents.fakeUser;
  }
}