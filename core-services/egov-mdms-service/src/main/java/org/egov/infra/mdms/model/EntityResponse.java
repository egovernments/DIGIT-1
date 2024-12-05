package org.egov.infra.mdms.model;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.response.ResponseInfo;
import org.egov.infra.mdms.dto.Office;
import org.egov.infra.mdms.dto.Organization;

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
public class EntityResponse {

	@JsonProperty("responseInfo")
    ResponseInfo responseInfo;
	
	@JsonProperty("organizations")
	private List<Organization> organizations;
	
	@JsonProperty("offices")
	private List<Office> offices;
}
