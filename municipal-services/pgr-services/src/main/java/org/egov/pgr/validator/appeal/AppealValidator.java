package org.egov.pgr.validator.appeal;

import javax.validation.Valid;

import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.pgr.web.models.appeal.AppealSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class AppealValidator {

	public void validateCreateAppealRequest(@Valid AppealRequest request) {

		Appeal appeal = request.getAppeal();

		if (ObjectUtils.isEmpty(appeal)) {
			throw new CustomException("create_error", "Appeal Object is empty !");
		}

		if (StringUtils.isEmpty(appeal.getComments()) || StringUtils.isEmpty(appeal.getGrievanceId())
				|| StringUtils.isEmpty(appeal.getTenantId())) {
			throw new CustomException("create_error", "Either comments, Grievance Id and TenantId !");
		}

		// TODO : validate if the Grievance Id present in DB or not, if not then throw
		// error

	}

	public void validateSearchRequest(@Valid AppealSearchCriteria criteria) {

		if (StringUtils.isEmpty(criteria.getApplicationNumber()) && StringUtils.isEmpty(criteria.getGrievanceId())
				&& StringUtils.isEmpty(criteria.getTenantId()) && StringUtils.isEmpty(criteria.getStatus())
				&& criteria.getFromDate() == null && criteria.getToDate() == null
				&& ObjectUtils.isEmpty(criteria.getIds()) && StringUtils.isEmpty(criteria.getAccountId())) {
			throw new CustomException("search_error", "Kindly provide at least one criteria to search !");
		}

	}

}
