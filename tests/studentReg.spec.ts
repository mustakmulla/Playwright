import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import testData from '../test-data/sample-data.json';
import StudentRegistrationFormPage from '../pages/StudentRegistrationFormPage';

// Add this check to ensure testData is loaded correctly
if (!testData || !testData.PhoneNumber) {
    throw new Error('testData is undefined or missing required properties. Check the import path and JSON structure.');
}

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email();
const gender = testData.Gender
const phoneNumber = testData.PhoneNumber;
const subjects = testData.Subjects;
const hobbies: string[] = testData.Hobbies;
const currentAddress = testData.CurrentAddress;
const state = testData.State;
const city = testData.City;
const filePath = testData.FilePath;
const dob_day = testData.DOB_Day;
const dob_month = testData.DOB_Month;
const dob_year = testData.DOB_Year;

test('Test 1: should fill and submit the automation practice form with valid data', async ({ page }) => {

    const formPage = new StudentRegistrationFormPage(page);
    await formPage.goto();

    // Hide the banner if it exists
    await formPage.hideBanner();

    // Fill the form with valid data
    await formPage.fillForm(firstName, lastName, email, gender, phoneNumber, subjects, hobbies, currentAddress, state, city, filePath, dob_day, dob_month, dob_year);

    // Take a screenshot of the filled form
    // Get current date and time for the screenshot filename
    const timestamp = new Date().toISOString().replace(/[:.-]/g, '_');
    await formPage.takescreenshot(page, `..\\test-results\\screenshots\\filled_form_${timestamp}.png`);

    // Submit the form
    await formPage.submitForm();

    // Verify the dialog is visible
    await formPage.verifyModalTitle();


    // Take a screenshot of the dialog
    // Get current date and time for the screenshot filename
    const dialogTimestamp = new Date().toISOString().replace(/[:.]/g, '_');
    await formPage.takescreenshot(page, `..\\test-results\\screenshots\\dialog_${dialogTimestamp}.png`);

    // Verify the submitted data in the dialog
    await formPage.verifySubmittedData({
        'Student Name': `${firstName} ${lastName}`,
        'Student Email': email,
        'Mobile': phoneNumber,
        'Subjects': subjects,
        'Address': currentAddress,
        'State and City': `${state} ${city}`,
        'Picture': filePath,
        'Hobbies': hobbies.join(', '),
        'Gender': gender,
        'Date of Birth': `${dob_day} ${dob_month},${dob_year}`
    });

    // Close the dialog
    await formPage.closeDialog();

});
