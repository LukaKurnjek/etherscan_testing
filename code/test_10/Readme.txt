
These tests attemp to simulate a positive workflow. They try an attempt
to click on the reCAPTCHA checkbox in two different ways which do not work.

In the end of the test I check weather I'm still on the same page which if
passes it means the positive workflow was not accomplished.

After many time of research on google I asked a question on stackoverflow:
https://stackoverflow.com/questions/72277761/testcafe-click-on-checkbox-inside-a-virtual-element-document

It seems that if the source of the iframe bellongs to a different domain the
elements inside the iframe cannot be accessed.
