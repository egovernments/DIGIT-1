import { fetchData } from "./citizenSearchResource/citizenFunctions";
import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";

const header = getCommonHeader(
  {
    labelName: "My Applications",
    labelKey: "TL_MY_APPLICATIONS"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const screenConfig = {
  uiFramework: "material-ui",
  name: "my-applications",
  beforeInitScreen: (action, state, dispatch) => {
    fetchData(action, state, dispatch, true);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      children: {
        header: header,
        applicationsCard: {
          uiFramework: "custom-molecules",
          componentPath: "SingleApplication",
          visible: true,
          props: {
            contents: [
              {
                label: "TL_COMMON_TABLE_COL_OWN_NAME",
                jsonPath: "tradeLicenseDetail.owners[0].name"
              },
              {
                label: "TL_COMMON_TABLE_COL_APP_NO",
                jsonPath: "applicationNumber"
              },

              {
                label: "BPA_LICENSEE_TYPE_LABEL",
                jsonPath: "tradeLicenseDetail.tradeUnits[0].tradeType",
                prefix: "TRADELICENSE_TRADETYPE_",
                suffix: "_VIEW"
              },
              {
                label: "BPA_COMMON_TABLE_COL_LIC_NO",
                jsonPath: "licenseNumber"
              },
              {
                label: "TL_COMMON_TABLE_COL_STATUS",
                jsonPath: "status",
                prefix: "WF_ARCHITECT_"
              }
            ],
            moduleName: "BPAREG",
            homeURL: "/bpastakeholder-citizen/home"
          }
        }
      }
    }
  }
};

export default screenConfig;
