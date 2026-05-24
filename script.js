// script.js

const cards = document.querySelectorAll('.radio-card');

cards.forEach(card => {

  card.addEventListener('click', () => {

    cards.forEach(c => c.classList.remove('active'));

    card.classList.add('active');

  });

});

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {

  let value = e.target.value.replace(/\D/g, '');

  if (!value.startsWith('05')) {

    value = '05' + value.substring(2);

  }

  value = value.substring(0, 11);

  let formatted = '';

  if (value.length > 0) {
    formatted += value.substring(0, 4);
  }

  if (value.length >= 5) {
    formatted += ' ' + value.substring(4, 7);
  }

  if (value.length >= 8) {
    formatted += ' ' + value.substring(7, 9);
  }

  if (value.length >= 10) {
    formatted += ' ' + value.substring(9, 11);
  }

  e.target.value = formatted;

});

const addGuestBtn =
  document.getElementById('addGuestBtn');

const guestContainer =
  document.getElementById('guestContainer');

addGuestBtn.addEventListener('click', () => {

const guestCount =
  document.querySelectorAll('.guest-card').length + 1;
  
  const guestHTML = `

  <div class="guest-card">

    <div class="guest-title">
      KATILIMCI ${guestCount}
    </div>

    <div class="form-group">

      <label>Ad Soyad</label>

      <input
        type="text"
        class="name-input"
        name="guest_name_${guestCount}"
        autocomplete="off"
        required
      >

    </div>

    <div class="form-group">

      <label>Ana Yemek Tercihi</label>

      <select
        name="main_course_${guestCount}"
        required
      >

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

      <label>Meze Tercihi</label>

      <select
        name="mezze_${guestCount}"
        required
      >

        <option value="">Seçiniz</option>

        <option>Humus</option>
        <option>Hibeş</option>
        <option>Fava</option>
        <option>Atom</option>
        <option>Kabak Girit</option>
        <option>Şakşuka</option>
        <option>Köpoğlu</option>
        <option>Pembe Sultan</option>
        <option>Tulum Ceviz</option>
        <option>Ezine</option>
        <option>Avokado</option>
        <option>Haydari</option>
        <option>Kuru Cacık</option>
        <option>Köz Patlıcan</option>
        <option>Havuç Tarator</option>
        <option>Muammara</option>
        <option>Pancar</option>
        <option>Patlıcan Mütebbel</option>
        <option>Deniz Börülcesi</option>

      </select>

    </div>

    <button
      type="button"
      class="remove-btn"
    >
      Katılımcıyı Sil
    </button>

  </div>

  `;

  guestContainer.insertAdjacentHTML(
    'beforeend',
    guestHTML
  );

  const lastGuestCard =
    guestContainer.lastElementChild;

  const removeBtn =
    lastGuestCard.querySelector('.remove-btn');

  removeBtn.addEventListener('click', () => {

    lastGuestCard.remove();

    updateGuestTitles();

  });

  attachNameFormatter();

});

function attachNameFormatter() {

  const nameInputs =
    document.querySelectorAll('.name-input');

  nameInputs.forEach(input => {

    input.addEventListener('input', () => {

      let words =
        input.value.toLocaleLowerCase('tr-TR')
          .split(' ');

      words =
        words.map(word => {

          if(word.length === 0) return '';

          return word.charAt(0)
            .toLocaleUpperCase('tr-TR')
            + word.slice(1);

        });

      input.value = words.join(' ');

    });

  });

}

function updateGuestTitles() {

  const guestCards =
    document.querySelectorAll('.guest-card');

  guestCards.forEach((card, index) => {

    const title =
      card.querySelector('.guest-title');

    title.innerText =
      `KATILIMCI ${index + 1}`;

  });

}

attachNameFormatter();

document
  .getElementById('rsvpForm')
  .addEventListener('submit', (e) => {

    e.preventDefault();

    alert('Katılım bilginiz alınmıştır ☺');

});
