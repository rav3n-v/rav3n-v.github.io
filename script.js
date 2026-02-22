const projectFiles = [
  "projects/project_1.html",
  "projects/project_2.html",
];

/* ===========================
   BLOG LOADER (JSON BASED)
=========================== */

async function loadBlogs() {
  const main = document.querySelector("main");
  main.innerHTML = "<h2>Blogs</h2><div id='blog-container'></div>";

  const container = document.getElementById("blog-container");

  try {
    const response = await fetch("blogs/blog_index.json");
    const blogs = await response.json();

    // Group blogs by category
    const grouped = {};

    blogs.forEach(blog => {
      if (!grouped[blog.category]) {
        grouped[blog.category] = [];
      }
      grouped[blog.category].push(blog);
    });

    // Render grouped blogs
    for (const category in grouped) {

      const sectionTitle = document.createElement("h3");
      sectionTitle.className = "section-title";
      sectionTitle.textContent = category;
      container.appendChild(sectionTitle);

      grouped[category].forEach(blog => {
        const card = document.createElement("article");
        card.className = "post";

        card.innerHTML = `
          <a href="${blog.file}">
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <p><small><em>Posted on ${blog.date}</em></small></p>
          </a>
        `;

        container.appendChild(card);
      });
    }

  } catch (error) {
    container.innerHTML = "<p>Failed to load blogs.</p>";
    console.error(error);
  }
}


/* ===========================
   PROJECT LOADER
=========================== */

function loadProjects() {
  const main = document.querySelector("main");
  main.innerHTML = `<h2>Projects</h2><div id="project-list"></div>`;

  const projectList = document.getElementById("project-list");

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


/* ===========================
   ABOUT LOADER
=========================== */

function loadAbout() {
  const main = document.querySelector("main");

  fetch('about.html')
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;
    });
}


/* ===========================
   SECTION CONTROLLER
=========================== */

function loadSection(section) {

  if (section === 'blogs') {
    loadBlogs();
  }

  else if (section === 'projects') {
    loadProjects();
  }

  else if (section === 'about') {
    loadAbout();
  }

  setActiveLink(section);
}


/* ===========================
   SIDEBAR + UI LOGIC
=========================== */

window.onload = () => {

  loadSection('about');

  const toggleBtn = document.getElementById('toggle-aside');
  const sidebar = document.getElementById('sidebar');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  document.addEventListener('click', function (event) {
    const isClickInsideSidebar = sidebar.contains(event.target);
    const isClickToggleButton = toggleBtn.contains(event.target);

    if (!isClickInsideSidebar && !isClickToggleButton && window.innerWidth <= 768) {
      sidebar.classList.remove('open');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.remove('open');
      }
    });
  });
};


/* ===========================
   ACTIVE LINK HIGHLIGHT
=========================== */

function setActiveLink(active) {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');

    if (link.textContent.toLowerCase() === active) {
      link.classList.add('active');
    }
  });
}