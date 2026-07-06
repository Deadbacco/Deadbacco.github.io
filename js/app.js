/* =================================================================
   app.js — Personal Portfolio Site
   GitHub Pages static site — no framework, plain JS
   ================================================================= */

/* -----------------------------------------------------------------
   WALL TOGGLE (index.html)
   Click wall image to expand/collapse with smooth animation.
   ----------------------------------------------------------------- */
(function initWall() {
  const section = document.getElementById('wall-section');
  if (!section) return;

  section.addEventListener('click', function () {
    this.classList.toggle('expanded');
  });
})();


/* -----------------------------------------------------------------
   ACTIVE NAV LINK
   Highlight the nav link matching the current page.
   ----------------------------------------------------------------- */
(function initActiveNav() {
  const links = document.querySelectorAll('.site-nav a');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach(function (link) {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();


/* -----------------------------------------------------------------
   PDF MODAL (academic.html)
   Open a PDF preview in a full-screen modal.
   Close with the X button, the Escape key, or clicking the overlay.
   ----------------------------------------------------------------- */
(function initPdfModal() {
  const overlay = document.getElementById('pdf-modal-overlay');
  if (!overlay) return;

  const iframe   = document.getElementById('pdf-modal-iframe');
  const titleEl  = document.getElementById('pdf-modal-title');
  const closeBtn = document.getElementById('pdf-modal-close');

  /* Open modal */
  function openModal(pdfSrc, title) {
    iframe.src   = pdfSrc + '#toolbar=0&navpanes=0&scrollbar=0';
    titleEl.textContent = title || 'Belge';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  /* Close modal */
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { iframe.src = ''; }, 300);
  }

  /* Wire up all preview triggers */
  document.querySelectorAll('.doc-card-preview[data-pdf]').forEach(function (el) {
    el.addEventListener('click', function () {
      openModal(this.dataset.pdf, this.dataset.title);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
