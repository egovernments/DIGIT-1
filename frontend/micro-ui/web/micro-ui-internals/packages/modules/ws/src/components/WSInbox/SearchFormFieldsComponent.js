import React, { Fragment } from "react";
import { CardLabelError, SearchField, TextInput, MobileNumber } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SearchFormFieldsComponents = ({ registerRef, searchFormState }) => {
  const { t } = useTranslation();

  return (
    <>
      <SearchField>
        <label>{t("WS_ACK_COMMON_APP_NO_LABEL")}</label>
        <TextInput name="applicationNumber" inputRef={registerRef({})} />
      </SearchField>
      <SearchField>
        <label>{t("WS_MYCONNECTIONS_CONSUMER_NO")}</label>
        <TextInput name="consumerNo" inputRef={registerRef({})} />
      </SearchField>
      <SearchField>
        <label>{t("CORE_COMMON_MOBILE_NUMBER")}</label>
        <MobileNumber
          name="mobileNumber"
          type="number"
          inputRef={registerRef({
            minLength: {
              value: 10,
              message: t("CORE_COMMON_MOBILE_ERROR"),
            },
            maxLength: {
              value: 10,
              message: t("CORE_COMMON_MOBILE_ERROR"),
            },
            pattern: {
              value: /[6789][0-9]{9}/,
              message: t("CORE_COMMON_MOBILE_ERROR"),
            },
          })}
        />
        {searchFormState?.errors?.["mobileNumber"]?.message ? (
          <CardLabelError>{searchFormState?.errors?.["mobileNumber"]?.message}</CardLabelError>
        ) : null}
      </SearchField>
    </>
  );
};

export default SearchFormFieldsComponents;
