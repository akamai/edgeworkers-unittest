# Akamai EdgeWorkers Test Mocks

This repository provides a set of Jest mocks for the [EdgeWorkers API](https://developer.akamai.com/api/web_performance/edgeworkers/v1.html). In the Akamai EdgeWorkers execution environment, there are a set of modules and objects provided; since equivalent packages are not available in npm or node, Jest mocks are provided here to be able to execute JS written against the EdgeWorkers API in Node.js for the purpose of testing.

These mocks are provided using [manual mocks](https://jestjs.io/docs/en/manual-mocks) and allow for user control of their functions.  

This isn't a perfect solution, as:
* Mocks provided here will not perfectly replicate the API.
* Tests are executed in Node; while both Node and EdgeWorkers run on top of V8, some features are explicitly disabled for EdgeWorkers, there are execution limits for EdgeWorkers (time and memory), and developers need to be careful not to pull in Node APIs.


## Structure

The EdgeWorker has the following structure:

* `src` - the location of your main.js and bundle.json.  All additional modules should go here.
* `test` - unit tests


## Setup

Here we are going to cover getting the node modules needed installed, as well as config file setup.

### Install node modules
The mocks for this project are publishes as the node module `edgeworkers-jest-mocks`. You can install that by running the following in your project directory:

```
npm install edgeworkers-jest-mocks
```

It's also very useful to have babel installed, as Akamai EdgeWorkers support a newer version of EcmaScript than Node.js normally does:

```
npm install @babel/runtime
```

Finally install the following as dev dependencies:

```
npm install --save-dev jest babel-jest babel-core @babel/preset-env @babel/plugin-transform-runtime
```


### package.json setup
Make sure you have the following configured in the package.json file:
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

### babel.config.json setup
As mentioned above it is useful to have babel installed to fill in for the newer version of EcmaScript used by Akamai EdgeWorkers. To configure this correctly, add the following as a `babel.config.json` file:
```
{
  "presets": ["@babel/preset-env"],
  "plugins": [
    ["@babel/transform-runtime"]
  ]
}
```

## Writing a Test
Here is a quick example of a test written in Jest against an EdgeWorker found in src/main.js:

```
import * as edgeworker from "../src/main.js";
import Request from 'request.js';

describe('Simple Example', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    test("functional test against onClientRequest", async () => {
        let requestMock = new Request();
        onClientRequest(requestMock);

        expect(requestMock.respondWith).toHaveBeenCalledTimes(1);
        expect(requestMock.respondWith).toHaveBeenCalledWith(200, {}, "<html><body><h1>Test Page</h1></body></html>");
    });

    test("unit test an edgeworker function", async () => {
        let result = edgeworker.someFunction(42);

        expect(result != null);
    });

}); 
```

More example tests can be found [in the Akamai EdgeWorkers Exmaples](https://github.com/akamai/edgeworkers-examples) repo

## Running Tests

Testing is provided via the [Jest](https://jestjs.io/) framework.
To run you unit tests, execute the following command from the command line:

```
npm test
```

This will run all tests in the `test` directory following the `Jest` conventions.  If you want more tests, name them in the pattern *.test.js.

A good overview of using Jest can be found [here](https://flaviocopes.com/jest/).

## Examples

Example EdgeWorkers and tests to go along with them can be found [in the Akamai EdgeWorkers Exmaples](https://github.com/akamai/edgeworkers-examples) repo.
