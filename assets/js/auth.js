// Initialize Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ----------------------
//  EMAIL + PASSWORD SIGNUP
// ----------------------
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: { firstName, lastName },
                emailRedirectTo: "https://novomindai.xyz/dashboard.html"
            }
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful! Check your email to verify your account.");
        }
    });
}

// ----------------------
//  EMAIL + PASSWORD LOGIN
// ----------------------
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            alert(error.message);
        } else {
            window.location.href = "dashboard.html";
        }
    });
}

// ----------------------
//  GOOGLE SIGNUP + LOGIN
// ----------------------
const googleBtn = document.querySelector('.social-btn:nth-child(1)');

if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "https://novomindai.xyz/dashboard.html"
            }
        });

        if (error) console.log(error);
    });
}

// ----------------------
//  TWITTER SIGNUP + LOGIN
// ----------------------
const twitterBtn = document.querySelector('.social-btn:nth-child(2)');

if (twitterBtn) {
    twitterBtn.addEventListener("click", async () => {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: "twitter",
            options: {
                redirectTo: "https://novomindai.xyz/dashboard.html"
            }
        });

        if (error) console.log(error);
    });
}
