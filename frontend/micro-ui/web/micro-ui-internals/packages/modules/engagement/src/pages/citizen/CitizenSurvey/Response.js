import { Banner, Card, Loader, CardText, ActionBar, SubmitBar } from "@egovernments/digit-ui-react-components";
import { useQueryClient } from "react-query";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const getMessage = (mutation) => {
  if (mutation.isSuccess) return mutation.data?.Surveys?.[0]?.uuid;
  return "";
};

const BannerPicker = (props) => {
  const { t } = useTranslation();
  return (
    <Banner
      message={props.mutation.isSuccess ? t(`SURVEY_RESPONSE_SUBMITED`) : t("SURVEY_RESPONSE_FAILED")}
      applicationNumber={getMessage(props.mutation)}
      info={props.mutation.isSuccess ? t("SURVEY_FORM_ID") : ""}
      successful={props.mutation.isSuccess}
    />
  );
};

const Acknowledgement = (props) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const mutation = Digit.Hooks.survey.useSubmitResponse();
  const { state } = props.location;
  

  useEffect(() => {
    const onSuccess = () => {
      queryClient.clear();
    };
    mutation.mutate(state, {
      onSuccess,
    });
  }, []);

  if (mutation.isLoading && !mutation.isIdle) {
    return <Loader />;
  }

  const survey = mutation.data?.Surveys?.[0];
  
  return (
    <Card>
      <BannerPicker t={t} mutation={mutation} />
      <CardText>
        {mutation.isSuccess
          ? t(`SURVEY_FORM_CREATION_MESSAGE`, {
              surveyName: survey?.title,
              fromDate: Digit.DateUtils.ConvertTimestampToDate(survey?.startDate),
              toDate: Digit.DateUtils.ConvertTimestampToDate(survey?.endDate),
            })
          : null}
      </CardText>
      <ActionBar>
        <Link to={"/digit-ui/employee"}>
          <SubmitBar label={t("CORE_COMMON_GO_TO_HOME")} />
        </Link>
      </ActionBar>
    </Card>
  );
};

export default Acknowledgement;
