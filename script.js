const blogFiles = [
      "blogs/blog_1.html",

    ];

    function loadSection(section) {
      const main = document.querySelector('main');

      if (section === 'blogs') {
        main.innerHTML = `<h2>Blogs</h2><div id="blog-list">Loading...</div>`;
        const blogList = document.getElementById('blog-list');
        blogList.innerHTML = '';

        blogFiles.forEach(file => {
          fetch(file)
            .then(res => res.text())
            .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');

              const title = doc.querySelector('title')?.textContent || "Untitled";
              const desc = doc.querySelector('meta[name=description]')?.content || "No description.";
              const date = doc.querySelector('meta[name=date]')?.content || "Unknown date";

              const article = document.createElement('article');
              article.classList.add('post');
              article.innerHTML = `
                <a href="${file}">
                  <h3 id="blog-title">${title}</h3>
                  <p id="blog-description">${desc}</p>
                  <p id="blog-date">Posted on ${date}</p>
                </a>
              `;
              blogList.appendChild(article);
            });
        });
      }

      else if (section === 'projects') {
        main.innerHTML = `
          <h2 class="section-title">Projects</h2>
          <article class="post">
            <h3>Neural Net from Scratch</h3>
            <p>Implementing a feedforward neural network using NumPy and backpropagation.</p>
          </article>
          <article class="post">
            <h3>Django Blog Generator</h3>
            <p>Building a blog engine that auto-generates content from LaTeX files.</p>
          </article>
        `;
      }

      else if (section === 'about') {
  fetch('about.html')
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;
    });
}
    }
    window.onload = () => {
  loadSection('about');
  setActiveLink('about');
};
    function setActiveLink(active) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === active) {
      link.classList.add('active');
    }
  });
}
