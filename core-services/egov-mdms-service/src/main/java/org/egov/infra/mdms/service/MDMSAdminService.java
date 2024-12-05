package org.egov.infra.mdms.service;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import org.egov.infra.mdms.dto.Office;
import org.egov.infra.mdms.dto.Organization;
import org.egov.infra.mdms.model.EntityRequest;
import org.egov.infra.mdms.repository.MDMSAdminRepository;
import org.egov.infra.mdms.utils.MDMSConstants;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONArray;

@Service
@Slf4j
public class MDMSAdminService {
	
	@Autowired
	private MDMSAdminRepository adminRepository;

	public JSONArray getOrganization() {
		List<Organization> organizations = adminRepository.fetchOrganization();
		return JsonPath.read(JSONArray.toJSONString(organizations),"$");
	}

	public JSONArray getOffice() {
		List<Office> offices = adminRepository.fetchOffice();
		return JsonPath.read(JSONArray.toJSONString(offices),"$");
	}

	public void create(String entity, EntityRequest request) {
		Organization organization;
		Office office;
		if(entity.equalsIgnoreCase(MDMSConstants.ORGANIZATION)) {
			validateOrganization(request);
			enrichOrgCreateRequest(request);
			adminRepository.createOrganization(request);
		} else if(entity.equalsIgnoreCase(MDMSConstants.OFFICE)) {
			validateOffice(request);
			enrichOfcCreateRequest(request);
			adminRepository.createOffice(request);
		} else {
			throw new CustomException("INVALID_REQUEST", "Not Supported");
		}
	}
	
	public void update(String entity, EntityRequest request) {
		Organization organization;
		Office office;
		if(entity.equalsIgnoreCase(MDMSConstants.ORGANIZATION)) {
			validateOrganization(request);
			enrichOrgCreateRequest(request);
			adminRepository.updateOrganization(request);
		} else if(entity.equalsIgnoreCase(MDMSConstants.OFFICE)) {
			validateOffice(request);
			enrichOfcCreateRequest(request);
			adminRepository.updateOffice(request);
		} else {
			throw new CustomException("INVALID_REQUEST", "Not Supported");
		}
		
	}

	private void enrichOfcCreateRequest(EntityRequest request) {
		
	}

	private void enrichOrgCreateRequest(EntityRequest request) {
		
	}

	private void validateOffice(EntityRequest request) {
		if(request.getOffices().isEmpty()) {
			throw new CustomException("INVALID_REQUEST", "No office details found in the request.");
		}
	}

	private void validateOrganization(EntityRequest request) {
		if(request.getOrganizations().isEmpty()) {
			throw new CustomException("INVALID_REQUEST", "No organization details found in the request.");
		}
	}

}