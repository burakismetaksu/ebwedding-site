const targetDate = new Date('2026-06-23T15:30:00').getTime();

setInterval(() => {

  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;

}, 1000);


const cards = document.querySelectorAll('.radio-card');

cards.forEach(card => {

  card.addEventListener('click', () => {

    cards.forEach(c => {
      c.classList.remove('active');
    });

    card.classList.add('active');

    const selectedValue =
      card.querySelector('input').value;

    const mealSection =
      document.getElementById('mealSection');

    if(selectedValue === 'Katılamıyorum'){
      mealSection.style.display = 'none';
    } else {
      mealSection.style.display = 'block';
    }

  });

});


const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {

  let value = e.target.value.replace(/\D/g, '');

  if(value.length === 1){

    if(value !== '0' && value !== '5'){
      value = '';
    }

    if(value === '5'){
      value = '05';
    }
  }

  if(value.length >= 2){

    if(
      value.charAt(0) === '0' &&
      value.charAt(1) !== '5'
    ){
      value = '0';
    }
  }

  if(
    value.length >= 2 &&
    value.charAt(0) === '5'
  ){
    value = '0' + value;
  }

  value = value.substring(0,11);

  let formatted = '';

  if(value.length > 0){
    formatted += value.substring(0,4);
  }

  if(value.length >= 5){
    formatted += ' ' + value.substring(4,7);
  }

  if(value.length >= 8){
    formatted += ' ' + value.substring(7,9);
  }

  if(value.length >= 10){
    formatted += ' ' + value.substring(9,11);
  }

  e.target.value = formatted;

});


const addGuestBtn = document.getElementById('addGuestBtn');
const guestContainer = document.getElementById('guestContainer');

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
        <input type="text" class="name-input" required>
      </div>

      <div class="form-group">
        <label>Ana Yemek Tercihi</label>

        <select required>
          <option value="">Seçiniz</option>
          <option>Kuzu Pirzola</option>
          <option>Antrikot</option>
          <option>Kuzu Şiş</option>
          <option>Köfte</option>
        </select>
      </div>

      <div class="form-group">
        <label>Meze Tercihi</label>

        <select required>
          <option value="">Seçiniz</option>
          <option>Humus</option>
          <option>Haydari</option>
          <option>Şakşuka</option>
        </select>
      </div>

      <button type="button" class="remove-btn">
        Katılımcıyı Sil
      </button>

    </div>

  `;

  guestContainer.insertAdjacentHTML(
    'beforeend',
    guestHTML
  );

  const lastGuestCard = guestContainer.lastElementChild;

  const removeBtn =
    lastGuestCard.querySelector('.remove-btn');

  removeBtn.addEventListener('click', () => {

    lastGuestCard.remove();
    updateGuestTitles();

  });

  attachNameFormatter();

});


function attachNameFormatter(){

  const nameInputs =
    document.querySelectorAll('.name-input');

  nameInputs.forEach(input => {

    input.addEventListener('input', () => {

      let words =
        input.value
          .toLocaleLowerCase('tr-TR')
          .split(' ');

      words = words.map(word => {

        if(word.length === 0){
          return '';
        }

        return word.charAt(0)
          .toLocaleUpperCase('tr-TR')
          + word.slice(1);

      });

      input.value = words.join(' ');

    });

  });

}


function updateGuestTitles(){

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
