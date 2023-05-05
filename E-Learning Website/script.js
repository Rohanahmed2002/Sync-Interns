function redirectToSignIn() {
    window.location.href = "signin.html";
}

const signinBtn = document.getElementById('signin-btn');
const signinForm = document.getElementById('signin-form');

signinBtn.addEventListener('click', function() {
  signinForm.style.display = 'block';
});
