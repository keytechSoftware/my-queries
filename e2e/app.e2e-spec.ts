import { MyQueriesPage } from './app.po';

describe('keytech-queries App', () => {
  let page: MyQueriesPage;

  beforeEach(() => {
    page = new MyQueriesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kt works!');
  });
});
