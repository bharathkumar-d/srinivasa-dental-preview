// Mobile menu: toggle, close on link click, Escape or click outside
  const btn = document.querySelector('.menu-btn'), nav = document.getElementById('nav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    btn.textContent = open ? 'Close' : 'Menu';
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });
  document.addEventListener('click', e => {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) setMenu(false);
  });

  // Booking form -> WhatsApp (no backend needed)
  const bf = document.getElementById('bookingForm');
  if (bf) bf.addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target, f = new FormData(form);
    const name = (f.get('name') || '').trim();
    const phone = (f.get('phone') || '').replace(/[^0-9]/g, '').replace(/^(91|0)(?=[0-9]{10}$)/, '');
    const checks = [['name', name.length > 1], ['phone', /^[6-9][0-9]{9}$/.test(phone)]];
    let firstBad = null;
    checks.forEach(([id, ok]) => {
      const input = form.querySelector('#' + id), err = form.querySelector('#' + id + '-err');
      input.setAttribute('aria-invalid', String(!ok));
      err.hidden = ok;
      if (!ok && !firstBad) firstBad = input;
    });
    const status = document.getElementById('formStatus');
    if (firstBad) { status.textContent = ''; firstBad.focus(); return; }
    const text = `Hello, I'd like to book an appointment.\nName: ${name}\nPhone: ${phone}\nInterested in: ${f.get('service')}\nPreferred time: ${(f.get('when') || '').trim() || 'Any'}` + ((f.get('msg') || '').trim() ? `\nNote: ${f.get('msg').trim()}` : '');
    window.open('https://wa.me/919290019948?text=' + encodeURIComponent(text), '_blank', 'noopener');
    status.textContent = 'WhatsApp should now open with your request. Press send in WhatsApp to reach us. If it did not open, please call +91 92900 19948.';
  });
