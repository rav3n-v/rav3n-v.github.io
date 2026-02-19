const blogFiles = [
      "blogs/blog_1.html",
    "blogs/blog_2.html",
    ,"blogs/blog_3.html",

    ];
const projectFiles = [
      "projects/project_1.html",
    "projects/project_2.html",
]

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
  main.innerHTML = `<h2>Projects</h2><div id="project-list">Loading...</div>`;
  const projectList = document.getElementById('project-list');
  projectList.innerHTML = '';

  projectFiles.forEach(file => {
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
            <h3>${title}</h3>
            <p>${desc}</p>
            <p><small><em>${date}</em></small></p>
          </a>
        `;
        projectList.appendChild(article);
      })
      .catch(err => {
        projectList.innerHTML += `<p>Error loading ${file}: ${err.message}</p>`;
      });
  });
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
  document.addEventListener('click', function (event) {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-aside');

  const isClickInsideSidebar = sidebar.contains(event.target);
  const isClickToggleButton = toggleBtn.contains(event.target);

  if (!isClickInsideSidebar && !isClickToggleButton && window.innerWidth <= 768) {
    sidebar.classList.remove('open');
  }
});
  const toggleBtn = document.getElementById('toggle-aside');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

};
    function setActiveLink(active) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.textContent.toLowerCase() === active) {
      link.classList.add('active');
    }
  });
}

