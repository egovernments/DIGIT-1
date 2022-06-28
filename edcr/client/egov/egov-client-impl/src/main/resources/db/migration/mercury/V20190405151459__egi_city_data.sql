insert into eg_citypreferences ( id, municipalitylogo, createdby, createddate, lastmodifiedby, lastmodifieddate, version, municipalityname, municipalitycontactno, municipalityaddress, municipalitycontactemail, municipalitygislocation, municipalitycallcenterno, municipalityfacebooklink, municipalitytwitterlink, googleapikey, recaptchapk, recaptchapub) values (nextval('seq_eg_citypreferences'), null, 1, now(), 1, now(), 0, 'Mercury Municipal Council', '9470488668', 'Mercury Municipal Council', 'comm.galaxysharif@galaxy.gov.in', 'https://www.google.com/maps/@30.1453,74.1993,17z', null, null, null, '<Google_API_Key>', '6LeeCGMUAAAAAOlhzAooYv1YO2nc2a60WIqNBvIu', '6LeeCGMUAAAAAGJbI4bQbndrX_6jys9bbiBkfDFf');

INSERT INTO eg_city (domainurl, name, localname, id, active, version, createdby, lastmodifiedby, createddate, lastmodifieddate, code,  districtcode, districtname, longitude, latitude, preferences, regionname, grade) VALUES ('egov-dcr-mercury.egovernments.org', 'Mercury', 'Mercury', nextval('seq_eg_city'), true, 0, 1, 1, now(), now(), '0003',  '9', 'Mercury', null, null, (select id from eg_citypreferences), 'Mercury Region', 'MC');