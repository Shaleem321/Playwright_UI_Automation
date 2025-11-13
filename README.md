# Luxodd E2E Playwright Automation Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for testing the Luxodd application across different environments.

## Prerequisites

### Node.js

1. You must have [Node.js](https://nodejs.org/en/) installed (Node.js LTS version recommended).
2. When installing Node.js, make sure to check the option:
   - [x] **Automatically install the necessary tools. Note that this will also install Chocolatey. The script will pop up in a new window after the installation completes.**

![nodeInstall](https://user-images.githubusercontent.com/60171460/157139770-d00bb969-9b36-4179-9dd2-ec5bf3fbd89a.PNG)

### Visual Studio Code

You must have [Visual Studio Code](https://code.visualstudio.com/download) installed or Any other IDE.

## Initial Setup

1. Select the folder where you would like to clone the project.
2. Open Gitbash and paste the following command:

```bash
git clone <repository-url>
```

3. Navigate to the project directory and install dependencies:

```bash
cd luxodd_e2e
npm install
```

### Adding Environment Files

1. Create a folder `config` in the root directory (see file structure below)
2. Create environment files for each environment you want to test:
   - `.env.development` for development environment
   - `.env.prod` for production environment
3. Update each file with the appropriate configuration values

#### .env file template

```env
# Base URL for the application
URL='https://your-app-url.com'

# Authentication credentials
email='test@example.com'
password='your-password'

# Optional: Skip global login for faster test execution
skipGlobalLogin='false'
```

## File Structure

The project has the following structure:

```
luxodd_e2e/
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── README.md
├── tsconfig.json
├── api/
│   └── getOTPFromEmail.ts
├── config/
│   ├── .env.development
│   └── .env.prod
├── data/
│   ├── admin/
│   │   └── signup/
│   │       └── sign.data.ts
│   ├── app/
│   └── landing page/
│       └── website.data.ts
├── fixtures/
│   ├── landing.fixtures.ts
│   └── page.fixtures.ts
├── interfaces/
│   ├── auth.interface.ts
│   ├── locator.info.interface.ts
│   └── testcase.data.interface.ts
├── page/
│   ├── admin/
│   │   └── login/
│   │       └── login.page.ts
│   ├── app/
│   └── landing page/
│       └── website.page.ts
├── specs/
│   ├── admin/
│   │   └── setup/
│   │       └── login.setup.spec.ts
│   ├── app/
│   └── landing page/
│       └── website.spec.ts
└── utilities/
    ├── env.utils.ts
    ├── general.utils.ts
    ├── playwright.actions.utils.ts
    ├── playwright.verifications.utils.ts
    ├── test.helper.utils.ts
    └── testData.generate.utils.ts
```

## How to Run Test Cases 🧪

### All tests

```bash
npx playwright test
```

### Development environment tests

```bash
npm run test:dev
```

### Production environment tests

```bash
npm run test:prod
```

### Tests with Allure reporting

```bash
# Development environment with Allure report
npm run test:dev:allure

# Production environment with Allure report
npm run test:prod:allure

# Open Allure report after generation
npm run allure:open
```

### Run specific test files

```bash
npx playwright test specs/landing\ page/website.spec.ts
```

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```

### Run tests in debug mode

```bash
npx playwright test --debug
```

## Test Configuration

### Browser Support

The framework is configured to run on:
- **Chromium** (default)
- Firefox and WebKit are available but commented out in the configuration

### Test Execution

- **Parallel Execution**: Tests run in parallel by default
- **Retries**: 1 retry on CI, 0 retries locally
- **Timeout**: 90 seconds per test, 60 seconds for assertions
- **Workers**: 1 worker locally, 2 workers on CI

### Reporting

The framework includes multiple reporting options:
- **Allure Reports**: Comprehensive test reporting with detailed results
- **HTML Reports**: Playwright's built-in HTML reporter
- **List Reporter**: Console output with step details

## How to Open Playwright Report 🎭

```bash
npx playwright show-report
```

## Environment Management

The framework supports multiple environments through environment variables:

- **Development**: Uses `.env.development` file
- **Production**: Uses `.env.prod` file

Set the environment using:

```bash
NODE_ENV=development npx playwright test
NODE_ENV=prod npx playwright test
```

## Key Features

- **Page Object Model**: Organized page objects for maintainable test code
- **Fixtures**: Reusable test fixtures for common functionality
- **Data-Driven Testing**: External test data management
- **Environment Configuration**: Flexible environment-specific settings
- **Allure Integration**: Rich test reporting and analytics
- **TypeScript Support**: Full TypeScript support with type safety
- **Utility Functions**: Reusable utility functions for common operations

## DOs and DON'Ts

### DOs

1. **Keep Code Clean**: Always run linting (`npm run pretest`) before committing your code to ensure it follows the coding standards.
2. **Use Page Objects**: Follow the Page Object Model pattern for maintainable test code.
3. **Environment Variables**: Use environment variables for configuration instead of hardcoding values.
4. **Descriptive Test Names**: Write clear and descriptive test case names and descriptions.
5. **Data Separation**: Keep test data in separate files for better maintainability.

### DON'Ts

1. **Ignore Linting Errors**: Do not ignore linting errors; always fix them before committing code.
2. **Skip Pretest**: Do not skip the `pretest` step as it ensures your code is formatted and follows the defined standards.
3. **Hardcode Values**: Avoid hardcoding URLs, credentials, or other environment-specific values.
4. **Complex Test Logic**: Keep test logic simple and focused on user actions and verifications.
5. **Ignore Test Failures**: Always investigate and fix test failures before proceeding.

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**: Ensure your `.env` files are in the `config` directory and properly formatted.
2. **Test Timeouts**: Increase timeout values in `playwright.config.ts` if tests are timing out.
3. **Browser Not Launching**: Check if you have the required browser dependencies installed.

### Getting Help

For additional support or questions about the framework, please refer to:
- [Playwright Documentation](https://playwright.dev/)
- [Allure Reporting Documentation](https://docs.qameta.io/allure/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
EOF