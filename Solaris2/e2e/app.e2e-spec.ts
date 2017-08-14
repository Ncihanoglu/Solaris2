import { Solaris2Page } from './app.po';

describe('solaris2 App', () => {
  let page: Solaris2Page;

  beforeEach(() => {
    page = new Solaris2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
