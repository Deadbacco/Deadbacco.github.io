/* =================================================================
   app.js — Personal Portfolio Site
   Tamamen statik, GitHub Pages uyumlu — framework yok.
   ================================================================= */


/* -----------------------------------------------------------------
   WALL TOGGLE (index.html)
   Wall resminin açılıp kapanmasını yönetir.
   expanded sınıfı eklenince CSS:
     - wall-section yüksekliği 30vh → 100vh (contain moda geçer)
     - profile-section margin-top'u kaldırılarak profil aşağı kayar
     - profile-inner column → row düzenine geçer
   ----------------------------------------------------------------- */
(function initWall() {
  var section = document.getElementById('wall-section');
  if (!section) return;

  section.addEventListener('click', function () {
    this.classList.toggle('expanded');
  });
})();


/* -----------------------------------------------------------------
   ART IMAGE EXPAND (art.html)
   .art-card-img öğesine tıklanınca expanded sınıfı toggle edilir.
   CSS transition: height 50vh → 100vh.
   ----------------------------------------------------------------- */
(function initArtExpand() {
  document.querySelectorAll('.art-card-img').forEach(function (el) {
    var img = el.querySelector('img');

    // Yatay (landscape) resimleri tespit et — ayrı boyutlandırma uygulanır.
    function classify() {
      if (img.naturalWidth > img.naturalHeight) {
        el.classList.add('is-landscape');
      }
    }
    if (img.complete) classify();
    else img.addEventListener('load', classify);

    el.addEventListener('click', function () {
      this.classList.toggle('expanded');
    });
  });
})();


/* -----------------------------------------------------------------
   PDF MODAL (academic.html)
   data-pdf niteliği olan .doc-card-preview'e tıklanınca
   modal açılır. ESC tuşu veya overlay/kapat butonu ile kapanır.
   ----------------------------------------------------------------- */
(function initPdfModal() {
  var overlay = document.getElementById('pdf-modal-overlay');
  if (!overlay) return;

  var iframe   = document.getElementById('pdf-modal-iframe');
  var titleEl  = document.getElementById('pdf-modal-title');
  var closeBtn = document.getElementById('pdf-modal-close');

  function openModal(pdfSrc, title) {
    iframe.src = pdfSrc + '#toolbar=0&navpanes=0&scrollbar=0';
    titleEl.textContent = title || 'Belge';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { iframe.src = ''; }, 300);
  }

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
