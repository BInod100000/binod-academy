// =====================================
// BINOD ACADEMY - SUPABASE CONFIG
// =====================================

const SUPABASE_URL = "https://zapjcweouiohabrmymqq.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_LzpPYJfrnh604E-guWCezA_mzZjaS6x";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
