-- Migration: Restrict signups to .edu email addresses only
-- This creates a PostgreSQL function that validates email domains during user creation
-- and sets it up as a Supabase Auth Hook

-- Step 1: Create the validation function
CREATE OR REPLACE FUNCTION public.hook_restrict_signup_to_edu(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  user_email text;
  email_domain text;
BEGIN
  -- Extract email from the event payload
  user_email := event->'user'->>'email';

  -- Extract domain (everything after @)
  email_domain := lower(split_part(user_email, '@', 2));

  -- Check if domain ends with .edu
  IF email_domain NOT LIKE '%.edu' THEN
    RAISE EXCEPTION 'unauthorized_email_domain'
      USING HINT = 'Only .edu email addresses are allowed to sign up';
  END IF;

  -- Allow signup to proceed
  RETURN event;
END;
$$;

-- Step 2: Grant execute permission to supabase_auth_admin
-- This is required for the hook to work with Supabase Auth
GRANT EXECUTE ON FUNCTION public.hook_restrict_signup_to_edu(jsonb)
TO supabase_auth_admin;

-- Step 3: Revoke from other roles for security
REVOKE EXECUTE ON FUNCTION public.hook_restrict_signup_to_edu(jsonb)
FROM authenticated, anon, public;

-- Step 4: Add helpful comment
COMMENT ON FUNCTION public.hook_restrict_signup_to_edu IS
'Auth hook that restricts user signups to .edu email addresses only. Configure this as a "Before User Created" hook in the Supabase Dashboard.';

-- Optional: Create table for managing allowed domains (if you need more flexibility)
-- Uncomment the following if you want to manage allowed domains via a database table

/*
CREATE TABLE IF NOT EXISTS public.allowed_email_domains (
  id serial PRIMARY KEY,
  domain text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Insert .edu as the base requirement
INSERT INTO public.allowed_email_domains (domain, description)
VALUES ('.edu', 'Educational institutions')
ON CONFLICT (domain) DO NOTHING;

-- Enhanced function using allowlist table
CREATE OR REPLACE FUNCTION public.hook_restrict_signup_by_domain(event jsonb)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  user_email text;
  email_domain text;
  is_allowed boolean;
BEGIN
  user_email := event->'user'->>'email';
  email_domain := lower(split_part(user_email, '@', 2));

  -- Check if domain matches any allowed domain pattern
  SELECT EXISTS (
    SELECT 1
    FROM public.allowed_email_domains
    WHERE email_domain LIKE '%' || domain
  ) INTO is_allowed;

  IF NOT is_allowed THEN
    RAISE EXCEPTION 'unauthorized_email_domain'
      USING HINT = 'Only approved educational email addresses are allowed';
  END IF;

  RETURN event;
END;
$$;

-- Grant permissions for the enhanced function
GRANT EXECUTE ON FUNCTION public.hook_restrict_signup_by_domain(jsonb)
TO supabase_auth_admin;

REVOKE EXECUTE ON FUNCTION public.hook_restrict_signup_by_domain(jsonb)
FROM authenticated, anon, public;
*/
