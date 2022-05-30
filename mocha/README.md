# Mocha + Sinon mocks for Akamai EdgeWorkers

This module provides a set of mocks of the [EdgeWorkers API](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html) for use with Mocha+Sinon. In the Akamai EdgeWorkers execution environment, there are a set of modules and objects provided; since equivalent packages are not available in npm or node, Sinon mocks are provided here to be able to execute JS written against the EdgeWorkers API in Node.js for the purpose of testing.

This isn't a perfect solution, as:
* Mocks provided here will not perfectly replicate the API.
* The APIs provided may not be available in some event handlers, refer to the [API docs](https://techdocs.akamai.com/edgeworkers/reference/api) to see what is available.
* Tests are executed in Node; while both Node and EdgeWorkers run on top of V8, some features are explicitly disabled for EdgeWorkers, there are execution limits for EdgeWorkers (time and memory), and developers need to be careful not to pull in Node APIs.

[Additional documentation for EdgeWorkers](https://techdocs.akamai.com/edgeworkers/docs) can be found in Akamai TechDocs.

## Structure

The EdgeWorker has the following structure:

* `src` - the location of your main.js and bundle.json.  All additional modules should go here.
* `test` - unit tests

## Setup

### Step 1:
Start a new project and execute the command below :

```
npm init
```

### Step 2:

Here we are going to cover getting the node modules needed installed, as well as config file setup.

#### Install node modules
The mocks for this project are published as the node module [edgeworkers-mocha-mocks](https://www.npmjs.com/package/edgeworkers-mocha-mocks). You can install that by running the following in your project directory:

```
npm install --save-dev edgeworkers-mocha-mocks
```

### Step 3:

#### setup package.json
Make sure you set the test script defined in `package.json` to call Mocha, optionally with the `recursive` parameter to look for test files nested in the `test` directory and with `--require ts-node/register` to support running TypeScript tests.
  ```
  "scripts": {
    "test": "mocha --recursive --require ts-node/register"
  },
  ```

### Step 4:

#### configure Babel to support ESNext as used by Akamai EdgeWorkers

Babel is included as a dependency to fill in for the newer version of EcmaScript used by Akamai EdgeWorkers. To configure this correctly, add the following as a `babel.config.json` file (create a json file and name it as `babel.config.json` if it does not exists):
```
{
  "presets": [
    ["@babel/preset-env"], 
    ["@babel/preset-typescript"]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime"],
    [
      "module-resolver", {
        "root": [
          "node_modules/edgeworkers-mocha-mocks/__mocks__"
        ]
      }
    ]
  ]
}
```
The inclusion `preset-typescript` is optional and only needed if you are using TypeScript.

We also need to tell Mocha to run using Babel in a `.mocharc.yaml` file (create a yaml file and name it as `.mocharc.yaml` if it does not exists):
* Configure Mocha inside `.mocharc.yaml` to call Babel and optionally to call TypeScript test extensions:
  ```
  require:
    - '@babel/register'
  extension: ['ts', 'tsx', 'js']
  ```

### Step 5:

#### Writing a Test
After importing an edgeworker or its functions from the main.js file, you can write any kind of tests you need. Tests written against [EdgeWorker event handlers](https://techdocs.akamai.com/edgeworkers/docs/event-handler-functions) require creating a Request or Response mock and then calling the event handler function with that mock.

Here is a quick example of a test written in Mocha using [expect.js](https://github.com/Automattic/expect.js/) assertions against an EdgeWorker found in src/main.js:

```js
import * as edgeworker from "../src/main.js";
import Request from 'request';

const sinon = require("sinon");
const expect = require('expect.js');

describe('Simple example ', () => {

    it("should run a basic functional test against onClientRequest", async () => {
        let requestMock = new Request();
        edgeworker.onClientRequest(requestMock);

        expect(requestMock.respondWith.callCount).to.be(1);
        expect(requestMock.respondWith.calledWith(200, {}, "<html><body><h1>Test Page</h1></body></html>")).to.be(true);
    });

    it("should unit test an edgeworker function", () => {
        let result = edgeworker.someFunction(42);

        expect(result != null);
    });

}); 
```

More example tests are available [under the test/examples folder](https://github.com/akamai/edgeworkers-unittest/tree/main/test/examples).

### Step 6:

#### Running Tests

Testing is provided via the [Mocha](https://mochajs.org/) framework.
To run unit tests, execute the following command from the command line:

```
npm test
```

This will run all tests in the `test` directory.

## Known Issues

Imports in Node.js work differently than in the plain ESNext used by Akamai EdgeWorkers. As a result, calls to import implicitly from the same directory as an EdgeWorker do not work when called using Node.js with Mocha.

Consider the following example code from an EdgeWorker `main.js`:

```
import { usefulFunction } from 'utils/helper.js';
```

The above will fail with an error:

```
Error: Cannot find module 'utils/helper.js'
```

To fix the issue, include the current directory in the import call, like so:

```
import { usefulFunction } from './utils/helper.js';
```

This change will work with both Node.js and the Akamai EdgeWorkers runtime.


## Examples

Example EdgeWorkers can be found [in the Akamai EdgeWorkers Examples](https://github.com/akamai/edgeworkers-examples) repo. Example tests written against these EdgeWorkers are available [under the test/examples folder](https://github.com/akamai/edgeworkers-unittest/tree/main/test/examples).

## Contributing 

When contributing to the repository please describe the change or examples in detail in the pull request.

### contributing examples
- Create a pull request.
- Once the pull request is created, If the contributing user has not previously signed a Contributor License Agreement (CLA), they must complete the CLA signing steps as indicated in the pull request. The CLA signature will be stored in an Akamai private repository in Github.
- A code review will be performed by multiple Akamai members of the edgeworkers-unittest repository. The code review must receive at least 2 approvals.
- The pull request will be merged once all of the above criteria have been met.

## Resources
For more information on EdgeWorkers and EdgeKV, refer to the following resources:
* [EdgeWorkers Developer Page](https://developer.akamai.com/edgeworkers)
* [EdgeWorkers User Guide](https://learn.akamai.com/en-us/webhelp/edgeworkers/edgeworkers-user-guide/GUID-4CC14D7E-D92D-4F2D-9292-17F8BE6E2DAE.html)
* [EdgeWorkers API Guide](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html)
* [Akamai CLI for EdgeWorkers](https://developer.akamai.com/legacy/cli/packages/edgeworkers.html)
* [EdgeKV Getting Started Guide](https://learn.akamai.com/en-us/webhelp/edgeworkers/edgekv-getting-started-guide/)

## Reporting Issues
If you experience any issues with these code samples, please raise a [GitHub issue](https://github.com/akamai/edgeworkers-unittest/issues). Or create a pull request with fixes, suggestions, or your own contributed example.
