// client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zlbidvslsnoqkpkjtyhq.supabase.co"  // url de supabase
const supabaseKey = "sb_publishable_6ALVCt3xYSzwYqV3n3GVQA_9c-o0g6s"  // clef de supabase

export const supabase = createClient(supabaseUrl, supabaseKey)
