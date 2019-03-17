Prerequisites:
1. Node version 10.15.x +

Installation:
1. npm install

Run tests:
1. npm run <test-suite-name> (Please refer to List of test suites section)

Run with docker:
1. Navigate to Dockerfile and replace baseUrl param with the actual one (localhost:3000 by default)
2. Execute`docker build .`


List of test suites:
Headless suites (could be used for CI):
1. test-ci - executes all avaliable test cases
2. search-ci - executes search test cases
3. navigation-ci - executes navigation test cases

Interactive suites (could be user for local execution and debugging):
1. test - executes all avaliable test cases
2. search - executes search test cases
3. navigation - executes navigation test cases