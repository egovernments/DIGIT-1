/*#-------------------------------------------------------------------------------
# eGov suite of products aim to improve the internal efficiency,transparency, 
#    accountability and the service delivery of the government  organizations.
# 
#     Copyright (C) <2015>  eGovernments Foundation
# 
#     The updated version of eGov suite of products as by eGovernments Foundation 
#     is available at http://www.egovernments.org
# 
#     This program is free software: you can redistribute it and/or modify
#     it under the terms of the GNU General Public License as published by
#     the Free Software Foundation, either version 3 of the License, or
#     any later version.
# 
#     This program is distributed in the hope that it will be useful,
#     but WITHOUT ANY WARRANTY; without even the implied warranty of
#     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#     GNU General Public License for more details.
# 
#     You should have received a copy of the GNU General Public License
#     along with this program. If not, see http://www.gnu.org/licenses/ or 
#     http://www.gnu.org/licenses/gpl.html .
# 
#     In addition to the terms of the GPL license to be adhered to in using this
#     program, the following additional terms are to be complied with:
# 
# 	1) All versions of this program, verbatim or modified must carry this 
# 	   Legal Notice.
# 
# 	2) Any misrepresentation of the origin of the material is prohibited. It 
# 	   is required that all modified versions of this material be marked in 
# 	   reasonable ways as different from the original version.
# 
# 	3) This license does not grant any rights to any user of the program 
# 	   with regards to rights under trademark law for use of the trade names 
# 	   or trademarks of eGovernments Foundation.
# 
#   In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
#-------------------------------------------------------------------------------*/
$(document).ready(function(){
	var contractorSearch = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.value);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/egworks/letterofacceptance/ajaxcontractors-loa?name=%QUERY',
            filter: function (data) {
                return $.map(data, function (ct) {
                    return {
                        name: ct.name,
                        value: ct.id
                    };
                });
            }
        }
    });
   
	contractorSearch.initialize();
		var contractorSearch_typeahead = $('#contractorSearch').typeahead({ 
			hint : true,
			highlight : true,
			minLength : 3
		}, {
			displayKey : 'name',
			source : contractorSearch.ttAdapter()
		});
		typeaheadWithEventsHandling(contractorSearch_typeahead,
		'#contractor');
		
		if($('#tenderFinalizedPercentage').val() <= 0) 
			$('#tenderFinalizedPercentage').val('');
		if($('#workOrderAmount').val() <= 0) 
			$('#workOrderAmount').val('');
		if($('#securityDeposit').val() <= 0) 
			$('#securityDeposit').val('');
		if($('#emdAmountDeposited').val() <= 0) 
			$('#emdAmountDeposited').val('');
		if($('#defectLiabilityPeriod').val() <= 0) 
			$('#defectLiabilityPeriod').val('');
	
		$("form").submit(function() {
			if($('form').valid())	{
				$('.loader-class').modal('show', {backdrop: 'static'});
				loadDefaultsOnSubmit();
			}
			else 
				$('.loader-class').modal('hide');
		});
		
		function loadDefaultsOnSubmit()	{
			if($('#tenderFinalizedPercentage').val() == '' || $('#tenderFinalizedPercentage').val() < 0) 
				$('#tenderFinalizedPercentage').val(0);
			if($('#workOrderAmount').val() == '' || $('#workOrderAmount').val() < 0) 
				$('#workOrderAmount').val(0);
			if($('#securityDeposit').val() == '' || $('#securityDeposit').val() < 0) 
				$('#securityDeposit').val(0);
			if($('#emdAmountDeposited').val() == '' || $('#emdAmountDeposited').val() < 0) 
				$('#emdAmountDeposited').val(0);
			if($('#defectLiabilityPeriod').val() == '' || $('#defectLiabilityPeriod').val() < 0) 
				$('#defectLiabilityPeriod').val(0);
		 }
});