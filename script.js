/* ================================================
   Yash Bishnoi — Portfolio JavaScript
   ================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------
     STICKY NAV
     Show nav bar after hero scrolls out of view
  ------------------------------------------------ */
  const nav  = document.getElementById('sticky-nav');
  const hero = document.getElementById('hero');

  new IntersectionObserver(function (entries) {
    nav.classList.toggle('visible', !entries[0].isIntersecting);
  }, { threshold: 0.1 }).observe(hero);


  /* ------------------------------------------------
     SCROLL REVEAL
     Fade-up each card/book as it enters the viewport
  ------------------------------------------------ */
  var revObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity   = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.tech-cat, .achiev-card, .book-wrap').forEach(function (el, i) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition =
      'opacity .5s ease '  + (i % 6) * 0.07 + 's, ' +
      'transform .5s ease ' + (i % 6) * 0.07 + 's';
    revObs.observe(el);
  });


  /* ------------------------------------------------
     BOOK MODAL
     Open / close the 3-D open-book project popup
  ------------------------------------------------ */
  var modal      = document.getElementById('book-modal');
  var modalClose = document.getElementById('modal-close');
  var modalAnim  = document.getElementById('modal-anim');
  var coverFront = document.getElementById('modal-cover-front');
  var coverTitle = document.getElementById('modal-cover-title');
  var coverSub   = document.getElementById('modal-cover-sub');
  var chapterEl  = document.getElementById('modal-chapter');
  var leftTitle  = document.getElementById('modal-left-title');
  var descEl     = document.getElementById('modal-desc');
  var linksEl    = document.getElementById('modal-links');
  var tagsEl     = document.getElementById('modal-tags');
  var detailEl   = document.getElementById('modal-detail');

  function openModal(book) {
    var d = book.dataset;

    /* Populate cover */
    coverTitle.textContent = d.title;
    coverSub.textContent   = d.sub;
    coverFront.className   = 'book-cover-front ' + d.color;

    /* Populate left page */
    chapterEl.textContent = 'Chapter ' + d.chapter;
    leftTitle.textContent = d.title;
    descEl.textContent    = d.desc;

    /* GitHub link */
    linksEl.innerHTML =
      '<a href="https://github.com/YashBishnoi07" ' +
          'target="_blank" rel="noopener" class="left-link">' +
        'GitHub &#8599;' +
      '</a>';

    /* Tech tags */
    tagsEl.innerHTML = (d.tags || '').split(',').map(function (t) {
      return '<span class="right-tag">' + t.trim() + '</span>';
    }).join('');

    /* Detail text */
    detailEl.textContent = d.detail;

    /* Firefly particles */
    modalAnim.innerHTML = '';
    for (var i = 0; i < 20; i++) {
      var f  = document.createElement('div');
      var sz = Math.random() * 4 + 2;
      f.className  = 'firefly';
      f.style.cssText = [
        'width:'              + sz                                    + 'px',
        'height:'             + sz                                    + 'px',
        'background:rgba(201,168,76,' + (.4 + Math.random() * .5).toFixed(2) + ')',
        'left:'               + (Math.random() * 100).toFixed(1)     + '%',
        'top:'                + (Math.random() * 100).toFixed(1)     + '%',
        '--dx:'               + ((Math.random() - .5) * 300).toFixed(0) + 'px',
        '--dy:'               + ((Math.random() - .5) * 300).toFixed(0) + 'px',
        'animation-duration:' + (4 + Math.random() * 6).toFixed(1)  + 's',
        'animation-delay:'    + (Math.random() * 3).toFixed(1)       + 's',
        'box-shadow:0 0 '     + (sz * 2) + 'px rgba(201,168,76,0.6)'
      ].join(';');
      modalAnim.appendChild(f);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { modalAnim.innerHTML = ''; }, 450);
  }

  /* Attach click + keyboard events to every book */
  document.querySelectorAll('.book-wrap').forEach(function (bw) {
    bw.addEventListener('click', function () { openModal(bw); });
    bw.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(bw);
      }
    });
  });

  /* Close triggers */
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

})();
