DROP TABLE IF EXISTS app_public.TEMPLATE CASCADE;

CREATE TABLE app_public.TEMPLATE (
  id serial PRIMARY KEY,
  user_id int NOT NULL DEFAULT app_public.current_user_id () REFERENCES app_public.users ON DELETE CASCADE,
  media_id int REFERENCES app_public.media ON DELETE CASCADE,
  cid text NOT NULL,
  pixel_cid character varying(255) NOT NULL,
  metadata_cid character varying(255) NOT NULL,
  title character varying(255) DEFAULT NULL::character varying,
  height integer NOT NULL,
  width integer NOT NULL,
  location jsonb NOT NULL DEFAULT '{}' ::jsonb,
  fps double precision,
  file_version character varying(255) DEFAULT NULL::character varying,
  is_smart_preview boolean DEFAULT FALSE NOT NULL,
  claim an_claim NOT NULL,
  signatures an_signature[] NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ON app_public.TEMPLATE (user_id);

CREATE INDEX ON app_public.TEMPLATE (media_id);

CREATE INDEX ON app_public.TEMPLATE (is_master);

CREATE INDEX ON app_public.TEMPLATE (cid);

CREATE TRIGGER _200_slug_title
  BEFORE INSERT OR UPDATE ON app_public.TEMPLATE
  FOR EACH ROW
  EXECUTE PROCEDURE app_public.set_slug_from_title ();

CREATE TRIGGER _100_timestamps
  BEFORE INSERT OR UPDATE ON app_public.TEMPLATE
  FOR EACH ROW
  EXECUTE PROCEDURE sid_private.tg__timestamps ();

COMMENT ON TABLE app_public.TEMPLATE IS 'Template table, write here something.';

COMMENT ON COLUMN app_public.TEMPLATE.user_id IS '@omit';

ALTER TABLE app_public.TEMPLATE ENABLE ROW LEVEL SECURITY;

CREATE POLICY select_own ON app_public.TEMPLATE
  FOR SELECT
    USING (user_id = app_public.current_user_id ());

CREATE POLICY delete_own ON app_public.TEMPLATE
  FOR DELETE
    USING (user_id = app_public.current_user_id ());

CREATE POLICY insert_own ON app_public.TEMPLATE
  FOR INSERT
    WITH CHECK (user_id = app_public.current_user_id ());

CREATE POLICY update_own ON app_public.TEMPLATE
  FOR UPDATE
    WITH CHECK (user_id = app_public.current_user_id ());

GRANT SELECT ON app_public.TEMPLATE TO :DATABASE_VISITOR;

GRANT INSERT ON app_public.TEMPLATE TO :DATABASE_VISITOR;

GRANT UPDATE ON app_public.TEMPLATE TO :DATABASE_VISITOR;

GRANT DELETE ON app_public.TEMPLATE TO :DATABASE_VISITOR;

