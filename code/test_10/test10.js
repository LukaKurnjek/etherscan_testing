
import { Selector, ClientFunction } from 'testcafe';

fixture`Starting test 10.`
    .page`https://etherscan.io/register`;

test('Test 10', async t => {
    // Function that gets the full URL path from the current window
    const getPageUrl = ClientFunction(() => window.location.href);	
	
    await t
        // Click on the button to accept cookies
        .click('#btnCookie.btn.btn-sm.btn-primary.text-nowrap.py-1')
		
        // Enter username
        .typeText('#ContentPlaceHolder1_txtUserName.form-control.form-control-sm', 'newtestuser')
    
        // Enter email address twice
        .typeText('#ContentPlaceHolder1_txtEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        .typeText('#ContentPlaceHolder1_txtConfirmEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        
        // Enter password twice
        .typeText('#ContentPlaceHolder1_txtPassword.form-control.form-control-sm', '12345678')
        .typeText('#ContentPlaceHolder1_txtPassword2.form-control.form-control-sm', '12345678')
        
        // Check the box for "Terms and conditions"
        .click('#ContentPlaceHolder1_MyCheckBox.custom-control-input')
        
        // Switch to the recaptcha iframe element and click on the checkbox
        .switchToIframe(Selector('iframe').withAttribute('title','reCAPTCHA'))
        .click('#recaptcha-anchor.recaptcha-checkbox.goog-inline-block.recaptcha-checkbox-unchecked.rc-anchor-checkbox')
        
        // Switch back to main window so you can switch again to a new iframe (the raCAPTCHA pictures window)
        .switchToMainWindow()
        .switchToIframe(Selector('iframe').withAttribute('title','recaptcha challenge expires in two minutes'))
        
        // Click on the button for the audio chalange
        .click('#recaptcha-audio-button.rc-button.goog-inline-block.rc-button-audio')
        
        // Switch back to main window so you can switch again to a new iframe (the reCAPTCHA audio window)
        .switchToMainWindow()
        .switchToIframe(Selector('iframe').withAttribute('title','recaptcha challenge expires in two minutes'));
        
    // Get the donwload link from the audio download buttun
    const downloadLink = await (Selector('.rc-audiochallenge-tdownload-link').withAttribute('title','Alternatively, download audio as MP3')()).getAttribute('href');

    // Execute the python script for downloading, converting and parsing the audio file
    const execSync = require('child_process').execSync;
    const output = execSync('python process_mp3.py ' + '\"' + downloadLink + '\"').toString();
    // It is neccessary to wrap the downloadLink into "" quotation marks because it contains an ampersand symbol
            
    await t
        // Type in the audio text and click on the verify button
        .wait(5000) // if you are to fast google gives you another task
        .typeText('#audio-response.rc-response-input-field.label-input-label', output)
        .click('#recaptcha-verify-button.rc-button-default.goog-inline-block')
        // Click on the "Create An Account" button
        .switchToMainWindow() // switches back to main window
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');
    
    // Get the text of the header message displayed at the top of page
    const headerElement = await Selector('.alert.alert-info');
    let headerText = await headerElement.innerText;
    
    // Check weather the header text is as expected
    await t
        .expect(headerText).eql('Your account registration has been submitted and is pending email verification ');
});
