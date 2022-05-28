import { CardLabel, Dropdown, LabelFieldPair, LinkButton, TextInput, CardLabelError } from "@egovernments/digit-ui-react-components";
import _ from "lodash";
import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { stringReplaceAll } from "../utils";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const createRoadCuttingDetails = () => ({
  roadType: { code: "", value: "", i18nKey: "" },
  area: "",
  key: Date.now(),
});

const WSRoadCuttingDetails = ({ config, onSelect, userType, formData, setError, formState, clearErrors }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isEditScreen = pathname.includes("/modify-application/" ) 

  const stateCode = Digit.ULBService.getStateId();
  const { isMdmsLoading, data: mdmsData } = Digit.Hooks.ws.useMDMS(stateCode, "sw-services-calculation", ["RoadType"]);
  
  const [roadCuttingDetails, setRoadCuttingDetails] = useState(formData?.roadCuttingDetails || [createRoadCuttingDetails()]);
  const [focusIndex, setFocusIndex] = useState({ index: -1, type: "" });

  const addroadCutt = () => {
    const newRoadCutting = createRoadCuttingDetails();
    setRoadCuttingDetails((prev) => [...prev, newRoadCutting]);
  };

  const removeroadCutt = (roadCutt) => {
    setRoadCuttingDetails((prev) => prev.filter((o) => o.key != roadCutt.key));
  };

  useEffect(() => {
    onSelect(config?.key, roadCuttingDetails);
  }, [roadCuttingDetails]);

  const commonProps = {
    focusIndex,
    allRoadCuttingDetails: roadCuttingDetails,
    setFocusIndex,
    removeroadCutt,
    formData,
    formState,
    setRoadCuttingDetails,
    mdmsData,
    t,
    setError,
    clearErrors,
    config,
    isEditScreen,
  };
  
  if (isMdmsLoading) return <Loader />

  return (
    <React.Fragment>
      {roadCuttingDetails.map((roadCutt, index) => (
        <RoadCuttForm key={roadCutt.key} index={index} roadCutt={roadCutt} {...commonProps} />
      ))}
      <LinkButton label={t("WS_ADD_ROAD_TYPE")} onClick={addroadCutt} style={{ color: "orange", display: "inline-block" }} /> 
    </React.Fragment>
  );
};

const RoadCuttForm = (_props) => {
  const {
    roadCutt,
    index,
    focusIndex,
    allRoadCuttingDetails,
    setFocusIndex,
    removeroadCutt,
    formData,
    formState,
    setRoadCuttingDetails,
    mdmsData,
    t,
    setError,
    clearErrors,
    config,
    isEditScreen,
  } = _props;

  const { control, formState: localFormState, watch, setError: setLocalError, clearErrors: clearLocalErrors, setValue, trigger } = useForm();
  const formValue = watch();
  const { errors } = localFormState;

  const roadCuttingTypeMenu = useMemo(() => {
    const RoadTypes = mdmsData?.["sw-services-calculation"]?.RoadType || [];
    RoadTypes?.forEach(data => data.i18nKey = `WS_ROADTYPE_${stringReplaceAll(data?.code?.toUpperCase(), " ", "_")}`);
    return RoadTypes;
  }, [mdmsData]);

  useEffect(() => {
    trigger();
  }, []);
  
  const [part, setPart] = React.useState({});

  useEffect(() => {    
    if (!_.isEqual(part, formValue)) {
      setPart({...formValue});
      setRoadCuttingDetails((prev) => prev.map((o) => (o.key && o.key === roadCutt.key ? { ...o, ...formValue } : { ...o })));
      trigger();
    }
  }, [formValue]);

  useEffect(() => {
    if (Object.keys(errors).length && !_.isEqual(formState.errors[config.key]?.type || {}, errors)) setError(config.key, { type: errors });
    else if (!Object.keys(errors).length && formState.errors[config.key]) clearErrors(config.key);
  }, [errors]);

  const errorStyle = { width: "70%", marginLeft: "30%", fontSize: "12px", marginTop: "-21px" };

  return (
    <React.Fragment>
      <div style={{ marginBottom: "16px" }}>
        <div className="label-field-pair">
          <h2 className="card-label card-label-smaller" style={{ color: "#505A5F" }}>
            {t("WS_COMMON_ROAD_CUTTING_DETAILS")} {allRoadCuttingDetails?.length > 1 ? index + 1 : null}
          </h2>
        </div>
        <div style={{ border: "1px solid #E3E3E3", padding: "16px", marginTop: "8px" }}>
          {allRoadCuttingDetails?.length > 1 ? (
            <div onClick={() => removeroadCutt(roadCutt)} style={{ marginBottom: "16px", padding: "5px", cursor: "pointer", textAlign: "right" }}>
              X
            </div>
          ) : null}

          <React.Fragment>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("WS_ROAD_TYPE") + " *"}</CardLabel>
              <Controller
                control={control}
                name={"roadType"}
                defaultValue={isEditScreen ? {
                  active: true,
                  code: roadType?.code,
                  i18nKey: `COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(roadType?.code || "")}`,
                  name: t(`COMMON_MASTERS_OWNERSHIPCATEGORY_${stringReplaceAll(roadType?.code || "")}`),
                } : null}
                rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                render={(props) => (
                  <Dropdown
                    className="form-field"
                    selected={props.value}
                    select={props.onChange}
                    onBlur={props.onBlur}
                    option={roadCuttingTypeMenu}
                    optionKey="i18nKey"
                    disable={isEditScreen}
                    t={t}
                  />
                )}
              />
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched?.roadType ? errors?.roadType?.message : ""}
            </CardLabelError>
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("WS_AREA_SQ_FT") + " *"}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"area"}
                  defaultValue={isEditScreen ? area : null}
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: {
                      pattern: (e) => (/^[0-9]{1,10}$/i.test(e) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")),
                    },
                  }}
                  render={(props) => (
                    <TextInput
                      value={props.value}
                      disable={isEditScreen}
                      autoFocus={focusIndex.index === roadCutt.key && focusIndex.type === "area"}
                      onChange={(e) => {
                        props.onChange(e.target.value);
                        setFocusIndex({ index: roadCutt.key, type: "area"});
                      }}
                      onBlur={(e) => {
                        setFocusIndex({ index: -1 });
                        props.onBlur(e);
                      }}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <CardLabelError style={errorStyle}>
              {localFormState.touched?.area ? errors?.area?.message : ""}
            </CardLabelError>
          </React.Fragment>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WSRoadCuttingDetails;