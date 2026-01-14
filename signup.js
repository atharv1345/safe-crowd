const form = document.getElementById('signup-form');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    name: form.name.value,
    email: form.email.value,
    password: form.password.value
  };

  console.log('Form submitted:', data);
});
