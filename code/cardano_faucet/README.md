
Instructions for the Cardano faucet automated test 
------------------------------------------------------------------------

This automated webpage test uses the Cardano faucet webpage to send test
ADA to predefined addresses. The addresses together with the network need
to be defined in the process_faucet.js test file. 

Because this test also executes a simple python script that handles voice
recognition of the reCAPTCHA audio file, 2 libraries have to be installed.

Instalation instructions for Fedora Linux: 

1. Install nodejs, testcafe and chromium: 
sudo yum install nodejs 
sudo npm install -g testcafe 
sudo yum install chromium 

2. Install Python pip and 2 audio libraries: 
sudo yum install python3-pip
pip install SpeechRecognition
sudo yum install ffmpeg-free

NOTE: on Ubuntu package "ffmpeg-free" name may be "ffmpeg". 

3. Move to the test file location and run the test with the command: 
testcafe chromium -private-window process_faucet.js 

NOTE: Firefox does not load the reCAPTHCA and displays error:
      Error for site owner. Invalid domain for site key. 

