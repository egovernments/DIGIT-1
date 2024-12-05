ALTER TABLE eg_user ADD COLUMN IF NOT EXISTS additionaldetails JSONB;
ALTER TABLE public.eg_user_address ADD COLUMN IF NOT EXISTS additionaldetails JSONB;
