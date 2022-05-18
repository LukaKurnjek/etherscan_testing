
import { Selector } from 'testcafe';

fixture`Starting test 09.`
    .page`https://etherscan.io/register`;

test('Test 09', async t => {
	// Define link for the "Sign In" page
	const linkElement = await Selector('a').withText('Click to Sign In');
	
	// Click on the link
    await t
        .click(linkElement);
    
    // Define the header text of the "Sign In" webpage
    const headerElement = await Selector('.h3.text-primary.font-weight-normal.mb-0');
    let headerText = await headerElement.innerText;
    
    // Check weather the title is as expected
    await t
        .expect(headerText).eql('Welcome back');
});
