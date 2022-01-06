package org.egov.common.domain.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Attribute {

	public static final String DATATYPE = "String";

//	not used
	@JsonProperty("variable")
	private Boolean variable;

//	not used
	@JsonProperty("code")
	private String code;

//	not used
	@JsonProperty("datatype")
	private String datatype;

//	not used
	@JsonProperty("required")
	private Boolean required;

//	not used
	@JsonProperty("datatypeDescription")
	private String datatypeDescription;

	@JsonProperty("values")
	private List<Value> values;

	public static Attribute asStringAttr(String code, String value) {
		List<Value> valueList = new ArrayList<>();
		valueList.add(new Value(code, value));
		return new Attribute(Boolean.TRUE, code, DATATYPE, Boolean.FALSE, StringUtils.EMPTY, valueList);
	}

}