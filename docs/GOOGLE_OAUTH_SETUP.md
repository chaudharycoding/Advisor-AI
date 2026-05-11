# Google OAuth Setup Guide

This guide walks you through setting up Google OAuth authentication with .edu email restriction for AdvisorAI.

## Overview

The authentication system uses:
- **Supabase** for authentication backend
- **Google OAuth** for sign-in
- **PostgreSQL Function** to restrict signups to `.edu` email addresses only

## Prerequisites

- Supabase project created at [app.supabase.com](https://app.supabase.com)
- Google Cloud Console account at [console.cloud.google.com](https://console.cloud.google.com)
- Your Supabase project URL and anon key

## Part 1: Google Cloud Console Setup

### Step 1: Create OAuth 2.0 Client

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services > Credentials**
4. Click **Create Credentials > OAuth client ID**
5. If prompted, configure the OAuth consent screen first (see Step 2)
6. Select **Application type: Web application**
7. Set **Name:** `AdvisorAI` (or your preferred name)

### Step 2: Configure OAuth Consent Screen

1. Navigate to **APIs & Services > OAuth consent screen**
2. Choose **External** (unless you have Google Workspace)
3. Fill in required fields:
   - **App name:** AdvisorAI
   - **User support email:** Your email
   - **Developer contact information:** Your email
4. Click **Save and Continue**
5. **Scopes:** Add the following scopes:
   - `openid`
   - `userinfo.email`
   - `userinfo.profile`
6. Click **Save and Continue**
7. **Test users:** (Optional) Add test emails for development
8. Click **Save and Continue**

### Step 3: Configure Authorized URIs

Back in the OAuth client configuration:

**Authorized JavaScript origins:**
- Production: `https://your-domain.com`
- Local dev: `http://localhost:5173` (Vite default port)

**Authorized redirect URIs:**

You need to get your Supabase redirect URI:
1. Go to your Supabase Dashboard
2. Navigate to **Authentication > Providers**
3. Find the Google provider section
4. Copy the **Callback URL** shown (format: `https://[PROJECT-REF].supabase.co/auth/v1/callback`)

Add these redirect URIs:
- Production: `https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback`
- Local dev (if using Supabase local): `http://127.0.0.1:54321/auth/v1/callback`

### Step 4: Save Credentials

1. Click **Create**
2. **Copy and save** your:
   - **Client ID** (starts with something like `123456789-...apps.googleusercontent.com`)
   - **Client Secret** (a long alphanumeric string)
3. Keep these secure - you'll need them for Supabase configuration

## Part 2: Supabase Configuration

### Step 1: Enable Google Provider

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication > Providers**
4. Find **Google** in the provider list
5. Toggle **Enable Google Provider** to ON
6. Paste your **Client ID** from Google Cloud Console
7. Paste your **Client Secret** from Google Cloud Console
8. Click **Save**

### Step 2: Run SQL Migration for .edu Restriction

1. Navigate to **SQL Editor** in Supabase Dashboard
2. Click **New query**
3. Copy and paste the contents of `supabase/migrations/20250511_restrict_edu_signups.sql`
4. Click **Run** to execute the migration
5. Verify success message appears

This creates a PostgreSQL function that validates email domains during signup.

### Step 3: Configure Auth Hook

1. Navigate to **Authentication > Hooks**
2. Find **before-user-created** hook type
3. Click **Enable Hook**
4. Select **Hook Type:** Postgres Function
5. Select **Schema:** public
6. Select **Function:** hook_restrict_signup_to_edu
7. Click **Save**

The hook will now run before every user creation (Google OAuth, email/password, etc.) and block non-.edu emails.

## Part 3: Environment Setup

### Step 1: Configure Environment Variables

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

**Note:** Google OAuth credentials are stored in Supabase Dashboard only - they don't go in your `.env` file.

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start Development Server

```bash
npm run dev
```

## Part 4: Testing

### Test Case 1: Valid .edu Email

1. Navigate to `http://localhost:5173/login`
2. Click **"Sign in with Google"**
3. Choose a Google account with a `.edu` email (e.g., `student@university.edu`)
4. Grant permissions
5. **Expected:** Successfully redirected to `/dashboard` with authenticated session

### Test Case 2: Non-.edu Email

1. Navigate to `http://localhost:5173/login`
2. Click **"Sign in with Google"**
3. Choose a Google account without a `.edu` email (e.g., `user@gmail.com`)
4. Grant permissions
5. **Expected:** Error message displayed: "Only .edu email addresses are allowed to sign up"
6. **Verify:** No user created in Supabase (check Authentication > Users)

### Test Case 3: Email/Password with .edu

If you're keeping email/password authentication:

1. Navigate to `http://localhost:5173/signup`
2. Enter an email with `.edu` domain
3. Enter password
4. **Expected:** Account created successfully

### Test Case 4: Email/Password without .edu

1. Navigate to `http://localhost:5173/signup`
2. Enter an email without `.edu` domain (e.g., `user@gmail.com`)
3. Enter password
4. **Expected:** Error message: "Only .edu email addresses are allowed to sign up"

### Verify in Supabase Logs

1. Navigate to **Logs > Auth Logs** in Supabase Dashboard
2. Look for recent authentication attempts
3. Check for:
   - Successful logins (with .edu emails)
   - Rejected attempts (with error: `unauthorized_email_domain`)

## Troubleshooting

### Error: "Invalid Client ID"

**Cause:** Google Client ID not configured correctly in Supabase

**Solution:**
1. Verify Client ID is copied correctly from Google Cloud Console
2. Check for extra spaces or missing characters
3. Re-save in Supabase Dashboard > Authentication > Providers

### Error: "Redirect URI Mismatch"

**Cause:** Redirect URI not added to Google Cloud Console

**Solution:**
1. Get the exact callback URL from Supabase Dashboard
2. Add it to **Authorized redirect URIs** in Google Cloud Console
3. Wait a few minutes for changes to propagate

### Error: "Access Blocked: Authorization Error"

**Cause:** OAuth consent screen not configured

**Solution:**
1. Complete OAuth consent screen configuration in Google Cloud Console
2. Add required scopes (openid, userinfo.email, userinfo.profile)
3. Verify app is not in "Testing" mode if you need public access

### Hook Not Executing

**Cause:** Hook not properly configured or permissions missing

**Solution:**
1. Verify SQL migration ran successfully
2. Check function exists: Run `SELECT * FROM pg_proc WHERE proname = 'hook_restrict_signup_to_edu';`
3. Verify permissions: `\dp public.hook_restrict_signup_to_edu` in SQL Editor
4. Re-configure hook in Authentication > Hooks

### Users with Non-.edu Emails Still Being Created

**Cause:** Hook not enabled or configured incorrectly

**Solution:**
1. Check Authentication > Hooks shows "before-user-created" as enabled
2. Verify correct function selected (hook_restrict_signup_to_edu)
3. Test by attempting signup - check Auth Logs for hook execution

## Security Considerations

### Server-Side Validation

The `.edu` restriction is enforced **server-side** via Supabase Auth Hooks:
- Cannot be bypassed via client-side manipulation
- Applies to ALL authentication methods (Google OAuth, email/password, future providers)
- Centralized in one place (PostgreSQL function)

### Credential Security

- Never commit `.env` file to version control
- Keep Google Client Secret secure
- Rotate secrets if compromised
- Use different OAuth clients for dev/staging/production

### Production Checklist

Before deploying to production:

- [ ] Update authorized JavaScript origins to production domain
- [ ] Update authorized redirect URIs to production domain
- [ ] Set OAuth consent screen to "Production" (not "Testing")
- [ ] Enable HTTPS (required for OAuth)
- [ ] Review and test error handling
- [ ] Monitor Supabase Auth Logs for suspicious activity
- [ ] Consider rate limiting (Supabase has built-in protection)

## Advanced Configuration

### Option: Allowlist Table for Multiple Domains

If you need to support multiple educational domains (not just `.edu`), uncomment the enhanced version in the SQL migration:

```sql
-- Allows you to manage approved domains via database
CREATE TABLE public.allowed_email_domains (...)
```

Then you can add approved domains:

```sql
INSERT INTO public.allowed_email_domains (domain, description)
VALUES ('.ac.uk', 'UK universities');
```

### Option: Custom Error Messages

Modify the `RAISE EXCEPTION` message in the hook function to customize the user-facing error:

```sql
RAISE EXCEPTION 'custom_error_code'
  USING HINT = 'Your custom message here';
```

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth Hooks](https://supabase.com/docs/guides/auth/auth-hooks)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [React Router Documentation](https://reactrouter.com)

## Support

If you encounter issues:

1. Check Supabase Auth Logs for detailed error messages
2. Verify all configuration steps were completed
3. Review Google Cloud Console for OAuth errors
4. Check browser console for client-side errors

For persistent issues, consult the Supabase Discord or GitHub discussions.
