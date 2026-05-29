/*
  ================================================
  script.js — Shared JavaScript for SCET Portal
  Author  : Student Project
  Purpose :
    1. Handle student inquiry form (index.html)
    2. Handle AJAX feedback submission (feedback.html)
  ================================================
*/

/* ============================================================
   SECTION 1 — INQUIRY FORM (index.html)
   This function runs when the inquiry form is submitted.
   It prevents page reload and shows a success message.
============================================================ */

/**
 * handleInquiry() is called by the form's onsubmit attribute.
 * It prevents the default form submission (which would reload the page),
 * reads the form values, and shows a success message.
 *
 * @param {Event} event - The form submit event
 */
function handleInquiry(event) {
  // Prevent the default form submission (stops page reload)
  event.preventDefault();

  // Get the value from the name field to personalise the message
  var studentName = document.getElementById("name").value.trim();

  // Get selected course text
  var courseSelect = document.getElementById("course");
  var courseName = courseSelect.options[courseSelect.selectedIndex].text;

  // Show success message paragraph
  var msgEl = document.getElementById("inquiryMsg");
  msgEl.style.display = "block";
  msgEl.textContent =
    "Thank you, " + studentName + "! Your inquiry for " + courseName +
    " has been received. We will contact you within 2 working days.";

  // Optional: reset the form after 4 seconds
  setTimeout(function () {
    document.getElementById("inquiryForm").reset();
    msgEl.style.display = "none";
  }, 4000);
}


/* ============================================================
   SECTION 2 — AJAX FEEDBACK SYSTEM (feedback.html)

   Key concepts demonstrated here:
   - Fetch API (AJAX) to simulate an async request
   - Page does NOT reload when feedback is submitted
   - Feedback stored in a JavaScript array
   - Submitted feedbacks displayed dynamically in the DOM
============================================================ */

// ---- Global array to store all submitted feedbacks temporarily ----
// (This resets when the page is reloaded — no backend needed)
var feedbackStorage = [];

/* ---- Wait for page to fully load before attaching events ---- */
document.addEventListener("DOMContentLoaded", function () {

  // Only run feedback code if we are on the feedback page
  // (Check if the submit button exists on this page)
  var submitBtn = document.getElementById("submitFeedbackBtn");
  if (!submitBtn) return; // Not on feedback page, skip

  // Attach click handler to the feedback submit button
  submitBtn.addEventListener("click", function () {
    submitFeedback();
  });
});


/**
 * submitFeedback()
 * Reads feedback form values, validates them,
 * then uses the Fetch API to simulate an AJAX submission.
 * On success, stores feedback in the array and renders it.
 */
function submitFeedback() {

  // ---- Step 1: Read form values ----
  var name    = document.getElementById("fb_name").value.trim();
  var email   = document.getElementById("fb_email").value.trim();
  var rating  = document.getElementById("fb_rating").value;
  var message = document.getElementById("fb_message").value.trim();

  // ---- Step 2: Simple validation ----
  if (!name || !email || !rating || !message) {
    showFeedbackMsg("Please fill in all required fields.", "error");
    return;
  }

  if (message.length < 10) {
    showFeedbackMsg("Feedback message must be at least 10 characters.", "error");
    return;
  }

  // ---- Step 3: Disable button to prevent double submit ----
  var btn = document.getElementById("submitFeedbackBtn");
  btn.disabled = true;
  btn.textContent = "Submitting...";

  /*
   * ---- Step 4: AJAX using Fetch API ----
   *
   * Since we have no backend server, we use JSONPlaceholder
   * (a free fake REST API for testing) to demonstrate how Fetch works.
   *
   * We send a POST request with our feedback data as JSON.
   * The API echoes back a response — we use that as a signal of success.
   *
   * In a real project, you would replace this URL with your own server endpoint.
   */
  var feedbackData = {
    name    : name,
    email   : email,
    rating  : rating,
    message : message
  };

  // Using Fetch API to POST data (AJAX call — no page reload)
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method  : "POST",
    headers : {
      "Content-Type": "application/json"
    },
    body : JSON.stringify(feedbackData) // Convert JS object to JSON string
  })
  .then(function (response) {
    // Check if HTTP response is OK (status 200-299)
    if (!response.ok) {
      throw new Error("Server returned status " + response.status);
    }
    return response.json(); // Parse JSON response body
  })
  .then(function (data) {
    // ---- Step 5: AJAX success ----
    // 'data' is the parsed JSON response from the server

    // Add a timestamp to our feedback object
    feedbackData.timestamp = new Date().toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });

    // Save feedback to our temporary in-memory array
    feedbackStorage.push(feedbackData);

    // Show success message to user
    showFeedbackMsg(
      "✔ Feedback submitted successfully! Thank you, " + name + ".",
      "success"
    );

    // Reset the form fields
    document.getElementById("feedbackForm").reset();

    // Render all feedbacks below the form
    renderFeedbacks();
  })
  .catch(function (error) {
    // ---- AJAX error handling ----
    // This runs if the network is offline or server returns error
    showFeedbackMsg(
      "Could not submit feedback. Please check your connection and try again.",
      "error"
    );
    console.error("Fetch error:", error);
  })
  .finally(function () {
    // Re-enable the submit button whether success or error
    btn.disabled = false;
    btn.textContent = "Submit Feedback";
  });
}


/**
 * renderFeedbacks()
 * Reads from the feedbackStorage array and dynamically creates
 * HTML cards for each feedback entry.
 * Inserts them into the #feedbackList div on the page.
 */
function renderFeedbacks() {
  var listDiv   = document.getElementById("feedbackList");
  var countText = document.getElementById("feedbackCount");

  // Update the count paragraph
  var total = feedbackStorage.length;
  countText.textContent = total + (total === 1 ? " feedback" : " feedbacks") + " submitted.";

  // Clear the existing list before re-rendering
  listDiv.innerHTML = "";

  // Loop through feedbackStorage array in reverse (newest first)
  for (var i = feedbackStorage.length - 1; i >= 0; i--) {
    var fb = feedbackStorage[i];

    // Build the rating label text from numeric value
    var ratingLabel = getRatingLabel(fb.rating);

    /*
     * Create an HTML card string for this feedback.
     * We use innerHTML for simplicity (acceptable in a student project).
     * For production, you would use createElement for security.
     */
    var cardHTML =
      '<div class="feedback-card">' +
        '<div class="fb-header">' +
          '<span class="fb-name">' + escapeHTML(fb.name) + '</span>' +
          '<span class="fb-rating">' + ratingLabel + '</span>' +
        '</div>' +
        '<div class="fb-email">' + escapeHTML(fb.email) + '</div>' +
        '<div class="fb-message">' + escapeHTML(fb.message) + '</div>' +
        '<div class="fb-time">Submitted: ' + fb.timestamp + '</div>' +
      '</div>';

    // Add this card to the list container
    listDiv.innerHTML += cardHTML;
  }
}


/**
 * getRatingLabel()
 * Converts a numeric rating (1–5) to a descriptive string with stars.
 *
 * @param {string} value - Rating value as string ("1" to "5")
 * @returns {string} - Label like "⭐⭐⭐ Average"
 */
function getRatingLabel(value) {
  var labels = {
    "5": "⭐⭐⭐⭐⭐ Excellent",
    "4": "⭐⭐⭐⭐ Good",
    "3": "⭐⭐⭐ Average",
    "2": "⭐⭐ Below Average",
    "1": "⭐ Poor"
  };
  return labels[value] || value;
}


/**
 * showFeedbackMsg()
 * Shows a message below the form (success or error styling).
 *
 * @param {string} text - Message to display
 * @param {string} type - "success" or "error"
 */
function showFeedbackMsg(text, type) {
  var msgEl = document.getElementById("feedbackMsg");
  msgEl.style.display = "block";
  msgEl.textContent = text;

  // Change background colour depending on type
  if (type === "error") {
    msgEl.style.backgroundColor = "#fde8e8";
    msgEl.style.borderColor      = "#e0a0a0";
    msgEl.style.color            = "#8b1a1a";
  } else {
    // success styling (same as CSS class default)
    msgEl.style.backgroundColor = "#d4edda";
    msgEl.style.borderColor      = "#b0d9bb";
    msgEl.style.color            = "#2e6b3e";
  }

  // Auto-hide the message after 5 seconds
  setTimeout(function () {
    msgEl.style.display = "none";
  }, 5000);
}


/**
 * escapeHTML()
 * Escapes special HTML characters in user input to prevent XSS.
 * Simple security measure — important even in student projects.
 *
 * @param {string} str - Raw user input
 * @returns {string} - Safe HTML string
 */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#039;");
}
