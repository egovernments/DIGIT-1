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
public class Office {
	private String tenantId;
	private Long id;
	private Long organizationId;
	private String code;
	private String name;
	private String description;
	private String emailId;
	private String telephoneNumber;
	private String HeadOfficeCode;
	private String officeAddress;
	private String district;
	private String subDistrict;
	private String state;
	private String pin;
	private String status;
	private boolean headOffice;
}
