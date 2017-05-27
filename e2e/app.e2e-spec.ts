import { GdashboardPage } from './app.po';

describe('gdashboard App', () => {
  let page: GdashboardPage;

  beforeEach(() => {
    page = new GdashboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
