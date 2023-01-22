# etherscan_testing
Automated web tests for the etherscan.io/register site


Introduction
------------

This repository contains:
- test case instructions for the etherscan.io/register site (Testcases.pdf)
- test case code that can be run with testcafe software (folder *code*)

All code example should pass. For code example in folder 10, there are some
additional conditions for the test to pass which are described in the readme
file of the tests folder. This is because of google's reCAPTCHA test.

The code was tested on Fedora 35 with Firefox 95.0 and testcafe 1.18.6. 


Installation instructions
-------------------------
The instructions are prepared for a Linux type OS.

1. Install the nodejs and npm tools:
- on Fedora/RHEL run in terminal: <br>
  `$ sudo yum install nodejs`
- on Debian/Ubuntu run in terminal: <br>
  `$ sudo apt install nodejs`

2. From the terminal run: "$ npm install -g testcafe"

3. python 3 and pip need to be installed on the linux OS which
   is default on almost all modern OS. Additional dependencies that
   need to be installed are SpeechRecognition and ffmpeg:<br>
   - `$ pip install SpeechRecognition`<br>
   - `$ sudo yum install ffmpeg` **or** <br>
     `$ sudo apt install ffmpeg`


Running the code examples
-------------------------

Open up a terminal, cd into a folder that contains the desired test case
and run the following command: 
`testcafe  <browser_name>  <private_window_option>  <testcase_name>.js`

If you would like to test for example test test01 with firefox:<br>
`testcafe firefox -private-window test01.js`

If the test completes succesfully you will get a green message displayed that says "1 passed".
