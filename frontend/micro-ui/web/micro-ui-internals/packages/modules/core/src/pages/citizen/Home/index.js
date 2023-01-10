import {
  Calender,
  CardBasedOptions,
  CaseIcon,
  ComplaintIcon,
  DocumentIcon,
  HomeIcon,
  Loader,
  OBPSIcon,
  PTIcon,
  StandaloneSearchBar,
  WhatsNewCard,
} from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
const Home = () => {
  const { t } = useTranslation();
  const history = useHistory(); 
  const tenantId = Digit.ULBService.getCitizenCurrentTenant(true);
  const { data: { stateInfo } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const [isLoaderOn, setIsLoaderOn] = useState(false);
  const conditionsToDisableNotificationCountTrigger = () => {
    if (Digit.UserService?.getUser()?.info?.type === "EMPLOYEE") return false;
    if (!Digit.UserService?.getUser()?.access_token) return false;
    return true;
  };

  const { data: EventsData, isLoading: EventsDataLoading } = Digit.Hooks.useEvents({
    tenantId,
    variant: "whats-new",
    config: {
      enabled: conditionsToDisableNotificationCountTrigger(),
    },
  });
  const redirectLoading = () => {
    setIsLoaderOn(true);
  }

  if (!tenantId) {
    history.push(`/digit-ui/citizen/select-location`);
  }

  const allCitizenServicesProps = {
    header: t("DASHBOARD_CITIZEN_SERVICES_LABEL"),
    sideOption: {
      name: t("DASHBOARD_VIEW_ALL_LABEL"),
      onClick: () => history.push("/digit-ui/citizen/all-services"),
    },
    options: [
      {
        name: t("ES_PGR_HEADER_COMPLAINT"),
        Icon: <ComplaintIcon />,
        onClick: () => history.push("/digit-ui/citizen/pgr-home"),
      },
      {
        // name: t("MODULE_PT"),
        name: "Application for  Electrical Plan",
        Icon: <PTIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/electricalPlan"),
        // onClick: () => history.push("/digit-ui/citizen/pt-home"),
      },
      {
        // name: t("MODULE_TL"),
        name: "Application for  Service Plan",
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/servicePlan"),
        // onClick: () => history.push("/digit-ui/citizen/tl-home"),
      },
      {
        name: "Licencing Services",
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/card"),
      },
      {
        name: t("CS_COMMON_INBOX_BPA"),
        Icon: <OBPSIcon />,
        onClick: () => history.push("/digit-ui/citizen/obps-home"),
      },
      {
        name: t("PROVIDE_LICENSE_TYPE"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/stakeholder/apply/provide-license-type"),
      },
      {
        name: t("PROVIDE_LICENSE_DETAILS"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/stakeholder/apply/license-details"),
      },
      {
        name: t("ADD_AUTHORIZED_USER"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/stakeholder/apply/add-authorized-user"),
      },
      {
        name: t("DEVELOPER_CAPACITY"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/stakeholder/apply/developer-capacity"),
      },
      {
        name: t("STAKEHOLDER_DOCUMENT_DETAILS"),
        Icon: <CaseIcon className="fill-path-primary-main" />,
        onClick: () => history.push("/digit-ui/citizen/obps/stakeholder/apply/stakeholder-document-details"),
      },
      // {
      //   name: t("REDIRCT"),
      //   Icon: <CaseIcon className="fill-path-primary-main" />,
      //   onClick: () => redirectLoading(),
      // },

    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };
  const allInfoAndUpdatesProps = {
    header: t("CS_COMMON_DASHBOARD_INFO_UPDATES"),
    sideOption: {
      name: t("DASHBOARD_VIEW_ALL_LABEL"),
      onClick: () => {},
    },
    options: [
      {
        name: t("CS_HEADER_MYCITY"),
        Icon: <HomeIcon />,
      },
      {
        name: t("EVENTS_EVENTS_HEADER"),
        Icon: <Calender />,
        onClick: () => history.push("/digit-ui/citizen/engagement/events"),
      },
      {
        name: t("CS_COMMON_DOCUMENTS"),
        Icon: <DocumentIcon />,
        onClick: () => history.push("/digit-ui/citizen/engagement/docs"),
      },
      {
        name: t("CS_COMMON_SURVEYS"),
        Icon: <DocumentIcon />,
        onClick: () => history.push("/digit-ui/citizen/engagement/surveys/list"),
      },
      // {
      //     name: t("CS_COMMON_HELP"),
      //     Icon: <HelpIcon/>
      // }
    ],
    styles: { display: "flex", flexWrap: "wrap", justifyContent: "flex-start", width: "100%" },
  };

  return isLoading ? (
    <Loader />
  ) : (
    
    <div>
      {isLoaderOn ? (
        <div className="loader-container">
      	  <div className="spinners"></div>
          <div className="redirect-text">
            <h4>Redirecting</h4>
          </div>
        </div>
      ) : (
      <div className="HomePageWrapper">
        
        <div className="BannerWithSearch">
          {/* <img src={stateInfo?.bannerUrl} /> */}
          {/* <img src={"http://filesuploadbucket1aws.s3.amazonaws.com/tcp-haryana/bg-login.jpg"} /> */}
          <div className="Search">
            <StandaloneSearchBar placeholder={t("CS_COMMON_SEARCH_PLACEHOLDER")} />
          </div>
        </div>

        <div className="ServicesSection">
          <CardBasedOptions {...allCitizenServicesProps} />
          <CardBasedOptions {...allInfoAndUpdatesProps} />
        </div>

        {conditionsToDisableNotificationCountTrigger() ? (
          EventsDataLoading ? (
            <Loader />
          ) : (
            <div className="WhatsNewSection">
              <div className="headSection">
                <h2>{t("DASHBOARD_WHATS_NEW_LABEL")}</h2>
                <p onClick={() => history.push("/digit-ui/citizen/engagement/whats-new")}>{t("DASHBOARD_VIEW_ALL_LABEL")}</p>
              </div>
              <WhatsNewCard {...EventsData?.[0]} />
            </div>
          )
        ) : null}
      </div>
      )}
    </div>
  );
};

export default Home;
