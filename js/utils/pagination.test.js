import { state, getSearchResultsPage } from '../model.js';

describe('pagination logic', () => {
  beforeEach(() => {
    state.search.results = Array.from({ length: 23 }, (_, i) => ({ id: i + 1 }));
    state.search.resultsPerPage = 10;
    state.search.page = 1;
  });

  test('page 1 returns first 10', () => {
    const page = getSearchResultsPage(1);
    expect(page.length).toBe(10);
    expect(page[0].id).toBe(1);
    expect(page[9].id).toBe(10);
  });

  test('page 2 returns next 10', () => {
    const page = getSearchResultsPage(2);
    expect(page.length).toBe(10);
    expect(page[0].id).toBe(11);
    expect(page[9].id).toBe(20);
  });

  test('last page returns remaining', () => {
    const page = getSearchResultsPage(3);
    expect(page.length).toBe(3);
    expect(page[0].id).toBe(21);
    expect(page[2].id).toBe(23);
  });
});