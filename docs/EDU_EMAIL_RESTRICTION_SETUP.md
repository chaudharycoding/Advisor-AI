# .edu Email Restriction Setup Guide

This guide walks you through setting up server-side .edu email restriction for AdvisorAI authentication.

## Overview

The authentication system uses:
- **Supabase** for authentication backend (email/password)
- **PostgreSQL Function** to restrict signups to `.edu` email addresses only
- **Supabase Auth Hook** to enforce the restriction server-side

## How It Works

The `.edu` restriction is enforced through a **Supabase Auth Hook** that triggers a PostgreSQL function before every user creation attempt. This validation:
- ✅ Runs server-side (cannot be bypassed)
- ✅ Works with email/password authentication
- ✅ Will work with any future OAuth providers you add
- ✅ Centralized in one database function

## Prerequisites

- Supabase project created at [app.supabase.com](https://app.supabase.com)
- Your Supabase project URL and anon key

---

## Setup Instructions

### Part 1: Supabase Dashboard Configuration

#### Step 1: Run SQL Migration

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **SQL Editor**
4. Click **New query**
5. Copy and paste the contents of `supabase/migrations/20250511_restrict_edu_signups.sql` from this repository
6. Click **Run** to execute the migration
7. Verify success message appears

**What this does:**
- Creates PostgreSQL function `hook_restrict_signup_to_edu`
- Grants necessary permissions to `supabase_auth_admin` role
- The function validates that email addresses end with `.edu`

#### Step 2: Configure Auth Hook

1. Navigate to **Authentication > Hooks** in Supabase Dashboard
2. Find the **before-user-created** hook type
3. Click **Enable Hook**
4. Configure:
   - **Hook Type:** Postgres Function
   - **Schema:** public
   - **Function:** hook_restrict_signup_to_edu
5. Click **Save**

**What this does:**
- The hook triggers before every user creation
- Calls your PostgreSQL function to validate the email domain
- Blocks signup if email doesn't end with `.edu`

---

### Part 2: Environment Setup

#### Step 1: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Supabase credentials:
   ```bash
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Get these values from:
   - Supabase Dashboard > Project Settings > API
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Project API keys > anon/public** → `VITE_SUPABASE_ANON_KEY`

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Start Development Server

```bash
npm run dev
```

---

## Testing

### Test Case 1: Valid .edu Email Signup

1. Navigate to `http://localhost:5173/signup`
2. Enter email with `.edu` domain (e.g., `student@university.edu`)
3. Enter password (min 6 characters)
4. Confirm password
5. Click **Sign Up**
6. **Expected:** Account created successfully, redirected to `/dashboard`

### Test Case 2: Non-.edu Email Signup (Should Fail)

1. Navigate to `http://localhost:5173/signup`
2. Enter email without `.edu` domain (e.g., `user@gmail.com`)
3. Enter password
4. Confirm password
5. Click **Sign Up**
6. **Expected:** Error message: "Only .edu email addresses are allowed to sign up"
7. **Verify:** No user created in Supabase (check Authentication > Users)

### Test Case 3: Valid .edu Email Login

1. After creating account with `.edu` email
2. Navigate to `http://localhost:5173/login`
3. Enter `.edu` email and password
4. Click **Sign In**
5. **Expected:** Successfully logged in, redirected to `/dashboard`

### Verify in Supabase

**Check Auth Logs:**
1. Navigate to **Logs > Auth Logs** in Supabase Dashboard
2. Look for recent authentication attempts
3. Check for:
   - ✅ Successful signups (with `.edu` emails)
   - ❌ Rejected attempts with error: `unauthorized_email_domain`

**Check Auth Hook Execution:**
1. Navigate to **Authentication > Hooks**
2. Verify `before-user-created` hook shows as **Enabled**
3. Check recent executions in logs

---

## Troubleshooting

### Error: "Only .edu email addresses are allowed to sign up"

**Cause:** User attempting signup with non-.edu email

**Solution:** This is expected behavior. Only `.edu` email addresses are allowed. Use a valid educational email address.

### Hook Not Executing

**Cause:** Hook not properly configured or permissions missing

**Solution:**
1. Verify SQL migration ran successfully
2. Check function exists:
   ```sql
   SELECT * FROM pg_proc WHERE proname = 'hook_restrict_signup_to_edu';
   ```
3. Verify permissions:
   ```sql
   SELECT
     routine_name,
     grantee,
     privilege_type
   FROM information_schema.routine_privileges
   WHERE routine_name = 'hook_restrict_signup_to_edu';
   ```
4. Re-configure hook in Authentication > Hooks

### Users with Non-.edu Emails Still Being Created

**Cause:** Hook not enabled or configured incorrectly

**Solution:**
1. Check Authentication > Hooks shows "before-user-created" as **Enabled**
2. Verify correct function selected: `hook_restrict_signup_to_edu`
3. Test by attempting signup - check Auth Logs for hook execution
4. If hook still not working, try disabling and re-enabling it

---

## How the Validation Works

### SQL Function Logic

```sql
-- Extracts email from event payload
user_email := event->'user'->>'email';

-- Extracts domain (everything after @)
email_domain := lower(split_part(user_email, '@', 2));

-- Validates .edu suffix
IF email_domain NOT LIKE '%.edu' THEN
  RAISE EXCEPTION 'unauthorized_email_domain'
    USING HINT = 'Only .edu email addresses are allowed to sign up';
END IF;
```

### When Hook Triggers

The `before-user-created` hook executes:
- Before email/password signup (`supabase.auth.signUp()`)
- Before OAuth signup (if you add Google, GitHub, etc. later)
- Before magic link authentication
- Before phone authentication

### What Happens on Failure

1. User submits signup form
2. Frontend calls `supabase.auth.signUp({ email, password })`
3. Supabase Auth triggers `before-user-created` hook
4. Hook executes `hook_restrict_signup_to_edu` function
5. Function checks if `email_domain LIKE '%.edu'`
6. If **NO**: Exception raised, error returned to frontend, NO user created
7. If **YES**: Validation passes, user creation proceeds

---

## Security Considerations

### Server-Side Enforcement

✅ **Cannot be bypassed** via client-side manipulation
✅ **Centralized** in one PostgreSQL function
✅ **Applies to all** authentication methods
✅ **Database-level** validation

### Best Practices

- Never rely on client-side email validation alone
- Keep the PostgreSQL function simple and focused
- Monitor Auth Logs for suspicious signup attempts
- Consider rate limiting for additional protection (Supabase has built-in rate limiting)

---

## Advanced Configuration

### Option: Allowlist Table for Multiple Domains

If you need to support multiple educational domains (not just `.edu`), you can use the enhanced version in the SQL migration file:

**Uncomment the "allowlist table" section in the migration:**

```sql
CREATE TABLE public.allowed_email_domains (
  id serial PRIMARY KEY,
  domain text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

**Then add approved domains:**

```sql
-- Allow .edu domains
INSERT INTO public.allowed_email_domains (domain, description)
VALUES ('.edu', 'US educational institutions');

-- Allow UK universities
INSERT INTO public.allowed_email_domains (domain, description)
VALUES ('.ac.uk', 'UK universities');

-- Allow specific institution
INSERT INTO public.allowed_email_domains (domain, description)
VALUES ('university.edu', 'Specific university');
```

**Update the hook to use the allowlist function:**
1. Navigate to Authentication > Hooks
2. Change function from `hook_restrict_signup_to_edu` to `hook_restrict_signup_by_domain`
3. Save

---

## Production Checklist

Before deploying to production:

- [ ] SQL migration executed successfully in production Supabase project
- [ ] Auth Hook configured and enabled
- [ ] Environment variables set in production
- [ ] Tested signup with both `.edu` and non-`.edu` emails
- [ ] Verified Auth Logs show hook execution
- [ ] Confirmed no users created without `.edu` emails
- [ ] Review error handling in frontend
- [ ] Consider email verification flow (Supabase setting)

---

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)
- [PostgreSQL Functions](https://www.postgresql.org/docs/current/sql-createfunction.html)

---

## Support

If you encounter issues:

1. Check Supabase Auth Logs for detailed error messages
2. Verify all setup steps were completed
3. Review the SQL function code in `supabase/migrations/20250511_restrict_edu_signups.sql`
4. Test with different email formats

For persistent issues, consult the Supabase Discord or GitHub discussions.
