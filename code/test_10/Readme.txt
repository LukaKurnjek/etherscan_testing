
This test simulates a positive workflow. When this test is runned for the
first time it should succseed.

When it is runned for the second time following conditions have to be met:
- the username on line 16 has to be changed since the registration will not
  be possible with a username that already exists
- there needs to be a couple of hours between the previous testing and the
  next or else google gets suspicious and gives you more tasks to solve

Because this test also executes a simple python script that handles voice
recognition of the reCAPTCHA audio file, 2 libraries have to be installed
that are specified on the github start page in the Installation chapter.
