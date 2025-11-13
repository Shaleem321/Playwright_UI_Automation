import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
import os from "node:os";
import path from "node:path";
import dotenv from "dotenv";

// Load environment variables
const env = process.env.NODE_ENV || "development";
const envPath = path.resolve(__dirname, "config", `.env.${env}`);
dotenv.config({ path: envPath });

const skip_login = process.env.skipGlobalLogin === "true";

// Use the root directory of your project to resolve paths
const projectRoot = path.resolve(__dirname, ".");
const storageStateDir = path.resolve(projectRoot, "cookies");
const superAdminStorageState = path.resolve(storageStateDir, "super_admin.json");

const config: PlaywrightTestConfig = {
  testDir: "./specs/",
  /* Maximum time one test can run for. */
  timeout: 90 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [`list`, { printSteps: true }],

    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: true,
        environmentInfo: {
          OS: os.platform(),
          Architecture: os.arch(),
          NodeVersion: process.version,
          url: process.env.URL,
        },
        categories: [
          {
            name: "Missing file errors",
            messageRegex: /^ENOENT: no such file or directory/,
          },
        ],
      },
    ],
    ["html", { open: "never" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    video: "retain-on-failure",
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 45 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL,
    headless: process.env.CI ? true : false,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on",
    /* Open the browser in full-screen mode */

    viewport: { width: 1536, height: 1080 }, 
    launchOptions: {
      args: [
        "--window-size=1536,1080", 
        "--disable-resizable",
      ],
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "Setup",
      testMatch: "**/*.setup.spec.ts",
    },
    {
      name: "Chromium",
      testIgnore: ["**/*.setup.spec.ts"],
      dependencies: skip_login ? [] : ["Setup"],
      use: {
        storageState: superAdminStorageState,
        userAgent: devices["Desktop Chrome"].userAgent, 
        viewport: { width: 1536, height: 1080 }, 
        launchOptions: {
          args: [
            "--window-size=1536,1080", 
            "--disable-resizable", 
            "--headless=new",
          ],
        },
      },
    },
    // {
    //   name: "firefox",
    //   use: {
    //     ...devices["Desktop Firefox"],
    //   },
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    // },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
