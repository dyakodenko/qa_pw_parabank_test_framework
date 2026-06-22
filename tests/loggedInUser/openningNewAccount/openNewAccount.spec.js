import { test } from '../../_fixtures/fixtures';
import { signUpAccount } from '../../../src/ui/actions/signUpAccount';

const testParameters = [
  {
    accountType: 'SAVINGS',
  },
  {
    accountType: 'CHECKING',
  },
];

testParameters.forEach(({ accountType }) => {
  test(`User is able to create new ${accountType} Account`, async ({
    page,
    account,
    accountNavigationMenu,
    openNewAccountPage,
    accountsOverviewPage,
  }) => {
    await signUpAccount(page, account);
    await accountNavigationMenu.clickOpenNewAccount();
    await openNewAccountPage.assertOpenNewAccountPageOpened();
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertAccountOpenedMessageIsShown();
    const accountId = await openNewAccountPage.getCreatedAccountId();
    await accountNavigationMenu.openAccountsOverviewPage();
    await accountsOverviewPage.assertAccountIdIsVisible(accountId);
  });
});
