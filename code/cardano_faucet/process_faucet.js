

import { Selector } from 'testcafe';

// ATTENTION; Settings for this test. Needs to be set by the user! 
// ---------------------------------------------------------------
// List of addresses. Has to be a array element. 
const addresses = 
  ["123test",
   "456test"
  ];

// Cardano test network. Optinos: "preview" or "preprod"
const cardano_net = "preprod";
// ---------------------------------------------------------------


// Code for the automated test 
// ---------------------------------------------------------------
// Setting the widget for the correct network
var net_selector_widget = ""; 
if (cardano_net == "preprod") {
    var net_selector_widget = "li.MuiButtonBase-root:nth-child(2)";
} else if (cardano_net == "preview") {
    var net_selector_widget = "li.MuiButtonBase-root:nth-child(1)"; 
}

// Testcafe code: setting the target webpage URL: 
fixture`Processing Cardano faucet.`
    .page`https://docs.cardano.org/cardano-testnet/tools/faucet/`;

// Main test. Sends funds to all addresses specified in the list. reCAPTCHA test needs to be solved only once. 
test('Sending funds to addresses.', async t => {
    // Defining the request funds button
    const request_button = Selector("button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary");
    
    await t
        // Maximize window
        .maximizeWindow()

        // Click on the button to reject cookies 
        .click(".osano-cm-denyAll")
        // The Accept all button 
        //.click(".osano-cm-save")

        // Select the network
        .click("div.MuiBox-root:nth-child(7) > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)")
        .click(net_selector_widget)

        // Scroll a bit down 
        .scroll(request_button, "bottomRight")

        // Switch to the recaptcha iframe element and click on the checkbox
        .switchToIframe(Selector("iframe").withAttribute("title","reCAPTCHA"))
        .click("#recaptcha-anchor.recaptcha-checkbox.goog-inline-block.recaptcha-checkbox-unchecked.rc-anchor-checkbox")
        .wait(3000) 

        // Switch back to main window so you can switch again to a new iframe (the raCAPTCHA pictures window)
        .switchToMainWindow() 
        .switchToIframe(Selector("iframe").withAttribute("title","recaptcha challenge expires in two minutes")) 
        
        // Click on the button for the audio chalange 
        .click('#recaptcha-audio-button.rc-button.goog-inline-block.rc-button-audio') 
        .wait(3000) 
        
        // Switch back to main window so you can switch again to a new iframe (the reCAPTCHA audio window)
        .switchToMainWindow() 
        .switchToIframe(Selector('iframe').withAttribute('title','recaptcha challenge expires in two minutes')); 
    
    // Get the donwload link from the audio download buttun
    const downloadLink = await (Selector('.rc-audiochallenge-tdownload-link').withAttribute('title','Alternatively, download audio as MP3')()).getAttribute('href');

    // Execute the python script for downloading, converting and parsing the audio file
    const execSync = require('child_process').execSync;
    // It is neccessary to wrap the downloadLink into "" quotation marks because it contains an ampersand symbol
    const output = execSync('python process_mp3.py ' + '\"' + downloadLink + '\"').toString(); 
    await t.wait(3000) 

    // Log audio message and delete the MP3 and WAV files 
    console.log("Audio message says: \n" + output); 
    const { promisify } = require('util');
    const exec = promisify(require('child_process').exec)
    // ATTENTION: Commands work only for Linux OS 
    exec("rm recaptcha.mp3"); 
    exec("rm recaptcha.wav"); 
    
    await t
        // Type in the audio text and click on the verify button
        .wait(2000) // if you are to fast google gives you another task 
        .typeText('#audio-response.rc-response-input-field.label-input-label', output)
        .click('#recaptcha-verify-button.rc-button-default.goog-inline-block')
        .switchToMainWindow(); // switches back to main window 

    // Fills in the address and presses the Request funds button for every address from the list. 
    for (let i = 0; i < addresses.length; i++) {
        await t
            // Type in the address
            .typeText("div.MuiBox-root:nth-child(3) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)", addresses[i], { replace: true })
            
            // Click Request funds and wait for 3 second 
            .click(request_button)
            .wait(3000);
    }
}); 
// ---------------------------------------------------------------
