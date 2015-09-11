/**
 * eGov suite of products aim to improve the internal efficiency,transparency,
   accountability and the service delivery of the government  organizations.

    Copyright (C) <2015>  eGovernments Foundation

    The updated version of eGov suite of products as by eGovernments Foundation
    is available at http://www.egovernments.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see http://www.gnu.org/licenses/ or
    http://www.gnu.org/licenses/gpl.html .

    In addition to the terms of the GPL license to be adhered to in using this
    program, the following additional terms are to be complied with:

	1) All versions of this program, verbatim or modified must carry this
	   Legal Notice.

	2) Any misrepresentation of the origin of the material is prohibited. It
	   is required that all modified versions of this material be marked in
	   reasonable ways as different from the original version.

	3) This license does not grant any rights to any user of the program
	   with regards to rights under trademark law for use of the trade names
	   or trademarks of eGovernments Foundation.

  In case of any queries, you can reach eGovernments Foundation at contact@egovernments.org.
 */
package org.egov.works.web.actions.masters;

import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.egov.infra.web.struts.actions.BaseFormAction;
import org.egov.infstr.services.PersistenceService;
import org.egov.works.models.masters.ScheduleCategory;

@ParentPackage("egov")
@Result(name = ScheduleCategoryAction.NEW, location = "scheduleCategory-new.jsp")
public class ScheduleCategoryAction extends BaseFormAction {

    private static final long serialVersionUID = 8722637434208106061L;
    private PersistenceService<ScheduleCategory, Long> scheduleCategoryService;
    private ScheduleCategory scheduleCategoryInstance = new ScheduleCategory();
    private List<ScheduleCategory> scheduleCategoryList = null;

    @Override
    public String execute() {
        return list();
    }

    @Action(value = "/masters/scheduleCategory-newform")
    public String newform() {
        return NEW;
    }

    public String list() {
        scheduleCategoryList = scheduleCategoryService.findAllBy("from ScheduleCategory sc");
        return NEW;
    }

    public String edit() {
        scheduleCategoryInstance = scheduleCategoryService.findById(scheduleCategoryInstance.getId(), false);
        return EDIT;
    }

    @Override
    public void prepare() {
        scheduleCategoryList = scheduleCategoryService.findAllBy("from ScheduleCategory sc");
        super.prepare();
    }

    public String save() {
        scheduleCategoryService.update(scheduleCategoryInstance);
        return SUCCESS;
    }

    public String create() {
        scheduleCategoryService.create(scheduleCategoryInstance);
        addActionMessage("The Category Code for ScheduleCategory was saved successfully");

        return list();
    }

    @Override
    public Object getModel() {
        return scheduleCategoryInstance;
    }

    public List<ScheduleCategory> getScheduleCategoryList() {
        return scheduleCategoryList;
    }

    public void setScheduleCategoryList(final List<ScheduleCategory> scheduleCategoryList) {
        this.scheduleCategoryList = scheduleCategoryList;
    }

    public void setScheduleCategoryService(final PersistenceService<ScheduleCategory, Long> service) {
        scheduleCategoryService = service;
    }

    public PersistenceService<ScheduleCategory, Long> getScheduleCategoryService() {
        return scheduleCategoryService;
    }

    public ScheduleCategory getScheduleCategoryInstance() {
        return scheduleCategoryInstance;
    }

    public void setScheduleCategoryInstance(
            final ScheduleCategory scheduleCategoryInstance) {
        this.scheduleCategoryInstance = scheduleCategoryInstance;
    }
}