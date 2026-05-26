const targetDate = new Date('2026-06-23T15:30:00').getTime();
const maxGuests = 2;
const guestContainer = document.getElementById('guestContainer');
const addGuestBtn = document.getElementById('addGuestBtn');
const submitButton = document.getElementById('submitButton');
const formStatus = document.getElementById('formStatus');
const rsvpForm = document.getElementById('rsvpForm');
const honeypot = document.getElementById('website');
const phoneInput = document.getElementById('phone');
const mealSection = document.getElementById('mealSection');
const sectionElements = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function setViewportHeight() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

function padZero(value) {
  return value.toString().padStart(2, '0');
}

function updateCountdown() {
  const now = Date.now();
  const distance = targetDate - now;

  if (distance <= 0) {
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = padZero(days);
  document.getElementById('hours').innerText = padZero(hours);
  document.getElementById('minutes').innerText = padZero(minutes);
  document.getElementById('seconds').innerText = padZero(seconds);
}

function setActiveNav() {
  const scrollPosition = window.scrollY + 120;

  sectionElements.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);

    if (!link) return;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(item => {
        item.classList.remove('active');
        item.removeAttribute('aria-current');
      });
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

function formatPhone(value) {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('5')) {
    digits = `0${digits}`;
  }

  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  let formatted = digits;

  if (digits.length > 4) {
    formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)}`;
  }
  if (digits.length > 7) {
    formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)}`;
  }
  if (digits.length > 9) {
    formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9, 11)}`;
  }

  return formatted;
}

function validatePhone(value) {
  const digits = value.replace(/\D/g, '');
  return /^05\d{9}$/.test(digits);
}

function formatNameInput(input) {
  const words = input.value
    .toLocaleLowerCase('tr-TR')
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1));

  input.value = words.join(' ');
}

function updateGuestTitles() {
  Array.from(guestContainer.querySelectorAll('.guest-card')).forEach((card, index) => {
    const title = card.querySelector('.guest-title');
    title.innerText = `KATILIMCI ${index + 1}`;
    card.querySelector('.name-input').id = `guestName${index + 1}`;
    card.querySelector('.main-course-select').id = `mealChoice${index + 1}`;
    card.querySelector('.side-dish-select').id = `sideChoice${index + 1}`;
    card.querySelector('label[for^="guestName"]').setAttribute('for', `guestName${index + 1}`);
    card.querySelector('label[for^="mealChoice"]').setAttribute('for', `mealChoice${index + 1}`);
    card.querySelector('label[for^="sideChoice"]').setAttribute('for', `sideChoice${index + 1}`);
  });
}

function updateAddGuestButton() {
  if (guestContainer.children.length >= maxGuests) {
    addGuestBtn.disabled = true;
    addGuestBtn.textContent = '+ En fazla 1 kişi daha ekleyebilirsiniz';
  } else {
    addGuestBtn.disabled = false;
    addGuestBtn.textContent = '+ Katılımcı Ekle';
  }
}

function toggleMealSection(value) {
  const fields = mealSection.querySelectorAll('input, select, textarea, button');
  const hidden = value === 'Katılamıyorum';
  mealSection.style.display = hidden ? 'none' : 'block';

  fields.forEach(field => {
    field.disabled = hidden;
  });
}

function createGuestCard() {
  const guestCount = guestContainer.children.length + 1;

  if (guestCount > maxGuests) {
    return;
  }

  const card = document.createElement('div');
  card.className = 'guest-card';
  card.innerHTML = `
    <div class="guest-title">KATILIMCI ${guestCount}</div>
    <div class="form-group">
      <label for="guestName${guestCount}">Ad Soyad</label>
      <input type="text" id="guestName${guestCount}" class="name-input" name="guestName[]" required>
    </div>
    <div class="form-group">
      <label for="mealChoice${guestCount}">Ana Yemek Tercihi</label>
      <select id="mealChoice${guestCount}" class="main-course-select" name="mainCourse[]" required>
        <option value="">Seçiniz</option>
        <option>Kuzu Pirzola</option>
        <option>Antrikot</option>
        <option>Kuzu Şiş</option>
        <option>Köfte</option>
        <option>Levrek</option>
        <option>Çipura</option>
        <option>Tavuk Şiş</option>
        <option>Tavuk Kanat</option>
        <option>Hamburger</option>
      </select>
    </div>
    <div class="form-group">
      <label for="sideChoice${guestCount}">Meze Tercihi</label>
      <select id="sideChoice${guestCount}" class="side-dish-select" name="sideDish[]" required>
        <option value="">Seçiniz</option>
        <option>Humus</option>
        <option>Haydari</option>
        <option>Şakşuka</option>
        <option>Atom</option>
      </select>
    </div>
    <button type="button" class="remove-btn">Katılımcıyı Sil</button>
  `;

  guestContainer.appendChild(card);
  updateGuestTitles();
  updateAddGuestButton();
}

function resetSubmitState() {
  submitButton.disabled = false;
  submitButton.textContent = 'KATILIM BİLGİSİNİ GÖNDER';
  submitButton.classList.remove('success');
}

function showStatus(message, success = false) {
  formStatus.textContent = message;
  formStatus.style.color = success ? '#3f6d53' : '#9f3f3f';
}

function scrollToHash() {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('scroll', setActiveNav);
setViewportHeight();
updateCountdown();
setInterval(updateCountdown, 1000);

Array.from(document.querySelectorAll('.nav-link')).forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.getAttribute('href'));
    }
  });
});

Array.from(document.querySelectorAll('.radio-card')).forEach(card => {
  card.addEventListener('click', () => {
    Array.from(document.querySelectorAll('.radio-card')).forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const selectedValue = card.querySelector('input').value;
    toggleMealSection(selectedValue);
  });
});

phoneInput.addEventListener('input', event => {
  const formatted = formatPhone(event.target.value);
  event.target.value = formatted;
});

guestContainer.addEventListener('input', event => {
  if (event.target.matches('.name-input')) {
    formatNameInput(event.target);
  }
});

guestContainer.addEventListener('click', event => {
  if (event.target.matches('.remove-btn')) {
    const card = event.target.closest('.guest-card');
    if (card) {
      card.remove();
      updateGuestTitles();
      updateAddGuestButton();
    }
  }
});

addGuestBtn.addEventListener('click', () => {
  createGuestCard();
});

function disableMealFields(disabled) {
  guestContainer.querySelectorAll('input, select').forEach(field => {
    field.disabled = disabled;
  });
  addGuestBtn.disabled = disabled || guestContainer.children.length >= maxGuests;
}

function toggleMealSection(value) {
  const hidden = value === 'Katılamıyorum';
  mealSection.style.display = hidden ? 'none' : 'block';
  disableMealFields(hidden);
}

toggleMealSection('Katılıyorum');
updateAddGuestButton();
setActiveNav();
scrollToHash();

rsvpForm.addEventListener('submit', event => {
  event.preventDefault();
  showStatus('');

  if (honeypot.value.trim()) {
    return;
  }

  if (!validatePhone(phoneInput.value)) {
    showStatus('Lütfen geçerli bir Türk telefon numarası girin.', false);
    phoneInput.focus();
    return;
  }

  if (!rsvpForm.checkValidity()) {
    rsvpForm.reportValidity();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Gönderiliyor...';

  window.setTimeout(() => {
    submitButton.classList.add('success');
    submitButton.textContent = 'Gönderildi ✓';
    showStatus('Katılım bilginiz alındı, teşekkürler!', true);

    window.setTimeout(() => {
      resetSubmitState();
    }, 2400);
  }, 900);
});
