package org.egov.pgr.service.appeal;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.producer.Producer;
import org.egov.pgr.repository.appeal.AppealRepository;
import org.egov.pgr.util.appeal.AppealUtils;
import org.egov.pgr.validator.appeal.AppealValidator;
import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.pgr.web.models.appeal.AppealSearchCriteria;
import org.egov.pgr.web.models.workflow.Action;
import org.egov.pgr.web.models.workflow.BusinessService;
import org.egov.pgr.web.models.workflow.ProcessInstance;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AppealService {

	@Autowired
	private AppealValidator validator;

	@Autowired
	private AppealEnrichmentService enrichmentService;

	@Autowired
	private AppealWorkflowService workflowService;

	@Autowired
	private Producer producer;

	@Autowired
	private PGRConfiguration config;

	@Autowired
	private AppealRepository repository;

	@Autowired
	private AppealUtils util;

	public Appeal createAppeal(@Valid AppealRequest request) {

		validator.validateCreateAppealRequest(request);

		enrichmentService.enrichCreateRequest(request);

		workflowService.updateWorkflowStatus(request);

		producer.pushAppealRequest(request, config.getCreateAppealTopic());

		return request.getAppeal();
	}

	public Appeal updateRequest(@Valid AppealRequest request) {

		AppealSearchCriteria criteria = AppealSearchCriteria.builder().ids(Arrays.asList(request.getAppeal().getId()))
				.build();

		List<Appeal> appealsFromDB = searchAppeal(criteria, request.getRequestInfo());

		if (ObjectUtils.isEmpty(appealsFromDB) || appealsFromDB.size() > 1) {
			throw new CustomException("update_error", "Either no or multiple applications found for this request !");
		}

		enrichmentService.enrichUpdateRequest(request);
		
		assignRequestToRandomEmployee(request);

		workflowService.updateWorkflowStatus(request);

		producer.pushAppealRequest(request, config.getUpdateAppealTopic());

		return request.getAppeal();
	}

	public List<Appeal> searchAppeal(@Valid AppealSearchCriteria criteria, @NonNull RequestInfo requestInfo) {

		validator.validateSearchRequest(criteria);

		return repository.getAppealsFromDataBase(criteria);
	}
	
	private void assignRequestToRandomEmployee(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();

		RequestInfo requestInfo = request.getRequestInfo();

		BusinessService businessService = workflowService.getBusinessService(request);

		if (appeal.getWorkflow().getAction().equalsIgnoreCase("APPLY")) {

			if (CollectionUtils.isEmpty(appeal.getWorkflow().getAssignes())) {

				List<ProcessInstance> processInstances = workflowService.getProcessInstances(appeal, requestInfo,
						false);
				List<Action> actions = processInstances.get(0).getState().getActions().stream()
						.collect(Collectors.toList());

				String actionFromRequest = appeal.getWorkflow().getAction();

				List<Action> action = actions.stream().filter(a -> a.getAction().equalsIgnoreCase(actionFromRequest))
						.collect(Collectors.toList());

				String roles = util.getNextValidUserUUIDByNextState(action.get(0).getNextState(), businessService,
						requestInfo);

				log.info("@Method: assignRequestToRandomEmployee, roles applicable: " + roles);

				List<String> nextAssignees = util.getNextValidUserUUID(roles, appeal.getTenantId(), true, requestInfo);

				log.info("@Method: assignRequestToRandomEmployee, probable nextAssignees: " + nextAssignees);

				String assigneeKey = util.getRandomValue(nextAssignees);

				log.info("@Method: assignRequestToRandomEmployee, : final Assignee " + assigneeKey);
				appeal.getWorkflow().setAssignes(Arrays.asList(assigneeKey));
			}
		}
	}

}
