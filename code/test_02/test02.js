
import { Selector } from 'testcafe';

fixture`Starting test 02.`
    .page`https://etherscan.io/register`;

test('Test 02', async t => {
    await t
		// Click on the button to accept cookies
		.click('#btnCookie.btn.btn-sm.btn-primary.text-nowrap.py-1')
		
		// Enter username
		.typeText('#ContentPlaceHolder1_txtUserName.form-control.form-control-sm', 'testuser')
		
		// Enter password twice
        .typeText('#ContentPlaceHolder1_txtPassword.form-control.form-control-sm', '12345678')
        .typeText('#ContentPlaceHolder1_txtPassword2.form-control.form-control-sm', '12345678')
        
        // Check the box for "Terms and conditions"
        .click('#ContentPlaceHolder1_MyCheckBox.custom-control-input')
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');

	// Get the inner text of the warning message for the "Email Address" field
    const warningElement1 = await Selector('#ContentPlaceHolder1_txtEmail-error.invalid-feedback');
    let warningText1 = await warningElement1.innerText;

	// Get the inner text of the warning message for the "Confirm Email Address" field
    const warningElement2 = await Selector('#ContentPlaceHolder1_txtConfirmEmail-error.invalid-feedback');
    let warningText2 = await warningElement2.innerText;
    
    // Get the inner text of the title displayed at the beggining of the form
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-2');
    let headerText = await headerElement.innerText;
    
    // Check weather the title and the warning message are as expected
    await t    
		.expect(warningText1).eql('Please enter a valid email address.')
		.expect(warningText2).eql('Please re-enter your email address.')
		.expect(headerText).eql('Register a New Account');
});
