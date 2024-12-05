package org.egov.infra.mdms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditInfo {
	private String createdBy;
	private Long createdDate;
	private String lastModifiedBy;
	private Long lastModifiedDate;
}
