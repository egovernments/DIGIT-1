package org.egov.pgr.repository.appeal;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.pgr.web.models.AuditDetails;
import org.egov.pgr.web.models.Document;
import org.egov.pgr.web.models.appeal.Appeal;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import com.google.gson.Gson;

@Component
public class AppealRowMapper implements ResultSetExtractor<List<Appeal>> {

	@Override
	public List<Appeal> extractData(ResultSet rs) throws SQLException, DataAccessException {

		Map<String, Appeal> appealMap = new HashMap<>();

		while (rs.next()) {

			String appealId = rs.getString("appeal_id");

			Appeal appeal = appealMap.get(appealId);

			if (appeal == null) {

				appeal = Appeal.builder().id(rs.getString("appeal_id")).tenantId(rs.getString("appeal_tenantid"))
						.grievanceId(rs.getString("appeal_grievanceid")).comments(rs.getString("appeal_comments"))
						.businessService(rs.getString("appeal_wf")).status(rs.getString("appeal_status"))
						.applicationNumber(rs.getString("appeal_appno")).accountId(rs.getString("appeal_accountid"))
						.build();

				AuditDetails auditDetails = AuditDetails.builder().createdBy(rs.getString("appeal_createdby"))
						.lastModifiedBy(rs.getString("appeal_lastmodifiedby"))
						.createdTime(rs.getLong("appeal_createdtime"))
						.lastModifiedTime(rs.getLong("appeal_lastmodifiedtime")).build();

				Object additionalDetails = new Gson().fromJson(rs.getString("appeal_additiondetails").equals("{}")
						|| rs.getString("appeal_additiondetails").equals("null") ? null
								: rs.getString("appeal_additiondetails"),
						Object.class);

				appeal.setAdditionalDetails(additionalDetails);
				appeal.setAuditDetails(auditDetails);

				appealMap.put(appealId, appeal);
			}

			// Fetch and add owner information
			addDocumentsToAppeal(rs, appeal);

		}

		return new ArrayList<>(appealMap.values());
	}

	private void addDocumentsToAppeal(ResultSet rs, Appeal appeal) throws SQLException {

		String documentId = rs.getString("doc_id");
		List<Document> documents = appeal.getDocuments();

		if (!ObjectUtils.isEmpty(documentId)) {

			if (!CollectionUtils.isEmpty(documents)) {
				for (Document document : documents) {
					if (document.getId().equals(documentId))
						return;
				}
			}
			Object docDetails = null;
			if (rs.getString("doc_additionaldetails") != null) {
				docDetails = new Gson().fromJson(rs.getString("doc_additionaldetails").equals("{}")
						|| rs.getString("doc_additionaldetails").equals("null") ? null
								: rs.getString("doc_additionaldetails"),
						Object.class);
			}

			if (documentId != null && rs.getBoolean("doc_active")) {
				Document document = Document.builder().documentType(rs.getString("doc_documenttype"))
						.fileStoreId(rs.getString("doc_filestoreid")).id(documentId).additionalDetails(docDetails)
						.build();
				appeal.addDocumentsItem(document);
			}
		}

	}

}
