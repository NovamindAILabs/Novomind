// supabase-config.js
const supabaseUrl = "https://vuetfjqslwjlywjfgqpk.supabase.co";      // Replace with your Supabase URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1ZXRmanFzbHdqbHl3amZncXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NjAzNjMsImV4cCI6MjA3NjAzNjM2M30.93l-CErSoidHe6Vm4tJA9IaoyW3FbyA0SCv544nPdVo"; // Replace with your Supabase anon key


var supabase = supabase.createClient(supabaseUrl, supabaseKey);
