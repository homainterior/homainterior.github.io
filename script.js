/* ==========================================================================
   HOMA INTERIOR — Homepage & Project Monograph Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const projects = window.HOMA_PROJECTS || [];
  const articles = window.HOMA_ARTICLES || [];

  // 1. Sticky Header Border & Back-to-Top Button
  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('visible', y > 320);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 3. Homepage: Render 4-Column Portrait Projects Grid + Filter
  const homeProjectsGrid = document.getElementById('homeProjectsGrid');
  if (homeProjectsGrid) {
    homeProjectsGrid.innerHTML = projects
      .map(
        (p) => `
          <a href="project.html?id=${encodeURIComponent(p.id)}" class="gd-project-card" data-category="${p.category}">
            <div class="gd-project-thumb">
              <img src="${p.cover}" alt="${p.title}" loading="lazy" />
            </div>
            <div class="gd-project-caption">
              <span class="gd-project-eyebrow">${p.categoryLabel}</span>
              <h3 class="gd-project-title">${p.title}</h3>
            </div>
          </a>
        `
      )
      .join('');

    const filterBtns = document.querySelectorAll('.gd-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        homeProjectsGrid.querySelectorAll('.gd-project-card').forEach((card) => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.classList.toggle('hidden', !match);
        });
      });
    });
  }

  // 4. Homepage: Render Editorial Journal Grid + Reader Modal
  const homeJournalGrid = document.getElementById('homeJournalGrid');
  const articleModal = document.getElementById('articleModal');
  const articleModalClose = document.getElementById('articleModalClose');
  const articleModalImg = document.getElementById('articleModalImg');
  const articleModalMeta = document.getElementById('articleModalMeta');
  const articleModalTitle = document.getElementById('articleModalTitle');
  const articleModalBody = document.getElementById('articleModalBody');

  if (homeJournalGrid) {
    homeJournalGrid.innerHTML = articles
      .map(
        (a) => `
          <article class="gd-article-card" data-article-id="${a.id}">
            <div class="gd-article-thumb">
              <img src="${a.image}" alt="${a.title}" loading="lazy" />
            </div>
            <div class="gd-article-info">
              <span class="gd-article-tag">${a.tag}</span>
              <h3 class="gd-article-title">${a.title}</h3>
              <p class="gd-article-excerpt">${a.excerpt}</p>
              <span class="gd-article-more">ĐỌC BÀI VIẾT &rarr;</span>
            </div>
          </article>
        `
      )
      .join('');

    const openArticle = (id) => {
      const a = articles.find((item) => item.id === id);
      if (!a || !articleModal) return;
      articleModalImg.src = a.image;
      articleModalImg.alt = a.title;
      articleModalMeta.textContent = a.meta;
      articleModalTitle.textContent = a.title;
      articleModalBody.innerHTML = a.body;
      articleModal.classList.add('open');
      articleModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeArticle = () => {
      if (!articleModal) return;
      articleModal.classList.remove('open');
      articleModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    homeJournalGrid.querySelectorAll('.gd-article-card').forEach((card) => {
      card.addEventListener('click', () => openArticle(Number(card.dataset.articleId)));
    });
    if (articleModalClose) articleModalClose.addEventListener('click', closeArticle);
    if (articleModal) {
      articleModal.addEventListener('click', (e) => {
        if (e.target === articleModal) closeArticle();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && articleModal && articleModal.classList.contains('open')) {
        closeArticle();
      }
    });
  }

  // 5. Project Detail Page (`project.html?id=...`)
  const monographStack = document.getElementById('monographStack');
  if (monographStack) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const current = projects.find((p) => p.id === id) || projects[0];

    document.title = `${current.title} — HOMA INTERIOR`;
    document.getElementById('projectTitle').textContent = current.title;
    document.getElementById('projectSubline').textContent = `${current.location} · ${current.style} · ${current.scope}`;

    // Render full-width vertical editorial photo stack
    monographStack.innerHTML = current.images
      .map(
        (src, i) => `
          <a href="${src}" class="gd-monograph-photo" data-index="${i}">
            <img src="${src}" alt="${current.title} - ảnh ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" />
          </a>
        `
      )
      .join('');

    // Fancybox-Style Fullscreen Dark Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let lbIndex = 0;

    const showLightbox = (idx) => {
      lbIndex = (idx + current.images.length) % current.images.length;
      lightboxImg.src = current.images[lbIndex];
      lightboxImg.alt = `${current.title} - ảnh ${lbIndex + 1}`;
      lightboxCounter.textContent = `${lbIndex + 1} / ${current.images.length}`;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    monographStack.querySelectorAll('.gd-monograph-photo').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showLightbox(Number(link.dataset.index));
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showLightbox(lbIndex - 1));
    lightboxNext.addEventListener('click', () => showLightbox(lbIndex + 1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(lbIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
    });

    // Related Projects ("GỢI Ý CHO BẠN") — 4-Column Carousel
    const relatedGrid = document.getElementById('relatedGrid');
    const relatedPrev = document.getElementById('relatedPrev');
    const relatedNext = document.getElementById('relatedNext');
    const others = projects.filter((p) => p.id !== current.id);
    let relOffset = 0;

    const renderRelated = () => {
      const visible = [];
      for (let i = 0; i < Math.min(4, others.length); i++) {
        visible.push(others[(relOffset + i) % others.length]);
      }
      relatedGrid.innerHTML = visible
        .map(
          (p) => `
            <a href="project.html?id=${encodeURIComponent(p.id)}" class="gd-project-card">
              <div class="gd-project-thumb">
                <img src="${p.cover}" alt="${p.title}" loading="lazy" />
              </div>
              <div class="gd-project-caption">
                <h3 class="gd-project-title">${p.title}</h3>
              </div>
            </a>
          `
        )
        .join('');
    };

    renderRelated();
    relatedPrev.addEventListener('click', () => {
      relOffset = (relOffset - 1 + others.length) % others.length;
      renderRelated();
    });
    relatedNext.addEventListener('click', () => {
      relOffset = (relOffset + 1) % others.length;
      renderRelated();
    });
  }
});
