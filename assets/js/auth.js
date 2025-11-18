// assets/js/auth.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('signupForm');
  if (!form) return; // safety check

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // 🔑 Prevent page refresh

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Password match check
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Supabase sign-up
      const { data: user, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // Optionally, save first & last name in Supabase database (optional)
      // const { data: profile, error: profileError } = await supabase
      //   .from('profiles')
      //   .insert([{ id: user.user.id, first_name: data.firstName, last_name: data.lastName }]);

      // Redirect to login page after signup
      window.location.href = 'login.html';
    } catch (err) {
      console.error(err);
      alert('Something went wrong! Check console.');
    }
  });
});
