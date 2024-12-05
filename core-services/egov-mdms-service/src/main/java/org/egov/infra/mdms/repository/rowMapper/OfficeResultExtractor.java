package org.egov.infra.mdms.repository.rowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.egov.infra.mdms.dto.Office;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

@Component
public class OfficeResultExtractor  implements ResultSetExtractor<List<Office>> {

	@Override
	public List<Office> extractData(ResultSet rs) throws SQLException, DataAccessException {
		
		Map<String, Office> officeMap = new LinkedHashMap<>();
		while (rs.next()) {
			String code=rs.getString("code");
			Office office = Office.builder().id(rs.getLong("id")).code(rs.getString("code")).organizationId(rs.getLong("organization_id"))
					.name(rs.getString("name")).description(rs.getString("description"))
					.emailId(rs.getString("email_id")).telephoneNumber(rs.getString("telephone_number"))
					.officeAddress(rs.getString("office_address")).district(rs.getString("district")).subDistrict(rs.getString("sub_district"))
					.state(rs.getString("state")).pin(rs.getString("pin")).status(rs.getString("status"))
					.HeadOfficeCode(rs.getString("Head_office_code")).headOffice(rs.getBoolean("Head_office")).build();
			
			officeMap.put(code, office);
		}
		 
		return new ArrayList<>(officeMap.values());
	}
}
