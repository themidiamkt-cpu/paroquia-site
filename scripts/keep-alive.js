const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function keepAlive() {
    console.log('Running keep-alive ping...');

    const { data, error } = await supabase
        .from('keep_alive')
        .insert([{ created_at: new Date().toISOString() }]);

    if (error) {
        console.error('Error inserting keep-alive record:', error);
        process.exit(1);
    }

    console.log('Successfully inserted keep-alive record:', data);
}

keepAlive();
