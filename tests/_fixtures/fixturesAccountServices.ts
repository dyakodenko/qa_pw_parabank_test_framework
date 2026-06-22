import { test as base } from '@playwright/test';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { AccountActivityPage } from '../../src/ui/pages/AccountActivityPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/UpdateContactInfoPage';

export const test = base.extend<{
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  accountsOverviewPage: AccountsOverviewPage;
  accountActivityPage: AccountActivityPage;
  billPayPage: BillPayPage;
  updateContactInfoPage: UpdateContactInfoPage;
}>({
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  accountsOverviewPage: async ({ page }, use) => {
    const accountsOverviewPage = new AccountsOverviewPage(page);

    await use(accountsOverviewPage);
  },
  accountActivityPage: async ({ page }, use) => {
    const accountActivityPage = new AccountActivityPage(page);

    await use(accountActivityPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },
});
