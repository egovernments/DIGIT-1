package org.egov.pgr.web.models.appeal;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AppealSearchCriteria {

	@JsonProperty("tenantId")
	private String tenantId;

	@JsonProperty("ids")
	private List<String> ids;

	@JsonProperty("status")
	private String status;

	@JsonProperty("applicationNumber")
	private String applicationNumber;

	@JsonProperty("grievanceId")
	private String grievanceId;

	@JsonProperty("fromDate")
	private Long fromDate;

	@JsonProperty("toDate")
	private Long toDate;
	
	@JsonProperty("accountId")
	private String accountId;

}
