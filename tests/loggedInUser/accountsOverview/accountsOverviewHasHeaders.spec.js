import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

test.beforeEach(async ({ page, account }) => {
  await signUpAccount(page, account);
});

test('Accounts overview shows header', async ({
  accountsOverviewPage,
  accountNavigationMenu,
}) => {
  await accountNavigationMenu.openAccountsOverviewPage();
  await accountsOverviewPage.assertAccountsOverviewHasColumn('Account');
  await accountsOverviewPage.assertAccountsOverviewHasColumn('Balance');
  await accountsOverviewPage.assertAccountsOverviewHasColumn(
    'Available Amount',
  );
});
