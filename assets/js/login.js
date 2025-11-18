// assets/js/login.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (!form) return;

  let isSubmitting = false; // prevent multiple submissions

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    isSubmitting = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: user, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        alert(error.message);
        isSubmitting = false;
        return;
      }

      alert('Login successful! Redirecting to dashboard...');
      window.location.href = 'dashboard.html';
    } catch (err) {
      console.error(err);
      alert('Login failed! Check console.');
    }

    isSubmitting = false;
  });
});
