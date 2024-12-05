alter table eg_organizations drop column id;
ALTER TABLE eg_organizations ADD COLUMN id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY;


alter table eg_offices drop column id;
ALTER TABLE eg_offices ADD COLUMN id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY;