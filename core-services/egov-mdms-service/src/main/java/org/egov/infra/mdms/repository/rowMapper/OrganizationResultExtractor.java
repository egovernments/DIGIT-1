package org.egov.infra.mdms.repository.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.infra.mdms.dto.AuditInfo;
import org.egov.infra.mdms.dto.Organization;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class OrganizationResultExtractor  implements ResultSetExtractor<List<Organization>> {

	@Override
	public List<Organization> extractData(ResultSet rs) throws SQLException, DataAccessException {
		
		Map<String, Organization> orgMap = new LinkedHashMap<>();
		while (rs.next()) {
			String code=rs.getString("code");
			Organization org = Organization.builder().id(rs.getLong("id")).code(rs.getString("code"))
					.name(rs.getString("name")).description(rs.getString("description"))
					.hod(rs.getString("hod")).emailId(rs.getString("email_id")).telephoneNumber(rs.getString("telephone_number"))
					.address(rs.getString("address")).district(rs.getString("district")).subDistrict(rs.getString("sub_district"))
					.state(rs.getString("state")).pin(rs.getString("pin")).status(rs.getString("status")).build();
			
			orgMap.put(code, org);
		}
		 
		return new ArrayList<>(orgMap.values());
	}

}
