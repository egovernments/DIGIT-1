package org.egov.pgr.util.appeal;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;
import java.util.Set;

import org.egov.common.contract.request.RequestInfo;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.repository.ServiceRequestRepository;
import org.egov.pgr.web.models.AuditDetails;
import org.egov.pgr.web.models.RequestInfoWrapper;
import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.workflow.Action;
import org.egov.pgr.web.models.workflow.BusinessService;
import org.egov.pgr.web.models.workflow.State;
import org.egov.tracer.model.CustomException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AppealUtils {

	@Autowired
	private PGRConfiguration config;

	@Autowired
	private ServiceRequestRepository repository;

	public AuditDetails getAuditDetails(String by, Appeal appeal, Boolean isCreate) {
		Long time = System.currentTimeMillis();
		if (isCreate)
			return AuditDetails.builder().createdBy(by).lastModifiedBy(by).createdTime(time).lastModifiedTime(time)
					.build();
		else
			return AuditDetails.builder().createdBy(appeal.getAuditDetails().getCreatedBy()).lastModifiedBy(by)
					.createdTime(appeal.getAuditDetails().getCreatedTime()).lastModifiedTime(time).build();
	}

	public String getNextValidUserUUIDByNextState(String stateUUID, BusinessService businessService,
			RequestInfo requestInfo) {

		StringBuilder roles = new StringBuilder();
		State nextState = businessService.getStateFromUuid(stateUUID);
		Set<String> vroles = new HashSet<>();
		for (Action action : nextState.getActions()) {
			vroles.addAll(action.getRoles());
		}

		for (String s : vroles) {
			roles.append(s + ",");
		}
		return roles.toString().substring(0, roles.length());

	}

	public List<String> getNextValidUserUUID(String roles, String tenantId, boolean isActive, RequestInfo requestInfo) {

		StringBuilder uri = new StringBuilder(config.getHrmsHost());
		uri.append(config.getHrmsEndPoint());
		if (roles != null) {
			uri.append("?roles=");
			uri.append(roles);
		}
		if (tenantId != null) {
			uri.append("&tenantId=");
			uri.append(tenantId);
		}
		if (isActive = true) {
			uri.append("&isActive=true");
		}

		RequestInfoWrapper requestInfoWrapper = RequestInfoWrapper.builder().requestInfo(requestInfo).build();
		LinkedHashMap fetchResult = null;
		fetchResult = (LinkedHashMap) repository.fetchResult(uri, requestInfoWrapper);
		String jsonString = new JSONObject(fetchResult).toString();
		DocumentContext context = JsonPath.using(Configuration.defaultConfiguration()).parse(jsonString);
		List<String> UUID = context.read("Employees.*.uuid");
		System.out.println(UUID.size());
		return UUID;

	}

	public String getRandomValue(List<String> nextAssignees) {

		try {
			Random rand = new Random();
			int randomNum = rand.nextInt(nextAssignees.size());
			return nextAssignees.get(randomNum);
		} catch (Exception e) {
			log.info("Exception caught while generating random assignee : " + String.valueOf(e));
			throw new CustomException("UNABLE_TO_GET_ASSIGNEE", e.getMessage());
		}
	}
}
