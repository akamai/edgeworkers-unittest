# Jest mocks for Akamai EdgeWorkers

This module provides a set of Jest mocks for the [EdgeWorkers API](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html). In the Akamai EdgeWorkers execution environment, there are a set of modules and objects provided; since equivalent packages are not available in npm or node, Jest mocks are provided here to be able to execute JS written against the EdgeWorkers API in Node.js for the purpose of testing.

These mocks are provided using [manual mocks](https://jestjs.io/docs/en/manual-mocks) and allow for user control of their functions.  

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
The mocks for this project are published as the node module [edgeworkers-jest-mocks](https://www.npmjs.com/package/edgeworkers-jest-mocks). You can install that by running the following in your project directory:

```
npm install --save-dev edgeworkers-jest-mocks
```

### Step 3:

#### setup package.json
Make sure you have the following configured in the `package.json` file:
* Set the test script to jest: 
  ```
  "scripts": {
    "test": "jest"
  },
  ```
* Configure Jest so that the EdgeWorkers API mocks are easier to import
  ```
  "jest": {
    "testEnvironment": "node",
    "transformIgnorePatterns": [
      "node_modules/(?!edgeworkers-jest-mocks/__mocks__)"
    ],
    "moduleDirectories": [
      "node_modules",
      "node_modules/edgeworkers-jest-mocks/__mocks__"
    ]
  }
  ```

### Step 4:

#### setup babel.config.json
Babel is included as a dependency to fill in for the newer version of EcmaScript used by Akamai EdgeWorkers. To configure this correctly, add the following as a `babel.config.json` file (create a json file and name it as `babel.config.json` if it does not exists):
```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/transform-runtime"]
  ]
}
```

### Step 5:

#### Writing a Test
After importing an edgeworker or its functions from the main.js file, you can write any kind of tests you need. Tests written against [EdgeWorker event handlers](https://techdocs.akamai.com/edgeworkers/docs/event-handler-functions) require creating a Request or Response mock and then calling the event handler function with that mock.

Here is a quick example of a test written in Jest against an EdgeWorker found in src/main.js:

```js
import * as edgeworker from "../src/main.js";
import Request from 'request';

describe('Simple Example', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("functional test against onClientRequest", async () => {
        let requestMock = new Request();
        edgeworker.onClientRequest(requestMock);

        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, "<html><body><h1>Test Page</h1></body></html>");
    });

    test("unit test an edgeworker function", async () => {
        let result = edgeworker.someFunction(42);

        expect(result != null);
    });

}); 
```

More example tests are available [under the test/examples folder]([https://github.com/akamai/edgeworkers-unittest/tree/main/test/examples](https://github.com/akamai/edgeworkers-unittest/tree/main/jest/test/examples)). If needed, a [good overview of using Jest is available from Flaviocopes](https://flaviocopes.com/jest/).

### Step 6:

#### Running Tests

Testing is provided via the [Jest](https://jestjs.io/) framework.
To run your unit tests, execute the following command from the command line:

```
npm test
```

This will run all tests in the `test` directory following the `Jest` conventions.  If you want more tests, name them in the pattern *.test.js.

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
