package org.egov.infra.mdms.controller;

import org.egov.infra.mdms.model.EntityRequest;
import org.egov.infra.mdms.service.MDMSAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping(value = "/v1")
public class MDMSAdminController {
	
	@Autowired
	private MDMSAdminService adminService;

	@PostMapping("{entity}/_create")
	private ResponseEntity<String> create(@PathVariable("entity") String entity, @RequestBody EntityRequest request) {
		adminService.create(entity, request);
		return new ResponseEntity<>("Successfully created!", HttpStatus.CREATED);
	}
	
	@PostMapping("{entity}/_update")
	private ResponseEntity<String> update(@PathVariable("entity") String entity, @RequestBody EntityRequest request) {
		adminService.update(entity, request);
		return new ResponseEntity<>("Updated Successfully!", HttpStatus.OK);
	}
}
