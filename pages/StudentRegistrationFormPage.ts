import { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

class StudentRegistrationFormPage {

    private page: Page;
    private firstNameInput: Locator;
    private lastNameInput: Locator;
    private emailInput: Locator;
    private genderLabel: Locator;
    private phoneNumberInput: Locator;
    private dateOfBirthInput: Locator;
    private subjectsInput: Locator;
    private hobbiesCheckbox: Locator;
    private fileInput: Locator;
    private currentAddressInput: Locator;
    private stateDropdown: Locator;
    private cityDropdown: Locator;
    private submitButton: Locator;
    private dialog: Locator;
    private table: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        //  this.genderLabel = page.getByText('Gender');
        this.phoneNumberInput = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsInput');
        this.fileInput = page.locator('input[type="file"]');
        this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
        this.stateDropdown = page.getByText('Select State');
        this.cityDropdown = page.getByText('Select City');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
        this.dialog = page.getByRole('dialog', { name: 'Thanks for submitting the form' });
        this.table = page.locator('//table[contains(@class, "table")]');
    }

    async goto() {
        await this.page.goto('https://demoqa.com/automation-practice-form');
    }

    async fillForm(firstName: string, lastName: string, email: string, gender: string, phoneNumber: string, subjects: string, hobbies: string[], currentAddress: string, state: string, city: string, filePath: string, dob_day: string, dob_month: string, dob_year: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.page.getByText(gender, { exact: true }).click();
        await this.phoneNumberInput.fill(phoneNumber);
        await this.dateOfBirthInput.click();
        await this.page.locator('.react-datepicker__month-select').selectOption({ label: dob_month });
        await this.page.locator('.react-datepicker__year-select').selectOption(dob_year);
        const dayLocator = `//div[@role="option"][text()=\'${dob_day}\']`;
        await this.page.locator(dayLocator).click();
        await this.subjectsInput.fill(subjects);
        await this.page.locator('#react-select-2-option-0').click();
        for (const hobby of hobbies) {
            if (hobby === 'Sports') {
                await this.page.locator('label[for="hobbies-checkbox-1"]').check();
            } else if (hobby === 'Reading') {
                await this.page.locator('label[for="hobbies-checkbox-2"]').check();
            } else if (hobby === 'Music') {
                await this.page.locator('label[for="hobbies-checkbox-3"]').check();
            }
        }
        await this.fileInput.setInputFiles(filePath);
        await this.currentAddressInput.fill(currentAddress);
        await this.stateDropdown.click();
        await this.page.getByText(state, { exact: true }).click();
        await this.cityDropdown.click();
        await this.page.getByText(city, { exact: true }).click();
    }

    async submitForm() {
        await this.submitButton.click();
        await this.dialog.waitFor({ state: 'visible' });
    }

    async verifyModalTitle() {
        const modalTitle = this.page.locator('//div[@id="example-modal-sizes-title-lg"]');
        await expect(modalTitle).toBeVisible();
        await expect(modalTitle).toHaveText('Thanks for submitting the form');
    }

    async verifySubmittedData(expectedData: Record<string, string>) {
        // Number of rows in the table
        const rowCount = await this.table.locator('tbody tr').count();
        // Number of columns in the table
        const columnCount = await this.table.locator('thead th').count();
        console.log(`Row Count: ${rowCount}, Column Count: ${columnCount}`);
        // Read data from each cell 
        for (let i = 1; i <= rowCount; i++) {
            // First column is field names and second column is values as there are two columns in the table
            // Get the field name and value from the table
            const fieldName = await this.table.locator(`tbody tr:nth-child(${i}) td:nth-child(1)`).textContent();
            const fieldValue = await this.table.locator(`tbody tr:nth-child(${i}) td:nth-child(2)`).textContent();
            console.log(`Field: ${fieldName}, Value: ${fieldValue}`);

            if (fieldName !== null && fieldName === 'Picture') {
                expect.soft(expectedData[fieldName]).toContain(fieldValue); // Check if the file path is part of the field value
            }
            else if (fieldName !== null && expectedData[fieldName]) {
                expect.soft(fieldValue).toBe(expectedData[fieldName]);
            }
        }
    }

    async closeDialog() {
        await this.page.locator('//button[@id="closeLargeModal"]').click();
        await this.dialog.waitFor({ state: 'hidden' });
    }

    async hideBanner() {
        const banner = this.page.locator('//div[@id="fixedban"]');
        await banner.evaluate(element => {
            element.style.display = 'none'; // Hide the element
        });
    }

    async takescreenshot(page: Page, p0: string) {
        await page.screenshot({ path: p0 });
    }

}


export default StudentRegistrationFormPage;