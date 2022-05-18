
import { Selector } from 'testcafe';

fixture`Starting test 10.`
    .page`https://etherscan.io/register`;

test('Test 10', async t => {
	// Define the recaptcha element
	const recaptcha = Selector('.g-recaptcha');
	//const recaptcha = Selector('#recaptcha-anchor.recaptcha-checkbox.goog-inline-block.recaptcha-checkbox-unchecked.rc-anchor-checkbox');
	//const recaptcha = Selector('#rc-anchor-container.rc-anchor.rc-anchor-normal.rc-anchor-light');
	//const recaptcha = Selector('.g-recaptcha').find('div').find('div').find('iframe').child().child(1);
	//const recaptcha = Selector('.g-recaptcha').find('div').find('div').find('iframe');
	//const recaptcha = Selector('.recaptcha-checkbox');
	
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
        
        // Click on the recaptcha checkbox (does not work)
        .click(recaptcha, { offsetX: 20 , offsetY: 25 })
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');
        
    // Get the text of the reCAPTCHA warning message displayed at the top of the form
    const captchaElement = await Selector('.alert.alert-danger');
    let captchaText = await captchaElement.innerText;
    
    // Get the inner text of the title displayed at the beggining of the form
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-2');
    let headerText = await headerElement.innerText;
    
    // Check weather the title and the warning message are as expected
    await t
        .expect(headerText).eql('Register a New Account')
        .expect(captchaText).eql('Error! Invalid captcha response.\nPlease Try Again');
});
