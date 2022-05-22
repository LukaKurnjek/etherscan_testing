
import { Selector } from 'testcafe';

fixture`Starting test 04.`
    .page`https://etherscan.io/register`;

test('Test 04', async t => {
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
        
        // Click on the "Create An Account" button
        .click('#ContentPlaceHolder1_btnRegister.btn.btn-sm.btn-primary');
        
    // Get the text of the warning message for the "Terms and Conditions" check box
    const checkboxElement = await Selector('div').withText('Please accept our Terms and Conditions.').child(4);
    let checkboxText = await checkboxElement.innerText;
    // I could not use the line of code below since it contains the invalid character "$" in the name of the HTML attribute
    //const checkboxElement = await Selector('#ctl00$ContentPlaceHolder1$MyCheckBox-error.invalid-feedback');    
    
    // Get the inner text of the title displayed at the beggining of the form
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-2');
    let headerText = await headerElement.innerText;
    
    // Check weather the title and the warning message are as expected
    await t
        .expect(checkboxText).eql('I agree to the Terms and Conditions\nPlease accept our Terms and Conditions.')
        // Another valid way to check weather the above condition is satisfied
        //.expect(checkboxText).contains('Please accept our Terms and Conditions.')
        .expect(headerText).eql('Register a New Account');
});
