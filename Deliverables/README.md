# AutomationTask

This project automates the [DemoQA Student Registration Form](https://demoqa.com/automation-practice-form) using Playwright with the Page Object Model (POM) pattern.

## Project Structure

```
.
├── .gitignore
├── package.json
├── playwright.config.ts
├── pages/
│   └── StudentRegistrationFormPage.ts
├── test-data/
│   └── sample-data.json
├── tests/
│   └── studentReg.spec.ts
├── test-results/
│   └── ...
├── playwright-report/
│   └── ...
```

## Getting Started

### 1. Install Dependencies

```sh
npm install
```

### 2. Update Test Data

Edit [`test-data/sample-data.json`](test-data/sample-data.json) to change the test input values (e.g., gender, phone number, subjects, etc.).

### 3. Run Tests

```sh
npx playwright test
```

### 4. View HTML Report

After running tests, view the report:

```sh
npx playwright show-report
```

## Key Files

- [`pages/StudentRegistrationFormPage.ts`](pages/StudentRegistrationFormPage.ts): Page Object Model for the registration form.
- [`tests/studentReg.spec.ts`](tests/studentReg.spec.ts): Main test file using the POM and test data.
- [`test-data/sample-data.json`](test-data/sample-data.json): Test data for filling the form.

## Notes

- Screenshots and reports are saved in the `test-results/` and `playwright-report/` folders.
- Make sure the file path in the test data (`FilePath`) points to a valid image on your system.

## Requirements

- Node.js >= 16
- npm

## Useful Commands

- Run all tests:  
  `npx playwright test`
- Run a specific test:  
  `npx playwright test tests/studentReg.spec.ts`
- Open Playwright test report:  
  `npx playwright show-report`

---

Happy Testing!