package org.egov.egf.master.web.contract ;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

//sortby and ids are only used
public class FunctionarySearchContract extends FunctionaryContract { private String ids;
private String  sortBy; 
private Integer pageSize; 
private Integer offset; 
} 