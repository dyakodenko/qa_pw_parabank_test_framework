import { expect, testStep } from '../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.customerLoginFormLocator = page
      .locator('#leftPanel')
      .filter({ hasText: 'Customer Login' });
    this.registerLink = this.customerLoginFormLocator.getByRole('link', {
      name: 'Register',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step('Open Home Page', async () => {
      await this.page.goto('/parabank/index.htm');
    });
  }

  async clickRegisterLink() {
    await this.step(`Click the Register link`, async () => {
      await this.registerLink.click();
    });
  }

  async assertSomething() {
    await this.step(`Assert something`, async () => {
      expect(true).toBe(true);
    });
  }

  async clickLogOut() {
    await this.step(`Click the Log Out button`, async () => {
      await this.page.getByRole('link', { name: 'Log Out' }).click();
    });
  }
}
