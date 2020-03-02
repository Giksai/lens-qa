import * as fs from 'fs';
import * as log4js from 'log4js';

/**
 * Makes log directory if it does not exist
 */
try {
  fs.mkdirSync('./logs');
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e);
    process.exit(1);
  }
}

log4js.configure('./loggerConfig/log4js.json');
export default log4js.getLogger('default');