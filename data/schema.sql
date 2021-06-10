--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: app_private; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_private;


--
-- Name: app_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app_public;


--
-- Name: network; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA network;


--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: sn_expiration_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_expiration_type AS ENUM (
    'FOREVER',
    'YEARS',
    'MONTHS',
    'DAYS',
    'MINUTES',
    'SECONDS'
);


--
-- Name: TYPE sn_expiration_type; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_expiration_type IS 'This is manually synced from the Anagolay Network. Same as SnExpirationType';


--
-- Name: sn_expiration; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_expiration AS (
	expirationtype app_public.sn_expiration_type,
	value character varying(255)
);


--
-- Name: TYPE sn_expiration; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_expiration IS 'This is manually synced from the Anagolay Network. Same as SnExpiration';


--
-- Name: COLUMN sn_expiration.value; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_expiration.value IS 'How long is the expiration, if  ExpirationType::FOREVER then this is null';


--
-- Name: sn_proportion; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_proportion AS (
	sign character varying(255),
	name character varying(255),
	value character varying(255)
);


--
-- Name: TYPE sn_proportion; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_proportion IS 'This is manually synced from the Anagolay Network. Same as SnProportion. User must maintain this correlation';


--
-- Name: COLUMN sn_proportion.sign; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_proportion.sign IS 'Sign representation of the name, Example: for `percentage` this is `%`';


--
-- Name: COLUMN sn_proportion.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_proportion.name IS 'Name of the proportion. Example: `percentage`';


--
-- Name: COLUMN sn_proportion.value; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_proportion.value IS 'The value of the proportion';


--
-- Name: sn_sensio_claim_type; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_sensio_claim_type AS ENUM (
    'copyright',
    'ownership'
);


--
-- Name: TYPE sn_sensio_claim_type; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_sensio_claim_type IS 'This is manually synced from the Anagolay Network. Same as SnSensioClaimType';


--
-- Name: sn_validity; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_validity AS (
	fromwhen timestamp with time zone,
	until timestamp with time zone
);


--
-- Name: TYPE sn_validity; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_validity IS 'This is manually synced from the Anagolay Network. Same as SnValidity';


--
-- Name: COLUMN sn_validity.fromwhen; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_validity.fromwhen IS 'When the validity starts, this should be DATE_TIME. Originally it is from but in the sql that is reserved word, thus fromWhen';


--
-- Name: COLUMN sn_validity.until; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_validity.until IS 'When validity ends, this is calculate Validity.fromWhen + Expiration.value';


--
-- Name: an_claim; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.an_claim AS (
	prev_id character varying(255),
	poe_id character varying(255),
	rule_id character varying(255),
	proportion app_public.sn_proportion,
	subject_id character varying(255),
	holder character varying(255),
	issuer character varying(255),
	claim_type app_public.sn_sensio_claim_type,
	valid app_public.sn_validity,
	expiration app_public.sn_expiration,
	on_expiration character varying(255)
);


--
-- Name: TYPE an_claim; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.an_claim IS 'This is manually synced from the Anagolay Network. Same as SnSensioClaim. All the records are obtainable on the Anagolay Network [DOCS](https://anagolay.dev/network/protocol/statement.html)';


--
-- Name: COLUMN an_claim.prev_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.prev_id IS 'Prev Sensio Statement id in case this statement is revoked or changed';


--
-- Name: COLUMN an_claim.poe_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.poe_id IS 'PoE id of the record in question';


--
-- Name: COLUMN an_claim.rule_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.rule_id IS 'Implemented rule ID, [DOCS](https://anagolay.dev/network/protocol/rule.html)';


--
-- Name: COLUMN an_claim.proportion; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.proportion IS 'In which proportion the statement is held';


--
-- Name: COLUMN an_claim.subject_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.subject_id IS 'ATM this is the same as poeId @TODO this should be unique representation of the subject that is NOT poe';


--
-- Name: COLUMN an_claim.holder; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.holder IS 'ATM this is the did representation of the substrate based account in format `did:substrate:5EJA1oSrTx7xYMBerrUHLNktA3P89YHJBeTrevotTQab6gEY/anagolay-network`, @NOTE this is part of the SENSIO ID which will come later this year';


--
-- Name: COLUMN an_claim.issuer; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.issuer IS 'ATM this is the did representation of the substrate based account in format `did:substrate:Hcd78R7frJfUZHsqgpPEBLeiCZxV29uyyyURaPxB71ojNjy/anagolay-network`, @NOTE this is part of the SENSIO ID which will come later this year';


--
-- Name: COLUMN an_claim.claim_type; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.claim_type IS 'Which claim type this is';


--
-- Name: COLUMN an_claim.valid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.valid IS 'How long this statement is valid';


--
-- Name: COLUMN an_claim.expiration; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.expiration IS 'Setting when the statement should end';


--
-- Name: COLUMN an_claim.on_expiration; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.an_claim.on_expiration IS 'What happens after the expiration? this is default rule or smart contract that automatically does stuff, like move it to the public domain, transfer to relatives etc... need better definition';


--
-- Name: devicetype; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.devicetype AS ENUM (
    'CAMERA',
    'LENS',
    'SMARTPHONE',
    'LAPTOP'
);


--
-- Name: TYPE devicetype; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.devicetype IS 'Physical device that is used to the ownership statement creation.';


--
-- Name: key_value; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.key_value AS (
	k character varying(255),
	v character varying(255)
);


--
-- Name: TYPE key_value; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.key_value IS 'Key-Value Object style type';


--
-- Name: sn_proof; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_proof AS (
	pallet character varying(255),
	id character varying(255)
);


--
-- Name: TYPE sn_proof; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_proof IS 'Key-Value Object style type';


--
-- Name: sn_signature; Type: TYPE; Schema: app_public; Owner: -
--

CREATE TYPE app_public.sn_signature AS (
	sig_key character varying(255),
	sig character varying(255),
	cid character varying(255)
);


--
-- Name: TYPE sn_signature; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TYPE app_public.sn_signature IS 'Sensio Signature structure [DOCS](https://anagolay.dev/network/protocol/statement.html)';


--
-- Name: COLUMN sn_signature.sig_key; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_signature.sig_key IS 'Signing key in urn/did format urn:pgp:PGP_KEY_FINGERPRINT';


--
-- Name: COLUMN sn_signature.sig; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_signature.sig IS 'Output of the signing function where user signs the prepared statement with their PGP provate key ( pvt of the sig_key) then multibase encoded to `base32`';


--
-- Name: COLUMN sn_signature.cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.sn_signature.cid IS 'Content identifier of the sig field -- snCid(sig)';


--
-- Name: current_user_id(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.current_user_id() RETURNS integer
    LANGUAGE plpgsql STABLE SECURITY DEFINER
    SET search_path TO '$user', 'public'
    AS $$
DECLARE
  userId int;
BEGIN
  SELECT
    u.id INTO userId
  FROM
    app_public.users AS u
    INNER JOIN app_public.user_authentications AS au ON au.user_id = u.id
  WHERE
    au.service = current_setting('jwt.claims.identity.name', TRUE)::text
    AND au.identifier = current_setting('jwt.claims.identity.identifier', TRUE)::text
  LIMIT 1;
  RETURN userId;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: crypto_keys; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.crypto_keys (
    id integer NOT NULL,
    cid text NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    is_primary boolean DEFAULT false NOT NULL,
    private_key text NOT NULL,
    public_key text NOT NULL,
    fingerprint text NOT NULL,
    key_id text NOT NULL,
    implementation text DEFAULT 'pgp'::text NOT NULL,
    algorithm text,
    curve text,
    creation_time timestamp with time zone NOT NULL,
    expiration_time timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying,
    slug character varying
);


--
-- Name: TABLE crypto_keys; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.crypto_keys IS '@omit delete, update, insert
Users crypto keys. This type is contextual for a incoming JWT.';


--
-- Name: COLUMN crypto_keys.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.id IS '@omit create,update,delete';


--
-- Name: COLUMN crypto_keys.cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.cid IS 'content address identifier @anagolay/op-an-cid';


--
-- Name: COLUMN crypto_keys.is_primary; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.is_primary IS 'primary key to be used for the operations';


--
-- Name: COLUMN crypto_keys.private_key; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.private_key IS 'Multibase encoded armored key';


--
-- Name: COLUMN crypto_keys.public_key; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.public_key IS 'Multibase encoded armored key';


--
-- Name: COLUMN crypto_keys.fingerprint; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.fingerprint IS 'unique key indentifier. more info -> https://tools.ietf.org/html/rfc4880#section-12.2
hex encoding';


--
-- Name: COLUMN crypto_keys.key_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.key_id IS 'A Key ID is an eight-octet scalar that identifies a key. more info -> https://tools.ietf.org/html/rfc4880#section-3.3
hex encoded';


--
-- Name: COLUMN crypto_keys.implementation; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.implementation IS 'options are p3skb, pgp';


--
-- Name: COLUMN crypto_keys.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.name IS 'User firendly KEY name. Example: `My main key` ';


--
-- Name: COLUMN crypto_keys.slug; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.crypto_keys.slug IS 'Slug of the key name.';


--
-- Name: insert_crypto_key(text, integer, boolean, text, text, text, text, text, text, text, timestamp with time zone, timestamp with time zone, text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text) RETURNS app_public.crypto_keys
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO '$user', 'public'
    AS $$
DECLARE
  v_key app_public.crypto_keys;
BEGIN
  -- 1. check if the user has this fingerprint or not
  SELECT
    c.* INTO v_key
  FROM
    app_public.crypto_keys AS c
  WHERE
    user_id = i_user_id
    AND c.fingerprint = i_fingerprint
  LIMIT 1;
  -- 2. check does the fingerprint exists
  IF v_key.fingerprint IS NOT NULL THEN
    RETURN v_key;
  END IF;
  -- 3. insert the key
  INSERT INTO app_public.crypto_keys (cid, user_id, is_primary, private_key, public_key, fingerprint, key_id, implementation, algorithm, curve, creation_time, expiration_time)
    VALUES (i_cid, i_user_id, i_is_primary, i_private_key, i_public_key, i_fingerprint, i_key_id, i_implementation, i_algorithm, i_curve, i_creation_time, i_expiration_time)
  RETURNING
    * INTO v_key;
  IF i_passphrase IS NOT NULL THEN
    -- insert the crypto key secret
    INSERT INTO app_private.crypto_key_secrets (crypto_key_id, passphrase, revocation_certificate, user_id)
      VALUES (v_key.id, i_passphrase, i_revocation_certificate, v_key.user_id);
  END IF;
  RETURN v_key;
END
$$;


--
-- Name: FUNCTION insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text) IS 'inserts the generated cryptographic key and links it with the user';


--
-- Name: users; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.users (
    id integer NOT NULL,
    username public.citext NOT NULL,
    given_name text,
    family_name text,
    nickname text,
    name text,
    avatar_url text,
    is_admin boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT users_avatar_url_check CHECK ((avatar_url ~ '^https?://[^/]+'::text)),
    CONSTRAINT users_username_check CHECK (((length((username)::text) >= 2) AND (length((username)::text) <= 24) AND (username OPERATOR(public.~) '^[a-zA-Z]([a-zA-Z0-9][_]?)+$'::public.citext)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.users IS '@omit all
A user who can log in to the application.';


--
-- Name: COLUMN users.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.id IS '@omit create,update,delete';


--
-- Name: COLUMN users.username; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.username IS 'Public-facing username (or ''handle'') of the user.';


--
-- Name: COLUMN users.given_name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.given_name IS 'Given or first name';


--
-- Name: COLUMN users.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.name IS 'Public-facing name (or pseudonym) of the user.';


--
-- Name: COLUMN users.avatar_url; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.avatar_url IS 'Optional avatar URL.';


--
-- Name: COLUMN users.is_admin; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.users.is_admin IS 'If true, the user has elevated privileges.';


--
-- Name: link_or_register_user(integer, character varying, character varying, json, json, boolean); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean DEFAULT false) RETURNS app_public.users
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
DECLARE
  v_matched_user_id int;
  v_matched_authentication_id int;
  v_email citext;
  v_name text;
  v_avatar_url text;
  v_user app_public.users;
  v_user_email app_public.user_emails;
BEGIN
  -- See if a user account already matches these details
  SELECT
    id,
    user_id INTO v_matched_authentication_id,
    v_matched_user_id
  FROM
    app_public.user_authentications
  WHERE
    service = f_service
    AND identifier = f_identifier
  LIMIT 1;
  IF v_matched_user_id IS NOT NULL AND f_user_id IS NOT NULL AND v_matched_user_id != f_user_id THEN
    RAISE EXCEPTION 'A different user already has this account linked.'
      USING errcode = 'TAKEN';
    END IF;
    v_email = f_profile ->> 'email';
    v_name = f_profile ->> 'name';
    v_avatar_url = f_profile ->> 'avatar_url';
    -- user is not found
    IF v_matched_authentication_id IS NULL THEN
      IF f_user_id IS NOT NULL THEN
        -- Link new account to logged in user account
        INSERT INTO app_public.user_authentications (user_id, service, identifier, details)
          VALUES (f_user_id, f_service, f_identifier, f_profile)
        RETURNING
          id, user_id INTO v_matched_authentication_id, v_matched_user_id;
        INSERT INTO app_private.user_authentication_secrets (user_authentication_id, details)
          VALUES (v_matched_authentication_id, f_auth_details);
      elsif v_email IS NOT NULL THEN
        -- See if the email is registered
        SELECT
          * INTO v_user_email
        FROM
          app_public.user_emails
        WHERE
          email = v_email
          AND is_verified IS TRUE;
        IF NOT (v_user_email IS NULL) THEN
          -- User exists!
          INSERT INTO app_public.user_authentications (user_id, service, identifier, details)
            VALUES (v_user_email.user_id, f_service, f_identifier, f_profile)
          RETURNING
            id, user_id INTO v_matched_authentication_id, v_matched_user_id;
          INSERT INTO app_private.user_authentication_secrets (user_authentication_id, details)
            VALUES (v_matched_authentication_id, f_auth_details);
        END IF;
      END IF;
    END IF;
    IF v_matched_user_id IS NULL AND f_user_id IS NULL AND v_matched_authentication_id IS NULL THEN
      -- Create and return a new user account
      RETURN app_private.register_user (f_service, f_identifier, f_profile, f_auth_details, f_is_email_verified);
    ELSE
      IF v_matched_authentication_id IS NOT NULL THEN
        UPDATE
          app_public.user_authentications
        SET
          details = f_profile
        WHERE
          id = v_matched_authentication_id;
        UPDATE
          app_private.user_authentication_secrets
        SET
          details = f_auth_details
        WHERE
          user_authentication_id = v_matched_authentication_id;
        UPDATE
          app_public.users
        SET
          name = coalesce(users.name, v_name),
          avatar_url = coalesce(users.avatar_url, v_avatar_url)
        WHERE
          id = v_matched_user_id
        RETURNING
          * INTO v_user;
        RETURN v_user;
      ELSE
        -- v_matched_authentication_id is null
        -- -> v_matched_user_id is null (they're paired)
        -- -> f_user_id is not null (because the if clause above)
        -- -> v_matched_authentication_id is not null (because of the separate if block above creating a user_authentications)
        -- -> contradiction.
        RAISE EXCEPTION 'This should not occur';
      END IF;
    END IF;
END;
$$;


--
-- Name: FUNCTION link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean) IS 'If you''re logged in, this will link an additional OAuth login to your account if necessary. If you''re logged out it may find if an account already exists (based on OAuth details or email address) and return that, or create a new user account if necessary.';


--
-- Name: really_create_user(text, text, boolean, text, text); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text) RETURNS app_public.users
    LANGUAGE plpgsql
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
DECLARE
  v_user app_public.users;
  v_username text = username;
BEGIN
  -- Sanitise the username, and make it unique if necessary.
  IF v_username IS NULL THEN
    v_username = coalesce(name, 'user');
  END IF;
  v_username = regexp_replace(v_username, '^[^a-z]+', '', 'gmi');
  v_username = regexp_replace(v_username, '[^a-z0-9]+', '_', 'gmi');
  IF v_username IS NULL OR length(v_username) < 3 THEN
    v_username = 'change_me_😁';
  END IF;
  SELECT
    (
      CASE WHEN i = 0 THEN
        v_username
      ELSE
        v_username || i::text
      END) INTO v_username
  FROM
    generate_series(0, 1000) i
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      app_public.users
    WHERE
      users.username = (
        CASE WHEN i = 0 THEN
          v_username
        ELSE
          v_username || i::text
        END))
LIMIT 1;
  -- Insert the new user
  INSERT INTO app_public.users (username, name, avatar_url)
    VALUES (v_username, name, avatar_url)
  RETURNING
    * INTO v_user;
  -- Add the user's email
  IF email IS NOT NULL THEN
    INSERT INTO app_public.user_emails (user_id, email, is_verified, is_primary)
      VALUES (v_user.id, email, email_is_verified, TRUE);
  END IF;
  RETURN v_user;
END;
$$;


--
-- Name: FUNCTION really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text) IS 'Creates a user account. All arguments are optional, it trusts the calling method to perform sanitisation.';


--
-- Name: register_user(character varying, character varying, json, json, boolean); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean DEFAULT false) RETURNS app_public.users
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO '$user', 'public'
    AS $$
DECLARE
  v_user app_public.users;
  v_email citext;
  v_name text;
  v_username text;
  v_avatar_url text;
  v_user_authentication_id int;
BEGIN
  -- Extract data from the user’s OAuth profile data.
  v_email := f_profile ->> 'email';
  v_name := f_profile ->> 'name';
  v_username := f_profile ->> 'username';
  v_avatar_url := f_profile ->> 'avatar_url';
  -- Create the user account
  v_user = app_private.really_create_user (username => v_username, email => v_email, email_is_verified => f_email_is_verified, name => v_name, avatar_url => v_avatar_url);
  -- Insert the user’s private account data (e.g. OAuth tokens)
  INSERT INTO app_public.user_authentications (user_id, service, identifier, details)
    VALUES (v_user.id, f_service, f_identifier, f_profile)
    -- this might be encrypted with users pgp key
  RETURNING
    id INTO v_user_authentication_id;
  INSERT INTO app_private.user_authentication_secrets (user_authentication_id, details)
    VALUES (v_user_authentication_id, f_auth_details);
  RETURN v_user;
END;
$$;


--
-- Name: FUNCTION register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) IS 'Used to register a user from information gleaned from OAuth. Primarily used by link_or_register_user';


--
-- Name: tg__timestamps(); Type: FUNCTION; Schema: app_private; Owner: -
--

CREATE FUNCTION app_private.tg__timestamps() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
BEGIN
  NEW.created_at = (
    CASE WHEN TG_OP = 'INSERT' THEN
      now()
    ELSE
      OLD.created_at
    END);
  NEW.updated_at = (
    CASE WHEN TG_OP = 'UPDATE'
      AND OLD.updated_at >= now() THEN
      OLD.updated_at + interval '1 millisecond'
    ELSE
      now()
    END);
  RETURN NEW;
END;
$$;


--
-- Name: FUNCTION tg__timestamps(); Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON FUNCTION app_private.tg__timestamps() IS 'This trigger should be called on all tables with created_at, updated_at - it ensures that they cannot be manipulated and that updated_at will always be larger than the previous updated_at.';


--
-- Name: current_user(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public."current_user"() RETURNS app_public.users
    LANGUAGE sql STABLE
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
  SELECT
    users.*
  FROM
    app_public.users
  WHERE
    id = app_public.current_user_id ();

$$;


--
-- Name: FUNCTION "current_user"(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public."current_user"() IS 'The currently logged in user (or null if not logged in).';


--
-- Name: media; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.media (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    master_media_id integer,
    title character varying(255) DEFAULT NULL::character varying,
    headline text DEFAULT NULL::character varying,
    caption text DEFAULT NULL::character varying,
    aperture character varying(255) DEFAULT NULL::character varying,
    focal_length character varying(255) DEFAULT NULL::character varying,
    shutter_speed character varying(255) DEFAULT NULL::character varying,
    did_flash_fired boolean,
    exposure_time character varying(255) DEFAULT NULL::character varying,
    exposure_bias character varying(255) DEFAULT NULL::character varying,
    exposure_program character varying(255) DEFAULT NULL::character varying,
    metering_mode character varying(255) DEFAULT NULL::character varying,
    iso_speed_rating double precision,
    is_virtual_copy boolean DEFAULT false,
    is_private boolean DEFAULT true,
    gps jsonb DEFAULT '{}'::jsonb,
    is_video boolean DEFAULT false,
    duration_in_seconds integer DEFAULT 0,
    date_created timestamp with time zone,
    date_digitalized timestamp with time zone DEFAULT now(),
    creator character varying(255) DEFAULT NULL::character varying,
    phash character varying(255),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    slug character varying,
    keywords jsonb DEFAULT '{}'::jsonb NOT NULL,
    poe_id character varying
);


--
-- Name: TABLE media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.media IS 'All media, photos, videos and other';


--
-- Name: COLUMN media.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.id IS '@omit create,update,delete';


--
-- Name: COLUMN media.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.user_id IS '@omit';


--
-- Name: COLUMN media.master_media_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.master_media_id IS 'If the photo is a virtual copy then this is the master photo relation.';


--
-- Name: COLUMN media.title; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.title IS 'A shorthand reference for the digital image. Title provides a short human readable name which can be a text and/or numeric reference. It is not the same as Headline. Enter a short verbal and human readable name for the image, this may be the file name. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#title';


--
-- Name: COLUMN media.headline; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.headline IS 'A brief synopsis of the caption. Headline is not the same as Title. Enter a brief publishable synopsis or summary of the contents of the image';


--
-- Name: COLUMN media.caption; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.caption IS 'A textual description, including captions, of the image. https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#description';


--
-- Name: COLUMN media.exposure_time; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.exposure_time IS '`Exif.Image.ExposureTime` Exposure time, given in seconds. [Tags](https://www.exiv2.org/tags.html)';


--
-- Name: COLUMN media.duration_in_seconds; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.duration_in_seconds IS 'video duration in seconds';


--
-- Name: COLUMN media.date_created; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.date_created IS 'this maps to exif:dateTimeOriginal and xmp:DateCreated';


--
-- Name: COLUMN media.creator; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.creator IS 'Self Soverign Identity or URI. In case of the URI it needs to be properly formatted according to https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1';


--
-- Name: COLUMN media.phash; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.phash IS 'perceptual hash @anagolay/op-an-perceptual-hash  npm package';


--
-- Name: COLUMN media.slug; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.slug IS 'slug of the title';


--
-- Name: COLUMN media.keywords; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.keywords IS 'Editable Media keywords.';


--
-- Name: COLUMN media.poe_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.media.poe_id IS 'Anagolay Network  Proof of Existence ID';


--
-- Name: media_ready_for_copyright(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.media_ready_for_copyright() RETURNS SETOF app_public.media
    LANGUAGE sql STABLE
    SET search_path TO 
    AS $$
  SELECT
    m
  FROM
    app_public.media m
    JOIN app_public._media_device md ON md.media_id = m.id
    JOIN app_public.device d ON d.id = md.device_id
    JOIN app_public.users u ON u.id = m.user_id
    LEFT JOIN network.copyright c ON c.media_id = m.id
  WHERE
    d.ownership_verified IS TRUE
    AND c.id IS NULL
    AND u.id = app_public.current_user_id ()
  GROUP BY
    (m.id)
  ORDER BY
    m.id ASC;

$$;


--
-- Name: FUNCTION media_ready_for_copyright(); Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON FUNCTION app_public.media_ready_for_copyright() IS 'Any media that have device ownership verified will be eligible for the copyright claim.';


--
-- Name: set_slug_from_name(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.set_slug_from_name() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
BEGIN
  NEW.slug = (
    CASE WHEN TG_OP = 'INSERT' THEN
      app_public.slugify (NEW.name)
    ELSE
      app_public.slugify (NEW.name)
    END);
  RETURN NEW;
END
$$;


--
-- Name: set_slug_from_title(); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.set_slug_from_title() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'app_public', 'app_private', 'app_private', 'public'
    AS $$
BEGIN
  NEW.slug = (
    CASE WHEN TG_OP = 'INSERT' THEN
      app_public.slugify (NEW.title)
    ELSE
      app_public.slugify (NEW.title)
    END);
  RETURN NEW;
END
$$;


--
-- Name: slugify(text); Type: FUNCTION; Schema: app_public; Owner: -
--

CREATE FUNCTION app_public.slugify(value text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    SET search_path TO 'public'
    AS $_$
  -- removes accents (diacritic signs) from a given string --
  WITH "unaccented" AS (
    SELECT
      public.unaccent ("value") AS "value"
),
-- lowercases the string
"lowercase" AS (
  SELECT
    lower("value") AS "value"
  FROM
    "unaccented"
),
-- remove single and double quotes
"removed_quotes" AS (
  SELECT
    regexp_replace("value", '[''"]+', '', 'gi') AS "value"
  FROM
    "lowercase"
),
-- replaces anything that's not a letter, number, hyphen('-'), or underscore('_') with a hyphen('-')
"hyphenated" AS (
  SELECT
    regexp_replace("value", '[^a-z0-9\\-_]+', '-', 'gi') AS "value"
  FROM
    "removed_quotes"
),
-- trims hyphens('-') if they exist on the head or tail of the string
"trimmed" AS (
  SELECT
    regexp_replace(regexp_replace("value", '\-+$', ''), '^\-', '') AS "value" FROM "hyphenated"
)
    SELECT
      "value"
    FROM
      "trimmed";

$_$;


--
-- Name: crypto_key_secrets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.crypto_key_secrets (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    crypto_key_id integer NOT NULL,
    passphrase text,
    revocation_certificate text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE crypto_key_secrets; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON TABLE app_private.crypto_key_secrets IS '@omit all
Info about the keys secrets';


--
-- Name: COLUMN crypto_key_secrets.passphrase; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON COLUMN app_private.crypto_key_secrets.passphrase IS 'encrypted with kelp_owner key or never stored and asked from the user';


--
-- Name: COLUMN crypto_key_secrets.revocation_certificate; Type: COMMENT; Schema: app_private; Owner: -
--

COMMENT ON COLUMN app_private.crypto_key_secrets.revocation_certificate IS 'revocation_certificate encrypted by its key';


--
-- Name: crypto_key_secrets_id_seq; Type: SEQUENCE; Schema: app_private; Owner: -
--

CREATE SEQUENCE app_private.crypto_key_secrets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: crypto_key_secrets_id_seq; Type: SEQUENCE OWNED BY; Schema: app_private; Owner: -
--

ALTER SEQUENCE app_private.crypto_key_secrets_id_seq OWNED BY app_private.crypto_key_secrets.id;


--
-- Name: user_authentication_secrets; Type: TABLE; Schema: app_private; Owner: -
--

CREATE TABLE app_private.user_authentication_secrets (
    user_authentication_id integer NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL
);


--
-- Name: _album_lightroom_collection; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public._album_lightroom_collection (
    album_id integer NOT NULL,
    collection_id integer NOT NULL
);


--
-- Name: TABLE _album_lightroom_collection; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public._album_lightroom_collection IS '@omit create,update,delete
Mapping table for the album and Lightroom Collection. This allows us to disconnect the Album and make connections to other service providers.';


--
-- Name: COLUMN _album_lightroom_collection.album_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._album_lightroom_collection.album_id IS 'Album ID.';


--
-- Name: COLUMN _album_lightroom_collection.collection_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._album_lightroom_collection.collection_id IS 'Lightroom Collection ID.';


--
-- Name: _album_media; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public._album_media (
    album_id integer NOT NULL,
    media_id integer NOT NULL
);


--
-- Name: TABLE _album_media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public._album_media IS '@name albumMedia
Mapping table between albums and media';


--
-- Name: _lightroom_media_uniqueness; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public._lightroom_media_uniqueness (
    media_id integer NOT NULL,
    catalog_id integer NOT NULL,
    collection_id integer,
    local_identifier integer NOT NULL
);


--
-- Name: TABLE _lightroom_media_uniqueness; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public._lightroom_media_uniqueness IS '@omit create,update,delete
@name LightroomMediaUniqueness
Mapping table for the album and Lightroom Collection. This allows us to disconnect the Album and make connections to other service providers.';


--
-- Name: COLUMN _lightroom_media_uniqueness.media_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._lightroom_media_uniqueness.media_id IS '@name LrMedia
Connection to the Lightroom Media';


--
-- Name: COLUMN _lightroom_media_uniqueness.catalog_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._lightroom_media_uniqueness.catalog_id IS 'Connection to the Lightroom Catalog';


--
-- Name: COLUMN _lightroom_media_uniqueness.collection_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._lightroom_media_uniqueness.collection_id IS 'Lightroom Collection in which the media is present.';


--
-- Name: COLUMN _lightroom_media_uniqueness.local_identifier; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public._lightroom_media_uniqueness.local_identifier IS 'A unique number identifier within the Lightroom Catalog. If this media is present in the other catalog it will have different local_identifier';


--
-- Name: _media_device; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public._media_device (
    media_id integer NOT NULL,
    device_id integer NOT NULL
);


--
-- Name: TABLE _media_device; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public._media_device IS '@omit create, update, delete
@name mediaDevice
Mapping table for a media to the equipment it was taken with.';


--
-- Name: album; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.album (
    id integer NOT NULL,
    cid text NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    title character varying(255) DEFAULT NULL::character varying,
    slug character varying(255) DEFAULT NULL::character varying,
    metadata jsonb DEFAULT '{}'::jsonb NOT NULL,
    description character varying(255) DEFAULT NULL::character varying,
    is_private boolean DEFAULT true NOT NULL,
    is_smart boolean DEFAULT false NOT NULL,
    smart_rules jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE album; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.album IS 'All user albums';


--
-- Name: COLUMN album.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.id IS '@omit create,update,delete';


--
-- Name: COLUMN album.cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.cid IS 'Content address of the album TODO';


--
-- Name: COLUMN album.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.user_id IS '@omit';


--
-- Name: COLUMN album.title; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.title IS 'Album title';


--
-- Name: COLUMN album.slug; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.slug IS 'URL-friendly album slug';


--
-- Name: COLUMN album.metadata; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.metadata IS 'Album metadata';


--
-- Name: COLUMN album.description; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.description IS 'Album description';


--
-- Name: COLUMN album.is_private; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.is_private IS 'Is album visible to other users';


--
-- Name: COLUMN album.is_smart; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.is_smart IS 'If album is smart user can set specific rules on how to automatically add photos to it';


--
-- Name: COLUMN album.smart_rules; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.album.smart_rules IS 'The smart album rules';


--
-- Name: album_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.album_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: album_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.album_id_seq OWNED BY app_public.album.id;


--
-- Name: crypto_keys_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.crypto_keys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: crypto_keys_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.crypto_keys_id_seq OWNED BY app_public.crypto_keys.id;


--
-- Name: device; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.device (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    cid text NOT NULL,
    name character varying(255) DEFAULT NULL::character varying,
    maker character varying(255) DEFAULT NULL::character varying,
    model character varying(255) DEFAULT NULL::character varying,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    ownership app_public.sn_proof[],
    ownership_verified boolean DEFAULT false NOT NULL,
    ownership_created_at timestamp with time zone DEFAULT now() NOT NULL,
    identifiers jsonb DEFAULT '[]'::jsonb,
    poe_id character varying,
    device_type app_public.devicetype NOT NULL
);


--
-- Name: TABLE device; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.device IS 'The photo gear, camera, lenses, phones....';


--
-- Name: COLUMN device.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.id IS '@omit create,update,delete';


--
-- Name: COLUMN device.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.user_id IS '@omit';


--
-- Name: COLUMN device.cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.cid IS 'Content identifier of the device identifiers. Using `@anagolay/op-an-cid(identifiers)`.';


--
-- Name: COLUMN device.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.name IS 'Custom device name. Default is `My device.model`.';


--
-- Name: COLUMN device.maker; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.maker IS 'Who made the device. Example `Canon`.';


--
-- Name: COLUMN device.model; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.model IS 'What is the model of the device. Example `Canon EOS 700D`.';


--
-- Name: COLUMN device.created_at; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.created_at IS '@omit create,update,delete';


--
-- Name: COLUMN device.updated_at; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.updated_at IS '@omit create,update,delete';


--
-- Name: COLUMN device.ownership; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.ownership IS 'Information on the ownership from the Anagolay Network.';


--
-- Name: COLUMN device.ownership_verified; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.ownership_verified IS 'Anagolay Network PoCLO rule is executed and ownership is verified.';


--
-- Name: COLUMN device.ownership_created_at; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.ownership_created_at IS '@omit create, update, delete
When the PoCLO has been executed and ownership created.';


--
-- Name: COLUMN device.identifiers; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.identifiers IS 'Unique  identifiers for the device. In case of the lens, it is the `[xmp.LensID,xmp.LensSerialNumber]`.';


--
-- Name: COLUMN device.poe_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.poe_id IS 'Anagolay Network  Proof of Existence ID';


--
-- Name: COLUMN device.device_type; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.device.device_type IS 'Choose one of the custom device types.';


--
-- Name: device_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: device_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.device_id_seq OWNED BY app_public.device.id;


--
-- Name: lightroom_catalog; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.lightroom_catalog (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    name character varying(255) DEFAULT NULL::character varying,
    slug character varying(255) DEFAULT NULL::character varying,
    collections jsonb DEFAULT '{}'::jsonb NOT NULL,
    collection_sets jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE lightroom_catalog; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.lightroom_catalog IS '@omit create,update,delete
Lightroom Catalog table contains the general info on the synced catalog for the purposes of syncing back to the LR.';


--
-- Name: COLUMN lightroom_catalog.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.id IS '@omit create,update,delete';


--
-- Name: COLUMN lightroom_catalog.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.user_id IS '@omit';


--
-- Name: COLUMN lightroom_catalog.name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.name IS 'Catalog name';


--
-- Name: COLUMN lightroom_catalog.slug; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.slug IS '@omit create, update, delete';


--
-- Name: COLUMN lightroom_catalog.collections; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.collections IS 'Information on the collections with their internal IDs';


--
-- Name: COLUMN lightroom_catalog.collection_sets; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.collection_sets IS 'Information on the collection sets with their internal IDs';


--
-- Name: COLUMN lightroom_catalog.created_at; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.created_at IS 'When the record is created';


--
-- Name: COLUMN lightroom_catalog.updated_at; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_catalog.updated_at IS 'When the record is updated';


--
-- Name: lightroom_catalogs_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.lightroom_catalogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lightroom_catalogs_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.lightroom_catalogs_id_seq OWNED BY app_public.lightroom_catalog.id;


--
-- Name: lightroom_collection; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.lightroom_collection (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    catalog_id integer NOT NULL,
    parent_id integer,
    title character varying(255) DEFAULT NULL::character varying,
    slug character varying(255) DEFAULT NULL::character varying,
    is_smart boolean DEFAULT false NOT NULL,
    search_description jsonb DEFAULT '{}'::jsonb NOT NULL,
    local_identifier integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE lightroom_collection; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.lightroom_collection IS '@omit create,update,delete
Lightroom Collection or Collection Set. This will be connected to an Album and the Lightroom Catalog.';


--
-- Name: COLUMN lightroom_collection.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.id IS '@omit create,update,delete';


--
-- Name: COLUMN lightroom_collection.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.user_id IS '@omit';


--
-- Name: COLUMN lightroom_collection.catalog_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.catalog_id IS 'Lightroom Catalog connection.';


--
-- Name: COLUMN lightroom_collection.parent_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.parent_id IS 'If the collection is in the collection set then this will be the parent collection.';


--
-- Name: COLUMN lightroom_collection.title; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.title IS 'Collection title.';


--
-- Name: COLUMN lightroom_collection.slug; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.slug IS 'Autogenerated title slug.';


--
-- Name: COLUMN lightroom_collection.is_smart; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.is_smart IS 'Indicates is the collection a `smart collection`. Smart collections have search description to filter out the photos.';


--
-- Name: COLUMN lightroom_collection.search_description; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.search_description IS 'Lightroom specific search description in case this is smart collection.';


--
-- Name: COLUMN lightroom_collection.local_identifier; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_collection.local_identifier IS 'The local identifier of the published collection, unique within the Lighroom catalog.';


--
-- Name: lightroom_collection_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.lightroom_collection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lightroom_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.lightroom_collection_id_seq OWNED BY app_public.lightroom_collection.id;


--
-- Name: lightroom_media; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.lightroom_media (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    media_id integer NOT NULL,
    uuid_identifier uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE lightroom_media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.lightroom_media IS '@omit create,update,delete
Lightroom media, direct access to this is allowed only through the plugin. This is kept in sync with the Media record.';


--
-- Name: COLUMN lightroom_media.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_media.user_id IS '@omit';


--
-- Name: COLUMN lightroom_media.media_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_media.media_id IS '1-1 relation Media - Ligtroom Media';


--
-- Name: COLUMN lightroom_media.uuid_identifier; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.lightroom_media.uuid_identifier IS 'UUID v4 identifier given by the Lighroom Catalog. The docs does not say is this unique withing the catalog or it is a random uuidv4 value. @TODO if it breaks fix it';


--
-- Name: lightroom_media_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.lightroom_media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lightroom_media_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.lightroom_media_id_seq OWNED BY app_public.lightroom_media.id;


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.media_id_seq OWNED BY app_public.media.id;


--
-- Name: rendition; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.rendition (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    media_id integer NOT NULL,
    cid text NOT NULL,
    pixel_cid character varying(255),
    metadata_cid character varying(255),
    file_name character varying(255) DEFAULT NULL::character varying,
    size integer,
    file_format character varying(255) DEFAULT NULL::character varying NOT NULL,
    height integer NOT NULL,
    width integer NOT NULL,
    fps double precision,
    file_version character varying(255) DEFAULT NULL::character varying,
    is_smart_preview boolean DEFAULT false NOT NULL,
    is_master boolean DEFAULT false NOT NULL,
    image_storage_path text NOT NULL,
    metadata_storage_path text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    develop_settings jsonb DEFAULT '{}'::jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    aspect_ratio real
);


--
-- Name: TABLE rendition; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.rendition IS 'A version of the Media. It can be a master one or published. Unlocked and Locked. *Unlocked* is considered provate and user can always `develop` the photo. *Locked* is considered a public and published photo, no changes are allowed.';


--
-- Name: COLUMN rendition.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.id IS '@omit create,update,delete';


--
-- Name: COLUMN rendition.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.user_id IS '@omit';


--
-- Name: COLUMN rendition.cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.cid IS 'content address identifier @anagolay/op-an-cid npm package';


--
-- Name: COLUMN rendition.pixel_cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.pixel_cid IS 'content address of the RAW pixels without the metadata. The pixels are as IT IS, no color transformation is included. Using the @anagolay/op-an-image-raw-pixels-hash';


--
-- Name: COLUMN rendition.metadata_cid; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.metadata_cid IS 'content address of the image METADATA without any modifications. Using the @anagolay/op-an-image-metadata-hash';


--
-- Name: COLUMN rendition.file_name; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.file_name IS 'synced file name';


--
-- Name: COLUMN rendition.size; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.size IS 'What is the size of the rendition in bytes.';


--
-- Name: COLUMN rendition.file_format; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.file_format IS 'Format of the file. One of ''RAW'', ''DNG'', ''JPG'', ''PSD'', ''TIFF'', or ''VIDEO''.';


--
-- Name: COLUMN rendition.height; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.height IS 'Height of the rendition.';


--
-- Name: COLUMN rendition.width; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.width IS 'Width of the rendition.';


--
-- Name: COLUMN rendition.fps; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.fps IS 'Frames per second, if a video, if not then null.';


--
-- Name: COLUMN rendition.file_version; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.file_version IS 'File version on the storage if supported. Think of this as a stored revision ID.';


--
-- Name: COLUMN rendition.is_smart_preview; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.is_smart_preview IS 'It is a  smart preview, mainly for LR.';


--
-- Name: COLUMN rendition.is_master; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.is_master IS 'Every Media must hava one master rendition. Usually First one is the master. This one is served by default when viewing in the apps.';


--
-- Name: COLUMN rendition.image_storage_path; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.image_storage_path IS 'abs path where to find image rendition on related storage';


--
-- Name: COLUMN rendition.metadata_storage_path; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.metadata_storage_path IS 'abs path where to find full metadata of the rendition on related storage';


--
-- Name: COLUMN rendition.develop_settings; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.develop_settings IS 'Develop Settings in JSON format';


--
-- Name: COLUMN rendition.metadata; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.metadata IS 'Rendition metadata';


--
-- Name: COLUMN rendition.aspect_ratio; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.rendition.aspect_ratio IS 'Rendition aspect ratio.';


--
-- Name: rendition_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.rendition_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: rendition_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.rendition_id_seq OWNED BY app_public.rendition.id;


--
-- Name: user_authentications; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_authentications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    service text NOT NULL,
    identifier text NOT NULL,
    details jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: TABLE user_authentications; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.user_authentications IS '@omit all
Contains information about the login providers this user has used, so that they may disconnect them should they wish.';


--
-- Name: COLUMN user_authentications.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.id IS '@omit create,update,delete';


--
-- Name: COLUMN user_authentications.user_id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.user_id IS '@omit';


--
-- Name: COLUMN user_authentications.service; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.service IS 'The login service used, e.g. `google`,`auth0`';


--
-- Name: COLUMN user_authentications.identifier; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.identifier IS 'A unique identifier for the user within the login service.';


--
-- Name: COLUMN user_authentications.details; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_authentications.details IS '@omit
Additional profile details extracted from this login method';


--
-- Name: user_authentications_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.user_authentications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_authentications_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.user_authentications_id_seq OWNED BY app_public.user_authentications.id;


--
-- Name: user_emails; Type: TABLE; Schema: app_public; Owner: -
--

CREATE TABLE app_public.user_emails (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    email public.citext NOT NULL,
    is_verified boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_primary boolean DEFAULT false,
    CONSTRAINT user_emails_email_check CHECK ((email OPERATOR(public.~) '[^@]+@[^@]+\.[^@]+'::public.citext))
);


--
-- Name: TABLE user_emails; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON TABLE app_public.user_emails IS '@omit all
Information about a user''s email address.';


--
-- Name: COLUMN user_emails.id; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.id IS '@omit create,update,delete';


--
-- Name: COLUMN user_emails.email; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.email IS 'The users email address, in `a@b.c` format.';


--
-- Name: COLUMN user_emails.is_verified; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.is_verified IS 'True if the user has is_verified their email address (by clicking the link in the email we sent them, or logging in with a social login provider), false otherwise.';


--
-- Name: COLUMN user_emails.is_primary; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON COLUMN app_public.user_emails.is_primary IS 'is this users primary email';


--
-- Name: user_emails_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.user_emails_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_emails_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.user_emails_id_seq OWNED BY app_public.user_emails.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: app_public; Owner: -
--

CREATE SEQUENCE app_public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: app_public; Owner: -
--

ALTER SEQUENCE app_public.users_id_seq OWNED BY app_public.users.id;


--
-- Name: copyright; Type: TABLE; Schema: network; Owner: -
--

CREATE TABLE network.copyright (
    id integer NOT NULL,
    user_id integer DEFAULT app_public.current_user_id() NOT NULL,
    media_id integer,
    statement_id character varying(255) NOT NULL,
    signer character varying(255) NOT NULL
);


--
-- Name: TABLE copyright; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON TABLE network.copyright IS 'All copyright statements references to the media. Full statement info should be fetched from the network using either polkadot.js app, network interface or network js-api';


--
-- Name: COLUMN copyright.user_id; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.copyright.user_id IS '@omit';


--
-- Name: COLUMN copyright.media_id; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.copyright.media_id IS 'Internal Media <-> Ownership mapping';


--
-- Name: COLUMN copyright.statement_id; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.copyright.statement_id IS 'Statement ID in its noraml form. To use this for fetching the data you need to HEX encode it and prefix it with 0x';


--
-- Name: COLUMN copyright.signer; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.copyright.signer IS 'URN based signer address urn:pgp:key-fingerprint';


--
-- Name: copyright_id_seq; Type: SEQUENCE; Schema: network; Owner: -
--

CREATE SEQUENCE network.copyright_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: copyright_id_seq; Type: SEQUENCE OWNED BY; Schema: network; Owner: -
--

ALTER SEQUENCE network.copyright_id_seq OWNED BY network.copyright.id;


--
-- Name: pending_tx; Type: TABLE; Schema: network; Owner: -
--

CREATE TABLE network.pending_tx (
    id integer NOT NULL,
    cid text NOT NULL,
    payload jsonb DEFAULT '{}'::jsonb NOT NULL,
    payload_type text NOT NULL,
    for_what character varying(30) NOT NULL,
    creator_account text NOT NULL,
    pallet text NOT NULL,
    errors jsonb DEFAULT '[]'::jsonb,
    failed boolean DEFAULT false NOT NULL
);


--
-- Name: TABLE pending_tx; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON TABLE network.pending_tx IS '@omit
Pending network transactions. Here are all of the potential proofs and statements of the media and the devices. When the worker successfully processes and saves the TX delete the record.';


--
-- Name: COLUMN pending_tx.cid; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.cid IS 'content address identifier of the payload using @anagolay/op-an-cid npm package';


--
-- Name: COLUMN pending_tx.payload; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.payload IS 'JSON payload that is processed by the worker.';


--
-- Name: COLUMN pending_tx.payload_type; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.payload_type IS 'The type of the payload, if the pallet is poe then the value is `proof`, if it is statement it can be either `ownership` or `copyright`.';


--
-- Name: COLUMN pending_tx.creator_account; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.creator_account IS 'Users Newtork account. This is the creator field and the account that will pay the fees. Account must have the positive balance.';


--
-- Name: COLUMN pending_tx.pallet; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.pallet IS 'For which pallet is the payload for. PoE, Statements?';


--
-- Name: COLUMN pending_tx.errors; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.errors IS 'If this tx fails, log it here why.';


--
-- Name: COLUMN pending_tx.failed; Type: COMMENT; Schema: network; Owner: -
--

COMMENT ON COLUMN network.pending_tx.failed IS 'If this tx fails, mark this as TRUE.';


--
-- Name: pending_tx_id_seq; Type: SEQUENCE; Schema: network; Owner: -
--

CREATE SEQUENCE network.pending_tx_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pending_tx_id_seq; Type: SEQUENCE OWNED BY; Schema: network; Owner: -
--

ALTER SEQUENCE network.pending_tx_id_seq OWNED BY network.pending_tx.id;


--
-- Name: crypto_key_secrets id; Type: DEFAULT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.crypto_key_secrets ALTER COLUMN id SET DEFAULT nextval('app_private.crypto_key_secrets_id_seq'::regclass);


--
-- Name: album id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.album ALTER COLUMN id SET DEFAULT nextval('app_public.album_id_seq'::regclass);


--
-- Name: crypto_keys id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys ALTER COLUMN id SET DEFAULT nextval('app_public.crypto_keys_id_seq'::regclass);


--
-- Name: device id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.device ALTER COLUMN id SET DEFAULT nextval('app_public.device_id_seq'::regclass);


--
-- Name: lightroom_catalog id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_catalog ALTER COLUMN id SET DEFAULT nextval('app_public.lightroom_catalogs_id_seq'::regclass);


--
-- Name: lightroom_collection id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection ALTER COLUMN id SET DEFAULT nextval('app_public.lightroom_collection_id_seq'::regclass);


--
-- Name: lightroom_media id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_media ALTER COLUMN id SET DEFAULT nextval('app_public.lightroom_media_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.media ALTER COLUMN id SET DEFAULT nextval('app_public.media_id_seq'::regclass);


--
-- Name: rendition id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition ALTER COLUMN id SET DEFAULT nextval('app_public.rendition_id_seq'::regclass);


--
-- Name: user_authentications id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications ALTER COLUMN id SET DEFAULT nextval('app_public.user_authentications_id_seq'::regclass);


--
-- Name: user_emails id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails ALTER COLUMN id SET DEFAULT nextval('app_public.user_emails_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users ALTER COLUMN id SET DEFAULT nextval('app_public.users_id_seq'::regclass);


--
-- Name: copyright id; Type: DEFAULT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.copyright ALTER COLUMN id SET DEFAULT nextval('network.copyright_id_seq'::regclass);


--
-- Name: pending_tx id; Type: DEFAULT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.pending_tx ALTER COLUMN id SET DEFAULT nextval('network.pending_tx_id_seq'::regclass);


--
-- Name: crypto_key_secrets crypto_key_secrets_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.crypto_key_secrets
    ADD CONSTRAINT crypto_key_secrets_pkey PRIMARY KEY (id);


--
-- Name: user_authentication_secrets user_authentication_secrets_pkey; Type: CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_authentication_secrets
    ADD CONSTRAINT user_authentication_secrets_pkey PRIMARY KEY (user_authentication_id);


--
-- Name: _album_lightroom_collection _album_lightroom_collection_idx; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_lightroom_collection
    ADD CONSTRAINT _album_lightroom_collection_idx UNIQUE (album_id, collection_id) INCLUDE (album_id, collection_id);


--
-- Name: _album_media _album_media_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_media
    ADD CONSTRAINT _album_media_pkey PRIMARY KEY (album_id, media_id);


--
-- Name: _lightroom_media_uniqueness _lightroom__unique_idxmedia_uniqueness; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._lightroom_media_uniqueness
    ADD CONSTRAINT _lightroom__unique_idxmedia_uniqueness UNIQUE (media_id, catalog_id, collection_id, local_identifier) INCLUDE (media_id, catalog_id, collection_id, local_identifier);


--
-- Name: CONSTRAINT _lightroom__unique_idxmedia_uniqueness ON _lightroom_media_uniqueness; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _lightroom__unique_idxmedia_uniqueness ON app_public._lightroom_media_uniqueness IS 'Inside the Lightroom catalog, collection and the media local_identifier are unique';


--
-- Name: album album_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.album
    ADD CONSTRAINT album_pkey PRIMARY KEY (id);


--
-- Name: crypto_keys crypto_keys_cid_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys
    ADD CONSTRAINT crypto_keys_cid_key UNIQUE (cid);


--
-- Name: crypto_keys crypto_keys_fingerprint_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys
    ADD CONSTRAINT crypto_keys_fingerprint_key UNIQUE (fingerprint);


--
-- Name: crypto_keys crypto_keys_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys
    ADD CONSTRAINT crypto_keys_pkey PRIMARY KEY (id);


--
-- Name: crypto_keys crypto_keys_unique_primary; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys
    ADD CONSTRAINT crypto_keys_unique_primary UNIQUE (is_primary, user_id);


--
-- Name: device device_cid_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.device
    ADD CONSTRAINT device_cid_key UNIQUE (cid);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: lightroom_catalog lightroom_catalogs_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_catalog
    ADD CONSTRAINT lightroom_catalogs_pkey PRIMARY KEY (id);


--
-- Name: lightroom_collection lightroom_collection_local_identifier_catalog_unique; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection
    ADD CONSTRAINT lightroom_collection_local_identifier_catalog_unique UNIQUE (catalog_id, local_identifier);


--
-- Name: lightroom_collection lightroom_collection_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection
    ADD CONSTRAINT lightroom_collection_pkey PRIMARY KEY (id);


--
-- Name: lightroom_media lightroom_media_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_media
    ADD CONSTRAINT lightroom_media_pkey PRIMARY KEY (id);


--
-- Name: lightroom_media lightroom_media_uuid_identifier_uniq; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_media
    ADD CONSTRAINT lightroom_media_uuid_identifier_uniq UNIQUE (uuid_identifier);


--
-- Name: _media_device media_device; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._media_device
    ADD CONSTRAINT media_device UNIQUE (media_id, device_id) INCLUDE (media_id, device_id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: rendition only_one_master_rendition; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition
    ADD CONSTRAINT only_one_master_rendition UNIQUE (media_id, is_master);


--
-- Name: rendition rendition_cid_unique; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition
    ADD CONSTRAINT rendition_cid_unique UNIQUE (cid);


--
-- Name: rendition rendition_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition
    ADD CONSTRAINT rendition_pkey PRIMARY KEY (id);


--
-- Name: user_authentications uniq_user_authentications; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT uniq_user_authentications UNIQUE (service, identifier);


--
-- Name: user_authentications user_authentications_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT user_authentications_pkey PRIMARY KEY (id);


--
-- Name: user_emails user_emails_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_pkey PRIMARY KEY (id);


--
-- Name: user_emails user_emails_user_id_email_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_email_key UNIQUE (user_id, email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: copyright copyright_pkey; Type: CONSTRAINT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.copyright
    ADD CONSTRAINT copyright_pkey PRIMARY KEY (id);


--
-- Name: pending_tx pending_tx_pkey; Type: CONSTRAINT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.pending_tx
    ADD CONSTRAINT pending_tx_pkey PRIMARY KEY (id);


--
-- Name: _album_lightroom_collection_album_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _album_lightroom_collection_album_id_idx ON app_public._album_lightroom_collection USING btree (album_id);


--
-- Name: _album_lightroom_collection_collection_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _album_lightroom_collection_collection_id_idx ON app_public._album_lightroom_collection USING btree (collection_id);


--
-- Name: _album_media_album_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _album_media_album_id_idx ON app_public._album_media USING btree (album_id);


--
-- Name: _album_media_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _album_media_media_id_idx ON app_public._album_media USING btree (media_id);


--
-- Name: _lightroom_media_uniqueness_catalog_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _lightroom_media_uniqueness_catalog_id_idx ON app_public._lightroom_media_uniqueness USING btree (catalog_id);


--
-- Name: _lightroom_media_uniqueness_collection_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _lightroom_media_uniqueness_collection_id_idx ON app_public._lightroom_media_uniqueness USING btree (collection_id);


--
-- Name: _lightroom_media_uniqueness_local_identifier_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _lightroom_media_uniqueness_local_identifier_idx ON app_public._lightroom_media_uniqueness USING btree (local_identifier);


--
-- Name: _lightroom_media_uniqueness_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _lightroom_media_uniqueness_media_id_idx ON app_public._lightroom_media_uniqueness USING btree (media_id);


--
-- Name: _media_device_map_device_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _media_device_map_device_id_idx ON app_public._media_device USING btree (device_id);


--
-- Name: _media_device_map_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX _media_device_map_media_id_idx ON app_public._media_device USING btree (media_id);


--
-- Name: album_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX album_user_id_idx ON app_public.album USING btree (user_id);


--
-- Name: crypto_keys_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX crypto_keys_user_id_idx ON app_public.crypto_keys USING btree (user_id);


--
-- Name: device_poe_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX device_poe_id_idx ON app_public.device USING btree (poe_id);


--
-- Name: device_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX device_user_id_idx ON app_public.device USING btree (user_id);


--
-- Name: lightroom_catalogs_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX lightroom_catalogs_user_id_idx ON app_public.lightroom_catalog USING btree (user_id);


--
-- Name: lightroom_collection_catalog_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX lightroom_collection_catalog_id_idx ON app_public.lightroom_collection USING btree (catalog_id);


--
-- Name: lightroom_collection_parent_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX lightroom_collection_parent_id_idx ON app_public.lightroom_collection USING btree (parent_id);


--
-- Name: lightroom_collection_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX lightroom_collection_user_id_idx ON app_public.lightroom_collection USING btree (user_id);


--
-- Name: lightroom_media_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX lightroom_media_media_id_idx ON app_public.lightroom_media USING btree (media_id);


--
-- Name: lightroom_media_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX lightroom_media_user_id_idx ON app_public.lightroom_media USING btree (user_id);


--
-- Name: media_date_created_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_date_created_idx ON app_public.media USING btree (date_created);


--
-- Name: media_is_video_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_is_video_idx ON app_public.media USING btree (is_video);


--
-- Name: media_master_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_master_media_id_idx ON app_public.media USING btree (master_media_id);


--
-- Name: media_master_photo_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_master_photo_id_idx ON app_public.media USING btree (master_media_id);


--
-- Name: media_phash_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_phash_idx ON app_public.media USING btree (phash);


--
-- Name: media_poe_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_poe_id_idx ON app_public.media USING btree (poe_id);


--
-- Name: media_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX media_user_id_idx ON app_public.media USING btree (user_id);


--
-- Name: rendition_cid_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX rendition_cid_idx ON app_public.rendition USING btree (cid);


--
-- Name: rendition_is_master_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX rendition_is_master_idx ON app_public.rendition USING btree (is_master);


--
-- Name: rendition_media_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX rendition_media_id_idx ON app_public.rendition USING btree (media_id);


--
-- Name: rendition_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX rendition_user_id_idx ON app_public.rendition USING btree (user_id);


--
-- Name: uniq_user_emails_verified_email; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX uniq_user_emails_verified_email ON app_public.user_emails USING btree (email) WHERE (is_verified IS TRUE);


--
-- Name: user_authentications_user_id_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE INDEX user_authentications_user_id_idx ON app_public.user_authentications USING btree (user_id);


--
-- Name: user_emails_is_primary_idx; Type: INDEX; Schema: app_public; Owner: -
--

CREATE UNIQUE INDEX user_emails_is_primary_idx ON app_public.user_emails USING btree (is_primary, email);


--
-- Name: copyright_media_id_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE INDEX copyright_media_id_idx ON network.copyright USING btree (media_id);


--
-- Name: copyright_statement_id_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE INDEX copyright_statement_id_idx ON network.copyright USING btree (statement_id);


--
-- Name: copyright_user_id_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE INDEX copyright_user_id_idx ON network.copyright USING btree (user_id);


--
-- Name: media_master_media_id_statement_id_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE UNIQUE INDEX media_master_media_id_statement_id_idx ON network.copyright USING btree (media_id, statement_id);


--
-- Name: pending_tx_cid_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE UNIQUE INDEX pending_tx_cid_idx ON network.pending_tx USING btree (cid);


--
-- Name: pending_tx_creator_account_idx; Type: INDEX; Schema: network; Owner: -
--

CREATE INDEX pending_tx_creator_account_idx ON network.pending_tx USING btree (creator_account);


--
-- Name: pending_tx_unique; Type: INDEX; Schema: network; Owner: -
--

CREATE UNIQUE INDEX pending_tx_unique ON network.pending_tx USING btree (cid, pallet, for_what, creator_account);


--
-- Name: crypto_key_secrets _100_timestamps; Type: TRIGGER; Schema: app_private; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_private.crypto_key_secrets FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: album _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.album FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: crypto_keys _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.crypto_keys FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: device _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.device FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: lightroom_catalog _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.lightroom_catalog FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: lightroom_collection _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.lightroom_collection FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: lightroom_media _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.lightroom_media FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: media _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.media FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: rendition _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.rendition FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_authentications _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_authentications FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: user_emails _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.user_emails FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: users _100_timestamps; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _100_timestamps BEFORE INSERT OR UPDATE ON app_public.users FOR EACH ROW EXECUTE FUNCTION app_private.tg__timestamps();


--
-- Name: lightroom_catalog _200_lr_catalog_name_slug; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_lr_catalog_name_slug BEFORE INSERT OR UPDATE ON app_public.lightroom_catalog FOR EACH ROW EXECUTE FUNCTION app_public.set_slug_from_name();


--
-- Name: crypto_keys _200_slug_name; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_slug_name BEFORE INSERT OR UPDATE ON app_public.crypto_keys FOR EACH ROW EXECUTE FUNCTION app_public.set_slug_from_name();


--
-- Name: album _200_slug_title; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_slug_title BEFORE INSERT OR UPDATE ON app_public.album FOR EACH ROW EXECUTE FUNCTION app_public.set_slug_from_title();


--
-- Name: lightroom_collection _200_slug_title; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_slug_title BEFORE INSERT OR UPDATE ON app_public.lightroom_collection FOR EACH ROW EXECUTE FUNCTION app_public.set_slug_from_title();


--
-- Name: media _200_slug_title; Type: TRIGGER; Schema: app_public; Owner: -
--

CREATE TRIGGER _200_slug_title BEFORE INSERT OR UPDATE ON app_public.media FOR EACH ROW EXECUTE FUNCTION app_public.set_slug_from_title();


--
-- Name: crypto_key_secrets crypto_key_secrets_crypto_key_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.crypto_key_secrets
    ADD CONSTRAINT crypto_key_secrets_crypto_key_id_fkey FOREIGN KEY (crypto_key_id) REFERENCES app_public.crypto_keys(id) ON DELETE CASCADE;


--
-- Name: crypto_key_secrets crypto_key_secrets_user_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.crypto_key_secrets
    ADD CONSTRAINT crypto_key_secrets_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_authentication_secrets user_authentication_secrets_user_authentication_id_fkey; Type: FK CONSTRAINT; Schema: app_private; Owner: -
--

ALTER TABLE ONLY app_private.user_authentication_secrets
    ADD CONSTRAINT user_authentication_secrets_user_authentication_id_fkey FOREIGN KEY (user_authentication_id) REFERENCES app_public.user_authentications(id) ON DELETE CASCADE;


--
-- Name: _album_lightroom_collection _album_lightroom_collection_album_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_lightroom_collection
    ADD CONSTRAINT _album_lightroom_collection_album_id_fkey FOREIGN KEY (album_id) REFERENCES app_public.album(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _album_lightroom_collection_album_id_fkey ON _album_lightroom_collection; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _album_lightroom_collection_album_id_fkey ON app_public._album_lightroom_collection IS '@manyToManyFieldName albumList';


--
-- Name: _album_lightroom_collection _album_lightroom_collection_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_lightroom_collection
    ADD CONSTRAINT _album_lightroom_collection_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.lightroom_collection(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _album_lightroom_collection_collection_id_fkey ON _album_lightroom_collection; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _album_lightroom_collection_collection_id_fkey ON app_public._album_lightroom_collection IS '@manyToManyFieldName lrCollections';


--
-- Name: _album_media _album_media_album_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_media
    ADD CONSTRAINT _album_media_album_id_fkey FOREIGN KEY (album_id) REFERENCES app_public.album(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _album_media_album_id_fkey ON _album_media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _album_media_album_id_fkey ON app_public._album_media IS '@manyToManyFieldName albums';


--
-- Name: _album_media _album_media_media_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._album_media
    ADD CONSTRAINT _album_media_media_id_fkey FOREIGN KEY (media_id) REFERENCES app_public.media(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _album_media_media_id_fkey ON _album_media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _album_media_media_id_fkey ON app_public._album_media IS '@manyToManyFieldName media';


--
-- Name: _lightroom_media_uniqueness _lightroom_media_uniqueness_catalog_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._lightroom_media_uniqueness
    ADD CONSTRAINT _lightroom_media_uniqueness_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES app_public.lightroom_catalog(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _lightroom_media_uniqueness_catalog_id_fkey ON _lightroom_media_uniqueness; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _lightroom_media_uniqueness_catalog_id_fkey ON app_public._lightroom_media_uniqueness IS '@manyToManyFieldName catalogList';


--
-- Name: _lightroom_media_uniqueness _lightroom_media_uniqueness_collection_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._lightroom_media_uniqueness
    ADD CONSTRAINT _lightroom_media_uniqueness_collection_id_fkey FOREIGN KEY (collection_id) REFERENCES app_public.lightroom_collection(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _lightroom_media_uniqueness_collection_id_fkey ON _lightroom_media_uniqueness; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _lightroom_media_uniqueness_collection_id_fkey ON app_public._lightroom_media_uniqueness IS '@manyToManyFieldName collectionList';


--
-- Name: _lightroom_media_uniqueness _lightroom_media_uniqueness_media_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._lightroom_media_uniqueness
    ADD CONSTRAINT _lightroom_media_uniqueness_media_id_fkey FOREIGN KEY (media_id) REFERENCES app_public.lightroom_media(id) ON DELETE CASCADE;


--
-- Name: _media_device _media_device_device_id_fk; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._media_device
    ADD CONSTRAINT _media_device_device_id_fk FOREIGN KEY (device_id) REFERENCES app_public.device(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _media_device_device_id_fk ON _media_device; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _media_device_device_id_fk ON app_public._media_device IS '@manyToManyFieldName devices';


--
-- Name: _media_device _media_device_media_id_fk; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public._media_device
    ADD CONSTRAINT _media_device_media_id_fk FOREIGN KEY (media_id) REFERENCES app_public.media(id) ON DELETE CASCADE;


--
-- Name: CONSTRAINT _media_device_media_id_fk ON _media_device; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT _media_device_media_id_fk ON app_public._media_device IS '@manyToManyFieldName mediaList';


--
-- Name: album album_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.album
    ADD CONSTRAINT album_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: crypto_keys crypto_keys_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.crypto_keys
    ADD CONSTRAINT crypto_keys_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: device device_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.device
    ADD CONSTRAINT device_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: lightroom_catalog lightroom_catalogs_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_catalog
    ADD CONSTRAINT lightroom_catalogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: lightroom_collection lightroom_collection_catalog_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection
    ADD CONSTRAINT lightroom_collection_catalog_id_fkey FOREIGN KEY (catalog_id) REFERENCES app_public.lightroom_catalog(id) ON DELETE CASCADE;


--
-- Name: lightroom_collection lightroom_collection_parent_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection
    ADD CONSTRAINT lightroom_collection_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES app_public.lightroom_collection(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: CONSTRAINT lightroom_collection_parent_id_fkey ON lightroom_collection; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT lightroom_collection_parent_id_fkey ON app_public.lightroom_collection IS '@fieldName parentCollection';


--
-- Name: lightroom_collection lightroom_collection_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_collection
    ADD CONSTRAINT lightroom_collection_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: lightroom_media lightroom_media_media_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_media
    ADD CONSTRAINT lightroom_media_media_id_fkey FOREIGN KEY (media_id) REFERENCES app_public.media(id) ON DELETE CASCADE;


--
-- Name: lightroom_media lightroom_media_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.lightroom_media
    ADD CONSTRAINT lightroom_media_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: media media_master_media_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.media
    ADD CONSTRAINT media_master_media_id_fkey FOREIGN KEY (master_media_id) REFERENCES app_public.media(id) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED;


--
-- Name: CONSTRAINT media_master_media_id_fkey ON media; Type: COMMENT; Schema: app_public; Owner: -
--

COMMENT ON CONSTRAINT media_master_media_id_fkey ON app_public.media IS '@fieldName masterMedia';


--
-- Name: media media_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.media
    ADD CONSTRAINT media_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: rendition rendition_media_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition
    ADD CONSTRAINT rendition_media_id_fkey FOREIGN KEY (media_id) REFERENCES app_public.media(id) ON DELETE CASCADE;


--
-- Name: rendition rendition_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.rendition
    ADD CONSTRAINT rendition_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_authentications user_authentications_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_authentications
    ADD CONSTRAINT user_authentications_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: user_emails user_emails_user_id_fkey; Type: FK CONSTRAINT; Schema: app_public; Owner: -
--

ALTER TABLE ONLY app_public.user_emails
    ADD CONSTRAINT user_emails_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: copyright copyright_media_id_fkey; Type: FK CONSTRAINT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.copyright
    ADD CONSTRAINT copyright_media_id_fkey FOREIGN KEY (media_id) REFERENCES app_public.media(id) ON DELETE CASCADE;


--
-- Name: copyright copyright_user_id_fkey; Type: FK CONSTRAINT; Schema: network; Owner: -
--

ALTER TABLE ONLY network.copyright
    ADD CONSTRAINT copyright_user_id_fkey FOREIGN KEY (user_id) REFERENCES app_public.users(id) ON DELETE CASCADE;


--
-- Name: crypto_key_secrets; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.crypto_key_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: crypto_key_secrets delete_own; Type: POLICY; Schema: app_private; Owner: -
--

CREATE POLICY delete_own ON app_private.crypto_key_secrets FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: crypto_key_secrets insert_own; Type: POLICY; Schema: app_private; Owner: -
--

CREATE POLICY insert_own ON app_private.crypto_key_secrets FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: crypto_key_secrets select_own; Type: POLICY; Schema: app_private; Owner: -
--

CREATE POLICY select_own ON app_private.crypto_key_secrets FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_authentication_secrets; Type: ROW SECURITY; Schema: app_private; Owner: -
--

ALTER TABLE app_private.user_authentication_secrets ENABLE ROW LEVEL SECURITY;

--
-- Name: album; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.album ENABLE ROW LEVEL SECURITY;

--
-- Name: crypto_keys; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.crypto_keys ENABLE ROW LEVEL SECURITY;

--
-- Name: album delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.album FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: device delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.device FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_catalog delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.lightroom_catalog FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_collection delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.lightroom_collection FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_media delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.lightroom_media FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: media delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.media FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: rendition delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.rendition FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: user_authentications delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.user_authentications FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: user_emails delete_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_own ON app_public.user_emails FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: crypto_keys delete_self; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_self ON app_public.crypto_keys FOR DELETE USING ((user_id = app_public.current_user_id()));


--
-- Name: users delete_self; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY delete_self ON app_public.users FOR DELETE USING ((id = app_public.current_user_id()));


--
-- Name: device; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.device ENABLE ROW LEVEL SECURITY;

--
-- Name: album insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.album FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: device insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.device FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_media insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.lightroom_media FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: media insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.media FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: rendition insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.rendition FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: user_emails insert_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_own ON app_public.user_emails FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_catalog insert_row; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_row ON app_public.lightroom_catalog FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_collection insert_row; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY insert_row ON app_public.lightroom_collection FOR INSERT WITH CHECK (true);


--
-- Name: lightroom_catalog; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.lightroom_catalog ENABLE ROW LEVEL SECURITY;

--
-- Name: lightroom_collection; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.lightroom_collection ENABLE ROW LEVEL SECURITY;

--
-- Name: lightroom_media; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.lightroom_media ENABLE ROW LEVEL SECURITY;

--
-- Name: media; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.media ENABLE ROW LEVEL SECURITY;

--
-- Name: rendition; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.rendition ENABLE ROW LEVEL SECURITY;

--
-- Name: crypto_keys select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.crypto_keys FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: users select_all; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_all ON app_public.users FOR SELECT USING (true);


--
-- Name: album select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.album FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: device select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.device FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_catalog select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.lightroom_catalog FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_collection select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.lightroom_collection FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_media select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.lightroom_media FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: media select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.media FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: rendition select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.rendition FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_authentications select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_authentications FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: user_emails select_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY select_own ON app_public.user_emails FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: album update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.album FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: device update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.device FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_catalog update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.lightroom_catalog FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_collection update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.lightroom_collection FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: lightroom_media update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.lightroom_media FOR UPDATE WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: media update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.media FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: rendition update_own; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_own ON app_public.rendition FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: crypto_keys update_self; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_self ON app_public.crypto_keys FOR UPDATE USING ((user_id = app_public.current_user_id()));


--
-- Name: users update_self; Type: POLICY; Schema: app_public; Owner: -
--

CREATE POLICY update_self ON app_public.users FOR UPDATE USING ((id = app_public.current_user_id()));


--
-- Name: user_authentications; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_authentications ENABLE ROW LEVEL SECURITY;

--
-- Name: user_emails; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.user_emails ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: app_public; Owner: -
--

ALTER TABLE app_public.users ENABLE ROW LEVEL SECURITY;

--
-- Name: copyright; Type: ROW SECURITY; Schema: network; Owner: -
--

ALTER TABLE network.copyright ENABLE ROW LEVEL SECURITY;

--
-- Name: copyright insert_own; Type: POLICY; Schema: network; Owner: -
--

CREATE POLICY insert_own ON network.copyright FOR INSERT WITH CHECK ((user_id = app_public.current_user_id()));


--
-- Name: copyright select_own; Type: POLICY; Schema: network; Owner: -
--

CREATE POLICY select_own ON network.copyright FOR SELECT USING ((user_id = app_public.current_user_id()));


--
-- Name: SCHEMA app_private; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_private TO kelp_visitor;


--
-- Name: SCHEMA app_public; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA app_public TO kelp_visitor;


--
-- Name: SCHEMA network; Type: ACL; Schema: -; Owner: -
--

GRANT USAGE ON SCHEMA network TO kelp_visitor;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM root;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO kelp_owner;
GRANT USAGE ON SCHEMA public TO kelp_visitor;


--
-- Name: FUNCTION current_user_id(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.current_user_id() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.current_user_id() TO kelp_visitor;


--
-- Name: TABLE crypto_keys; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE,UPDATE ON TABLE app_public.crypto_keys TO kelp_visitor;


--
-- Name: FUNCTION insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_private.insert_crypto_key(i_cid text, i_user_id integer, i_is_primary boolean, i_private_key text, i_public_key text, i_fingerprint text, i_key_id text, i_implementation text, i_algorithm text, i_curve text, i_creation_time timestamp with time zone, i_expiration_time timestamp with time zone, i_revocation_certificate text, i_passphrase text) TO kelp_visitor;


--
-- Name: TABLE users; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE,UPDATE ON TABLE app_public.users TO kelp_visitor;


--
-- Name: FUNCTION link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION app_private.link_or_register_user(f_user_id integer, f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_is_email_verified boolean) TO kelp_visitor;


--
-- Name: FUNCTION really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_private.really_create_user(username text, email text, email_is_verified boolean, name text, avatar_url text) TO kelp_visitor;


--
-- Name: FUNCTION register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION app_private.register_user(f_service character varying, f_identifier character varying, f_profile json, f_auth_details json, f_email_is_verified boolean) TO kelp_visitor;


--
-- Name: FUNCTION tg__timestamps(); Type: ACL; Schema: app_private; Owner: -
--

REVOKE ALL ON FUNCTION app_private.tg__timestamps() FROM PUBLIC;
GRANT ALL ON FUNCTION app_private.tg__timestamps() TO kelp_visitor;


--
-- Name: FUNCTION "current_user"(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public."current_user"() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public."current_user"() TO kelp_visitor;


--
-- Name: TABLE media; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.media TO kelp_visitor;


--
-- Name: FUNCTION media_ready_for_copyright(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.media_ready_for_copyright() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.media_ready_for_copyright() TO kelp_visitor;


--
-- Name: FUNCTION set_slug_from_name(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.set_slug_from_name() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.set_slug_from_name() TO kelp_visitor;


--
-- Name: FUNCTION set_slug_from_title(); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.set_slug_from_title() FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.set_slug_from_title() TO kelp_visitor;


--
-- Name: FUNCTION slugify(value text); Type: ACL; Schema: app_public; Owner: -
--

REVOKE ALL ON FUNCTION app_public.slugify(value text) FROM PUBLIC;
GRANT ALL ON FUNCTION app_public.slugify(value text) TO kelp_visitor;


--
-- Name: TABLE crypto_key_secrets; Type: ACL; Schema: app_private; Owner: -
--

GRANT SELECT,INSERT,DELETE ON TABLE app_private.crypto_key_secrets TO kelp_visitor;


--
-- Name: SEQUENCE crypto_key_secrets_id_seq; Type: ACL; Schema: app_private; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_private.crypto_key_secrets_id_seq TO kelp_visitor;


--
-- Name: TABLE _album_lightroom_collection; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public._album_lightroom_collection TO kelp_visitor;


--
-- Name: TABLE _album_media; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public._album_media TO kelp_visitor;


--
-- Name: TABLE _lightroom_media_uniqueness; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public._lightroom_media_uniqueness TO kelp_visitor;


--
-- Name: TABLE _media_device; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public._media_device TO kelp_visitor;


--
-- Name: TABLE album; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.album TO kelp_visitor;


--
-- Name: SEQUENCE album_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.album_id_seq TO kelp_visitor;


--
-- Name: SEQUENCE crypto_keys_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.crypto_keys_id_seq TO kelp_visitor;


--
-- Name: TABLE device; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.device TO kelp_visitor;


--
-- Name: SEQUENCE device_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.device_id_seq TO kelp_visitor;


--
-- Name: TABLE lightroom_catalog; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.lightroom_catalog TO kelp_visitor;


--
-- Name: SEQUENCE lightroom_catalogs_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.lightroom_catalogs_id_seq TO kelp_visitor;


--
-- Name: TABLE lightroom_collection; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.lightroom_collection TO kelp_visitor;


--
-- Name: SEQUENCE lightroom_collection_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.lightroom_collection_id_seq TO kelp_visitor;


--
-- Name: TABLE lightroom_media; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.lightroom_media TO kelp_visitor;


--
-- Name: SEQUENCE lightroom_media_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.lightroom_media_id_seq TO kelp_visitor;


--
-- Name: SEQUENCE media_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.media_id_seq TO kelp_visitor;


--
-- Name: TABLE rendition; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE app_public.rendition TO kelp_visitor;


--
-- Name: SEQUENCE rendition_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.rendition_id_seq TO kelp_visitor;


--
-- Name: TABLE user_authentications; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.user_authentications TO kelp_visitor;


--
-- Name: SEQUENCE user_authentications_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.user_authentications_id_seq TO kelp_visitor;


--
-- Name: TABLE user_emails; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,DELETE ON TABLE app_public.user_emails TO kelp_visitor;


--
-- Name: COLUMN user_emails.email; Type: ACL; Schema: app_public; Owner: -
--

GRANT INSERT(email) ON TABLE app_public.user_emails TO kelp_visitor;


--
-- Name: SEQUENCE user_emails_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.user_emails_id_seq TO kelp_visitor;


--
-- Name: SEQUENCE users_id_seq; Type: ACL; Schema: app_public; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE app_public.users_id_seq TO kelp_visitor;


--
-- Name: TABLE copyright; Type: ACL; Schema: network; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE network.copyright TO kelp_visitor;


--
-- Name: SEQUENCE copyright_id_seq; Type: ACL; Schema: network; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE network.copyright_id_seq TO kelp_visitor;


--
-- Name: TABLE pending_tx; Type: ACL; Schema: network; Owner: -
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE network.pending_tx TO kelp_visitor;


--
-- Name: SEQUENCE pending_tx_id_seq; Type: ACL; Schema: network; Owner: -
--

GRANT SELECT,USAGE ON SEQUENCE network.pending_tx_id_seq TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_private; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_private REVOKE ALL ON SEQUENCES  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_private GRANT SELECT,USAGE ON SEQUENCES  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_private; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_private REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_private REVOKE ALL ON FUNCTIONS  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_private GRANT ALL ON FUNCTIONS  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_public REVOKE ALL ON SEQUENCES  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_public GRANT SELECT,USAGE ON SEQUENCES  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: app_public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_public REVOKE ALL ON FUNCTIONS  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA app_public GRANT ALL ON FUNCTIONS  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: network; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA network REVOKE ALL ON SEQUENCES  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA network GRANT SELECT,USAGE ON SEQUENCES  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA public GRANT SELECT,USAGE ON SEQUENCES  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM kelp_owner;
ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner IN SCHEMA public GRANT ALL ON FUNCTIONS  TO kelp_visitor;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: -
--

ALTER DEFAULT PRIVILEGES FOR ROLE kelp_owner REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

