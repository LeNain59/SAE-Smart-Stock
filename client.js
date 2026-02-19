// client.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "sb_publishable_6ALVCt3xYSzwYqV3n3GVQA_9c-o0g6s"  // url de supabase
const supabaseKey = "sb_secret_zJJ7hyLQ8xkNOYoCT1wmXg_xJXKGeXm"  // clef de supabase

export const supabase = createClient(supabaseUrl, supabaseKey)
