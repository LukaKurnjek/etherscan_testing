
import { Selector } from 'testcafe';

fixture`Starting test 03.`
    .page`https://etherscan.io/register`;

test('Test 03', async t => {
    await t
		// Click on the button to accept cookies
		.click('#btnCookie.btn.btn-sm.btn-primary.text-nowrap.py-1')
		
		// Enter username
		.typeText('#ContentPlaceHolder1_txtUserName.form-control.form-control-sm', 'testuser')
		
		// Enter email address twice
        .typeText('#ContentPlaceHolder1_txtEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        .typeText('#ContentPlaceHolder1_txtConfirmEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        
        // Check the box for "Terms and conditions"
        .click('#ContentPlaceHolder1_MyCheckBox.custom-control-input')
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');

	// Get the inner text of the warning message for the "Password" field
    const warningElement1 = await Selector('#ContentPlaceHolder1_txtPassword-error.invalid-feedback');
    let warningText1 = await warningElement1.innerText;

	// Get the inner text of the warning message for the "Confirm Password" field
    const warningElement2 = await Selector('#ContentPlaceHolder1_txtPassword2-error.invalid-feedback');
    let warningText2 = await warningElement2.innerText;
    
    // Get the inner text of the title displayed at the beggining of the form
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-2');
    let headerText = await headerElement.innerText;
    
    // Check weather the title and the warning message are as expected
    await t
		.expect(warningText1).eql('Your password must be at least 5 characters long.')
		.expect(warningText2).eql('Your password must be at least 5 characters long.')
		.expect(headerText).eql('Register a New Account');
});
