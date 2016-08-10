import { LaughingSalPage } from './app.po';

describe('laughing-sal App', function() {
  let page: LaughingSalPage;

  beforeEach(() => {
    page = new LaughingSalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
