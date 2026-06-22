import { expect, testStep } from '../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.applyNowButton = this.page.getByRole('button', {
      name: 'Apply Now',
    });
  }

  inputTextLocator(inputName) {
    return this.page
      .getByRole('row')
      .filter({ hasText: inputName })
      .getByRole('textbox');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillPayeeName(loanAmount) {
    await this.step(`Fill Loan Amount`, async () => {
      await this.inputTextLocator('Loan Amount:').fill(loanAmount);
    });
  }

  async fillAddress(downPayment) {
    await this.step(`Fill Down Payment`, async () => {
      await this.inputTextLocator('Down Payment:').fill(downPayment);
    });
  }

  async fillCity(fromAccountId) {
    await this.step(`Fill From account #`, async () => {
      await this.inputTextLocator('From account #:').fill(fromAccountId);
    });
  }

  async clickApplyNowButton() {
    await this.step(`Click Apply Now button`, async () => {
      await this.applyNowButton.click();
    });
  }

  async assertRequestLoanPageIsOpen() {
    await this.step(`Assert Request Loan page is open`, async () => {
      expect(this.page.url()).toContain('/parabank/requestloan.htm');
    });
  }

  async assertSuccessRequestLoanMessageIsShown(payeeName, amount) {
    await this.step(
      `Assert request for loan to ${payeeName} for $${amount} is successful`,
      async () => {
        await expect(
          this.page.getByText('Request Loan Complete'),
        ).toBeVisible();
        await expect(this.page.getByText(payeeName)).toBeVisible();
        await expect(this.page.getByText(`$${amount}`)).toBeVisible();
      },
    );
  }

  async assertErrorMessageIsShown(errorMessageText) {
    await this.step(`Assert error "${errorMessageText}" is shown`, async () => {
      await expect(this.page.getByText(errorMessageText)).toBeVisible();
    });
  }
}
