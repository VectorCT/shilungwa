// contact.js — Contact form client-side validation

/**
 * Initialise the contact form validation.
 * Binds submit event on `.contact-form`, validates all required fields,
 * shows inline errors in `.form-error` spans, and replaces the form
 * with a success panel on valid submission.
 *
 * Validates: Requirements 11.2, 11.3, 11.4
 */
function initContactForm() {
  var form = document.querySelector('.contact-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors(form);

    var isValid = true;

    // Name: required, min 2 chars
    var name = form.querySelector('[name="name"]');
    if (name) {
      var nameVal = name.value.trim();
      if (!nameVal) {
        showError('name-error', 'Full name is required.');
        isValid = false;
      } else if (nameVal.length < 2) {
        showError('name-error', 'Name must be at least 2 characters.');
        isValid = false;
      }
    }

    // Email: required, valid pattern
    var email = form.querySelector('[name="email"]');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email) {
      var emailVal = email.value.trim();
      if (!emailVal) {
        showError('email-error', 'Email address is required.');
        isValid = false;
      } else if (!emailPattern.test(emailVal)) {
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
      }
    }

    // Subject: required dropdown (value must not be empty)
    var subject = form.querySelector('[name="subject"]');
    if (subject) {
      if (!subject.value) {
        showError('subject-error', 'Please select a subject.');
        isValid = false;
      }
    }

    // Message: required, min 10 chars
    var message = form.querySelector('[name="message"]');
    if (message) {
      var msgVal = message.value.trim();
      if (!msgVal) {
        showError('message-error', 'Message is required.');
        isValid = false;
      } else if (msgVal.length < 10) {
        showError('message-error', 'Message must be at least 10 characters.');
        isValid = false;
      }
    }

    if (isValid) {
      form.innerHTML =
        '<div class="form-success" role="status">' +
          '<h3>Message Sent</h3>' +
          '<p>Thank you for reaching out. We\'ll respond within 2 business days.</p>' +
        '</div>';
    }
  });
}

/**
 * Clear all previous error messages inside the form.
 * @param {HTMLFormElement} form
 */
function clearErrors(form) {
  var errors = form.querySelectorAll('.form-error');
  errors.forEach(function (span) {
    span.textContent = '';
  });
}

/**
 * Display an inline error message in the matching error span.
 * @param {string} id  — id of the `.form-error` span (e.g. "name-error")
 * @param {string} msg — error message to display
 */
function showError(id, msg) {
  var span = document.getElementById(id);
  if (span) {
    span.textContent = msg;
  }
}
