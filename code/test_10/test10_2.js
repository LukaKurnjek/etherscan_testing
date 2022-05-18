
import { Selector } from 'testcafe';

fixture`Starting test 10.`
    .page`https://etherscan.io/register`;

test('Test 10', async t => {
    await t
		// Click on the button to accept cookies
		.click('#btnCookie.btn.btn-sm.btn-primary.text-nowrap.py-1')
		
		// Enter username
		.typeText('#ContentPlaceHolder1_txtUserName.form-control.form-control-sm', 'testuser')
		
		// Enter email address twice
        .typeText('#ContentPlaceHolder1_txtEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        .typeText('#ContentPlaceHolder1_txtConfirmEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        
        // Enter password twice
        .typeText('#ContentPlaceHolder1_txtPassword.form-control.form-control-sm', '12345678')
        .typeText('#ContentPlaceHolder1_txtPassword2.form-control.form-control-sm', '12345678')
        
        // Check the box for "Terms and conditions"
        .click('#ContentPlaceHolder1_MyCheckBox.custom-control-input')
        
        // Switch to the recaptcha iframe element and click on the checkbox
        .switchToIframe('.a-x4nn9btmira') // does not find this element
        .click('#recaptcha-anchor.recaptcha-checkbox.goog-inline-block.recaptcha-checkbox-unchecked.rc-anchor-checkbox')
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');
    
    // Get the text of the reCAPTCHA warning message displayed at the top of the form
    const captchaElement = await Selector('.alert.alert-danger');
    let captchaText = await captchaElement.innerText;
    
    // Check weather the warning message is as expected
    await t
        .expect(captchaText).eql('Error! Invalid captcha response.\nPlease Try Again');	
});
