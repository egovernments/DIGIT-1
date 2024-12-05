package org.egov.pgr.service.appeal;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.repository.ServiceRequestRepository;
import org.egov.pgr.util.appeal.AppealConstants;
import org.egov.pgr.web.models.RequestInfoWrapper;
import org.egov.pgr.web.models.Workflow;
import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.pgr.web.models.workflow.BusinessService;
import org.egov.pgr.web.models.workflow.BusinessServiceResponse;
import org.egov.pgr.web.models.workflow.ProcessInstance;
import org.egov.pgr.web.models.workflow.ProcessInstanceRequest;
import org.egov.pgr.web.models.workflow.ProcessInstanceResponse;
import org.egov.pgr.web.models.workflow.State;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class AppealWorkflowService {

	@Autowired
	private PGRConfiguration pgrConfiguration;

	@Autowired
	private ServiceRequestRepository repository;

	@Autowired
	private ObjectMapper mapper;

	public String updateWorkflowStatus(@Valid AppealRequest request) {

		ProcessInstance processInstance = getProcessInstance(request);
		ProcessInstanceRequest workflowRequest = new ProcessInstanceRequest(request.getRequestInfo(),
				Collections.singletonList(processInstance));
		State state = callWorkFlow(workflowRequest);
		request.getAppeal().setStatus(state.getApplicationStatus());
		return state.getApplicationStatus();

	}

	private State callWorkFlow(ProcessInstanceRequest workflowRequest) {

		ProcessInstanceResponse response = null;
		StringBuilder url = new StringBuilder(
				pgrConfiguration.getWfHost().concat(pgrConfiguration.getWfTransitionPath()));
		Object optional = repository.fetchResult(url, workflowRequest);
		response = mapper.convertValue(optional, ProcessInstanceResponse.class);
		return response.getProcessInstances().get(0).getState();
	}

	private ProcessInstance getProcessInstance(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();
		Workflow workflow = request.getAppeal().getWorkflow();

		ProcessInstance processInstance = new ProcessInstance();
		processInstance.setBusinessId(appeal.getApplicationNumber());
		processInstance.setAction(appeal.getWorkflow().getAction());
		processInstance.setModuleName(AppealConstants.APPEAL_BUSINESSSERVICE);
		processInstance.setTenantId(appeal.getTenantId());
		processInstance.setBusinessService(getBusinessService(request).getBusinessService());
		processInstance.setDocuments(appeal.getWorkflow().getVerificationDocuments());
		processInstance.setComment(workflow.getComments());

		if (!CollectionUtils.isEmpty(workflow.getAssignes())) {
			List<User> users = new ArrayList<>();

			workflow.getAssignes().forEach(uuid -> {
				User user = new User();
				user.setUuid(uuid);
				users.add(user);
			});

			processInstance.setAssignes(users);
		}

		return processInstance;
	}

	public BusinessService getBusinessService(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();

		String tenantId = appeal.getTenantId();
		StringBuilder url = getSearchURLWithParams(tenantId, AppealConstants.APPEAL_BUSINESSSERVICE);
		RequestInfoWrapper requestInfoWrapper = RequestInfoWrapper.builder().requestInfo(request.getRequestInfo())
				.build();
		Object result = repository.fetchResult(url, requestInfoWrapper);
		BusinessServiceResponse response = null;
		try {
			response = mapper.convertValue(result, BusinessServiceResponse.class);
		} catch (IllegalArgumentException e) {
			throw new CustomException("PARSING ERROR", "Failed to parse response of workflow business service search");
		}

		if (CollectionUtils.isEmpty(response.getBusinessServices()))
			throw new CustomException("BUSINESSSERVICE_NOT_FOUND",
					"The businessService " + AppealConstants.APPEAL_BUSINESSSERVICE + " is not found");

		return response.getBusinessServices().get(0);

	}

	private StringBuilder getSearchURLWithParams(String tenantId, String appealBusinessservice) {

		StringBuilder url = new StringBuilder(pgrConfiguration.getWfHost());
		url.append(pgrConfiguration.getWfBusinessServiceSearchPath());
		url.append("?tenantId=");
		url.append(tenantId);
		url.append("&businessServices=");
		url.append(appealBusinessservice);
		return url;
	}

	public List<ProcessInstance> getProcessInstances(Appeal appeal, RequestInfo requestInfo, boolean history) {

		StringBuilder url = new StringBuilder(pgrConfiguration.getWfHost());
		url.append(pgrConfiguration.getWfProcessInstanceSearchPath());
		url.append("?tenantId=");
		url.append(appeal.getTenantId());
		url.append("&businessIds=");
		url.append(appeal.getApplicationNumber());
		if (history) {
			url.append("&history=true");
		}
		RequestInfoWrapper requestInfoWrapper = RequestInfoWrapper.builder().requestInfo(requestInfo).build();
		ProcessInstanceResponse processInstanceResponse = null;
		try {
			Object response = repository.fetchResult(url, requestInfoWrapper);
			if (response != null)
				processInstanceResponse = mapper.convertValue(response, ProcessInstanceResponse.class);
		} catch (IllegalArgumentException e) {
			throw new CustomException("parsing_error", "Failed to parse response of calculate");
		}
		if (processInstanceResponse != null)
			return processInstanceResponse.getProcessInstances();

		return null;
	}

}
