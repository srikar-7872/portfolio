const fadeInItems = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeInItems.length) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  fadeInItems.forEach((item) => revealObserver.observe(item));
} else {
  fadeInItems.forEach((item) => item.classList.add('visible'));
}

(function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

const progressBars = document.querySelectorAll('.progress-bar[data-width]');

if ('IntersectionObserver' in window && progressBars.length) {
  const progressObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.width = entry.target.getAttribute('data-width');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  progressBars.forEach((bar) => progressObserver.observe(bar));
} else {
  progressBars.forEach((bar) => {
    bar.style.width = bar.getAttribute('data-width');
  });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let valid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const fields = [name, email, phone, subject, message];

    fields.forEach((field) => field.classList.remove('is-invalid', 'is-valid'));

    if (!name.value.trim()) {
      name.classList.add('is-invalid');
      valid = false;
    } else {
      name.classList.add('is-valid');
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      email.classList.add('is-invalid');
      valid = false;
    } else {
      email.classList.add('is-valid');
    }

    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phone.value.replace(/\D/g, ''))) {
      phone.classList.add('is-invalid');
      valid = false;
    } else {
      phone.classList.add('is-valid');
    }

    if (!subject.value.trim()) {
      subject.classList.add('is-invalid');
      valid = false;
    } else {
      subject.classList.add('is-valid');
    }

    if (!message.value.trim()) {
      message.classList.add('is-invalid');
      valid = false;
    } else {
      message.classList.add('is-valid');
    }

    const alertBox = document.getElementById('formAlert');
    if (!alertBox) return;

    alertBox.classList.remove('d-none');

    if (valid) {
      alertBox.className = 'alert alert-custom alert-success mt-3';
      alertBox.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i><strong>Message looks good.</strong> I will get back to you within 24 hours.';
      contactForm.reset();
      fields.forEach((field) => field.classList.remove('is-valid'));
      window.setTimeout(() => {
        alertBox.className = 'alert alert-custom alert-success mt-3 d-none';
        alertBox.innerHTML = '';
      }, 5000);
    } else {
      alertBox.className = 'alert alert-custom alert-danger mt-3';
      alertBox.innerHTML = '<i class="bi bi-exclamation-circle-fill me-2"></i><strong>Please fix the highlighted fields</strong> before sending your message.';
    }
  });
}

const previewButtons = document.querySelectorAll('.preview-cert-btn');
const certTitle = document.getElementById('certModalName');
const certDesc = document.getElementById('certModalDesc');

previewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (certTitle) certTitle.textContent = button.dataset.certTitle || 'Certificate Preview';
    if (certDesc) certDesc.textContent = button.dataset.certDesc || 'Additional certificate details will appear here.';
  });
});

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 24 ? '0 16px 30px rgba(4, 8, 17, 0.18)' : 'none';
});
