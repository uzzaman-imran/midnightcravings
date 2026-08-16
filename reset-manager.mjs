import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ixfgyraqpfpecdnfvwqu.supabase.co",
  process.env.SUPABASE_SECRET_KEY
);

const userId = "PASTE_YOUR_USER_UID_HERE";

const { data, error } = await supabase.auth.admin.updateUserById(
  userId,
  {
    password: "Midnight@2026!",
  }
);

if (error) {
  console.error("ERROR:", error.message);
  process.exit(1);
}

console.log("Password updated successfully for:", data.user.email);