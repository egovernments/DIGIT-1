CREATE TABLE IF NOT EXISTS eg_organizations(
id varchar(5) primary key ,
code varchar(100) NOT NULL,
name varchar(200) NOT NULL,
description varchar(500),
hod varchar(100),
email_id varchar(50),
telephone_number varchar(20),
address varchar(200),
district varchar(100),
sub_district varchar(100),
state varchar(100),
pin varchar(10),
status varchar(20),
created_by varchar(100),
created_date bigint,
last_modified_by varchar(100),
last_modified_date bigint
);



CREATE TABLE IF NOT EXISTS eg_offices(
id varchar(100) primary key,
organization_id  varchar(100) NOT NULL,
code  varchar(100) NOT NULL,
name  varchar(100) NOT NULL,
description  varchar(100),
email_id  varchar(100),
telephone_number  varchar(100),
Head_office_code  varchar(100),
office_address  varchar(100),
district  varchar(100),
sub_district  varchar(100),
state  varchar(100),
pin  varchar(100),
status  varchar(100),
Head_office  boolean,
created_by varchar(100),
created_date bigint,
last_modified_by varchar(100),
last_modified_date bigint
);