package org.egov.pgr.web.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.pgr.service.appeal.AppealService;
import org.egov.pgr.util.ResponseInfoFactory;
import org.egov.pgr.web.models.RequestInfoWrapper;
import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealRequest;
import org.egov.pgr.web.models.appeal.AppealResponse;
import org.egov.pgr.web.models.appeal.AppealSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/appeal")
@Slf4j
public class AppealController {

	@Autowired
	private AppealService service;
	
	@Autowired
	private ResponseInfoFactory responseInfoFactory;

	@PostMapping(value = "/_create")
	public ResponseEntity<AppealResponse> createAppeal(@Valid @RequestBody AppealRequest request) {

		List<Appeal> appeals = new ArrayList<>();

		Appeal appeal = service.createAppeal(request);
		appeals.add(appeal);

		AppealResponse response = AppealResponse.builder()
				.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
				.appeals(appeals).build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping(value = "/_update")
	public ResponseEntity<AppealResponse> updateAppeal(@Valid @RequestBody AppealRequest request) {

		List<Appeal> appeals = new ArrayList<>();
		
		Appeal appeal = service.updateRequest(request);
		appeals.add(appeal);

		AppealResponse response = AppealResponse.builder()
				.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), true))
				.appeals(appeals).build();

		return new ResponseEntity<>(response, HttpStatus.OK);
	}
	
	@PostMapping(value = "/_search")
	public ResponseEntity<AppealResponse> searchAppeal(@Valid @RequestBody RequestInfoWrapper requestInfoWrapper,
			@Valid @ModelAttribute AppealSearchCriteria criteria) {

		List<Appeal> appeals = service.searchAppeal(criteria, requestInfoWrapper.getRequestInfo());

		AppealResponse response = AppealResponse
				.builder().responseInfo(responseInfoFactory
						.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
				.appeals(appeals).build();

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

}
