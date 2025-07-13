document.addEventListener('DOMContentLoaded', function() {

  /* --- MOBILE NAVIGATION TOGGLE --- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });
  }

  /* --- SMOOTH SCROLLING FOR NAV LINKS --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      // Close mobile nav on click
      if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.classList.remove('open');
      }
    });
  });

  /* --- EMAILJS CONTACT FORM --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    emailjs.init('Wix7YK83gEw6TuPId'); // Your EmailJS Public Key

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const msgDiv = document.getElementById('contact-form-message');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      // Simple validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const title = document.getElementById('title').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !title || !message) {
          msgDiv.textContent = 'Please fill in all fields.';
          msgDiv.style.color = '#e53e3e';
          return;
      }

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      emailjs.sendForm('service_j0hphem', '__ejs-test-mail-service__', this)
        .then(() => {
          msgDiv.textContent = 'Your message has been sent successfully!';
          msgDiv.style.color = '#38b2ac';
          contactForm.reset();
        }, (error) => {
          msgDiv.textContent = 'Failed to send message. Please try again.';
          msgDiv.style.color = '#e53e3e';
          console.error('EmailJS Error:', error);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        });
    });
  }

  /* --- CTA BUTTON TIMER --- */
  const timerSpan = document.querySelector('.cta-timer');
  if (timerSpan) {
    let duration = 5; // seconds
    timerSpan.textContent = `(${duration}s left!)`;

    const timerInterval = setInterval(() => {
      duration--;
      if (duration > 0) {
        timerSpan.textContent = `(${duration}s left!)`;
      } else {
        clearInterval(timerInterval);
        timerSpan.style.display = 'none';
      }
    }, 1000);
  }

  /* --- ADD TO DISCOVERY (.ics) DOWNLOAD --- */
  const addToDiscoveryBtn = document.getElementById('add-to-discovery-btn');
  if (addToDiscoveryBtn) {
    addToDiscoveryBtn.addEventListener('click', function() {
      const date = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const start = date.toISOString().replace(/[:.]/g, '').slice(0, 15) + '00';
      const end = new Date(date.getTime() + 60 * 60 * 1000).toISOString().replace(/[:.]/g, '').slice(0, 15) + '00';
      const location = 'Zoom (Link will be provided)';
      const description = 'Your discovery session with CoachNiti.';
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//CoachNiti//Discovery Event//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@coachniti.com`,
        `DTSTAMP:${start}Z`,
        `DTSTART:${start}Z`,
        `DTEND:${end}Z`,
        `SUMMARY:Discovery Session with CoachNiti`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Discovery-Session.ics';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    });
  }

});
