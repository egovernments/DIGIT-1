alter table eg_offices drop column organization_id;

ALTER TABLE eg_offices ADD COLUMN organization_id INTEGER
CONSTRAINT fk_organization_id REFERENCES eg_organizations(id)
ON UPDATE CASCADE ON DELETE CASCADE;
