package org.egov.infra.mdms.model;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
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
public class EntityRequest {
	
	@JsonProperty("RequestInfo")
	private RequestInfo requestInfo;
	
	@JsonProperty("organizations")
	private List<Organization> organizations;
	
	@JsonProperty("offices")
	private List<Office> offices;

}
