package org.egov.pgr.service.appeal;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.egov.common.contract.request.RequestInfo;
import org.egov.pgr.config.PGRConfiguration;
import org.egov.pgr.repository.IdGenRepository;
import org.egov.pgr.util.appeal.AppealConstants;
import org.egov.pgr.util.appeal.AppealUtils;
import org.egov.pgr.web.models.AuditDetails;
import org.egov.pgr.web.models.Idgen.IdResponse;
import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AppealEnrichmentService {

	@Autowired
	private AppealUtils utils;
	
	@Autowired
	private PGRConfiguration config;
	
	@Autowired
	private IdGenRepository idGenRepository;

	public void enrichCreateRequest(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();

		RequestInfo requestInfo = request.getRequestInfo();

		if (StringUtils.isEmpty(appeal.getBusinessService()))
			appeal.setBusinessService(AppealConstants.APPEAL_BUSINESSSERVICE);

		if (StringUtils.isEmpty(appeal.getAccountId()))
			appeal.setAccountId(requestInfo.getUserInfo().getUuid());

		// Get Application Number from IDGEN
		List<String> customIds = getIdList(requestInfo,appeal.getTenantId(),config.getAppealFormatName(),config.getAppealFormat(),1);
		
		appeal.setApplicationNumber(customIds.get(0));

		AuditDetails auditDetails = utils.getAuditDetails(requestInfo.getUserInfo().getUuid(), appeal, true);
		appeal.setAuditDetails(auditDetails);
		
		appeal.setId(UUID.randomUUID().toString());

	}

	private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idKey,
			String idformat, int count) {

		 List<IdResponse> idResponses = idGenRepository.getId(requestInfo, tenantId, idKey, idformat, count).getIdResponses();

	        if (CollectionUtils.isEmpty(idResponses))
	            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

	        return idResponses.stream()
	                .map(IdResponse::getId).collect(Collectors.toList());
	}

	public void enrichUpdateRequest(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();

		RequestInfo requestInfo = request.getRequestInfo();

		AuditDetails auditDetails = utils.getAuditDetails(requestInfo.getUserInfo().getUuid(), appeal, false);
		appeal.setAuditDetails(auditDetails);

		if (!CollectionUtils.isEmpty(appeal.getDocuments())) {
			appeal.getDocuments().forEach(item -> {
				if (StringUtils.isEmpty(item.getId())) {
					item.setId(UUID.randomUUID().toString());
				}
			});
		}
	}

}
