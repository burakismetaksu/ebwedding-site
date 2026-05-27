'use client';

import Image from 'next/image';
import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';

type Guest = {
  name: string;
  mainCourse: string;
  sideDish: string;
};

const targetDate = new Date('2026-06-23T15:30:00').getTime();
const maxGuests = 2;

const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('5')) {
    digits = `0${digits}`;
  }

  if (digits.length > 11) {
    digits = digits.slice(0, 11);
  }

  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 9)} ${digits.slice(9)}`;
};

const validatePhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return /^05\d{9}$/.test(digits);
};

const padZero = (value: number) => value.toString().padStart(2, '0');

const sections = [
  { id: 'hero', label: 'Davetiye' },
  { id: 'yemek', label: 'Yemek' },
  { id: 'menu', label: 'Menü' },
  { id: 'rsvp', label: 'RSVP' }
];

export default function WeddingPage() {
  const [attendance, setAttendance] = useState('Katılıyorum');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [guests, setGuests] = useState<Guest[]>([
    { name: '', mainCourse: '', sideDish: '' }
  ]);
  const [status, setStatus] = useState({ message: '', success: false });
  const [submitting, setSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [honeypot, setHoneypot] = useState('');
  const [counter, setCounter] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const updateViewport = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    return () => {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCounter({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCounter({ days: padZero(days), hours: padZero(hours), minutes: padZero(minutes), seconds: padZero(seconds) });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY + 120;
      const current = sections.find(section => {
        const element = document.getElementById(section.id);
        if (!element) return false;
        return offset >= element.offsetTop && offset < element.offsetTop + element.offsetHeight;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const canAddGuest = guests.length < maxGuests;

  const mealSectionVisible = attendance === 'Katılıyorum';

  const guestCards = useMemo(
    () =>
      guests.map((guest, index) => (
        <div key={index} className="guest-card">
          <div className="guest-title">KATILIMCI {index + 1}</div>

          <div className="form-group">
            <label htmlFor={`guestName${index + 1}`}>Ad Soyad</label>
            <input
              id={`guestName${index + 1}`}
              name="guestName[]"
              className="name-input"
              required
              value={guest.name}
              onChange={event => {
                const nextGuests = [...guests];
                nextGuests[index].name = event.target.value;
                setGuests(nextGuests);
              }}
              onBlur={event => {
                const formatted = event.target.value
                  .toLocaleLowerCase('tr-TR')
                  .split(' ')
                  .filter(Boolean)
                  .map(word => word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1))
                  .join(' ');
                const nextGuests = [...guests];
                nextGuests[index].name = formatted;
                setGuests(nextGuests);
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`mealChoice${index + 1}`}>Ana Yemek Tercihi</label>
            <select
              id={`mealChoice${index + 1}`}
              name="mainCourse[]"
              className="main-course-select"
              required
              value={guest.mainCourse}
              onChange={event => {
                const nextGuests = [...guests];
                nextGuests[index].mainCourse = event.target.value;
                setGuests(nextGuests);
              }}
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

          <div className="form-group">
            <label htmlFor={`sideChoice${index + 1}`}>Meze Tercihi</label>
            <select
              id={`sideChoice${index + 1}`}
              name="sideDish[]"
              className="side-dish-select"
              required
              value={guest.sideDish}
              onChange={event => {
                const nextGuests = [...guests];
                nextGuests[index].sideDish = event.target.value;
                setGuests(nextGuests);
              }}
            >
              <option value="">Seçiniz</option>
              <option>Humus</option>
              <option>Haydari</option>
              <option>Şakşuka</option>
              <option>Atom</option>
            </select>
          </div>

          {index > 0 && (
            <button
              type="button"
              className="remove-btn"
              onClick={() => {
                setGuests(guests.filter((_, guestIndex) => guestIndex !== index));
              }}
            >
              Katılımcıyı Sil
            </button>
          )}
        </div>
      )),
    [guests]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ message: '', success: false });

    if (honeypot.trim().length > 0) {
      return;
    }

    if (!validatePhone(phone)) {
      setStatus({ message: 'Lütfen geçerli bir Türk telefon numarası girin.', success: false });
      return;
    }

    if (attendance === 'Katılıyorum' && guests.some(guest => !guest.name || !guest.mainCourse || !guest.sideDish)) {
      setStatus({ message: 'Lütfen tüm katılımcı bilgilerini eksiksiz doldurun.', success: false });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ message: 'Katılım bilginiz alındı, teşekkürler!', success: true });
    }, 1200);
  };

  return (
    <>
      <header className="site-header" role="banner">
        <nav aria-label="Site navigasyonu">
          <ul className="nav-links">
            {sections.map(section => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="content-wrapper">
        <section id="hero" className="hero-screen" aria-labelledby="heroTitle">
          <div className="hero-inner">
            <Image
              src="/assets/images/yuzuk_logo_transparent_hd.png"
              className="hero-logo"
              alt="Ece ve Burak düğün logosu"
              width={180}
              height={180}
              priority
            />

            <h1 id="heroTitle" className="hero-title">
              EN ÖZEL ANIMIZA<br />
              ŞAHİTLİK ETMENİZDEN<br />
              MUTLULUK DUYARIZ
            </h1>

            <div className="mini-divider" aria-hidden="true">
              <span />
              ♡
              <span />
            </div>

            <div className="couple-name" aria-label="Ece ve Burak">
              <span className="name-black">Ece</span>
              <span className="name-red">&</span>
              <span className="name-black">Burak</span>
            </div>

            <div className="line-divider" aria-hidden="true" />

            <div className="calendar-title">HAZİRAN 2026</div>

            <div className="calendar" aria-label="Düğün tarihi takvimi">
              <div>PZT</div>
              <div>SALI</div>
              <div>ÇRŞ</div>
              <div>PRŞ</div>
              <div>CUM</div>
              <div>CMT</div>
              <div>PZR</div>
              <div />
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
              <div>5</div>
              <div>6</div>
              <div>7</div>
              <div>8</div>
              <div>9</div>
              <div>10</div>
              <div>11</div>
              <div>12</div>
              <div>13</div>
              <div>14</div>
              <div>15</div>
              <div>16</div>
              <div>17</div>
              <div>18</div>
              <div>19</div>
              <div>20</div>
              <div>21</div>
              <div>22</div>
              <div className="heart-day">23</div>
              <div>24</div>
              <div>25</div>
              <div>26</div>
              <div>27</div>
              <div>28</div>
              <div>29</div>
              <div>30</div>
            </div>

            <div className="countdown-wrapper">
              <div className="countdown-title">NİKAHA KALAN SÜRE</div>
              <div className="countdown-panels" aria-live="polite">
                <div>
                  <span>{counter.days}</span>
                  <small>Gün</small>
                </div>
                <div>
                  <span>{counter.hours}</span>
                  <small>Saat</small>
                </div>
                <div>
                  <span>{counter.minutes}</span>
                  <small>Dakika</small>
                </div>
                <div>
                  <span>{counter.seconds}</span>
                  <small>Saniye</small>
                </div>
              </div>
            </div>

            <div className="location-card">
              <div className="location-title">📍 KONYAALTI BELEDİYESİ NİKAH SALONU</div>
              <div className="location-sub">23 Haziran 2026 • Saat 15:30</div>
              <a
                href="https://share.google/e4LXrSBf4N1kYrXta"
                target="_blank"
                rel="noopener noreferrer"
                className="map-btn"
                aria-label="Konyaaltı Belediyesi Nikah Salonu konumunu aç"
              >
                Konuma Git
              </a>
            </div>
          </div>
        </section>

        <section id="yemek" className="info-card" aria-labelledby="yemekTitle">
          <h2 id="yemekTitle">YEMEK DAVETİ</h2>
          <p>Nikah törenimizin ardından Bohomi Garden’da birlikte olacağız.</p>
          <a
            href="https://share.google/FiXKpSgAJFe3lU03b"
            target="_blank"
            rel="noopener noreferrer"
            className="map-btn"
            aria-label="Bohomi Garden konumunu aç"
          >
            Bohomi Garden Konumu
          </a>
        </section>

        <section id="menu" className="info-card" aria-labelledby="menuTitle">
          <h2 id="menuTitle">MENÜ BİLGİLENDİRMESİ</h2>
          <p>Fiks menümüz kişi başı; ana yemek, meze, salata ve soft içeceklerden oluşmaktadır.</p>
          <p>Menü kişi başı ücretimiz 1250 TL’dir.</p>
          <p>Dilerseniz kendi alkolünüzü yanınızda getirebilirsiniz.</p>
        </section>

        <section id="rsvp" className="info-card" aria-labelledby="rsvpTitle">
          <h2 id="rsvpTitle">BİLGİ & ONAY</h2>
          <p className="form-top-text">Katılım durumunuzu 01 Haziran 2026’ya kadar bildirmenizi rica ederiz ☺</p>

          <form id="rsvpForm" className="rsvp-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="form-group">
              <legend>Katılım Durumu</legend>
              <div className="radio-group" role="radiogroup" aria-label="Katılım durumu">
                {['Katılıyorum', 'Katılamıyorum'].map(option => (
                  <label
                    key={option}
                    className={`radio-card ${attendance === option ? 'active' : ''}`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value={option}
                      checked={attendance === option}
                      onChange={() => setAttendance(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form-group">
              <label htmlFor="phone">Telefon Numaranız</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                placeholder="05xx xxx xx xx"
                required
                value={phone}
                onChange={event => setPhone(formatPhone(event.target.value))}
                aria-describedby="phoneHelp"
              />
              <small id="phoneHelp">Lütfen geçerli bir Türk cep telefonu numarası girin.</small>
            </div>

            {mealSectionVisible && (
              <div id="mealSection">
                {guestCards}
                <button
                  type="button"
                  className="add-btn"
                  id="addGuestBtn"
                  onClick={() => setGuests(prev => [...prev, { name: '', mainCourse: '', sideDish: '' }])}
                  disabled={!canAddGuest}
                >
                  {canAddGuest ? '+ Katılımcı Ekle' : '+ En fazla 1 kişi daha ekleyebilirsiniz'}
                </button>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="note">Notunuz</label>
              <textarea
                id="note"
                name="note"
                placeholder="Bizimle paylaşmak istediğiniz bir not varsa yazabilirsiniz"
                value={note}
                onChange={event => setNote(event.target.value)}
              />
            </div>

            <div className="form-footer">
              <div className="visually-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={event => setHoneypot(event.target.value)}
                  aria-hidden="true"
                />
              </div>

              <div id="formStatus" className="form-status" aria-live="polite">
                {status.message}
              </div>

              <button className="submit-btn" type="submit" disabled={submitting}>
                {submitting ? 'Gönderiliyor...' : 'KATILIM BİLGİSİNİ GÖNDER'}
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>Ece & Burak • 23 Haziran 2026 • Konyaaltı</p>
      </footer>
    </>
  );
}
