### Commands

All commands must be executed in console form the root of the project directory.

First time, to install all the dependencies, run `npm install`.

To run automated testing execute `npm test`.

To run autotests more slowly,
 with logging and with highlighting of fields and buttons which is clicked,
 execute `npm run debug`.
(Logs can be found in `artifacts/logs` directory).

To delete allure test results folder (test-reports) and build folder, run `npm run clean`. If there is no build or test-reports folder, 
it will throw an error, which is ok.

### Configuring tests to run

To focus some spec, change `describe(...)` to `fdescribe(...)`.
To focus some test, change `it(...)` to `fit(...)`.

To disable test or spec, change it to `xit(...)` or `xdescribe(...)`. It will be marked as pending in test runs.

As test numbers will grow, consider adding more suites to `protractor.conf`.

### Test-reports

Reports can be found in `artifacts/test-reports/allure-results` directory.

To view test-report open `index.html` in browser

(In case of chrome you should open it via WebStorm
 "right-click"->"open in browser" - otherwise chrome security policies would not allow data to render)

You could open report in firefox without IDE support.

#### note!
It is better to clean reports directory before tests.

Running tests in debug mode requires artifacts/logs folder.

Search parameters will be saved and carried over different sessions and may break tests that uses searching.

TODO - Chose task runner you are familiar with and reports directory cleanup before tests.

### Test environment

#### Prerequisites

You must have Java, Node.js, Visual Studio with c++ desktop development and Python installed in your system to run tests.
Solution tested under Java 8 and Node.js 12.14.0.

#### Test configuration

Tests are designed to run under admin user on lens-qa stand by default (some tests performs login and logout explicitly).

To change stand on which test are running, change `baseUrl` property in `protractor.conf`.
To change user, change `params.defaultUser.login` and `params.defaultUser.password` properties in `protractor.conf`.

Note that this changes can break down some tests.

Step 20.2 requires a valid mailcatcher address located in config.json.

### Test data

For now, each test is preparing test data in application for itself, and cleans it afterwards.
This approach was chosen because of:
 - simplicity,
 - having no requirements about test run duration,
 - stability of application, which allows such approach,
 - absence of QA API and lack of control over database.

Main benefit of this approach is that you can easily make all test independent
and run any combinations of tests without worrying about test data modification logic.

Main drawback now is test run time. Tests are repeating same steps which cause decrease of performance.
Consider using other strategies, like preparing data before tests and managing it separately,
 if decrease of test run time will be needed.
