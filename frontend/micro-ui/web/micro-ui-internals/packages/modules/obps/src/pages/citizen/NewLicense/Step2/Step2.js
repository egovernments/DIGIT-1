import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FileUpload from "@mui/icons-material/FileUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import WorkingTable from "../../../../components/Table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { VALIDATION_SCHEMA, MODAL_VALIDATION_SCHEMA } from "../../../../utils/schema/step2";
import ReactMultiSelect from "../../../../../../../react-components/src/atoms/ReactMultiSelect";
import Spinner from "../../../../components/Loader";
import { getDocShareholding } from "../docView/docView.help";
import { convertEpochToDate } from "../../../../../../tl/src/utils";
import { useLocation } from "react-router-dom";
import { Toast } from "@egovernments/digit-ui-react-components";

const ApllicantPuropseForm = (props) => {
  const datapost = {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: "v1",
      ts: 0,
      action: "_search",
      did: "",
      key: "",
      msgId: "090909",
      requesterId: "",
      authToken: "",
    },
  };
  const columns = [
    {
      title: "District",
      render: (data) => (data?.district ? data?.district : "N/A"),
    },
    {
      title: "Development Plan",
      render: (data) => (data?.developmentPlan ? data?.developmentPlan : "N/A"),
    },
    {
      title: "Zone",
      render: (data) => (data?.potential ? data?.potential : "N/A"),
    },
    {
      title: "Sector",
      render: (data) => (data?.sector ? data?.sector : "N/A"),
    },
    {
      title: "Tehsil",
      render: (data) => (data?.tehsil ? data?.tehsil : "N/A"),
    },
    {
      title: "Revenue Estate",
      render: (data) => (data?.revenueEstate ? data?.revenueEstate : "N/A"),
    },
    {
      title: "Hadbast No.",
      render: (data) => (data?.hadbastNo ? data?.hadbastNo : "N/A"),
    },
    {
      title: "Rectangle No.",
      render: (data) => (data?.rectangleNo ? data?.rectangleNo : "N/A"),
    },
    {
      title: "Khasra No.",
      render: (data) => (data?.khewats ? data?.khewats : "N/A"),
    },
    {
      key: "landOwner",
      title: "Name of Land Owner",
      dataIndex: "landOwner",
      render: (data) => (
        <h6 data-toggle="tooltip" data-placement="top" title={data}>
          {data?.split(" ")?.slice(0, 2)?.join(" ") + "..."}
        </h6>
      ),
    },
    {
      title: "Type of land",
      render: (data) => (data?.typeLand ? data?.typeLand : "N/A"),
    },
    {
      title: "change in information",
      render: (data) => (data?.isChange ? data?.isChange : "N/A"),
    },
    {
      title: "Rectangle No./Mustil(Changed)",
      render: (data) => (data?.editRectangleNo ? data?.editRectangleNo : "N/A"),
    },
    {
      title: "Khasra Number(Changed)",
      render: (data) => (data?.editKhewats ? data?.editKhewats : "N/A"),
    },
    {
      title: "Name of the Land Ower as per Mutation/Jamabandi",
      render: (data) => (data?.landOwnerRegistry ? data?.landOwnerRegistry : "N/A"),
    },
    {
      title: "Whether Khasra been developed in collaboration",
      render: (data) => (data?.collaboration ? data?.collaboration : "N/A"),
    },
    {
      title: "Name of the developer company",
      render: (data) => (data?.developerCompany ? data?.developerCompany : "N/A"),
    },
    {
      title: "Date of registering collaboration agreement",
      render: (data) => (data?.agreementValidFrom ? data?.agreementValidFrom : "N/A"),
    },
    {
      title: "Whether collaboration agreement irrevocable (Yes/No)",
      render: (data) => (data?.agreementIrrevocialble ? data?.agreementIrrevocialble : "N/A"),
    },
    {
      title: "Name of authorized signatory on behalf of land owner(s)",
      render: (data) => (data?.authSignature ? data?.authSignature : "N/A"),
    },
    {
      title: "Name of authorized signatory on behalf of developer",
      render: (data) => (data?.nameAuthSign ? data?.nameAuthSign : "N/A"),
    },
    {
      title: "Registering Authority",
      render: (data) => (data?.registeringAuthority ? data?.registeringAuthority : "N/A"),
    },
    {
      key: "registeringAuthorityDoc",
      title: "Registering Authority document",
      dataIndex: "",
      render: (data) => (
        <div>
          {fileStoreId?.registeringAuthorityDoc ? (
            <a onClick={() => getDocShareholding(fileStoreId?.registeringAuthorityDoc)} className="btn btn-sm col-md-6">
              <VisibilityIcon color="info" className="icon" />
            </a>
          ) : (
            <p>N/A</p>
          )}
        </div>
      ),
    },
    {
      title: "Consolidation Type",
      render: (data) => (data?.consolidationType ? data?.consolidationType : "N/A"),
    },
    {
      title: "Kanal",
      render: (data) => (data?.kanal ? data?.kanal : "N/A"),
    },
    {
      title: "Bigha",
      render: (data) => (data?.bigha ? data?.bigha : "N/A"),
    },
    {
      title: "Marla",
      render: (data) => (data?.marla ? data?.marla : "N/A"),
    },
    {
      title: "Biswa",
      render: (data) => (data?.biswa ? data?.biswa : "N/A"),
    },
    {
      title: "Sarsai",
      render: (data) => (data?.sarsai ? data?.sarsai : "N/A"),
    },
    {
      title: "Biswansi",
      render: (data) => (data?.biswansi ? data?.biswansi : "N/A"),
    },
    {
      title: "Total Area",
      render: (data) => data?.nonConsolidatedTotal || data?.consolidatedTotal,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (data) => (
        <div>
          <EditIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSpecificTableData(data);
              setmodal(true);
            }}
            color="primary"
          />

          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={() => {
              const filteredData = modalData?.filter((item) => item?.rowid !== data?.rowid);
              setModalData(filteredData);
            }}
            color="error"
          />
        </div>
      ),
    },
  ];
  const location = useLocation();
  const userInfo = Digit.UserService.getUser()?.info || {};
  const [district, setDistrict] = useState("");
  const [modalData, setModalData] = useState([]);
  const [specificTableData, setSpecificTableData] = useState(null);
  const [districtDataLabels, setDistrictDataLabels] = useState({ data: [], isLoading: true });
  const [tehsilDataLabels, setTehsilDataLabels] = useState({ data: [], isLoading: true });
  const [revenueDataLabels, setRevenueDataLabels] = useState({ data: [], isLoading: true });
  const [mustilDataLabels, setMustilDataLabels] = useState({ data: [], isLoading: true });
  const [modal, setmodal] = useState(false);
  const [tehsilCode, setTehsilCode] = useState(null);
  const [purposeOptions, setPurposeOptions] = useState({ data: [], isLoading: true });
  const [districtOptons, setDistrictOptions] = useState({ data: [], isLoading: true });
  const [devPlanOptons, setDevPlanOptions] = useState({ data: [], isLoading: true });
  const [ZoneOptions, setZoneOptions] = useState({ data: [], isLoading: true });
  const [sectorOptions, setSectorOptions] = useState({ data: [], isLoading: true });
  const [loader, setLoader] = useState(false);
  const [getKhewats, setKhewats] = useState("");
  const [fileStoreId, setFileStoreId] = useState({});
  const [stepData, setStepData] = useState(null);
  const [applicantId, setApplicantId] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showToast, setShowToast] = useState(null);
  const [showToastError, setShowToastError] = useState(null);
  const stateId = Digit.ULBService.getStateId();
  const [typeOfLand, setYypeOfLand] = useState({ data: [], isLoading: true });
  const [showFields, setShowFields] = useState(false);
  const [getDTCP, setDTCP] = useState(null);
  const [getDevPlanVal, setDevPlanVal] = useState("");
  const [getSectorVal, setSectorVal] = useState("");
  const [getNameRevenueState, setNameRevenueState] = useState("");
  const [getMustil, setMustil] = useState("");

  const resetValues = () => {
    resetField("district");
    resetField("potential");
    resetField("zone");
    resetField("sector");
    resetField("tehsil");
    resetField("revenueEstate");
    resetField("rectangleNo");
    resetField("hadbastNo");
    resetField("khewats");
    resetField("kanal");
    resetField("marla");
    resetField("sarsai");
    resetField("bigha");
    resetField("biswa");
    resetField("biswansi");
    resetField("agreementValidFrom");
    resetField("validitydate");
    resetField("authSignature");
    resetField("collaboration");
    resetField("developerCompany");
    resetField("validitydate");
    resetField("landOwner");
    resetField("nameAuthSign");
    resetField("registeringAuthority");
    resetField("consolidationType");
    resetField("agreementIrrevocialble");
    resetField("registeringAuthorityDoc");
    resetField("editKhewats");
    resetField("editRectangleNo");
    resetField("landOwnerRegistry");
    resetField("typeLand");
    resetField("developmentPlan");
  };

  useEffect(() => {
    if (specificTableData) {
      setValue("hadbastNo", specificTableData?.hadbastNo);
      setValue("khewats", specificTableData?.khewats);
      setValue("consolidationType", specificTableData?.consolidationType);
      setValue("kanal", specificTableData?.kanal);
      setValue("marla", specificTableData?.marla);
      setValue("sarsai", specificTableData?.sarsai);
      setValue("bigha", specificTableData?.bigha);
      setValue("biswansi", specificTableData?.biswansi);
      setValue("biswa", specificTableData?.biswa);
      setValue("collaboration", specificTableData?.collaboration);
      setValue("landOwner", specificTableData?.landOwner);
      setValue("developerCompany", specificTableData?.developerCompany);
      setValue("validitydate", specificTableData?.validitydate);
      setValue("validitydate", specificTableData?.validitydate);
      setValue("agreementIrrevocialble", specificTableData?.agreementIrrevocialble);
      setValue("authSignature", specificTableData?.authSignature);
      setValue("nameAuthSign", specificTableData?.nameAuthSign);
      setValue("registeringAuthority", specificTableData?.registeringAuthority);
      setValue("registeringAuthorityDoc", specificTableData?.registeringAuthorityDoc);
      setValue("editRectangleNo", specificTableData?.editRectangleNo);
      setValue("editKhewats", specificTableData?.editKhewats);
      setValue("landOwnerRegistry", specificTableData?.landOwnerRegistry);
      const districtValue = districtOptons?.data?.filter((item) => item?.value === specificTableData?.district);
      // getDevPlanOption(districtValue?.[0]?.distCodeTCP);
      setValue("district", { label: districtValue?.[0]?.label, value: districtValue?.[0]?.value });
      if (districtValue?.[0]?.distCodeTCP) setDTCP(districtValue?.[0]);
      const tehsilValue = tehsilDataLabels?.data?.filter((item) => item?.value === specificTableData?.tehsil);
      setNameRevenueState(tehsilValue?.[0]?.value);
      setValue("tehsil", { label: tehsilValue?.[0]?.label, value: tehsilValue?.[0]?.value });
      const revenueValue = revenueDataLabels?.data?.filter((item) => item?.value === specificTableData?.revenueEstate);
      setMustil(revenueValue?.[0]?.value);
      setValue("revenueEstate", { label: revenueValue?.[0]?.label, value: revenueValue?.[0]?.value });
      const mustilValue = mustilDataLabels?.data?.filter((item) => item?.value === specificTableData?.rectangleNo);
      setValue("rectangleNo", { label: mustilValue?.[0]?.label, value: mustilValue?.[0]?.value });
      const typeOfLandValue = typeOfLand?.data?.filter((item) => item?.value === specificTableData?.typeLand);
      setValue("typeLand", { label: typeOfLandValue?.[0]?.label, value: typeOfLandValue?.[0]?.value });
      setValue("isChange", JSON.parse(specificTableData?.isChange));
    }
  }, [devPlanOptons, specificTableData, districtOptons, tehsilDataLabels, revenueDataLabels, mustilDataLabels, typeOfLand]);

  useEffect(() => {
    if (getDTCP) {
      getDevPlanOption(getDTCP?.distCodeTCP);
      setDistrict(getDTCP?.value);
      getTehslidata(getDTCP?.value);
    }
  }, [getDTCP]);

  useEffect(() => {
    if (getDevPlanVal) getZoneOption(getDevPlanVal);
  }, [getDevPlanVal]);

  useEffect(() => {
    if (getSectorVal) getSectorOptions(getSectorVal);
  }, [getSectorVal]);

  useEffect(() => {
    if (getMustil) getMustilData(getMustil);
  }, [getMustil]);

  useEffect(() => {
    if (getNameRevenueState) {
      getRevenuStateData(getNameRevenueState);
      setTehsilCode(getNameRevenueState);
    }
  }, [getNameRevenueState]);

  useEffect(() => {
    const devPlanValue = devPlanOptons?.data?.filter((item) => item?.value === specificTableData?.developmentPlan);
    setDevPlanVal(devPlanValue?.[0]?.value);
    setValue("developmentPlan", { label: devPlanValue?.[0]?.label, value: devPlanValue?.[0]?.value });
  }, [devPlanOptons, specificTableData]);

  useEffect(() => {
    const potential = ZoneOptions?.data?.filter((item) => item?.label === specificTableData?.potential);
    setSectorVal(potential?.[0]?.value);
    setValue("potential", { label: potential?.[0]?.label, value: potential?.[0]?.value });
  }, [ZoneOptions, specificTableData]);

  useEffect(() => {
    const sectorOpt = sectorOptions?.data?.filter((item) => item?.label === specificTableData?.sector);
    setValue("sector", { label: sectorOpt?.[0]?.label, value: sectorOpt?.[0]?.value });
  }, [sectorOptions, specificTableData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    getValues,
    watch,
    resetField,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    // resolver: yupResolver(VALIDATION_SCHEMA),
    resolver: yupResolver(modal ? MODAL_VALIDATION_SCHEMA : VALIDATION_SCHEMA),
    shouldFocusError: true,
  });

  const { data: PurposeType } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["Purpose"]);
  const { data: DistrictType } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["District"]);

  useEffect(() => {
    const purpose = PurposeType?.["common-masters"]?.Purpose?.map(function (data) {
      return { value: data?.purposeCode, label: data?.name };
    });
    setPurposeOptions({ data: purpose, isLoading: false });
  }, [PurposeType]);

  // useEffect(() => {
  //   const potential = PotentialType?.["common-masters"]?.PotentialZone?.map(function (data) {
  //     return { value: data?.code, label: data?.zone };
  //   });
  //   setPotentialOptions({ data: potential, isLoading: false });
  // }, [PotentialType]);

  useEffect(() => {
    const district = DistrictType?.["common-masters"]?.District?.map(function (data) {
      return { value: data?.districtCode, label: data?.name, distCodeTCP: data?.distCodeTCP };
    });
    setDistrictOptions({ data: district, isLoading: false });
  }, [DistrictType]);

  const getDevPlanOption = async (val) => {
    const payload = {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: "v1",
        ts: 0,
        action: "_search",
        did: "",
        key: "",
        msgId: "090909",
        authToken: "",
        correlationId: null,
      },
      MdmsCriteria: {
        tenantId: "hr",
        moduleDetails: [
          {
            tenantId: "hr",
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "DevPlan",
                filter: `[?(@.distCodeTCP=="${val}")]`,
              },
            ],
          },
        ],
      },
    };
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_search", payload);
      const devPlan = Resp?.data?.MdmsRes?.["common-masters"]?.DevPlan?.map(function (data) {
        return { value: data?.devPlanCode, label: data?.devPlan };
      });
      setDevPlanOptions({ data: devPlan, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getZoneOption = async (val) => {
    const payload = {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: "v1",
        ts: 0,
        action: "_search",
        did: "",
        key: "",
        msgId: "090909",
        authToken: "",
        correlationId: null,
      },
      MdmsCriteria: {
        tenantId: "hr",
        moduleDetails: [
          {
            tenantId: "hr",
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "PotentialZone",
                filter: `[?(@.devPlanCode=="${val}")]`,
              },
            ],
          },
        ],
      },
    };
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_search", payload);
      const zonePlan = Resp?.data?.MdmsRes?.["common-masters"]?.PotentialZone?.map(function (data) {
        return { value: data?.devPlanCode, label: data?.potentialZone };
      });
      setZoneOptions({ data: zonePlan, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  // useEffect(() => {
  //   const zonePlan = ZoneType?.["common-masters"]?.PotentialZone?.map(function (data) {
  //     return { value: data?.code, label: data?.potentialZone };
  //   });
  //   setZoneOptions({ data: zonePlan, isLoading: false });
  // }, [ZoneType]);

  const getSectorOptions = async (val) => {
    const payload = {
      RequestInfo: {
        apiId: "Rainmaker",
        ver: "v1",
        ts: 0,
        action: "_search",
        did: "",
        key: "",
        msgId: "090909",
        authToken: "",
        correlationId: null,
      },
      MdmsCriteria: {
        tenantId: "hr",
        moduleDetails: [
          {
            tenantId: "hr",
            moduleName: "common-masters",
            masterDetails: [
              {
                name: "Sector",
                filter: `[?(@.devPlanCode=="${val}")]`,
              },
            ],
          },
        ],
      },
    };
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_search", payload);
      const sectorPlan = Resp?.data?.MdmsRes?.["common-masters"]?.Sector?.map(function (data) {
        return { value: data?.sectorCode, label: data?.sectorNo };
      });
      setSectorOptions({ data: sectorPlan, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  // useEffect(() => {
  //   const sectorPlan = sectorType?.["common-masters"]?.Sector?.map(function (data) {
  //     return { value: data?.devPlanCode, label: data?.sectorNo };
  //   });
  //   setSectorOptions({ data: sectorPlan, isLoading: false });
  // }, [sectorType]);

  const DistrictApiCall = async () => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_district", datapost);
      const distData = Resp?.data?.map((el) => {
        return { label: el?.name, id: el?.distCode, value: el?.distCode };
      });
      setDistrictDataLabels({ data: distData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getTehslidata = async (data) => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_tehsil?dCode=" + data, datapost, {});
      const tehsilData = Resp?.data?.map((el) => {
        return { label: el?.name, id: el?.code, value: el?.code };
      });
      setTehsilDataLabels({ data: tehsilData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getRevenuStateData = async (code) => {
    try {
      const Resp = await axios.post("/egov-mdms-service/v1/_village?" + "dCode=" + district + "&" + "tCode=" + code, datapost, {});
      const revenData = Resp?.data?.map((el) => {
        return { label: el?.name, id: el?.khewats, value: el?.code, khewats: el?.khewats, code: el?.code };
      });
      setRevenueDataLabels({ data: revenData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getMustilData = async (code) => {
    try {
      const Resp = await axios.post(
        "/egov-mdms-service/v1/_must?" + "dCode=" + district + "&" + "tCode=" + tehsilCode + "&NVCode=" + code,
        datapost,
        {}
      );
      const mustData = Resp?.data?.must?.map((el, i) => {
        return { label: el, id: i, value: el };
      });
      setMustilDataLabels({ data: mustData, isLoading: false });
    } catch (error) {
      return error;
    }
  };

  const getLandOwnerStateData = async (text) => {
    setLoader(true);
    try {
      const Resp = await axios.post(
        "/egov-mdms-service/v1/_owner?" +
          "dCode=" +
          district +
          "&" +
          "tCode=" +
          tehsilCode +
          "&NVCode=" +
          watch("revenueEstate")?.value +
          "&khewat=" +
          text,
        datapost,
        {}
      );
      setLoader(false);
      setValue("landOwner", Resp?.data?.[0]?.name);
    } catch (error) {
      setLoader(false);
      return error;
    }
  };

  useEffect(() => {
    DistrictApiCall();
  }, []);

  const ApplicantPurposeModalData = (modaldata) => {
    modaldata["district"] = modaldata?.district?.value;
    modaldata["potential"] = modaldata?.potential?.label;
    modaldata["sector"] = modaldata?.sector?.label;
    modaldata["tehsil"] = modaldata?.tehsil?.value;
    modaldata["revenueEstate"] = modaldata?.revenueEstate?.value;
    modaldata["rectangleNo"] = modaldata?.rectangleNo?.value;
    modaldata["typeLand"] = modaldata?.typeLand?.value;
    modaldata["developmentPlan"] = modaldata?.developmentPlan?.value;
    modaldata["isChange"] = showFields;

    // modaldata["registeringAuthorityDoc"] = docId;
    delete modaldata?.purpose;

    if (modaldata?.consolidationType === "consolidated") {
      delete modaldata?.bigha;
      delete modaldata?.biswa;
      delete modaldata?.biswansi;
    }
    if (modaldata?.consolidationType === "non-consolidated") {
      delete modaldata?.marla;
      delete modaldata?.kanal;
      delete modaldata?.sarsai;
    }
    const length = modalData?.length + 1;
    modaldata["rowid"] = length.toString();
    if (specificTableData?.rowid) {
      const filteredRowData = modalData?.filter((item) => item?.rowid !== specificTableData?.rowid);
      setModalData([...filteredRowData, modaldata]);
    } else if (stepData?.AppliedLandDetails) {
      setModalData([...stepData?.AppliedLandDetails, modaldata]);
    } else {
      setModalData((prev) => [...prev, modaldata]);
    }
    setSpecificTableData(null);
    // resetValues();
    setmodal(false);
  };

  useEffect(() => {
    if (stepData?.AppliedLandDetails) setModalData(stepData?.AppliedLandDetails);
  }, [stepData?.AppliedLandDetails]);

  const PurposeFormSubmitHandler = async (data) => {
    const token = window?.localStorage?.getItem("token");
    data["purpose"] = data?.purpose?.value;
    // data["potential"] = data?.potential?.value;
    // data["district"] = watch("district")?.value;
    // data["state"] = "Haryana";
    delete data?.district;
    delete data?.developmentPlan;
    delete data?.typeLand;
    delete data?.landOwnerRegistry;
    delete data?.nonConsolidatedTotal;
    delete data?.consolidatedTotal;
    delete data?.editKhewats;
    delete data?.editRectangleNo;
    delete data?.hadbastNo;
    delete data?.potential;
    delete data?.zone;
    delete data?.sector;
    delete data?.tehsil;
    delete data?.revenueEstate;
    delete data?.rectangleNo;
    delete data?.kanal;
    delete data?.marla;
    delete data?.sarsai;
    delete data?.bigha;
    delete data?.biswa;
    delete data?.biswansi;
    delete data?.agreementIrrevocialble;
    delete data?.agreementValidFrom;
    delete data?.validitydate;
    delete data?.authSignature;
    delete data?.collaboration;
    delete data?.developerCompany;
    delete data?.landOwner;
    delete data?.nameAuthSign;
    delete data?.registeringAuthority;
    delete data?.registeringAuthorityDoc;
    delete data?.consolidationType;
    delete data?.khewats;
    delete data?.rowid;
    // if (!modalData?.length && !stepData?.AppliedLandDetails) alert("Please enter atleast one record");
    // else {
    const postDistrict = {
      pageName: "ApplicantPurpose",
      action: "PURPOSE",
      applicationNumber: applicantId,
      createdBy: userInfo?.id,
      updatedBy: userInfo?.id,
      LicenseDetails: {
        ApplicantPurpose: {
          ...data,
          AppliedLandDetails: modalData,
        },
      },
      RequestInfo: {
        apiId: "Rainmaker",
        ver: "v1",
        ts: 0,
        action: "_search",
        did: "",
        key: "",
        msgId: "090909",
        requesterId: "",
        authToken: token,
        userInfo: userInfo,
      },
    };
    setLoader(true);
    try {
      const Resp = await axios.post("/tl-services/new/_create", postDistrict);
      setLoader(false);
      const useData = Resp?.data?.LicenseServiceResponseInfo?.[0]?.LicenseDetails?.[0];
      props.Step2Continue(useData);
    } catch (error) {
      setLoader(false);
      return error;
    }
    // }
  };

  // const handleWorkflow = async () => {
  //   const token = window?.localStorage?.getItem("token");
  //   setLoader(true);
  //   const payload = {
  //     ProcessInstances: [
  //       {
  //         businessService: "NewTL",
  //         documents: null,
  //         businessId: applicantId,
  //         tenantId: "hr",
  //         moduleName: "TL",
  //         action: "SENDBACK",
  //         previousStatus: "INITIATED",
  //         comment: null,
  //       },
  //     ],
  //     RequestInfo: {
  //       apiId: "Rainmaker",
  //       msgId: "1669293303096|en_IN",
  //       authToken: token,
  //     },
  //   };
  //   // try {
  //   //   const Resp = await axios.post("/tl-services/new/_create", postDistrict);
  //   //   setLoader(false);
  //   //   const useData = Resp?.data?.LicenseServiceResponseInfo?.[0]?.LicenseDetails?.[0];
  //   //   props.Step2Continue(useData);
  //   // } catch (error) {
  //   //   setLoader(false);
  //   //   return error;
  //   // }
  //   try {
  //     await axios.post("/egov-workflow-v2/egov-wf/process/_transition", payload);
  //     setLoader(false);
  //     props.Step2Back();
  //   } catch (error) {
  //     setLoader(false);
  //     return error;
  //   }
  // };

  useEffect(() => {
    if (stepData) {
      const data = purposeOptions?.data?.filter((item) => item?.value === stepData?.purpose);
      const districtData = districtDataLabels?.data?.filter((item) => item?.value === stepData?.district);
      setValue("purpose", { label: data?.[0]?.label, value: data?.[0]?.value });
      // setDistrict(districtData?.[0]?.distCode);
      // if (districtData?.[0]?.distCode) getTehslidata(districtData?.[0]?.distCode);
    }
  }, [stepData, purposeOptions, districtDataLabels]);

  const { data: LandData } = Digit.Hooks.obps.useMDMS(stateId, "common-masters", ["LandType"]);

  useEffect(() => {
    const landType = LandData?.["common-masters"]?.LandType?.map(function (data) {
      return { value: data?.landId, label: data?.land };
    });
    setYypeOfLand({ data: landType, isLoading: false });
  }, [LandData]);

  const handleChangePurpose = (data) => {
    const purposeSelected = data?.value;
    window?.localStorage.setItem("purpose", purposeSelected);
  };
  const handleChangePotential = (data) => {
    const potentialSelected = data?.value;
    window?.localStorage.setItem("potential", JSON.stringify(potentialSelected));
  };
  const getDocumentData = async (file, fieldName) => {
    if (selectedFiles.includes(file.name)) {
      setShowToastError({ key: "error" });
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tenantId", "hr");
    formData.append("module", "property-upload");
    formData.append("tag", "tag-property");
    setLoader(true);
    try {
      const Resp = await axios.post("/filestore/v1/files", formData, {});
      setValue(fieldName, Resp?.data?.files?.[0]?.fileStoreId);
      setFileStoreId({ ...fileStoreId, [fieldName]: Resp?.data?.files?.[0]?.fileStoreId });
      if (fieldName === "registeringAuthorityDoc") {
        setValue("registeringAuthorityDocFileName", file.name);
      }
      setSelectedFiles([...selectedFiles, file.name]);
      setLoader(false);
      setShowToast({ key: "success" });
    } catch (error) {
      setLoader(false);
      return error.message;
    }
  };

  let delay;

  useEffect(() => {
    delay = setTimeout(() => {
      if (getKhewats) getLandOwnerStateData(getKhewats);
    }, 500);
    return () => clearTimeout(delay);
  }, [getKhewats]);

  const getApplicantUserData = async (id) => {
    const token = window?.localStorage?.getItem("token");
    const payload = {
      apiId: "Rainmaker",
      msgId: "1669293303096|en_IN",
      authToken: token,
    };
    try {
      const Resp = await axios.post(`/tl-services/new/licenses/object/_getByApplicationNumber?applicationNumber=${id}`, payload);
      const userData = Resp?.data?.LicenseDetails?.[0]?.ApplicantPurpose;
      setStepData(userData);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const search = location?.search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    setApplicantId(id?.toString());
    if (id) getApplicantUserData(id);
  }, []);

  useEffect(() => {
    const val = watch("marla") * 0.0062 + watch("sarsai") * 0.00069 + watch("kanal") * 0.125;
    setValue("consolidatedTotal", val?.toFixed(3));
  }, [watch("sarsai"), watch("marla"), watch("kanal")]);

  useEffect(() => {
    const value = watch("bigha") * 0.33 + watch("biswa") * 0.0309 + watch("biswansi") * 0.619;
    setValue("nonConsolidatedTotal", value?.toFixed(3));
  }, [watch("bigha"), watch("biswa"), watch("biswansi")]);

  return (
    <div>
      {loader && <Spinner />}
      <form onSubmit={handleSubmit(PurposeFormSubmitHandler)}>
        <Card style={{ width: "126%", border: "5px solid #1266af" }}>
          <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>New Licence Application </h4>
          <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
            <Form.Group>
              <Row className="ml-auto" style={{ marginBottom: 5 }}>
                <Col md={4} xxl lg="3">
                  <div>
                    <Form.Label>
                      <h2>
                        Puropse Of Licence<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>

                  <ReactMultiSelect
                    control={control}
                    name="purpose"
                    onChange={handleChangePurpose}
                    placeholder="Purpose"
                    data={purposeOptions?.data}
                    labels="Purpose"
                    loading={purposeOptions?.isLoading}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.purpose?.value && errors?.purpose?.value?.message}
                  </h3>
                </Col>
              </Row>

              <div className="ml-auto" style={{ marginTop: 20 }}>
                <h5>
                  <b>Land schedule</b>
                </h5>
                <br></br>
                <p>
                  Note: The term “Collaboration agreement" shall include all Development agreements/ Joint Venture agreements/ Joint Development
                  agreements/ Memorandum of Understanding etc. and similar agreements registered with competent authority.
                </p>
                <br></br>
                <p>
                  <h3>(i) Khasra-wise information to be provided in the following format</h3>
                </p>
                <br></br>
              </div>
              <div className="ml-auto">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => {
                    if (!getValues()?.purpose) alert("Please Select Purpose First To Proceed Further");
                    else {
                      resetValues();
                      setSpecificTableData(null);
                      setmodal(true);
                    }
                  }}
                >
                  Enter Details
                </Button>
              </div>
              <br></br>

              {modalData.length > 0 && (
                <div className="applt" style={{ overflow: "auto" }}>
                  <WorkingTable columns={columns} data={modalData} />
                </div>
              )}
            </Form.Group>

            <div class="row">
              <div class="col-sm-12 text-left">
                {/* <div id="btnClear" class="btn btn-primary btn-md center-block" onClick={() => handleWorkflow()}>
                  Back
                </div> */}
              </div>
              <div class="col-sm-12 text-right">
                <label className="mr-4">
                  Total Area:
                  {getValues()?.nonConsolidatedTotal
                    ? getValues()?.nonConsolidatedTotal
                    : 0 + getValues()?.consolidatedTotal
                    ? getValues()?.consolidatedTotal
                    : 0}
                </label>
                <button type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                  Save and Continue
                </button>
              </div>
            </div>
          </Card>
        </Card>
      </form>

      <Modal size="xl" isOpen={modal} toggle={() => setmodal(!modal)}>
        <div style={{ padding: "4px", textAlign: "right" }}>
          <span onClick={() => setmodal(!modal)} style={{ cursor: "pointer" }}>
            X
          </span>
        </div>
        <ModalBody>
          <form onSubmit={handleSubmit(ApplicantPurposeModalData)}>
            <Row className="ml-auto mb-3">
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      District<span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  name="district"
                  placeholder="District"
                  data={districtOptons?.data}
                  labels="District"
                  loading={districtOptons?.isLoading}
                  onChange={(e) => {
                    getTehslidata(e.value);
                    setDistrict(e.value);
                    getDevPlanOption(e.distCodeTCP);
                  }}
                />

                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.district?.value && errors?.district?.value?.message}
                </h3>
              </Col>
              {watch("district")?.value && (
                <Col md={4} xxl lg="4">
                  <div>
                    <Form.Label>
                      <h2>
                        Development Plan<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>

                  <ReactMultiSelect
                    control={control}
                    name="developmentPlan"
                    placeholder="DevPlan"
                    data={devPlanOptons?.data}
                    labels="DevPlan"
                    loading={devPlanOptons?.isLoading}
                    onChange={(e) => getZoneOption(e?.value)}
                  />
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.potential?.value && errors?.potential?.value?.message}
                  </h3>
                </Col>
              )}
              {watch("developmentPlan")?.value && (
                <Col md={4} xxl lg="4">
                  <div>
                    <Form.Label>
                      <h2>
                        Zone<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>
                  <ReactMultiSelect
                    control={control}
                    name="potential"
                    placeholder="zonePlan"
                    data={ZoneOptions?.data}
                    labels="PotentialZone"
                    loading={ZoneOptions?.isLoading}
                    onChange={(e) => getSectorOptions(e?.value)}
                  />

                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.zone?.value && errors?.zone?.value?.message}
                  </h3>
                </Col>
              )}
              {watch("potential")?.value && (
                <Col md={4} xxl lg="4">
                  <div>
                    <Form.Label>
                      <h2>
                        Sector<span style={{ color: "red" }}>*</span>
                      </h2>
                    </Form.Label>
                  </div>
                  <ReactMultiSelect
                    control={control}
                    name="sector"
                    placeholder="Sector"
                    data={sectorOptions?.data}
                    labels="Sector"
                    loading={sectorOptions?.isLoading}
                  />

                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.sector?.value && errors?.sector?.value?.message}
                  </h3>
                </Col>
              )}
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Tehsil <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  {...register("tehsil")}
                  data={tehsilDataLabels?.data}
                  labels="Tehsil"
                  loading={tehsilDataLabels?.isLoading}
                  onChange={(e) => {
                    getRevenuStateData(e.value);
                    setTehsilCode(e.value);
                  }}
                />

                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.tehsil?.value && errors?.tehsil?.value?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Name of Revenue Estate <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  {...register("revenueEstate")}
                  data={revenueDataLabels?.data}
                  labels="Revenue Estate"
                  loading={revenueDataLabels?.isLoading}
                  onChange={(e) => getMustilData(e.code)}
                />

                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.revenueEstate?.value && errors?.revenueEstate?.value?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Hadbast No. <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <input type="number" className="form-control" placeholder="" {...register("hadbastNo")} />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.hadbastNo && errors?.hadbastNo?.message}
                </h3>
              </Col>
            </Row>

            <Row className="ml-auto mb-3">
              <Col md={4} xxl lg="4">
                <div>
                  <Form.Label>
                    <h2>
                      Rectangle No./Mustil <span style={{ color: "red" }}>*</span>
                    </h2>
                  </Form.Label>
                </div>
                <ReactMultiSelect
                  control={control}
                  data={mustilDataLabels?.data}
                  loading={mustilDataLabels?.isLoading}
                  labels="Rectangle No."
                  {...register("rectangleNo")}
                />

                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.rectangleNo?.value && errors?.rectangleNo?.value?.message}
                </h3>
              </Col>

              <Col md={4} xxl lg="4">
                <div>
                  <label>
                    <h2>
                      Khasra Number <span style={{ color: "red" }}>*</span>
                    </h2>
                  </label>
                </div>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Enter Khasra"
                  {...register("khewats")}
                  onChange={(e) => setKhewats(e?.target?.value)}
                />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.khewats && errors?.khewats?.message}
                </h3>
              </Col>
              <Col md={4} xxl lg="4">
                <div>
                  <label>
                    <h2>
                      Name of Land Owner<span style={{ color: "red" }}>*</span>
                    </h2>
                  </label>
                </div>
                <Form.Control as="textarea" rows={1} type="text" className="form-control" placeholder="" {...register("landOwner")} disabled />
                <h3 className="error-message" style={{ color: "red" }}>
                  {errors?.landOwner && errors?.landOwner?.message}
                </h3>
              </Col>
              <div className="col col-12 mt-3">
                <h2>
                  <b>
                    Whether Khasra been developed in collaboration<span style={{ color: "red" }}>*</span>
                  </b>
                  &nbsp;&nbsp;
                  <label htmlFor="collaboration">
                    <input {...register("collaboration")} type="radio" value="Y" id="yes" />
                    &nbsp;&nbsp; Yes &nbsp;&nbsp;
                  </label>
                  <label htmlFor="collaboration">
                    <input {...register("collaboration")} type="radio" value="N" id="no" />
                    &nbsp;&nbsp; No &nbsp;&nbsp;
                  </label>
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.collaboration && errors?.collaboration?.message}
                  </h3>
                </h2>
                {watch("collaboration") === "Y" && (
                  <div>
                    <div className="row ">
                      <div className="col col-4">
                        <label>
                          <h2
                            data-toggle="tooltip"
                            data-placement="top"
                            title=" Name of the developer company / Firm/ LLP etc. with whom collaboration agreement entered."
                          >
                            Name of the developer company .<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("developerCompany")}
                          required
                          minlength={2}
                          maxLength={99}
                        />
                        <h3 className="error-message" style={{ color: "red" }}>
                          {errors?.developerCompany && errors?.developerCompany?.message}
                        </h3>
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2>
                            Date of registering collaboration agreement<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control
                          type="date"
                          value={modalData.agreementValidFrom}
                          className="form-control"
                          required
                          placeholder=""
                          {...register("agreementValidFrom")}
                          max={convertEpochToDate(new Date().setFullYear(new Date().getFullYear()))}
                        />
                      </div>
                      <div className="col col-4">
                        <h2>
                          Whether collaboration agreement irrevocable (Yes/No)<span style={{ color: "red" }}>*</span>
                        </h2>
                        <label htmlFor="agreementIrrevocialble">
                          <input {...register("agreementIrrevocialble")} type="radio" value="Y" id="yes" />
                          &nbsp;&nbsp; Yes &nbsp;&nbsp;
                        </label>
                        <label htmlFor="agreementIrrevocialble">
                          <input {...register("agreementIrrevocialble")} type="radio" value="N" id="no" />
                          &nbsp;&nbsp; No &nbsp;&nbsp;
                        </label>
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row ">
                      <div className="col col-4">
                        <label>
                          <h2>
                            Name of authorized signatory on behalf of land owner(s)<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("authSignature")}
                          required
                          minlength={4}
                          maxLength={99}
                        />
                        <h3 className="error-message" style={{ color: "red" }}>
                          {errors?.authSignature && errors?.authSignature?.message}
                        </h3>
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2
                            data-toggle="tooltip"
                            data-placement="top"
                            title="  Name of authorized signatory on behalf of developer to sign Collaboration agreement."
                          >
                            Name of authorized signatory on behalf of developer.<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          placeholder=""
                          {...register("nameAuthSign")}
                          required
                          minlength={4}
                          maxLength={99}
                        />
                        <h3 className="error-message" style={{ color: "red" }}>
                          {errors?.nameAuthSign && errors?.nameAuthSign?.message}
                        </h3>
                      </div>
                      <div className="col col-4">
                        <label>
                          <h2>
                            Registering Authority<span style={{ color: "red" }}>*</span>
                          </h2>
                        </label>
                        <Form.Control type="text" className="form-control" placeholder="" {...register("registeringAuthority")} required />
                        <h3 className="error-message" style={{ color: "red" }}>
                          {errors?.registeringAuthority && errors?.registeringAuthority?.message}
                        </h3>
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="row ">
                      <div className="col col-4">
                        <label>
                          <h2 data-toggle="tooltip" data-placement="top" title="Upload Document" style={{ marginTop: "-4px" }}>
                            Registering Authority document <span style={{ color: "red" }}>*</span> <FileUpload color="primary" />
                            <div>
                              <input
                                type="file"
                                accept="application/pdf/jpeg/png"
                                style={{ display: "none" }}
                                required
                                onChange={(e) => getDocumentData(e?.target?.files[0], "registeringAuthorityDoc")}
                              />
                            </div>
                          </h2>
                        </label>
                        <h3 style={{}}>{watch("registeringAuthorityDocFileName") ? watch("registeringAuthorityDocFileName") : null}</h3>
                        <h3 className="error-message" style={{ color: "red" }}>
                          {errors?.registeringAuthorityDoc && errors?.registeringAuthorityDoc?.message}
                        </h3>

                        {/* <input
                          type="file"
                          style={{ marginTop: "-6px" }}
                          className="form-control"
                          accept="application/pdf"
                          required
                          onChange={(e) => getDocumentData(e?.target?.files[0], "registeringAuthorityDoc")}
                        /> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Col className="mt-3" md={4} xxl lg="4">
                <label>
                  <h2>
                    Type of land<span style={{ color: "red" }}>*</span>
                  </h2>
                </label>
                <ReactMultiSelect control={control} name="typeLand" placeholder="Type of Land" data={typeOfLand?.data} labels="typeland" required />
              </Col>
            </Row>
            <br></br>
            <Row className="ml-auto mb-3">
              <div className="form-check">
                <label style={{ marginRight: "23px" }} className="checkbox" for="flexCheckDefault">
                  <b>If there is a change in information auto-populated, then the information be provided in the following format.</b>
                </label>
                <input
                  onClick={(e) => setShowFields(e.target.checked)}
                  className="form-check-input"
                  formControlName="agreeCheck"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  {...register("isChange")}
                />
              </div>
              {watch("isChange") && (
                <Row className="ml-auto mb-3">
                  <Col md={4} xxl lg="4">
                    <div>
                      <Form.Label>
                        <h2>
                          Rectangle No./Mustil <span style={{ color: "red" }}>*</span>
                        </h2>
                      </Form.Label>
                    </div>
                    <input
                      autoComplete="off"
                      type="number"
                      className="form-control"
                      placeholder="Rectangle No./Mustil"
                      {...register("editRectangleNo")}
                    />
                  </Col>

                  <Col md={4} xxl lg="4">
                    <div>
                      <label>
                        <h2>
                          Khasra Number <span style={{ color: "red" }}>*</span>
                        </h2>
                      </label>
                    </div>
                    <input autoComplete="off" type="text" className="form-control" placeholder="Enter Khewat" {...register("editKhewats")} />
                    <h3 className="error-message" style={{ color: "red" }}>
                      {errors?.editKhewats && errors?.editKhewats?.message}
                    </h3>
                  </Col>

                  <Col md={4} xxl lg="4">
                    <div>
                      <label>
                        <h2>Name of the Land Ower as per Mutation/Jamabandi</h2>
                      </label>
                    </div>
                    <input autoComplete="off" type="text" className="form-control" placeholder="" {...register("landOwnerRegistry")} />
                    <h3 className="error-message" style={{ color: "red" }}>
                      {errors?.landOwnerRegistry && errors?.landOwnerRegistry?.message}
                    </h3>
                  </Col>
                </Row>
              )}

              <Col md={4} xxl lg="12">
                <div>
                  <h2>
                    <b>
                      {" "}
                      Consolidation Type<span style={{ color: "red" }}>*</span>{" "}
                    </b>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label htmlFor="consolidated">
                      <input {...register("consolidationType")} type="radio" value="consolidated" defaultValue="consolidated" id="consolidated" />
                      &nbsp; Consolidated &nbsp;&nbsp;
                    </label>
                    <label htmlFor="non-consolidated">
                      <input {...register("consolidationType")} type="radio" value="non-consolidated" id="non-consolidated" />
                      &nbsp; Non-Consolidated &nbsp;&nbsp;
                    </label>
                  </h2>
                  <h3 className="error-message" style={{ color: "red" }}>
                    {errors?.consolidationType && errors?.consolidationType?.message}
                  </h3>
                </div>

                {watch("consolidationType") == "consolidated" && (
                  <table className="table table-bordered" style={{ backgroundColor: "rgb(251 251 253))" }}>
                    <thead>
                      <tr>
                        <th>
                          <h2>
                            Kanal <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Marla <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Sarsai <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                        <th>
                          <h2>
                            Total Area <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="number" className="form-control  " {...register("kanal")} id="kanal" required maxLength={20} />
                          <label htmlFor="sum">Total: {(watch("kanal") * 0.125)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="number" className="form-control " {...register("marla")} id="marla" required maxLength={20} />
                          <label htmlFor="summarla">Total: {(watch("marla") * 0.0062)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="number" className="form-control " {...register("sarsai")} id="sarsai" required maxLength={20} />
                          <label htmlFor="sumsarsai">Total: {(watch("sarsai") * 0.00069)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input step="any" type="number" className="form-control" {...register("consolidatedTotal")} />
                          <label htmlFor="sumsarsai">Total: {watch("consolidatedTotal")}</label>&nbsp;&nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
                {watch("consolidationType") == "non-consolidated" && (
                  <table className="table table-bordered" style={{ backgroundColor: "rgb(251 251 253))" }}>
                    <thead>
                      <tr>
                        <th>
                          <h2>
                            Bigha <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Biswa <span style={{ color: "red" }}>*</span>
                          </h2>
                        </th>
                        <th>
                          <h2>
                            Biswansi <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                        <th>
                          <h2>
                            Total Area <span style={{ color: "red" }}>*</span>
                          </h2>
                          &nbsp;&nbsp;
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input type="number" className="form-control" {...register("bigha")} id="bigha" required maxLength={20} />
                          <label htmlFor="sumBigha">Total: {(watch("bigha") * 0.33)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="number" className="form-control" {...register("biswa")} id="biswa" required maxLength={20} />
                          <label htmlFor="sumBiswa">Total: {(watch("biswa") * 0.0309)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input type="number" className="form-control" {...register("biswansi")} id="biswansi" required maxLength={20} />
                          <label htmlFor="sumBiswansi">Total: {(watch("biswansi") * 0.619)?.toFixed(3)}</label>&nbsp;&nbsp;
                        </td>
                        <td>
                          <input step="any" type="number" className="form-control " {...register("nonConsolidatedTotal")} />
                          <label htmlFor="sumsarsai">Total: {watch("nonConsolidatedTotal")}</label>&nbsp;&nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>

            <button type="submit" style={{ float: "right" }} class="btn btn-primary btn-md center-block">
              Submit
            </button>
          </form>
        </ModalBody>
        <ModalFooter toggle={() => setmodal(!modal)}></ModalFooter>
      </Modal>
      {showToast && (
        <Toast
          success={showToast?.key === "success" ? true : false}
          label="Document Uploaded Successfully"
          isDleteBtn={true}
          onClose={() => {
            setShowToast(null);
            setError(null);
          }}
        />
      )}
      {showToastError && (
        <Toast
          error={showToastError?.key === "error" ? true : false}
          label="Duplicate file Selected"
          isDleteBtn={true}
          onClose={() => {
            setShowToastError(null);
            setError(null);
          }}
        />
      )}
    </div>
  );
};

export default ApllicantPuropseForm;
