
import { Selector } from 'testcafe';

fixture`Starting test 01.`
    .page`https://etherscan.io/register`;

test('Test 01', async t => {
    await t
        // Click on the button to accept cookies
        .click('#btnCookie.btn.btn-sm.btn-primary.text-nowrap.py-1')
        
        // Enter email address twice
        .typeText('#ContentPlaceHolder1_txtEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        .typeText('#ContentPlaceHolder1_txtConfirmEmail.form-control.form-control-sm', 'my_test_email_etherscan@gmail.com')
        
        // Enter password twice
        .typeText('#ContentPlaceHolder1_txtPassword.form-control.form-control-sm', '12345678')
        .typeText('#ContentPlaceHolder1_txtPassword2.form-control.form-control-sm', '12345678')
        
        // Check the box for "Terms and conditions"
        .click('#ContentPlaceHolder1_MyCheckBox.custom-control-input')
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');

    // Get the inner text of the warning message for the username field
    const warningElement = await Selector('.js-form-message.form-group.u-has-error').find('div');
    let warningText = await warningElement.innerText;
    
    // Get the inner text of the title displayed at the beggining of the form 
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-2');
    let headerText = await headerElement.innerText;
    
    // Check weather the title and the warning message are as expected
    await t    
        .expect(warningText).eql('Username is invalid.')
        .expect(headerText).eql('Register a New Account');
});
