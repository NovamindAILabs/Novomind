// Initialize from supabase-config.js
// const supabase = ...

// -----------------------------
//  SIGNUP WITH EMAIL + PASSWORD
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { firstName, lastName }
        }
      });

      if (error) {
        alert(error.message);
        return;
      }

      window.location.href = "dashboard.html";
    });
  }

  // -----------------------------
  //  GOOGLE SIGNUP
  // -----------------------------
  const googleSignupBtn = document.querySelector(".google-signup");
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Google signup clicked");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://novomindai.xyz/dashboard.html"
        }
      });

      if (error) alert(error.message);
    });
  }

  // -----------------------------
  //  GOOGLE LOGIN
  // -----------------------------
  const googleLoginBtn = document.querySelector(".google-login");
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      console.log("Google login clicked");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://novomindai.xyz/dashboard.html"
        }
      });

      if (error) alert(error.message);
    });
  }
});
