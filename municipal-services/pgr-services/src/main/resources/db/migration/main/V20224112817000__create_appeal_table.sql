CREATE TABLE if not exists eg_pgr_appeal (

id                  character varying(64),
tenantId            character varying(256),
grievanceid         character varying(64)  NOT NULL,
comments         character varying(5000) NOT NULL,
accountId           character varying(256),
businessservice     character varying(256),
additionalDetails   JSONB,
status   character varying(128),
applicationo character varying(128),
createdby           character varying(256)  NOT NULL,
createdtime         bigint                  NOT NULL,
lastmodifiedby      character varying(256),
lastmodifiedtime    bigint,

CONSTRAINT uk_eg_pgr_appeal primary key (id)
);

CREATE TABLE if not exists eg_pgr_appeal_document (

	id character varying(64),
	documenttype character varying(64),
	filestoreid character varying(64),
	active bool default true,
	appealid character varying(64),
	additionaldetails jsonb ,
	createdby character varying(64),
	lastmodifiedby character varying(64),
	createdtime bigint,
	lastmodifiedtime bigint,

	constraint pk_eg_pgr_appeal_document primary key (id),
	constraint fk_eg_pgr_appeal_document FOREIGN KEY (appealid) REFERENCES eg_pgr_appeal (id)
);

create sequence SEQ_EG_APPEAL_ID;