
"""
Dependencies: SpeechRecognition, ffmpeg
$ pip install SpeechRecognition
$ sudo yum install ffmpeg
"""

# Get URL link provided as input
import sys
url_link = sys.argv[1]

# Download the audio file and save it to recaptcha.mp3
import urllib.request
urllib.request.urlretrieve(url_link, 'recaptcha.mp3')

# Convert the mp3 audio file to a wav file and suppress the output
import os
os.system('ffmpeg -i recaptcha.mp3 recaptcha.wav > /dev/null 2>&1')

# Parse the audio wav file and output the result
import speech_recognition as sr
r = sr.Recognizer()

recaptcha = sr.AudioFile('recaptcha.wav')
with recaptcha as source:
    audio = r.record(source)

print(r.recognize_google(audio))

