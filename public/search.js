console.log('Search script loaded');

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

let idx, pages;

// Load Lunr.js dynamically if needed
if (typeof lunr === 'undefined') {
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/lunr/lunr.js';
  s.onload = runSearch;
  document.body.appendChild(s);
} else {
  runSearch();
}

function runSearch() {
  console.log('Lunr ready');

  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      pages = data;
      console.log('Pages loaded', pages);

      idx = lunr(function () {
        this.ref('permalink');
        this.field('title');
        this.field('content');

        pages.forEach(page => {
          this.add(page);
        });
      });

      console.log('Lunr index built');
    });

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    searchResults.innerHTML = '';

    if (query.length < 2) {
      return;
    }

    const results = idx.search(query);
    console.log('Results:', results);

    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
    }

    results.forEach(result => {
      const page = pages.find(p => p.permalink === result.ref);
      const item = document.createElement('div');
      item.innerHTML = `<a href="${page.permalink}">${page.title}</a>`;
      searchResults.appendChild(item);
    });
  });
}
