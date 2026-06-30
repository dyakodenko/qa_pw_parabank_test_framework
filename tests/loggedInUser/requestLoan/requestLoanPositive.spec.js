import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';
import { generateNewAccountData } from '../../../src/common/testData/generateNewAccountData';
import { request } from 'playwright-core';

const loanAmmount = 100;
const downPayment = 10;

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('User is able to request a loan', async ({
  accountNavigationMenu,
  accountsOverviewPage,
  requestLoanPage,
  page,
  account,
}) => {
  await accountNavigationMenu.openAccountsOverviewPage();
  const defaultAccountId = await accountsOverviewPage.getDefaultAccountId();
  const defaultAccountBalance =
    await accountsOverviewPage.getAccountBalanceByAccountId(defaultAccountId);
  await accountsOverviewPage.assertValueIsGraterThanZero(defaultAccountBalance);
  await accountNavigationMenu.openRequestLoanPage();
  await requestLoanPage.fillLoanAmount(loanAmmount.toString());
  await requestLoanPage.fillDownPayment(downPayment.toString());
  await requestLoanPage.selectFromAccountId(defaultAccountId);
  await requestLoanPage.clickApplyNowButton();
  await requestLoanPage.assertSuccessRequestLoanMessageIsShown();
  const newAccountId = await requestLoanPage.getNewAccountId();
  await accountNavigationMenu.openAccountsOverviewPage();
  await accountsOverviewPage.assertAccountIdIsVisible(newAccountId);
  const newAccountBalance =
    await accountsOverviewPage.getAccountBalanceByAccountId(newAccountId);
  await accountsOverviewPage.assertValuesAreEqual(
    newAccountBalance,
    loanAmmount,
  );
  const defaultAccountBalanceAfter =
    await accountsOverviewPage.getAccountBalanceByAccountId(defaultAccountId);
  await accountsOverviewPage.assertValuesAreEqual(
    defaultAccountBalanceAfter,
    defaultAccountBalance - downPayment,
  );
});
