# etherscan_testing
Automated web tests for the etherscan.io/register site


Introduction
------------

This repository contains:
- test case instructions for the etherscan.io/register site (Testcases.pdf)
- test case code that can be run with testcafe software (code folder)

All code example should pass except the code example in folder 10, where a
readme file is included that explains why the test can not pass. The code
was tested with Firefox 95.0 and testcafe 1.18.6. 


Installation instructions
-------------------------
The instructions are prepared for a Linux type OS.

1. Install the nodejs and npm tools:
- on Fedora/RHEL run in terminal: "sudo yum install nodejs"
- on Debian/Ubuntu run in terminal: "sudo apt install nodejs"

2. From the terminal run: "npm install -g testcafe"


Running the code examples
-------------------------

Open up a terminal, cd into a folder that contains the desired test case
and run the following command: "testcafe <browser> <testcase_name>.js".

If you would like to test for example test test01 with firefox:
testcafe firefox test01.js

If the test completes succesfully you will get a green message displayed.
