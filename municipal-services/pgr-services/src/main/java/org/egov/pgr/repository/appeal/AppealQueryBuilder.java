package org.egov.pgr.repository.appeal;

import java.util.List;

import javax.validation.Valid;

import org.egov.pgr.web.models.appeal.AppealSearchCriteria;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

@Component
public class AppealQueryBuilder {

	private static String SEARCH_APPEAL_QUERY = " select appeal.id as appeal_id, appeal.tenantid as appeal_tenantid, grievanceid as appeal_grievanceid, appeal.comments as appeal_comments, appeal.businessservice as appeal_wf, appeal.additionaldetails as appeal_additiondetails, appeal.status as appeal_status, appeal.applicationo as appeal_appno, appeal.accountid as appeal_accountid, appeal.createdby as appeal_createdby, appeal.createdtime as appeal_createdtime, appeal.lastmodifiedby as appeal_lastmodifiedby, appeal.lastmodifiedtime  as appeal_lastmodifiedtime, doc.id as doc_id, doc.documenttype as doc_documenttype, doc.filestoreid as doc_filestoreid, doc.active as doc_active, doc.additionaldetails as doc_additionaldetails "
			+ "from eg_pgr_appeal appeal " + "left outer join eg_pgr_appeal_document doc on doc.appealid = appeal.id ";

	public String getAppealSearchQuery(@Valid AppealSearchCriteria criteria, List<Object> preparedStmtList) {

		StringBuilder query = new StringBuilder(SEARCH_APPEAL_QUERY);

		if (!ObjectUtils.isEmpty(criteria.getTenantId())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.tenantid = ? ");
			preparedStmtList.add(criteria.getTenantId());
		}

		if (!ObjectUtils.isEmpty(criteria.getApplicationNumber())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.applicationo = ? ");
			preparedStmtList.add(criteria.getApplicationNumber());
		}

		if (!ObjectUtils.isEmpty(criteria.getGrievanceId())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.grievanceid = ? ");
			preparedStmtList.add(criteria.getGrievanceId());
		}

		if (!ObjectUtils.isEmpty(criteria.getStatus())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.status = ? ");
			preparedStmtList.add(criteria.getStatus());
		}

		if (!ObjectUtils.isEmpty(criteria.getFromDate())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.createdtime >= ? ");
			preparedStmtList.add(criteria.getFromDate());
		}

		if (!ObjectUtils.isEmpty(criteria.getToDate())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.createdtime <= ? ");
			preparedStmtList.add(criteria.getToDate());
		}

		List<String> ids = criteria.getIds();
		if (!CollectionUtils.isEmpty(ids)) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.id IN (").append(createQuery(ids)).append(")");
			addToPreparedStatement(preparedStmtList, ids);
		}

		if (!ObjectUtils.isEmpty(criteria.getAccountId())) {
			addClauseIfRequired(preparedStmtList, query);
			query.append(" appeal.accountid = ? ");
			preparedStmtList.add(criteria.getAccountId());
		}
		return query.toString();
	}

	private void addClauseIfRequired(List<Object> values, StringBuilder queryString) {
		if (values.isEmpty())
			queryString.append(" WHERE ");

		else {
			queryString.append(" AND");
		}
	}

	private Object createQuery(List<String> ids) {
		StringBuilder builder = new StringBuilder();
		int length = ids.size();
		for (int i = 0; i < length; i++) {
			builder.append(" ?");
			if (i != length - 1)
				builder.append(",");
		}
		return builder.toString();
	}

	private void addToPreparedStatement(List<Object> preparedStmtList, List<String> ids) {
		ids.forEach(id -> {
			preparedStmtList.add(id);
		});

	}
}
