# Database Setup Instructions

## Populating Initial Data

To make the existing site content (schedules, pastorals, etc.) appear in the admin panel, you need to run TWO SQL scripts in your Supabase database **in this order**:

### Step 1: Create Tables (Run Schema)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `ahdeoaadkmcmuvxpdyxa`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Schema Script FIRST**
   - Copy the contents of `supabase_schema.sql` from this project
   - Paste it into the SQL editor
   - Click "Run" or press `Ctrl/Cmd + Enter`
   - This creates all the database tables

### Step 2: Insert Initial Data (Run Seed)

1. **Create Another New Query**
   - Click "New query" again in SQL Editor

2. **Run the Seed Script**
   - Copy the contents of `seed_data.sql` from this project
   - Paste it into the SQL editor
   - Click "Run" or press `Ctrl/Cmd + Enter`
   - This populates the tables with initial content

### Step 3: Verify

- Navigate to `/admin/pastorais` - you should see 3 pastorals
- Navigate to `/admin/horarios` - you should see 4 mass schedules
- Navigate to `/admin/noticias` - you should see 2 news items

## What Gets Populated

The seed script adds:
- **3 Pastorals**: Catequese, Jovens Sarados, Pascom
- **4 Mass Schedules**: Wednesday, Thursday, Saturday, Sunday masses
- **2 News Items**: Welcome message and Catechism enrollment
- **1 Notice**: Office hours information

After running both scripts, all content will be editable via the admin panel!

