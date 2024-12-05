package org.egov.pgr.web.models.appeal;

import java.util.ArrayList;
import java.util.List;

import org.egov.pgr.web.models.AuditDetails;
import org.egov.pgr.web.models.Document;
import org.egov.pgr.web.models.Workflow;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.minidev.json.JSONObject;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Appeal {

	@JsonProperty("id")
	private String id;

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("grievanceId")
	private String grievanceId;

	@JsonProperty("comments")
	private String comments;

	@JsonProperty("accountId")
	private String accountId;

	@JsonProperty("businessService")
	private String businessService;

	@JsonProperty("additionalDetails")
	@Default
	private Object additionalDetails = new JSONObject();

	@JsonProperty("status")
	private String status;

	@JsonProperty("applicationNumber")
	private String applicationNumber;

	@JsonProperty("workflow")
	private Workflow workflow = null;

	@JsonProperty("documents")
	private List<Document> documents;

	@JsonProperty("auditDetails")
	@Default
	private AuditDetails auditDetails = null;

	public Appeal addDocumentsItem(Document documentsItem) {
		if (this.documents == null) {
			this.documents = new ArrayList<Document>();
		}
		this.documents.add(documentsItem);
		return this;
	}

}
