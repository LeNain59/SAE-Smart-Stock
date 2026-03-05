import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://zlbidvslsnoqkpkjtyhq.supabase.co"
const supabaseKey = "sb_publishable_6ALVCt3xYSzwYqV3n3GVQA_9c-o0g6s"

export const supabase = createClient(supabaseUrl, supabaseKey)
