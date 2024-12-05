package org.egov.pgr.repository.appeal;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.pgr.web.models.appeal.Appeal;
import org.egov.pgr.web.models.appeal.AppealSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class AppealRepository {
	
	@Autowired
	private AppealQueryBuilder queryBuilder;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public List<Appeal> getAppealsFromDataBase(@Valid AppealSearchCriteria criteria) {
		
		List<Object> preparedStmtList = new ArrayList<>();
		String query = queryBuilder.getAppealSearchQuery(criteria, preparedStmtList);
		log.info("query inside method getAppealsFromDataBase:" + query);
		log.info("prepareStmtList:" + preparedStmtList);
		List<Appeal> appeals = jdbcTemplate.query(query, preparedStmtList.toArray(), new AppealRowMapper());
		return appeals;
	}

}
