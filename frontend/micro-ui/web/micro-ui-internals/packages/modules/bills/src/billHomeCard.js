import { EmployeeModuleCard, CollectionIcon } from "@egovernments/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const BillsCard = () => {
  const { t } = useTranslation();

  const propsForModuleCard = {
    Icon: <CollectionIcon />,
    moduleName: t("ACTION_TEST_BILLGENIE"),
    links: [
      {
        label: t("ABG_SEARCH_BILL_COMMON_HEADER"),
        link: `/digit-ui/employee/bills/inbox`,
      },
      {
        label: t("ACTION_TEST_GROUP_BILLS"),
        link: `/digit-ui/employee/bills/group-bill`,
      }, {
        label: t("ABG_SEARCH_BILL_COMMON_HEADER"),
        link: `/digit-ui/employee/bills/search-bill`,
      },
      
    ],
  };
  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default BillsCard;