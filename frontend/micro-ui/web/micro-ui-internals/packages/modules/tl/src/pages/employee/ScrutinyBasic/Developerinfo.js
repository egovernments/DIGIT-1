import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Card, Row, Col } from "react-bootstrap";
// import {AiFillCheckCircle, AiFillCloseCircle} from "react-icons/ai";
// import CalculateIcon from '@mui/icons-material/Calculate';
// import InfoIcon from '@mui/icons-material/Info';
// import * as Icon from "react-bootstrap-icons";
// import { XCircleFill } from "react-bootstrap-icons";
// import { CheckCircleFill } from "react-bootstrap-icons";
// import { ArrowDownCircleFill } from "react-bootstrap-icons";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import Collapse from "react-bootstrap/Collapse";
import AddIcon from "@mui/icons-material/Add";
import ModalChild from "./Remarks/ModalChild";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStyles } from "./css/personalInfoChild.style";
import { IconButton } from "@mui/material";
import { getDocShareholding } from "./ScrutinyDevelopment/docview.helper";
import CommercialColonyInResidential from "../ScrutinyBasic/PuropseStep3/CommercialColonyResidential";
import CommercialLicense from "./PuropseStep3/CommercialLicense";
import LowDensityEco from "./PuropseStep3/LowDensityEco";
import CyberPark from "./PuropseStep3/CyberPark";
import RetirementHousing from "./PuropseStep3/RetirementHousing";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
// import CommercialPlottedForm from "./Puropse/CommercialPlottedForm";

const Developerinfo = (props) => {

  useTranslation

  const { t } = useTranslation();
  const { pathname: url } = useLocation();

  const dataIcons = props.dataForIcons;
  const landScheduleData = props.ApiResponseData;
  const Purpose = props.purpose;

  const applicationStatus = props.applicationStatus;
  // let user = Digit.UserService.getUser();
  // const userRoles = user?.info?.roles?.map((e) => e.code) || [];
  // const hideRemarks = userRoles.some((item) => item === "CTP_HR" || item === "CTP_HQ" || item === "DTP_HR" || item === "DTP_HQ")
  // const hideRemarksPatwari = userRoles.some((item) => item === "Patwari_HQ")
  // const hideRemarksJE = userRoles.some((item) => item === "JE_HQ" || item === "JE_HR")

  // const applicationStatus = props.applicationStatus ;
  let user = Digit.UserService.getUser();
  const userInfo = Digit.UserService.getUser()?.info || {};
  const userRolesArray = userInfo?.roles.filter((user) => user.code !== "EMPLOYEE");
  const filterDataRole = userRolesArray?.[0]?.code;
  const userRoles = user?.info?.roles?.map((e) => e.code) || [];

  console.log("rolelogintime", userRoles);
  console.log("afterfilter12", filterDataRole)

  const mDMSData = props.mDMSData;
  const mDMSDataRole = mDMSData?.map((e) => e.role) || [];
  const hideRemarks = mDMSDataRole.includes(filterDataRole);
  const applicationStatusMdms = mDMSData?.map((e) => e.applicationStatus) || [];
  const hideRemarksPatwari = applicationStatusMdms.some((item) => item === applicationStatus) || [];
  const [fileddataName, setFiledDataName] = useState();

  useEffect(() => {
    if (mDMSData && mDMSData?.length) {
      console.log("filedDataMdms", mDMSData, mDMSData?.[0]?.field, mDMSData?.[0]?.field.map((item, index) => item.fields));
      setFiledDataName(mDMSData?.[0]?.field.map((item, index) => item.fields))

    }

  }, [mDMSData]
  )
  const showReportProblemIcon = (filedName) => {
    if (fileddataName && fileddataName.length) {
      let show = fileddataName.includes(filedName)
      return show;
    } else {
      return false;
    }
  }

  // mDMSData?.map((e) => e.role)||[]
  console.log("happyRole", userRoles);
  console.log("happyDate", mDMSData);
  console.log("happyROLE", mDMSDataRole);
  console.log("happyapplicationStatusMdms", applicationStatusMdms);
  console.log("happyDateHIDE345", hideRemarksPatwari, showReportProblemIcon("Purpose of colony"), hideRemarks);



  const [vacant, setVacant] = useState("");
  const [construction, setConstruction] = useState("");
  const [typeCons, setTypeCons] = useState("");
  const [ht, setHt] = useState("");
  const [htRemark, setHtRemark] = useState("");
  const [gas, setGas] = useState("");
  const [gasRemark, setGasRemark] = useState("");
  const [nallah, setNallah] = useState("");
  const [nallahRemark, setNallahremark] = useState("");
  const [road, setRoad] = useState("");
  const [roadWidth, setRoadwidth] = useState("");
  const [land, setLand] = useState("");
  const [landRemark, setLandRemark] = useState("");
  const [layoutPlan, setLayoutPlan] = useState("");


  const [open, setOpen] = useState(false);
  const handleChange = (e) => {
    this.setState({ isRadioSelected: true });
  };

  // const [fieldValue, setFieldValue] = useState("");

  const [showhide1, setShowhide1] = useState("No");
  const [showhide2, setShowhide2] = useState("No");
  const [showhide3, setShowhide3] = useState("No");
  const [showhide4, setShowhide4] = useState("No");
  const [showhide5, setShowhide5] = useState("No");
  const [showhide6, setShowhide6] = useState("No");
  const [showhide7, setShowhide7] = useState("No");
  const [showhide8, setShowhide8] = useState("No");
  const [showhide9, setShowhide9] = useState("No");
  const [showhide0, setShowhide0] = useState("No");
  const [showhide13, setShowhide13] = useState("No");
  const [showhide18, setShowhide18] = useState("No");
  const [showhide16, setShowhide16] = useState("No");
  const [showhide17, setShowhide17] = useState("No");




  const [open2, setOpen2] = useState(false);
  const handleshow = (e) => {
    const getshow = e.target.value;
    setShowhide1(getshow);
  };
  const handleshow1 = (e) => {
    const getshow = e.target.value;
    setShowhide2(getshow);
  };
  const handleshow2 = (e) => {
    const getshow = e.target.value;
    setShowhide3(getshow);
  };
  const handleshow3 = (e) => {
    const getshow = e.target.value;
    setShowhide4(getshow);
  };
  const handleshow4 = (e) => {
    const getshow = e.target.value;
    setShowhide4(getshow);
  };
  const handleshow5 = (e) => {
    const getshow = e.target.value;
    setShowhide5(getshow);
  };
  const handleshow6 = (e) => {
    const getshow = e.target.value;
    setShowhide6(getshow);
  };
  const handleshow7 = (e) => {
    const getshow = e.target.value;
    setShowhide7(getshow);
  };
  const handleshow8 = (e) => {
    const getshow = e.target.value;
    setShowhide8(getshow);
  };
  const handleshow9 = (e) => {
    const getshow = e.target.value;
    setShowhide9(getshow);
  };
  const handleshow0 = (e) => {
    const getshow = e.target.value;
    setShowhide0(getshow);
  };
  const handleshow13 = (e) => {
    const getshow = e.target.value;
    setShowhide13(getshow);
  };
  const handleshow18 = (e) => {
    const getshow = e.target.value;
    setShowhide18(getshow);
  };
  const handleshow16 = (e) => {
    const getshow = e.target.value;
    setShowhide16(getshow);
  };
  const handleshow17 = (e) => {
    const getshow = e.target.value;
    setShowhide17(getshow);
  };
  const [uncheckedValue, setUncheckedVlue] = useState([]);
  console.log(uncheckedValue);
  const [color, setColor] = useState({ yes: false, no: false });

  const [smShow2, setSmShow2] = useState(false);
  const [smShow3, setSmShow3] = useState(false);
  const [modaldData, setmodaldData] = useState({ label: "", Remarks: "" });
  const [isyesOrNochecked, setYesorNochecked] = useState(true);
  const [checkValue, setCheckedVAlue] = useState([]);

  const handleYesOrNochecked = (data) => {
    setYesorNochecked(data.data);
  };
  const handlemodalsubmit = () => {
    console.log("here");
    const filteredObj = uncheckedValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    const filteredObjCheked = checkValue.filter((obj) => {
      return obj.label == modaldData.label;
    });
    if (filteredObj.length !== 0) {
      const removedList = uncheckedValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setUncheckedVlue(removedList);
    }
    if (filteredObjCheked.length !== 0) {
      const removedList = checkValue.filter((obj) => {
        return obj.label !== modaldData.label;
      });
      setCheckedVAlue(removedList);
    }

    if (isyesOrNochecked === false) {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObj.length === 0) {
          setUncheckedVlue((prev) => [...prev, modaldData]);
        }
      }
    } else {
      if (modaldData.label !== "" || modaldData.Remarks !== "") {
        if (filteredObjCheked.length === 0) {
          setCheckedVAlue((prev) => [...prev, modaldData]);
        }
      }
    }
  };
  useEffect(() => {
    console.log("called");
    handlemodalsubmit();
  }, [modaldData.Remarks]);
  useEffect(() => {
    props.passUncheckedList({ data: uncheckedValue });
  }, [uncheckedValue]);

  useEffect(() => {
    props.passCheckedList({ data: checkValue });
  }, [checkValue]);
  console.log("unchecked values", uncheckedValue);

  console.log(uncheckedValue.indexOf("developer"));

  console.log("Akash1", Purpose);


  const classes = useStyles();
  const [docModal, setDocModal] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [labelValue, setLabelValue] = useState("");
  const Colors = {
    Conditional: "#2874A6",
    approved: "#09cb3d",
    disapproved: "#ff0000",

    info: "#FFB602"
  }
  const [selectedFieldData, setSelectedFieldData] = useState();
  const [fieldValue, setFieldValue] = useState("");
  const [openedModal, setOpennedModal] = useState("")
  const [fieldIconColors, setFieldIconColors] = useState({
    licenceApplied: Colors.info,
    licenseNumber: Colors.info,
    potential: Colors.info,
    siteLoc: Colors.info,
    approachType: Colors.info,
    areaOfParentLicence: Colors.info,
    specifyOthers: Colors.info,
    typeOfLand: Colors.info,
    thirdPartyRightCreated: Colors.info,
    thirdPartyRemark: Colors.info,
    thirdPartyDoc: Colors.info,

    migrationPolicy: Colors.info,
    encumbrance: Colors.info,
    existinglitigation: Colors.info,
    courtOrders: Colors.info,
    anyInsolvency: Colors.info,
    asPerAppliedLand: Colors.info,
    revenueRasta: Colors.info,
    waterCourseRunning: Colors.info,
    whetherInCompactBlock: Colors.info,
    landSandwiche: Colors.info,
    acquisitionStatus: Colors.info,
    dateOfSection4Notification: Colors.info,
    dateOfSection6Notification: Colors.info,
    ordersUpload: Colors.info,
    internalSectoralPlan: Colors.info,
    vacant: Colors.info,
    construction: Colors.info,
    htLine: Colors.info,
    iocGasPipeline: Colors.info,
    nallah: Colors.info,
    anyRevenueRasta: Colors.info,
    anyMarginalLand: Colors.info,
    utilityLine: Colors.info,
    documentsAsAnnexures: Colors.info,
    landSchedule: Colors.info,
    copyOfMutation: Colors.info,
    copyOfJamabandi: Colors.info,
    detailsOfLease: Colors.info,
    addSalesDeed: Colors.info,
    copyofSpaBoard: Colors.info,
    revisedLansSchedule: Colors.info,
    copyOfShajraPlan: Colors.info,
    areaAppliedUnderMigration: Colors.info,
    purposeOfParentLicence: Colors.info,
    licenceNo: Colors.info,
    areaOfParentLicence: Colors.info,
    validityOfParentLicence: Colors.info,
    approvedLayoutOfPlan: Colors.info,
    proposedLayoutOfPlan: Colors.info,
    uploadPreviouslyLayoutPlan: Colors.info,
    landCompensationReceived: Colors.info,
    statusOfRelease: Colors.info,
    dateOfAward: Colors.info,
    dateOfRelease: Colors.info,
    siteDetails: Colors.info,
    areaOfParentLicence: Colors.info,
    dateMigration: Colors.info,
    khasraNumber: Colors.info,
    areaMigration: Colors.info,
    balanceOfParentLicence: Colors.info,
    siteApproachable: Colors.info,
    minimumApproachFour: Colors.info,
    minimumApproachEleven: Colors.info,
    alreadyConstructedSector: Colors.info,

    landOwnerDonated: Colors.info,
    adjoiningOthersLand: Colors.info,
    applicantHasDonated: Colors.info,
    giftDeedHibbanama: Colors.info,
    adjoiningOwnLand: color.info,
    joiningOwnLand: Colors.info,
  })

  const fieldIdList = [{ label: "Whether licence applied for additional area", key: "licenceApplied" },
  { label: "License No. of Parent License", key: "licenseNumber" },
  { label: "Potential Zone", key: "potentialZone" },
  { label: "Site Location Purpose", key: "siteLoc" },
  { label: "Approach Type (Type of Policy)", key: "approachType" },
  { label: "Approach Road Width", key: "areaOfParentLicence" },
  { label: "Specify Others", key: "specifyOthers" },
  { label: "Type of land", key: "typeOfLand" },
  { label: "Third-party right created ", key: "thirdPartyRightCreated" },
  { label: "Third Party Remark", key: "thirdPartyRemark" },
  { label: "Third Party Document", key: "thirdPartyDoc" },
  { label: "Whether licence applied under Migration policy", key: "migrationPolicy" },
  { label: "Any encumbrance with respect to following", key: "encumbrance" },
  { label: "Existing litigation, if any, concerning applied land including co-sharers and collaborator", key: "existinglitigation" },
  { label: "Court orders, if any, affecting applied land", key: "courtOrders" },
  { label: "Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed", key: "anyInsolvency" },
  { label: "As per applied land", key: "asPerAppliedLand" }, { label: "Revenue rasta", key: "revenueRasta" },
  { label: "Watercourse running", key: "waterCourseRunning" },
  { label: "Whether in Compact Block", key: "whetherInCompactBlock" },
  { label: "Land Sandwiched", key: "landSandwiche" },
  { label: "Acquisition status", key: "acquisitionStatus" },
  { label: "Date of section 4 notification", key: "dateOfSection4Notification" },
  { label: "Date of section 6 notification", key: "dateOfSection6Notification" },
  { label: "Orders Upload", key: "ordersUpload" },
  { label: "whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road", key: "internalSectoralPlan" },
  { label: "vacant", key: "vacant" },
  { label: "Construction", key: "construction" },
  { label: "HT line", key: "htLine" },
  { label: "IOC Gas Pipeline", key: "iocGasPipeline" },
  { label: "Nallah", key: "nallah" },
  { label: "Any revenue rasta/road", key: "anyRevenueRasta" },
  { label: "Any marginal land", key: "anyMarginalLand" },
  { label: "Utility Line", key: "utilityLine" },
  { label: "Enclose the following documents as Annexures", key: "documentsAsAnnexures" },
  { label: "Land schedule", key: "landSchedule" },
  { label: "Copy of Mutation", key: "copyOfMutation" },
  { label: "Copy of Jamabandi", key: "copyOfJamabandi" },
  { label: "Details of lease / patta, if any", key: "detailsOfLease" },
  { label: "Add Sales/deed/exchange", key: "addSalesDeed" },
  { label: "Copy of spa/GPA/board resolution", key: "copyofSpaBoard" },
  { label: "Revised Land Schedule", key: "revisedLansSchedule" },
  { label: "Copy of Shajra Plan", key: "copyOfShajraPlan" },
  { label: "Date", key: "dateMigration" },
  { label: "Khasra number", key: "khasraNumber" },
  { label: "Area", key: "areaMigration" },
  { label: "Balance Of Parent Licence", key: "balanceOfParentLicence" },
  { label: "Area Applied under Migration", key: "areaAppliedUnderMigration" },
  { label: "Purpose of Parent Licence", key: "purposeOfParentLicence" },
  { label: "Licence No.", key: "licenceNo" },
  { label: "Area of Parent Licence", key: "areaOfParentLicence" },
  { label: "Proposed Layout of Plan /site plan for area applied for migration.", key: "proposedLayoutOfPlan" },
  { label: "Download Previously approved Layout Plan", key: "uploadPreviouslyLayoutPlan" },
  { label: "Validity of Parent Licence", key: "validityOfParentLicence" },
  { label: "Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration", key: "approvedLayoutOfPlan" },
  { label: "Whether land compensation received", key: "landCompensationReceived" },
  { label: "Status of release", key: "statusOfRelease" },
  { label: "Date of Award", key: "dateOfAward" },
  { label: "Date of Release", key: "dateOfRelease" },
  { label: "Site Details", key: "siteDetails" },
  { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  { label: "(a)  Approach available from minimum 4 karam (22 ft) wide revenue rasta", key: "minimumApproachFour" },
  { label: "(b) Approach available from minimum 11 feet wide revenue rasta and applied site abuts acquired alignment of the sector road and there is no stay regarding construction on the land falling under the abutting sector road", key: "minimumApproachEleven" },
  { label: "(c) Applied site abouts already constructed sector road or internal circulation road of approved sectoral plan (of min. 18m/24m width as the case may be) provided its entire stretch required for approach is licenced and is further leading upto atleast 4 karam wide revenue rasta.", key: "applicantHasDonated" },
  { label: "(d) Applied land is accessible from a minimum 4 karam wide rasta through adjoining own land of the applicant (but not applied for licence)", key: "joiningOwnLand" },
  { label: "(d1)  If applicable, whether the applicant has donated at least 4 karam wide strip from its adjoining own land in favour of the Gram Panchayat/Municipality, in order to connect the applied site to existing 4 karam rasta?", key: "landOwnerDonated" },
  { label: "(e) Applied land is accessible from a minimum 4 karam wide rasta through adjoining other’s land", key: "adjoiningOthersLand" },
  { label: "(e1) whether the land-owner of the adjoining land has donated at least 4 karam wide strip of land to the Gram Panchayat/Municipality, in a manner that the applied site gets connected to existing public rasta of atleast 4 karam width?", key: "siteApproachable" },
  { label: "whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road.", key: "siteApproachable" },
  { label: "Upload copy of Gift Deed/ Hibbanama", key: "giftDeedHibbanama" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  // { label: "(h) Details of existing approach as per policy dated 20-10-20", key: "siteApproachable" },
  { label: "Area of Parent Licence", key: "areaOfParentLicence" },];


  const getColorofFieldIcon = () => {
    let tempFieldColorState = fieldIconColors;
    fieldIdList.forEach((item) => {
      if (dataIcons !== null && dataIcons !== undefined) {
        console.log("color method called");
        const fieldPresent = dataIcons.egScrutiny.filter(ele => (ele.fieldIdL === item.label));
        console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
        if (fieldPresent && fieldPresent.length) {
          console.log("filteration value111", fieldPresent, fieldPresent[0]?.isApproved);
          tempFieldColorState = { ...tempFieldColorState, [item.key]: fieldPresent[0].isApproved === "In Order" ? Colors.approved : fieldPresent[0].isApproved === "Not In Order" ? Colors.disapproved : fieldPresent[0].isApproved === "Conditional" ? Colors.Conditional : Colors.info }

        }
      }
    })

    setFieldIconColors(tempFieldColorState);

  };


  useEffect(() => {
    getColorofFieldIcon();
    console.log("repeating1...",)
  }, [dataIcons])

  useEffect(() => {
    if (labelValue) {
      const fieldPresent = dataIcons.egScrutiny.filter(ele => (ele.fieldIdL === labelValue)); 
      setSelectedFieldData(fieldPresent[0]);
    } else {
      setSelectedFieldData(null);
    }
  }, [labelValue])



  const currentRemarks = (data) => {
    props.showTable({ data: data.data });
  };

  const handlemodaldData = (data) => {

    setSmShow(false);
    console.log("here", openedModal, data);
    if (openedModal && data) {
      setFieldIconColors({ ...fieldIconColors, [openedModal]: data.data.isApproved ? Colors.approved : Colors.disapproved })
    }
    setOpennedModal("");
    setLabelValue("");
  };


  return (
    <Form
      ref={props.developerInfoRef}
    >
      <ModalChild
        labelmodal={labelValue}
        passmodalData={handlemodaldData}
        displaymodal={smShow}
        disPlayDoc={docModal}
        onClose={() => setSmShow(false)}
        selectedFieldData={selectedFieldData}
        fieldValue={fieldValue}
        remarksUpdate={currentRemarks}
        applicationStatus={applicationStatus}
      ></ModalChild>

      <div
        className="collapse-header"
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        style={{
          background: "#f1f1f1",
          padding: "0.25rem 1.25rem",
          borderRadius: "0.25rem",
          fontWeight: "600",
          display: "flex",
          cursor: "pointer",
          color: "#817f7f",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <span style={{ color: "#817f7f" }} className="">
          Land Schedule
        </span>
        {open ? <RemoveIcon></RemoveIcon> : <AddIcon></AddIcon>}
      </div>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Form.Group
            style={{ display: props.displayGeneral, border: "2px solid #e9ecef", margin: 15, padding: 15 }}
            className={`justify-content-center ${classes.formLabel}`}
          >
            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {/* {JSON.stringify(userRoles)}
                    {JSON.stringify(hideRemarks)} */}
                {/* <Form.Label >
                 
                  (i)Whether licence applied for additional area ?
                </Form.Label> */}
                {/* <label  className="card-title fw-bold" style={{ margin: 10 }} htmlFor="Developer Details">
                            {`${t("NWL_APPLICANT_WHETHER_LICENCE_APPLIED_FOR_ADDITIONAL_AREA")}`}
                            <span class="text-danger font-weight-bold mx-2">*</span>
                          </label> */}

                <label htmlFor="Developer Details">
                  {`${t("NWL_APPLICANT_WHETHER_LICENCE_APPLIED_FOR_ADDITIONAL_AREA")}`}
                  <span class="text-danger font-weight-bold mx-2">*</span>
                </label>

                <div className="d-flex flex-row">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.licenseApplied === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>
                  <input type="radio" disabled value="No" checked={landScheduleData?.licenseApplied === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_LICENCE_APPLIED_FOR_ADDITIONAL_AREA") ? "block" : "none",
                      color: fieldIconColors.licenceApplied
                    }}
                    onClick={() => {
                      setLabelValue("Whether licence applied for additional area"),
                        setOpennedModal("licenceApplied")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.licenseApplied === "Y" ? "Yes" : landScheduleData?.licenseApplied === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            {
              landScheduleData?.licenseApplied === "Y" && (

                <div>
                  <Row className={classes.formLabel} style={{ marginBottom: 15 }} >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>
                        <h5>Licence No. of Parent Licence &nbsp;</h5>
                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_LICENCE_NUMBER_OF_PARENT_LICENCE")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      <div className="d-flex flex-row align-items-center my-1 ">
                        <Form.Control
                          placeholder={landScheduleData !== null ? landScheduleData?.licenseNumber : null}
                          disabled
                        ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_LICENCE_NUMBER_OF_PARENT_LICENCE") ? "block" : "none",

                            color: fieldIconColors.licenseNumber
                          }}
                          onClick={() => {
                            setLabelValue("Licence No. of Parent Licence"),
                              setOpennedModal("licenseNumber")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.licenseNumber : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label htmlFor="potential">

                        {/* <h5>Development Plan &nbsp;</h5> */}
                        <label htmlFor="Developer Details">
                          {`${t("NWL_APPLICANT_DEVELOMENT_PLAN_ADDICATION_PLAN")}`}
                          <span class="text-danger font-weight-bold mx-2">*</span>
                        </label>

                      </label>

                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control

                          placeholder={landScheduleData !== null ? landScheduleData?.potential : null}
                          disabled
                        ></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_DEVELOMENT_PLAN_ADDICATION_PLAN") ? "block" : "none",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.potential
                          }}
                          onClick={() => {
                            setLabelValue("Potential Zone"),
                              setOpennedModal("potential")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.potential : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>

                        <h5>Type of colony  &nbsp;</h5>
                        
                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_TYPE_OF_COLONY_ADDICATION_PLAN")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.siteLoc : null} disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_TYPE_OF_COLONY_ADDICATION_PLAN") ? "block" : "none",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.siteLoc
                          }}
                          onClick={() => {
                            setLabelValue("Site Location Purpose"),
                              setOpennedModal("siteLoc")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.siteLoc : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                  </Row>
                  <Row className="ms-auto" style={{ marginBottom: 15 }}>

                    <Col md={6} xxl lg="12">
                      {
                        {
                          'DDJAY_APHP': <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          'RPL': <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "NILPC": <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "AHP": <div>
                            <CommercialColonyInResidential dataForIcons={dataIcons} ></CommercialColonyInResidential>
                          </div>,
                          "CIC": <div>
                            <CommercialLicense dataForIcons={dataIcons} ></CommercialLicense>
                          </div>,
                          "LDEF": <div>
                            <LowDensityEco dataForIcons={dataIcons} ></LowDensityEco>
                          </div>,
                          "IPL": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "ITP": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "ITC": <div>
                            <CyberPark dataForIcons={dataIcons} ></CyberPark>
                          </div>,
                          "RHP": <div>
                            <RetirementHousing dataForIcons={dataIcons} ></RetirementHousing>
                          </div>,
                        }[Purpose]
                      }
                    </Col>

                  </Row >
                  <Row className={classes.formLabel} style={{ marginBottom: 15 }}>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>
                        <h6>Area of parent licence in acres </h6>{" "}

                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_AREA_OF_PARENT_LICENCE_IN_ACRES_ADDICATION_PLAN")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.areaOfParentLicence : null} disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AREA_OF_PARENT_LICENCE_IN_ACRES_ADDICATION_PLAN") ? "block" : "none",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.areaOfParentLicence
                          }}
                          onClick={() => {
                            setLabelValue("Area of Parent Licence"),
                              setOpennedModal("areaOfParentLicence")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.areaOfParentLicence : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>
                        <h6>Validity of parent licences</h6>
                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_VALIDITY_OF_PARENT_LICENCES_ADDICATION_PLAN")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>
                      <div className="d-flex flex-row align-items-center my-1 ">
                        <input type="radio" disabled value="Yes" checked={landScheduleData?.thirdParty === "Y" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="Yes">
                          Yes
                        </label>
                        &nbsp;&nbsp;
                        <input type="radio" disabled value="No" checked={landScheduleData?.thirdParty === "N" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="No">
                          No
                        </label>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_VALIDITY_OF_PARENT_LICENCES_ADDICATION_PLAN") ? "block" : "none",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.thirdPartyRightCreated
                          }}
                          onClick={() => {
                            setLabelValue("Third-party right created"),
                              setOpennedModal("thirdPartyRightCreated")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.thirdParty === "Y" ? "Yes" : "No");
                          }}
                        ></ReportProblemIcon>

                      </div>
                      {landScheduleData?.thirdParty === "N" && (
                        <div>
                          <label htmlFor="Developer Details">
                            {/* Whether renewal licence fee submitted  */}
                            {`${t("NWL_APPLICANT_WHETHER_RENEWAL_LICENCES_FEE_SUBMITTED_ADDICATION_PLAN")}`}
                            <span class="text-danger font-weight-bold mx-2">*</span>
                          </label>
                          <div className="d-flex flex-row align-items-center my-1 ">
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.thirdParty === "Y" ? true : false} />
                            &nbsp;&nbsp;
                            <label className="m-0 mx-2" for="Yes">
                              Yes
                            </label>
                            &nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.thirdParty === "N" ? true : false} />
                            &nbsp;&nbsp;
                            <label className="m-0 mx-2" for="No">
                              No
                            </label>
                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_RENEWAL_LICENCES_FEE_SUBMITTED_ADDICATION_PLAN") ? "block" : "none",
                                // display: hideRemarksPatwari?"none":"block",
                                color: fieldIconColors.thirdPartyRightCreated
                              }}
                              onClick={() => {
                                setLabelValue("Third-party right created"),
                                  setOpennedModal("thirdPartyRightCreated")
                                setSmShow(true),
                                  setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData?.thirdParty === "Y" ? "Yes" : "No");
                              }}
                            ></ReportProblemIcon>
                          </div>
                        </div>
                      )}

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label htmlFor="Developer Details">
                        {/* Any Other Remark  */}
                        {`${t("NWL_APPLICANT_WHETHER_ANY_OTHER_REMARKS_ADDICATION_PLAN")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>
                      <input type="text" className="form-control"
                        placeholder=" "
                        disabled />
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_THIRD_PARTY_RIGHT_CREATED_ADDICATION_PLAN")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      {/* <h6>Third-party right created&nbsp; </h6> */}

                      <div className="d-flex flex-row align-items-center my-1 ">
                        <input type="radio" disabled value="Yes" checked={landScheduleData?.thirdParty === "Y" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="Yes">
                          Yes
                        </label>
                        &nbsp;&nbsp;
                        <input type="radio" disabled value="No" checked={landScheduleData?.thirdParty === "N" ? true : false} />
                        &nbsp;&nbsp;
                        <label className="m-0 mx-2" for="No">
                          No
                        </label>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_THIRD_PARTY_RIGHT_CREATED_ADDICATION_PLAN") ? "block" : "none",
                            // display: hideRemarksPatwari?"none":"block",
                            color: fieldIconColors.thirdPartyRightCreated
                          }}
                          onClick={() => {
                            setLabelValue("Third-party right created"),
                              setOpennedModal("thirdPartyRightCreated")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.thirdParty === "Y" ? "Yes" : "No");
                          }}
                        ></ReportProblemIcon>

                      </div>
                      {/* </div> */}
                      {/* <div className="col col-8">
                      
                    </div> */}
                      {/* <div className="col col-4">
                      {landScheduleData?.thirdParty === "N" && (
                        <div className="row ">
                          <div className="col col-4">
                            <label> Document Download </label>
                            <IconButton onClick={() => getDocShareholding(landScheduleData?.thirdPartyDoc)}>
                              <DownloadForOfflineIcon color="primary" className="mx-1" />
                            </IconButton>
                          </div>
                        </div>
                      )}
                    </div> */}
                    </Col>
                    <Col className="ms-auto" md={6} xxl lg="12">
                      {landScheduleData?.thirdParty === "N" && (
                        <div>
                          <div className="col col-4">

                            <label> Remark </label>

                            <div className="d-flex flex-row  align-items-center">
                              <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.thirdPartyRemark : null}

                                className={classes.formLabel}
                                disabled></Form.Control>
                              {/* <ReportProblemIcon
                                style={{
                                 display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Remark") ? "block" : "none",
                                  // display: hideRemarksPatwari?"none":"block",
                                  color: fieldIconColors.thirdPartyRemark
                                }}
                                onClick={() => {
                                  setLabelValue("Third Party Remark"),
                                    setOpennedModal("thirdPartyRemark")
                                   setSmShow(true),
                     setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.thirdPartyRemark : null);
                                }}
                              ></ReportProblemIcon> */}
                            </div>
                          </div>
                          <div className="col col-4">
                            <label> Document Download </label>



                            <div className="d-flex flex-row  align-items-center">
                              <IconButton onClick={() => getDocShareholding(landScheduleData?.thirdPartyDoc)}>
                                <DownloadForOfflineIcon color="primary" className="mx-1" />
                              </IconButton>
                              {/* <ReportProblemIcon
                                style={{
                                 display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Address") ? "block" : "none",
                               
                                  color: fieldIconColors.thirdPartyDoc
                                }}
                                onClick={() => {
                                  setLabelValue("Third Party Document"),
                                    setOpennedModal("thirdPartyDoc")
                                   setSmShow(true),
                     setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.thirdPartyDoc : null);
                                }}
                              ></ReportProblemIcon> */}
                            </div>

                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              )}

            <Row className={classes.formLabel}>
              <Col className="ms-auto" md={4} xxl lg="12">
                {/* <Form.Label> (ii)Whether licence applied under Migration Policy ?</Form.Label> */}
                <label htmlFor="Developer Details">
                  {`${t("NWL_APPLICANT_WHETHER_LICENCE_APPLIED_UNDER_MIGRATION_POLICY")}`}
                  <span class="text-danger font-weight-bold mx-2">*</span>
                </label>
                &nbsp;&nbsp;
                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.migrationLic === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.migrationLic === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_LICENCE_APPLIED_UNDER_MIGRATION_POLICY") ? "block" : "none",

                      color: fieldIconColors.migrationPolicy
                    }}
                    onClick={() => {
                      setLabelValue("Whether licence applied under Migration policy"),
                        setOpennedModal("migrationPolicy")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.migrationLic === "Y" ? "Yes" : "No");
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {
                  landScheduleData?.migrationLic === "Y" &&

                  <div>
                    <div style={{ overflow: "scroll" }}>
                      <table className="table table-bordered">
                        <thead>

                          <tr className="border-bottom-0">
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Previous Licence Number */}
                              {`${t("NWL_APPLICANT_PREVIOUS_LICENCE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Area of parent licence */}
                              {`${t("NWL_APPLICANT_AREA_OF_PARENT_LICENCE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Purpose of parent licence */}
                              {`${t("NWL_APPLICANT_PURPOSE_OF_PAREMENT_LICENCE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Validity of parent licence */}
                              {`${t("NWL_APPLICANT_VALIDITY_OF_PARENT_LICENCE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Date */}
                              {`${t("NWL_APPLICANT_DATE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Area applied under migration in acres */}
                              {`${t("NWL_APPLICANT_AREA_APPLIED_UNDER_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Applied Khasra number */}
                              {`${t("NWL_APPLICANT_APPLIED_KHASRS_NUMBER_GINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Area */}
                              {`${t("NWL_APPLICANT_AREA_LICENCE_MGINATIONLIC")}`}
                            </th>
                            <th class="fw-normal pb-0 border-bottom-0 align-top">
                              {/* Balance of Parent Licence */}
                              {`${t("NWL_APPLICANT_BALANCE_OF_PARENT_LICENCE_MGINATIONLIC")}`}
                            </th>

                          </tr>
                          <tr className="border-top-0">
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_PREVIOUS_LICENCE_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.licenceNo
                                }}
                                onClick={() => {
                                  setLabelValue("Previous Licence Number"),
                                    setOpennedModal("licenceNo")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.previousLicensenumber : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AREA_OF_PARENT_LICENCE_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.areaOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Area of Parent Licence"),
                                    setOpennedModal("areaOfParentLicence")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.areaOfParentLicence : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_PURPOSE_OF_PAREMENT_LICENCE_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.purposeOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Purpose of Parent Licence"),
                                    setOpennedModal("purposeOfParentLicence")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.purposeOfParentLicence : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_VALIDITY_OF_PARENT_LICENCE_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.validityOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Validity of Parent Licence")
                                  setOpennedModal("validityOfParentLicence")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.validityOfParentLicence === "Y" ? "Yes" : landScheduleData?.validityOfParentLicence === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_DATE_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.dateMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Date"),
                                    setOpennedModal("dateMigration")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.date : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AREA_APPLIED_UNDER_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.areaAppliedUnderMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area Applied under Migration"),
                                    setOpennedModal("areaAppliedUnderMigration")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.areaAppliedmigration : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AREA_APPLIED_UNDER_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.khasraNumber
                                }}
                                onClick={() => {
                                  setLabelValue("Khasra number"),
                                    setOpennedModal("khasraNumber")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.khasraNumber : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AREA_APPLIED_UNDER_MGINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.areaMigration
                                }}
                                onClick={() => {
                                  setLabelValue("Area"),
                                    setOpennedModal("areaMigration")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.area : null);
                                }}
                              ></ReportProblemIcon>
                            </th>
                            <th class="fw-normal py-0 border-top-0">
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_APPLIED_KHASRS_NUMBER_GINATIONLIC") ? "block" : "none",
                                  color: fieldIconColors.balanceOfParentLicence
                                }}
                                onClick={() => {
                                  setLabelValue("Balance Of Parent Licence"),
                                    setOpennedModal("balanceOfParentLicence")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData !== null ? landScheduleData?.LandScheduleDetails?.[0]?.balanceOfParentLicence : null);
                                }}
                              ></ReportProblemIcon>
                            </th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            landScheduleData?.LandScheduleDetails?.map((item, index) => (

                              <tr
                                key={index}
                              >
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.previousLicensenumber}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.areaOfParentLicence}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.purposeOfParentLicence}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.validity}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.date}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.areaAppliedmigration}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.khasraNumber}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.area}
                                    disabled />
                                </td>
                                <td>
                                  <input type="text" className="form-control"
                                    placeholder={item?.balanceOfParentLicence}
                                    disabled />
                                </td>

                                {/* <td class="text-center">
                    <div className="btn btn-sm col-md-6">
                                    <IconButton onClick={()=>getDocShareholding(item?.registeringAuthorityDoc)}>
                                      <Visibility color="info" className="icon" /></IconButton>
                                  
                                  </div>
                                  <div className="btn btn-sm col-md-6">
                                    <IconButton onClick={()=>getDocShareholding(item?.registeringAuthorityDoc)}>
                                <FileDownload color="primary" className="mx-1" />
                        </IconButton>
                        </div>
                      <input type="text" className="form-control" title={item?.registeringAuthorityDoc} placeholder={item?.registeringAuthorityDoc} disabled />
                    </td>
                    */}

                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>
                    {/* <Row className={classes.formLabel} style={{ marginBottom: 20 }}> */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                      
                          <h5>Area Applied under Migration</h5>
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                           
                            placeholder={landScheduleData !== null ? landScheduleData?.areaUnderMigration : null}
                            disabled
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.areaAppliedUnderMigration
                            }}
                            onClick={() => {
                              setLabelValue("Area Applied under Migration"),
                                setOpennedModal("areaAppliedUnderMigration")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                         setFieldValue(landScheduleData !== null ? landScheduleData?.areaAppliedUnderMigration : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                        
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <label htmlFor="potential">
                          <h6>
                         
                            <h5>Purpose of Parent Licence</h5>
                          </h6>
                        </label>

                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control
                            
                            placeholder={landScheduleData !== null ? landScheduleData?.purposeParentLic : null}
                            disabled
                          ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.purposeOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Purpose of Parent Licence"),
                                setOpennedModal("purposeOfParentLicence")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicPurpose : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                          
                          <h5>Licence No.</h5>
                        </label>
                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.licNo : null} 
                        
                          disabled></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.licenceNo
                            }}
                            onClick={() => {
                              setLabelValue("Licence No."),
                                setOpennedModal("licenceNo")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.licNo : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}

                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                         
                          <h5>Area of Parent Licence</h5>
                        </label>

                        <div className="d-flex flex-row  align-items-center">
                          <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.areaofParentLic : null}
                          
                           disabled></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.areaOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Area of Parent Licence"),
                                setOpennedModal("areaOfParentLicence")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.parentLicArea : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                        <label>
                          <h6>Validity of Parent Licence</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.validityOfParentLic === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.validityOfParentLic === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.validityOfParentLicence
                            }}
                            onClick={() => {
                              setLabelValue("Validity of Parent Licence")
                              setOpennedModal("validityOfParentLicence")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.validityOfParentLic === "Y" ? "Yes" : landScheduleData?.validityOfParentLic === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col>  */}
                    {/* <Col className="ms-auto" md={4} xxl lg="4">
                     
                      <h6>Type of land</h6>{" "}
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.typeLand : null} 
                         
                        disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.typeOfLand
                          }}
                          onClick={() => {
                            setLabelValue("Type of land"),
                              setOpennedModal("typeOfLand")
                             setSmShow(true),
                     setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.typeLand : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                  
                      </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Approach Road Width&nbsp;&nbsp;</h6>{" "}
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.approachRoadWidth : null} 
                       
                         disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.approachRoadWidth
                          }}
                          onClick={() => {
                            setLabelValue("Approach Road Width"),
                              setOpennedModal("approachRoadWidth")
                             setSmShow(true),
                     setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.approachRoadWidth : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      <label>
                        <h6>Area other than Licence&nbsp;&nbsp;</h6>{" "}
                      </label>
                      <div className="d-flex flex-row  align-items-center">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.approachRoadWidth : null} 
                        
                        disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks?"none":"block",
                            color: fieldIconColors.approachRoadWidth
                          }}
                          onClick={() => {
                            setLabelValue("Approach Road Width"),
                              setOpennedModal("approachRoadWidth")
                             setSmShow(true),
                     setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData !== null ? landScheduleData?.approachRoadWidth : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </Col>
                      <Col className="ms-auto" md={4} xxl lg="4">
                        <h6>Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration</h6>
                       
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <IconButton onClick={() => getDocShareholding(landScheduleData?.approvedLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.approvedLayoutOfPlan
                            }}
                            onClick={() => {
                              setLabelValue("Approved Layout of Plan/ Site plan for(GH)Showing Area(s)/Proposed migration"),
                                setOpennedModal("approvedLayoutOfPlan")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </Col> */}
                    {/* </Row> */}
                    {/* <Row className="ms-auto" style={{ marginBottom: 20 }}>
                      <div className="col col-4">
                        <h6>Proposed Layout of Plan /site plan for area applied for migration.</h6>
                        
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.proposedLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.proposedLayoutOfPlan
                            }}
                            onClick={() => {
                              setLabelValue("Proposed Layout of Plan /site plan for area applied for migration."),
                                setOpennedModal("proposedLayoutOfPlan")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>

                      <div className="col col-4">
                        <h6>Download Previously approved Layout Plan</h6>
                        
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.uploadPreviouslyLayoutPlan)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks?"none":"block",
                              color: fieldIconColors.uploadPreviouslyLayoutPlan
                            }}
                            onClick={() => {
                              setLabelValue("Download Previously approved Layout Plan"),
                                setOpennedModal("uploadPreviouslyLayoutPlan")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue("");
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    </Row> */}
                  </div>
                }
              </Col>
            </Row>

            <hr className="mb-3"></hr>
            <Row className={classes.formLabel}>


              {/* <h5>
                2. Any encumbrance with respect to following :&nbsp;&nbsp;
              </h5> */}
              <label htmlFor="Developer Details">
                {`${t("NWL_APPLICANT_ANY_ENCUMBRANCE_WITH_RESPECT_TO_FOLLOWING")}`}
                <span class="text-danger font-weight-bold mx-2">*</span>
              </label>
              <div className="d-flex mt-2 align-items-center">
                <input type="radio" disabled value="rehan" name="rehan" checked={landScheduleData?.encumburance === "rehan" ? true : false} />
                <label className="m-0 mx-2" htmlFor="rehan"> {`${t("NWL_APPLICANT_REHAN_MORTGAGE_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* Rehan / Mortgage */}
                <input type="radio" disabled value="patta" name="patta" checked={landScheduleData?.encumburance === "patta" ? true : false} />
                <label className="m-0 mx-2" htmlFor="patta">{`${t("NWL_APPLICANT_PATTA_LEASE_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* Patta/Lease  */}
                <input type="radio" disabled value="gair" name="gair" checked={landScheduleData?.encumburance === "gair" ? true : false} />
                <label className="m-0 mx-2" htmlFor="gair">{`${t("NWL_APPLICANT_GAIR_MARUSI_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* Gair/Marusi */}
                <input type="radio" disabled value="anyOther" name="anyOther" checked={landScheduleData?.encumburance === "anyOther" ? true : false} />
                <label className="m-0 mx-2" htmlFor="anyOther"> {`${t("NWL_APPLICANT_ANY_OTHER_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* Any Other */}
                <input type="radio" disabled value="loan" name="loan" checked={landScheduleData?.encumburance === "loan" ? true : false} />
                <label className="m-0 mx-2" htmlFor="loan">{`${t("NWL_APPLICANT_LOND_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* Loan  */}
                <input type="radio" disabled value="none" name="none" checked={landScheduleData?.encumburance === "none" ? true : false} />
                <label className="m-0 mx-2" htmlFor="none">{`${t("NWL_APPLICANT_NONE_ENCUMBRANCE")}`}</label>
                &nbsp;&nbsp;
                {/* none */}
                <ReportProblemIcon
                  className="m-0 mx-2"
                  style={{
                    display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ANY_ENCUMBRANCE_WITH_RESPECT_TO_FOLLOWING") ? "block" : "none",
                    color: fieldIconColors.encumbrance
                  }}
                  onClick={() => {
                    setLabelValue("Any encumbrance with respect to following"),
                      setOpennedModal("encumbrance")
                    setSmShow(true),
                      setDocModal(false),
                      console.log("modal open"),
                      setFieldValue(landScheduleData !== null ? landScheduleData?.encumburance : null);
                  }}
                ></ReportProblemIcon>
              </div>


              {landScheduleData?.encumburance === "rehan/mortgage" && "patta/lease" && "anyOther" && "gair/marusi" && (
                <div className="row ml-3 mb-3">
                  <div className="col col-4 m-0 p-0">
                    {/* <label htmlFor="npnl">
                      <h6>Rehan/Mortgage Remarks</h6>
                    </label> */}
                    <label htmlFor="Developer Details">
                      {`${t("NWL_APPLICANT_REHAN_MORTGAGE_REMARKS")}`}
                      <span class="text-danger font-weight-bold mx-2">*</span>
                    </label>
                    <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null}
                      // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                      className={classes.formLabel}
                      disabled></Form.Control>
                  </div>
                </div>
              )}
            </Row>
            {/* { landScheduleData?.encumburance === "patta/lease" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Patta/Lease Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
             { landScheduleData?.encumburance === "gair/marusi" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Gair/Marusi Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
             { landScheduleData?.encumburance === "anyOther" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>Any other Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            }
            { landScheduleData?.encumburance === "none" &&
              <div className="row ml-3 mb-3">
              <div className="col col-4 m-0 p-0">
                <label htmlFor="npnl">
                  <h6>None Remarks</h6>
                </label>
                <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                     </div>
            </div>
            } */}
            <hr className="mb-3" />
            <Row className={classes.formLabel}>
              {/* <h6 >
                (ii) Existing litigation, if any, concerning applied land including co-sharers and collaborator.
              </h6> */}
              <label htmlFor="Developer Details">
                {`${t("NWL_APPLICANT_EXISTING_LITIGATION_IF_ANY_CONCERNING_APPLIED_LAND")}`}
                <span class="text-danger font-weight-bold mx-2">*</span>
              </label>
              <div className="d-flex mt-2">
                <input type="radio" disabled value="Yes" checked={landScheduleData?.litigation === "Y" ? true : false} />
                <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                <input type="radio" disabled value="No" checked={landScheduleData?.litigation === "N" ? true : false} />
                <label className="m-0 mx-2" for="No">No</label>
                <ReportProblemIcon
                  style={{
                    display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_EXISTING_LITIGATION_IF_ANY_CONCERNING_APPLIED_LAND") ? "block" : "none",
                    color: fieldIconColors.existinglitigation
                  }}
                  onClick={() => {
                    setLabelValue("Existing litigation, if any, concerning applied land including co-sharers and collaborator"),
                      setOpennedModal("existinglitigation")
                    setSmShow(true),
                      setDocModal(false),
                      console.log("modal open"),
                      setFieldValue(landScheduleData?.litigation === "Y" ? "Yes" : landScheduleData?.litigation === "N" ? "No" : null);
                  }}
                ></ReportProblemIcon>
              </div>
            </Row>



            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {
                  landScheduleData?.litigation === "Y" && (

                    <div >
                      <hr className="mb-3" />
                      {/* <h6 > Court orders, if any, affecting applied land   </h6> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_COURT_ORDERS_IF_ANY_AFFECTING_APPLIED_LAND")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      <input type="radio" disabled value="Yes" checked={landScheduleData?.court === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.court === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_COURT_ORDERS_IF_ANY_AFFECTING_APPLIED_LAND") ? "block" : "none",
                          color: fieldIconColors.courtOrders
                        }}
                        onClick={() => {
                          setLabelValue("Court orders, if any, affecting applied land"),
                            setOpennedModal("courtOrders")
                          setSmShow(true),
                            setDocModal(false),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.court === "Y" ? "Yes" : landScheduleData?.court === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>
                  )}
              </Col>
            </Row>


            <Row className={classes.formLabel}>

              {
                landScheduleData?.court === "Y" && (
                  <div className="row" >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>

                        <h5>Remark/Case No.</h5>
                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_COURT_ORDERS_IF_ANY_Y_REMARKS_CASE_NO")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>
                      <Form.Control
                        placeholder={landScheduleData !== null ? landScheduleData?.courtyCaseNo : null}

                        className={classes.formLabel}
                        disabled>
                      </Form.Control>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <h6>Download Document</h6> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_DOWNLOAD_DOCUMENT_APPLIED_LAND")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>
                      <IconButton onClick={() => getDocShareholding(landScheduleData?.courtDoc)}>
                        <DownloadForOfflineIcon color="primary" className="mx-1" />
                      </IconButton>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                    </Col>
                  </div>

                )}

            </Row>


            <hr className="mb-3" />

            <Row className={classes.formLabel}>
              <Col md={4} xxl lg="12">
                {/* <h6 >
                  (iii) Any insolvency/liquidation proceedings against the Land Owing Company/Develping Company :
                </h6> */}
                <label htmlFor="Developer Details">
                  {`${t("NWL_APPLICANT_ANY_INSOLVENCY_LIQUIDATION_PROCEESSDING_AGAINST_THE_LAND_OWING")}`}
                  <span class="text-danger font-weight-bold mx-2">*</span>
                </label>
                <div className="d-flex mt-2">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.insolvency === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.insolvency === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ANY_INSOLVENCY_LIQUIDATION_PROCEESSDING_AGAINST_THE_LAND_OWING") ? "block" : "none",
                      color: fieldIconColors.anyInsolvency
                    }}
                    onClick={() => {
                      setLabelValue("Any insolvency/liquidation proceedings against the land owner(s)/ collaborating developed"),
                        setOpennedModal("anyInsolvency")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.insolvency === "Y" ? "Yes" : landScheduleData?.insolvency === "N" ? "NO" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </Col>
            </Row>

            <Row className={classes.formLabel}>
              {
                landScheduleData?.insolvency === "Y" && (
                  <div className="row" >
                    <Col className="ms-auto" md={4} xxl lg="4">
                      {/* <label>

                        <h5>Remark</h5>
                      </label> */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_ANY_INSOLVENCY_Y_REMARKS_LAND_OWING")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>
                      <Form.Control
                        placeholder={landScheduleData !== null ? landScheduleData?.insolvencyRemark : null}

                        className={classes.formLabel}
                        disabled></Form.Control>

                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                      {/* <h6>Download Document</h6> */}
                      {/* &nbsp;&nbsp; */}
                      <label htmlFor="Developer Details">
                        {`${t("NWL_APPLICANT_ANY_INSOLVENCY_Y_DOWNLOAD_DOCUMENT_LAND_OWING")}`}
                        <span class="text-danger font-weight-bold mx-2">*</span>
                      </label>

                      <IconButton onClick={() => getDocShareholding(landScheduleData?.insolvencyDoc)}>
                        <DownloadForOfflineIcon color="primary" className="mx-1" />
                      </IconButton>
                    </Col>
                    <Col className="ms-auto" md={4} xxl lg="4">

                    </Col>
                  </div>

                )}

            </Row>

            <hr className="mb-3" />
            {/* <Row className={classes.formLabel}></Row> */}
            {/* <h5 className="text-black ml-2 mb-2">3.Shajra Plan</h5> */}
            <label htmlFor="Developer Details">
              {`${t("NWL_APPLICANT_SHAJRA_PLAN")}`}
              <span class="text-danger font-weight-bold mx-2">*</span>
            </label>
            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6>
                  {/* (a) As per applied land */}
                  {`${t("NWL_APPLICANT_AS_PER_APPLIED_LAND_SHAJRA_PLAN")}`}

                  <div className="d-flex flex-row align-items-center my-1 ">
                    &nbsp;
                    <input type="radio" disabled value="Yes" checked={landScheduleData?.appliedLand === "Y" ? true : false} />
                    <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                    <input type="radio" disabled value="No" checked={landScheduleData?.appliedLand === "N" ? true : false} />
                    <label className="m-0 mx-2" for="No">No</label>
                    <ReportProblemIcon
                      style={{
                        display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AS_PER_APPLIED_LAND_SHAJRA_PLAN") ? "block" : "none",
                        color: fieldIconColors.asPerAppliedLand
                      }}
                      onClick={() => {
                        setLabelValue("As per applied land"),
                          setOpennedModal("asPerAppliedLand")
                        setSmShow(true),
                          setDocModal(false),
                          console.log("modal open"),
                          setFieldValue(landScheduleData?.appliedLand === "Y" ? "Yes" : landScheduleData?.appliedLand === "N" ? "NO" : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </h6>

                {
                  landScheduleData?.appliedLand === "N" &&
                  <div className="row ml-1 mr-2">
                    <div className="col  p-1" >
                      {/* <h6>Download Document</h6> */}
                      {`${t("NWL_APPLICANT_AS_PER_APPLIED_LAND_N_DOWNLOAD_DOCUMENT_SHAJRA_PLAN")}`}

                      <div className="d-flex flex-row align-items-center my-1 ">
                        <IconButton onClick={() => getDocShareholding(landScheduleData?.appliedLand)}>
                          <DownloadForOfflineIcon color="primary" className="mx-1" />
                        </IconButton>
                      </div>
                    </div>
                  </div>

                }

              </div>

              <div className="col col-4 p-1">
                <h6 >
                  {/* (b) Revenue rasta */}
                  {`${t("NWL_APPLICANT_REVENUE_RASTA_SHAJRA_PLAN")}`}
                  <Tooltip title="If any revenue rasta abuts to the applied site ?">
                    <InfoIcon style={{ cursor: "pointer" }} color="primary"></InfoIcon>
                  </Tooltip>
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.revenueRasta === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.revenueRasta === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_REVENUE_RASTA_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.revenueRasta
                    }}
                    onClick={() => {
                      setLabelValue("Revenue rasta"),
                        setOpennedModal("revenueRasta")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.revenueRasta === "Y" ? "Yes" : landScheduleData?.revenueRasta === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.revenueRasta === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      {/* <label> Width of revenue rasta </label> */}
                      {/* Unconsolidated */}
                      {`${t("NWL_APPLICANT_REVENUE_RASTA_Y_UNCONSOLIDATED_SHAJRA_PLAN")}`}
                      <Form.Control placeholder={landScheduleData?.revenueRastaWidth}
                        //  height={30} style={{ maxWidth: 200, marginRight: 5 }}
                        className={classes.formLabel}
                        disabled></Form.Control>

                    </div>
                  </div>
                )}
              </div>

              <div className="col col-4 p-1">
                <h6 >
                  {`${t("NWL_APPLICANT_WATERCOURSE_SHAJRA_PLAN")}`}
                  {/* (c) Watercourse */}
                  <Tooltip title="Watercourse running along boundary through the applied site ?">
                    <InfoIcon style={{ cursor: "pointer" }} color="primary"></InfoIcon>
                  </Tooltip>
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.waterCourse === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.waterCourse === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WATERCOURSE_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.waterCourseRunning
                    }}
                    onClick={() => {
                      setLabelValue("Watercourse running"),
                        setOpennedModal("waterCourseRunning")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.waterCourse === "Y" ? "Yes" : landScheduleData?.waterCourse === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>


                {landScheduleData?.waterCourse === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      {/* <label> Remark </label> */}
                      {`${t("NWL_APPLICANT_WATERCOURSE_Y_REMARKS_SHAJRA_PLAN")}`}
                      <input type="number" className="form-control" disabled placeholder={landScheduleData?.waterCourseRemark} />
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                {/* <h6>
                  (d)&nbsp;Whether in Compact Block
                </h6> */}
                {`${t("NWL_APPLICANT_WHETHER_IN_COMPACT_BLOCK_SHAJRA_PLAN")}`}

                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.compactBlock === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.compactBlock === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_IN_COMPACT_BLOCK_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.whetherInCompactBlock
                    }}
                    onClick={() => {
                      setLabelValue("Whether in Compact Block"),
                        setOpennedModal("whetherInCompactBlock")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.compactBlock === "Y" ? "Yes" : landScheduleData?.compactBlock === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>


                {landScheduleData?.compactBlock === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      {`${t("NWL_APPLICANT_WHETHER_IN_COMPACT_BLOCK_Y_REMARK_SHAJRA_PLAN")}`}
                      {/* <label> Remark </label> */}

                      <Form.Control placeholder={landScheduleData?.compactBlockRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}


              </div>

              {/* <br></br> */}

              <div className="col col-4 p-1">
                <h6 >
                  {/* (e) Whether Others Land fall */}
                  {`${t("NWL_APPLICANT_WHETHER_OTHERS_LAND_FALL_SHAJRA_PLAN")}`}

                  <Tooltip title="Whether Others Land fall within Applied Land">
                    <InfoIcon style={{ cursor: "pointer" }} color="primary"></InfoIcon>
                  </Tooltip>
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.landSandwiched === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.landSandwiched === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_OTHERS_LAND_FALL_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.landSandwiche
                    }}
                    onClick={() => {
                      setLabelValue("Land Sandwiched"),
                        setOpennedModal("landSandwiche")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.landSandwiched === "Y" ? "Yes" : landScheduleData?.landSandwiched === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.landSandwiched === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      {/* <label> Enter Kharsa No. </label> */}
                      {`${t("NWL_APPLICANT_WHETHER_OTHERS_LAND_Y_ENTER_KHARSA_NUMBER_SHAJRA_PLAN")}`}

                      <Form.Control placeholder={landScheduleData?.landSandwichedRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}

              </div>
              <div className="col col-4 p-1">
                {/* <h6>
                  (f) Acquisition status
                </h6> */}
                {`${t("NWL_APPLICANT_ACQUISITION_STATUS_SHAJRA_PLAN")}`}

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.acquistion === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.acquistion === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ACQUISITION_STATUS_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.acquisitionStatus
                    }}
                    onClick={() => {
                      setLabelValue("Acquisition status"),
                        setOpennedModal("acquisitionStatus")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.acquistion === "Y" ? "Yes" : landScheduleData?.acquistion === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.acquistion === "Y" && (
                  <div >
                    <div className="row mx-1">
                      <div className="col col-12">
                        <div>
                          {`${t("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_SECTION4_SHAJRA_PLAN")}`}
                          {/* <label className="m-0">Date of section 4 notification </label> */}
                          <div className="d-flex flex-row align-items-center my-1 ">
                            <Form.Control
                              // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                              className={classes.formLabel}
                              disabled placeholder={landScheduleData?.sectionFour} ></Form.Control>
                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_SECTION4_SHAJRA_PLAN") ? "block" : "none",
                                color: fieldIconColors.dateOfSection4Notification
                              }}
                              onClick={() => {
                                setLabelValue("Date of section 4 notification"),
                                  setOpennedModal("dateOfSection4Notification")
                                setSmShow(true),
                                  setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData !== null ? landScheduleData?.sectionFour : null);
                              }}
                            ></ReportProblemIcon>
                          </div>

                        </div>
                      </div>
                    </div>
                    <div className="row mx-1">
                      <div className="col col-12">
                        <div>
                          {`${t("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_SECTION6_SHAJRA_PLAN")}`}
                          {/* <label className="m-0">Date of section 6 notification</label> */}
                          <div className="d-flex flex-row align-items-center my-1 ">
                            <Form.Control

                              className={classes.formLabel}
                              disabled placeholder={landScheduleData?.sectionSix} ></Form.Control>
                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_SECTION6_SHAJRA_PLAN") ? "block" : "none",
                                color: fieldIconColors.dateOfSection6Notification
                              }}
                              onClick={() => {
                                setLabelValue("Date of section 6 notification"),
                                  setOpennedModal("dateOfSection6Notification")
                                setSmShow(true),
                                  setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData !== null ? landScheduleData?.sectionSix : null);
                              }}
                            ></ReportProblemIcon>
                          </div>
                          {/* <Form.Control style={{ maxWidth: 200, marginTop: 10 }} disabled></Form.Control> */}
                        </div>
                      </div>
                    </div>
                    <div className="row mx-1">
                      <div className="col col-12">
                        {/* <label>
                          <h2>Date of Award</h2>
                        </label> */}
                        {`${t("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_AWAED_SHAJRA_PLAN")}`}
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control

                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.rewardDate} ></Form.Control>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_AWAED_SHAJRA_PLAN") ? "block" : "none",
                              color: fieldIconColors.dateOfSection6Notification
                            }}
                            onClick={() => {
                              setLabelValue("Date of section 6 notification"),
                                setOpennedModal("dateOfSection6Notification")
                              setSmShow(true),
                                setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.rewardDate : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>


            </div>

            {landScheduleData?.acquistion === "Y" && (
              <div >
                <div className="row mx-1">
                  <div className="col col-12 p-1">

                    <h6>
                      {/* (g)  Whether Land Released/Excluded from aqusition proceeding. */}
                      {`${t("NWL_APPLICANT_WHETER_LAND_RELEASED_EXCLUDED_FROM_AQUSITION_DATE_AWAED_SHAJRA_PLAN")}`}
                    </h6>

                    <div className="d-flex flex-row align-items-center my-1 ">

                      <input type="radio" disabled value="Yes" checked={landScheduleData?.orderUpload === "Y" ? true : false} />
                      <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                      <input type="radio" disabled value="No" checked={landScheduleData?.orderUpload === "N" ? true : false} />
                      <label className="m-0 mx-2" for="No">No</label>
                      <ReportProblemIcon
                        style={{
                          display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETER_LAND_RELEASED_EXCLUDED_FROM_AQUSITION_DATE_AWAED_SHAJRA_PLAN") ? "block" : "none",
                          color: fieldIconColors.ordersUpload
                        }}
                        onClick={() => {
                          setLabelValue("Orders Upload"),
                            setOpennedModal("ordersUpload")
                          setSmShow(true),
                            setDocModal(false),
                            console.log("modal open"),
                            setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                        }}
                      ></ReportProblemIcon>
                    </div>

                    <br></br>

                    {landScheduleData?.orderUpload === "Y" && (
                      <div className="row m-0 mt-2">
                        <div className="col col-4 p-1">
                          <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                            {/* Whether land compensation */}
                            {/* {`${t("NWL_APPLICANT_ACQUISITION_STATUS_Y_DATE_AWAED_SHAJRA_PLAN")}`} */}
                            {`${t("NWL_APPLICANT_AQUSITION_Y_WHETER_LAND_COMPENSATION_SHAJRA_PLAN")}`}
                          </h6>
                          {/* <InfoIcon style={{color:"blue"}}/>  */}
                          <div className="d-flex flex-row align-items-center my-1 ">
                            {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.landCompensation === "Y" ? true : false} />
                            <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.landCompensation === "N" ? true : false} />
                            <label className="m-0 mx-2" for="No">No</label>

                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_WHETER_LAND_COMPENSATION_SHAJRA_PLAN") ? "block" : "none",
                                color: fieldIconColors.landCompensationReceived
                              }}
                              onClick={() => {
                                setLabelValue("Whether land compensation received"),
                                  setOpennedModal("landCompensationReceived")
                                setSmShow(true),
                                  setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData?.compensationReceived === "Y" ? "Yes" : landScheduleData?.compensationReceived === "N" ? "No" : null);
                              }}
                            ></ReportProblemIcon>

                          </div>

                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group">
                            <label htmlFor="releasestatus">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Status of release" >
                                {/* Status of release */}
                                {`${t("NWL_APPLICANT_AQUSITION_Y_STATUS_OF_RELEASE_SHAJRA_PLAN")}`}
                              </h6>
                            </label>

                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                className={classes.formLabel}
                                disabled
                                placeholder={landScheduleData?.releaseStatus}
                              ></Form.Control>

                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_STATUS_OF_RELEASE_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.statusOfRelease
                                }}
                                onClick={() => {
                                  setLabelValue("Status of release"),
                                    setOpennedModal("statusOfRelease")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.statusOfRelease);
                                }}
                              ></ReportProblemIcon>

                            </div>
                          </div>
                        </div>

                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="releasedate">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Release">
                                {/* Date of Release */}
                                {`${t("NWL_APPLICANT_AQUSITION_Y_DATE_OF_RELEASE_SHAJRA_PLAN")}`}
                              </h6>{" "}
                            </label>

                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.releaseDate}></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_DATE_OF_RELEASE_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.dateOfRelease
                                }}
                                onClick={() => {
                                  setLabelValue("Date of Release"),
                                    setOpennedModal("dateOfRelease")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.dateOfRelease);
                                }}
                              ></ReportProblemIcon>
                            </div>
                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="awarddate">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Award">
                                {/* Copy of release order */}
                                {`${t("NWL_APPLICANT_AQUSITION_Y_COPY_OF_RELEASE_ORDER_SHAJRA_PLAN")}`}
                              </h6>
                            </label>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              {/* <Form.Control

                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.awardDate}></Form.Control> */}
                              <div className="d-flex flex-row align-items-center my-1 ">
                                <IconButton onClick={() => getDocShareholding(landScheduleData?.mutation)}>
                                  <DownloadForOfflineIcon color="primary" className="mx-1" />
                                </IconButton>
                                <ReportProblemIcon
                                  style={{
                                    display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_COPY_OF_RELEASE_ORDER_SHAJRA_PLAN") ? "block" : "none",
                                    color: fieldIconColors.copyOfMutation
                                  }}
                                  onClick={() => {
                                    setLabelValue("Copy of Mutation"),
                                      setOpennedModal("copyOfMutation")
                                    setSmShow(true),
                                      setDocModal(true),
                                      console.log("modal open"),
                                      setFieldValue(landScheduleData !== null ? landScheduleData?.mutation : null);
                                  }}
                                ></ReportProblemIcon>
                              </div>
                              {/* <ReportProblemIcon
                                style={{
                                 display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Date of Award") ? "block" : "none",
                                  color: fieldIconColors.dateOfAward
                                }}
                                onClick={() => {
                                  setLabelValue("Date of Award"),
                                    setOpennedModal("dateOfAward")
                                   setSmShow(true),
                     setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.dateOfAward);
                                }}
                              ></ReportProblemIcon> */}
                            </div>

                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <div className="form-group ">
                            <label htmlFor="sitedetails">
                              <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Site Details">
                                {/* Site Details */}
                                {`${t("NWL_APPLICANT_AQUSITION_Y_SITE_DETAILS_SHAJRA_PLAN")}`}
                              </h6>
                            </label>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              <Form.Control
                                // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                                className={classes.formLabel}
                                disabled placeholder={landScheduleData?.siteDetail}></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_SITE_DETAILS_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.siteDetails
                                }}
                                onClick={() => {
                                  setLabelValue("Site Details"),
                                    setOpennedModal("siteDetails")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.siteDetails);
                                }}
                              ></ReportProblemIcon>
                            </div>


                            {/* comment by me */}
                          </div>
                        </div>
                        <div className="col col-4 p-1">
                          <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                            {/* whether litigation regarding release of Land */}
                            {`${t("NWL_APPLICANT_WHETHER_Y_WHETER_LITIGATION_REGARDING_RELEASE_OF_LAND_SHAJRA_PLAN")}`}
                          </h6>
                          {/* <InfoIcon style={{color:"blue"}}/>  */}
                          <div className="d-flex flex-row align-items-center my-1 ">
                            {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.landCompensation === "Y" ? true : false} />
                            <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.landCompensation === "N" ? true : false} />
                            <label className="m-0 mx-2" for="No">No</label>

                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_WHETHER_Y_WHETER_LITIGATION_REGARDING_RELEASE_OF_LAND_SHAJRA_PLAN") ? "block" : "none",
                                color: fieldIconColors.landCompensationReceived
                              }}
                              onClick={() => {
                                setLabelValue("Whether land compensation received"),
                                  setOpennedModal("landCompensationReceived")
                                setSmShow(true),
                                  setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData?.compensationReceived === "Y" ? "Yes" : landScheduleData?.compensationReceived === "N" ? "No" : null);
                              }}
                            ></ReportProblemIcon>

                          </div>

                        </div>
                        {landScheduleData?.orderUpload === "Y" && (

                          <div className="col col-4 p-1">
                            <div className="form-group">
                              <label htmlFor="releasestatus">
                                <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Status of release" >
                                  {/* CWP/SLP NUMBER */}
                                  {`${t("NWL_APPLICANT_AQUSITION_Y_CWP_SLP_NUMBER_SHAJRA_PLAN")}`}
                                </h6>
                              </label>

                              <div className="d-flex flex-row align-items-center my-1 ">
                                <Form.Control
                                  className={classes.formLabel}
                                  disabled
                                  placeholder={landScheduleData?.releaseStatus}
                                ></Form.Control>

                                <ReportProblemIcon
                                  style={{
                                    display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_AQUSITION_Y_CWP_SLP_NUMBER_SHAJRA_PLAN") ? "block" : "none",
                                    color: fieldIconColors.statusOfRelease
                                  }}
                                  onClick={() => {
                                    setLabelValue("Status of release"),
                                      setOpennedModal("statusOfRelease")
                                    setSmShow(true),
                                      setDocModal(false),
                                      console.log("modal open"),
                                      setFieldValue(landScheduleData?.statusOfRelease);
                                  }}
                                ></ReportProblemIcon>

                              </div>
                            </div>
                          </div>
                        )

                        }
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="row mx-1">
              <div className="col col-12 p-1">
                <h6>
                  {/* (h)  Details of existing approach as per policy dated 20-10-20. */}

                  {`${t("NWL_APPLICANT_DETAILS_OF_EXISTING_APPROACH_AS_PER_POLICY_SHAJRA_PLAN")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.siteApproachable === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Category-I approach</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.siteApproachable === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">Category-II approach</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_DETAILS_OF_EXISTING_APPROACH_AS_PER_POLICY_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.siteApproachable
                    }}
                    onClick={() => {
                      setLabelValue("(h)  Details of existing approach as per policy dated 20-10-20."),
                        setOpennedModal("siteApproachable")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.siteApproachable === "Y" ? "Category-I approach" : landScheduleData?.siteApproachable === "N" ? "Category-II approach" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.siteApproachable === "Y" && (
                  <div className="my-2 mx-2">
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (a)  Approach available from minimum 4 karam (22 ft) wide revenue rasta */}
                          {`${t("NWL_APPLICANT_APPROACH_AVAILABLE_FROM_MINIMUN_KARAM_SHAJRA_PLAN")}`}
                        </h6>

                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.minimumApproachFour === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.minimumApproachFour === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_APPROACH_AVAILABLE_FROM_MINIMUN_KARAM_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("(a)  Approach available from minimum 4 karam (22 ft) wide revenue rasta"),
                              setOpennedModal("minimumApproachFour")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.minimumApproachFour === "Y" ? "Yes" : landScheduleData?.minimumApproachFour === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (b)  Approach available from minimum 11 feet wide revenue rasta and applied site abuts acquired alignment of the sector road and there is no stay regarding construction on the land falling under the abutting sector road */}
                          {`${t("NWL_APPLICANT_APPROACH_AVAILABLE_FROM_MINIMUN_FEET_WIDE_REVENUE_SHAJRA_PLAN")}`}
                        </h6>
                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.minimumApproachEleven === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.minimumApproachEleven === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div></div>

                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_APPROACH_AVAILABLE_FROM_MINIMUN_FEET_WIDE_REVENUE_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.minimumApproachEleven
                          }}
                          onClick={() => {
                            setLabelValue("(b) Approach available from minimum 11 feet wide revenue rasta and applied site abuts acquired alignment of the sector road and there is no stay regarding construction on the land falling under the abutting sector road"),
                              setOpennedModal("minimumApproachEleven")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.minimumApproachEleven === "Y" ? "Yes" : landScheduleData?.minimumApproachEleven === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (c)  Applied site abouts already constructed sector road or internal circulation road of approved sectoral plan (of min. 18m/24m width as the case may be) provided its entire stretch required for approach is licenced and is further leading upto atleast 4 karam wide revenue rasta. */}
                          {`${t("NWL_APPLICANT_APPLIED_SITE__ABOUTS_ALREADY_CONSTRUCTED_SECTOR_ROAD_SHAJRA_PLAN")}`}
                        </h6>
                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.alreadyConstructedSector === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.alreadyConstructedSector === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_APPLIED_SITE__ABOUTS_ALREADY_CONSTRUCTED_SECTOR_ROAD_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.alreadyConstructedSector
                          }}
                          onClick={() => {
                            setLabelValue("(c) Applied site abouts already constructed sector road or internal circulation road of approved sectoral plan (of min. 18m/24m width as the case may be) provided its entire stretch required for approach is licenced and is further leading upto atleast 4 karam wide revenue rasta."),
                              setOpennedModal("alreadyConstructedSector")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.alreadyConstructedSector === "Y" ? "Yes" : landScheduleData?.alreadyConstructedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (d)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining own land of the applicant (but not applied for licence). */}
                          {`${t("NWL_APPLICANT_APPLIED_LAND_IS_ACCESSIBLE_FROM_A_MINIMUN_THROUGH_ADJOINING_SHAJRA_PLAN")}`}
                        </h6>
                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.adjoiningOwnLand === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.adjoiningOwnLand === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div>
                      </div>

                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_APPLIED_LAND_IS_ACCESSIBLE_FROM_A_MINIMUN_THROUGH_ADJOINING_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.joiningOwnLand
                          }}
                          onClick={() => {
                            setLabelValue("(d)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining own land of the applicant (but not applied for licence)"),
                              setOpennedModal("joiningOwnLand")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.adjoiningOwnLand === "Y" ? "Yes" : landScheduleData?.adjoiningOwnLand === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>
                    <br></br>

                    {landScheduleData?.adjoiningOwnLand === "Y" && (
                      <div className="row">
                        <div class="col-sm-7 text-left">
                          <h6>
                            {/* (d1)  If applicable, whether the applicant has donated at least 4 karam wide strip from its adjoining own land in favour of the Gram Panchayat/Municipality, in order to connect the applied site to existing 4 karam rasta? */}
                            {`${t("NWL_APPLICANT_D_D1_IF_APPLICABLE_WHETHER_THE_APPLICATION_HAS_DONATED_SHAJRA_PLAN")}`}
                          </h6>

                        </div>
                        <div class="col-sm-1 text-right">
                        </div>
                        <div class="col-sm-3 text-right">
                          <div className="d-flex flex-row align-items-center my-1 ">
                            &nbsp;&nbsp;
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.applicantHasDonated === "Y" ? true : false} />
                            <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.applicantHasDonated === "N" ? true : false} />
                            <label className="m-0 mx-2" for="No">NO</label>
                            {/* <ReportProblemIcon
                              style={{
                               display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Address") ? "block" : "none",
                                color: fieldIconColors.applicantHasDonated
                              }}
                              onClick={() => {
                                setLabelValue("(d1)  If applicable, whether the applicant has donated at least 4 karam wide strip from its adjoining own land in favour of the Gram Panchayat/Municipality, in order to connect the applied site to existing 4 karam rasta?"),
                                  setOpennedModal("applicantHasDonated")
                                 setSmShow(true),
                     setDocModal(false),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData?.applicantHasDonated === "Y" ? "Yes" : landScheduleData?.applicantHasDonated === "N" ? "No" : null);
                              }}
                            ></ReportProblemIcon> */}
                          </div>
                        </div>
                        <div class="col-sm-1 text-right">
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_D_D1_IF_APPLICABLE_WHETHER_THE_APPLICATION_HAS_DONATED_SHAJRA_PLAN") ? "block" : "none",
                              color: fieldIconColors.joiningOwnLand
                            }}
                            onClick={() => {
                              setLabelValue("(d)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining own land of the applicant (but not applied for licence)"),
                                setOpennedModal("joiningOwnLand")
                              setSmShow(true),
                                setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.applicantHasDonated === "Y" ? "Yes" : landScheduleData?.applicantHasDonated === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    )}

                    {landScheduleData?.applicantHasDonated === "Y" && (
                      <div className="row">

                        <div className="col col-3 p-1">

                          <h6>
                            {/* Upload copy of Gift Deed/ Hibbanama */}
                            {`${t("NWL_APPLICANT_D_D1_IF_Y_COPY_OF_GIFT_DEED_SHAJRA_PLAN")}`}
                          </h6>

                          <div className="d-flex flex-row align-items-center my-1 ">
                            &nbsp;&nbsp;
                            <IconButton onClick={() => getDocShareholding(landScheduleData?.giftDeedHibbanama)}>
                              <DownloadForOfflineIcon color="primary" className="mx-1" />
                            </IconButton>
                            <ReportProblemIcon
                              style={{
                                display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_D_D1_IF_Y_COPY_OF_GIFT_DEED_SHAJRA_PLAN") ? "block" : "none",
                                color: fieldIconColors.giftDeedHibbanama
                              }}
                              onClick={() => {
                                setLabelValue("Upload copy of Gift Deed/ Hibbanama"),
                                  setOpennedModal("giftDeedHibbanama")
                                setSmShow(true),
                                  setDocModal(true),
                                  console.log("modal open"),
                                  setFieldValue(landScheduleData !== null ? landScheduleData?.giftDeedHibbanama : null);
                              }}
                            ></ReportProblemIcon>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (e)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining other’s land */}
                          {`${t("NWL_APPLICANT_E_APPLIED_LAND_IS_ACCESSIBLE_FROM_MINIMUN_KARAM_SHAJRA_PLAN")}`}
                        </h6>
                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-1 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.adjoiningOthersLand === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.adjoiningOthersLand === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">NO</label>
                        </div>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_E_APPLIED_LAND_IS_ACCESSIBLE_FROM_MINIMUN_KARAM_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("(e)  Applied land is accessible from a minimum 4 karam wide rasta through adjoining other’s land"),
                              setOpennedModal("adjoiningOthersLand")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.adjoiningOthersLand === "Y" ? "Yes" : landScheduleData?.adjoiningOthersLand === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>

                    {landScheduleData?.adjoiningOthersLand === "Y" && (
                      <div className="row">
                        <div class="col-sm-7 text-left">
                          <h6>
                            {/* (e1)  whether the land-owner of the adjoining land has donated at least 4 karam wide strip of land to the Gram Panchayat/Municipality, in a manner that the applied site gets connected to existing public rasta of atleast 4 karam width? */}
                            {`${t("NWL_APPLICANT_E_Y_E1_WHETHER_THE_LAND-OWNER_OF_THE_ADJOINING_DONATED_KARAM_SHAJRA_PLAN")}`}
                          </h6>
                        </div>
                        <div class="col-sm-1 text-right">
                        </div>
                        <div class="col-sm-3 text-right">
                          <div className="d-flex flex-row align-items-center my-1 ">
                            &nbsp;&nbsp;
                            <input type="radio" disabled value="Yes" checked={landScheduleData?.landOwnerDonated === "Y" ? true : false} />
                            <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                            <input type="radio" disabled value="No" checked={landScheduleData?.landOwnerDonated === "N" ? true : false} />
                            <label className="m-0 mx-2" for="No">NO</label>
                          </div>
                        </div>
                        <div class="col-sm-1 text-right">
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_E_Y_E1_WHETHER_THE_LAND-OWNER_OF_THE_ADJOINING_DONATED_KARAM_SHAJRA_PLAN") ? "block" : "none",
                              color: fieldIconColors.landOwnerDonated
                            }}
                            onClick={() => {
                              setLabelValue("(e1)  whether the land-owner of the adjoining land has donated at least 4 karam wide strip of land to the Gram Panchayat/Municipality, in a manner that the applied site gets connected to existing public rasta of atleast 4 karam width?"),
                                setOpennedModal("landOwnerDonated")
                              setSmShow(true),
                                setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.landOwnerDonated === "Y" ? "Yes" : landScheduleData?.landOwnerDonated === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    )}

                    {landScheduleData?.landOwnerDonated === "Y" && (
                      <div className="col col-3 p-1">

                        <h6>
                          {/* Upload copy of Gift Deed/ Hibbanama */}
                          {`${t("NWL_APPLICANT_E_E1_IF_Y_COPY_OF_GIFT_DEED_SHAJRA_PLAN")}`}
                        </h6>
                        <div className="d-flex flex-row align-items-center my-1 ">

                          <IconButton onClick={() => getDocShareholding(landScheduleData?.giftDeedHibbanama)}>
                            <DownloadForOfflineIcon color="primary" className="mx-1" />
                          </IconButton>
                          <ReportProblemIcon
                            style={{
                              display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_E_E1_IF_Y_COPY_OF_GIFT_DEED_SHAJRA_PLAN") ? "block" : "none",
                              color: fieldIconColors.copyOfShajraPlan
                            }}
                            onClick={() => {
                              setLabelValue("Copy of Shajra Plan"),
                                setOpennedModal("copyOfShajraPlan")
                              setSmShow(true),
                                setDocModal(true),
                                console.log("modal open"),
                                setFieldValue(landScheduleData !== null ? landScheduleData?.copyOfShajraPlan : null);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    )}

                  </div>


                )}

                {landScheduleData?.siteApproachable === "N" && (

                  <div >
                    <div className="row">
                      <div class="col-sm-8 text-left">
                        <label>
                          {/* <h2>(a)&nbsp;&nbsp;Enter Width in Meters</h2>{" "} */}
                          {`${t("NWL_APPLICANT_N_A_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN")}`}
                        </label>
                      </div>
                      <div class="col-sm-3 text-right">
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null}
                          className={classes.formLabel}
                          disabled></Form.Control>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_A_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.approachFromProposedSector === "Y" ? "Yes" : landScheduleData?.approachFromProposedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                    </div>
                    {/* <div>
                      <h6>(a)  Enter Width in Meters</h6>
                      <div className="d-flex flex-row align-items-center my-2 ">
                      &nbsp;&nbsp;
                        <Form.Control placeholder={landScheduleData !== null ? landScheduleData?.anyOtherRemark : null}
                      className={classes.formLabel}
                      disabled></Form.Control>
                        <ReportProblemIcon
                          style={{
                           display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Address") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                             setSmShow(true),
                     setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.approachFromProposedSector === "Y" ? "Yes" : landScheduleData?.approachFromProposedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                      
                    </div> */}
                    <br></br>
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h6>
                          {/* (b)  Whether irrevocable consent from such developer/ colonizer for uninterrupted usage of such internal road for the purpose of development of the colony by the applicant or by its agencies and for usage by its allottees submitted */}
                          {`${t("NWL_APPLICANT_N_B_WHETHER_IRREVOCABLE_CONSENT_FROM_SUCH_DEVELOPER_COLONIZER_SHAJRA_PLAN")}`}
                        </h6>
                      </div>

                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-2 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromProposedSector === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.approachFromProposedSector === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_B_WHETHER_IRREVOCABLE_CONSENT_FROM_SUCH_DEVELOPER_COLONIZER_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.approachFromProposedSector === "Y" ? "Yes" : landScheduleData?.approachFromProposedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                    </div>
                    <div className="row">
                      <div class="col-sm-7 text-left">
                        <h2>
                          {/* (c)&nbsp;&nbsp;Access from NH/SR */}
                          {`${t("NWL_APPLICANT_N_C_ACCESS_FROM_NH_SR_SHAJRA_PLAN")}`}
                        </h2>
                      </div>
                      <div class="col-sm-1 text-right">
                      </div>
                      <div class="col-sm-3 text-right">
                        <div className="d-flex flex-row align-items-center my-2 ">
                          &nbsp;&nbsp;
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromProposedSector === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.approachFromProposedSector === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>
                        </div>
                      </div>
                      <div class="col-sm-1 text-right">
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_C_ACCESS_FROM_NH_SR_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.approachFromProposedSector === "Y" ? "Yes" : landScheduleData?.approachFromProposedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                      {/* {watch("NHSRAccess") === "Y" && (
                            <div className="col col-3 mt-3">
                              <h2 style={{ display: "flex" }}>'Upload access permission from competent authority</h2>
                              <label>
                                <FileUpload style={{ cursor: "pointer" }} color="primary" />
                                <input
                                  type="file"
                                  style={{ display: "none" }}
                                  onChange={(e) => getDocumentData(e?.target?.files[0], "accessPermissionAuthority")}
                                  accept="application/pdf/jpeg/png"
                                />
                              </label>
                              {watch("accessPermissionAuthority") && (
                                <a onClick={() => getDocShareholding(watch("accessPermissionAuthority"), setLoader)} className="btn btn-sm ">
                                  <VisibilityIcon color="info" className="icon" />
                                </a>
                              )}
                            </div>
                          )} */}
                    </div>
                    <br></br>
                    <h5 className="text-black  mb-2">
                      {/* (i)  Details of proposed approach. */}
                      {`${t("NWL_APPLICANT_N_I_DETAILS_OF_PROPOSE_APPROACH_SHAJRA_PLAN")}`}
                    </h5>
                    <div className="my-2 mx-2">
                      <div className="d-flex flex-row align-items-center my-2 ">
                        <h6>
                          {/* (1)   Site approachable from proposed sector road/ Development Plan Road */}
                          {`${t("NWL_APPLICANT_N_I_SITE_APPROACHABLE_FROM_PROPOSED_SECTOR_ROAD_SHAJRA_PLAN")}`}
                        </h6>
                        &nbsp;&nbsp;
                        <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromProposedSector === "Y" ? true : false} />
                        <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" disabled value="No" checked={landScheduleData?.approachFromProposedSector === "N" ? true : false} />
                        <label className="m-0 mx-2" for="No">No</label>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_I_SITE_APPROACHABLE_FROM_PROPOSED_SECTOR_ROAD_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.approachFromProposedSector === "Y" ? "Yes" : landScheduleData?.approachFromProposedSector === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>

                      {landScheduleData?.approachFromProposedSector === "Y" && (

                        <div >
                          <h6>
                            {/* (a) Enter Width in Meters */}
                            {`${t("NWL_APPLICANT_N_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN")}`}
                          </h6>
                          <div className="my-2 mx-2">
                            <div className="col col-6 p-1 d-flex align-items-center my-1 " >
                              <Form.Control
                                className={classes.formLabel}

                                disabled
                                placeholder={landScheduleData?.awardDate}
                              ></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                            {/* <div className="col col-6 p-1 d-flex align-items-center my-3 " >

                          <h6>(a)  Width of Constructed ROW of plotted licenced colony (In meters)</h6>
                          <Form.Control
                            className={classes.formLabel}

                            disabled
                            placeholder={landScheduleData?.awardDate}
                          ></Form.Control>
                        
                          <ReportProblemIcon
                            style={{
                             display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Address") ? "block" : "none",
                              color: fieldIconColors.ordersUpload
                            }}
                            onClick={() => {
                              setLabelValue("Orders Upload"),
                                setOpennedModal("ordersUpload")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>
                        </div> */}

                            <div className="d-flex flex-row align-items-center my-3 ">
                              <h6>
                                {/* (b)  Whether acquired?   */}
                                {`${t("NWL_APPLICANT_N_B_WHETHER_ACQUIRED_SHAJRA_PLAN")}`}
                              </h6>
                              &nbsp;&nbsp;
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.whetherAcquired === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.whetherAcquired === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_B_WHETHER_ACQUIRED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                            <div className="d-flex flex-row align-items-center my-3 ">
                              <h6>
                                {/* (c)  Whether constructed?   */}
                                {`${t("NWL_APPLICANT_N_C_WHETHER_CONSTRUCTED_SHAJRA_PLAN")}`}
                              </h6>
                              &nbsp;&nbsp;
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.whetherConstructed === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.whetherConstructed === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_C_WHETHER_CONSTRUCTED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                            <div className="d-flex flex-row align-items-center my-3 ">
                              <h6>
                                {/* (d)  Whether Service road along sector road acquired? */}
                                {`${t("NWL_APPLICANT_N_D_WHETHER_SERVICE_ROAD_ALONG_SECTOR_ROAD_ACQURIED_SHAJRA_PLAN")}`}
                              </h6>
                              &nbsp;&nbsp;
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.serviceSectorRoadAcquired === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.serviceSectorRoadAcquired === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_D_WHETHER_SERVICE_ROAD_ALONG_SECTOR_ROAD_ACQURIED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                            <div className="d-flex flex-row align-items-center my-3 ">
                              <h6>
                                {/* (e)  Whether Service road along sector road constructed?  */}
                                {`${t("NWL_APPLICANT_N_D_WHETHER_SERVICE_ROAD_ALONG_E_SECTOR_ROAD_CONSTRUCTED_SHAJRA_PLAN")}`}
                              </h6>
                              &nbsp;&nbsp;
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.serviceSectorRoadConstructed === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.serviceSectorRoadConstructed === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_D_WHETHER_SERVICE_ROAD_ALONG_E_SECTOR_ROAD_CONSTRUCTED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                          </div>
                        </div>

                      )}
                      <h6>
                        {/* (2)  Site approachable from internal circulation / sectoral plan road. */}
                        {`${t("NWL_APPLICANT_N_2_SITE_APPROACHABLE_FROM_INTERNAL_CIRCULATION_SECTORAL_ROAD_SHAJRA_PLAN")}`}
                      </h6>
                      <div className="d-flex flex-row align-items-center my-2 ">
                        &nbsp;&nbsp;
                        <input type="radio" disabled value="Yes" checked={landScheduleData?.approachFromInternalCirculation === "Y" ? true : false} />
                        <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                        <input type="radio" disabled value="No" checked={landScheduleData?.approachFromInternalCirculation === "N" ? true : false} />
                        <label className="m-0 mx-2" for="No">No</label>
                        <ReportProblemIcon
                          style={{
                            display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_SITE_APPROACHABLE_FROM_INTERNAL_CIRCULATION_SECTORAL_ROAD_SHAJRA_PLAN") ? "block" : "none",
                            color: fieldIconColors.ordersUpload
                          }}
                          onClick={() => {
                            setLabelValue("Orders Upload"),
                              setOpennedModal("ordersUpload")
                            setSmShow(true),
                              setDocModal(false),
                              console.log("modal open"),
                              setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                          }}
                        ></ReportProblemIcon>
                      </div>
                      {landScheduleData?.approachFromInternalCirculation === "Y" && (

                        <div>
                          <h6>
                            {/* (a)  Width of internal circulation / sectoral plan road (In meters) */}
                            {`${t("NWL_APPLICANT_N_2_SITE_APPROACHABLE_A_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN")}`}
                          </h6>
                          <div className="my-2 mx-2">
                            <div className="col col-6 p-1 d-flex align-items-center my-1 " >
                              <Form.Control
                                className={classes.formLabel}

                                disabled
                                placeholder={landScheduleData?.sectorAndDevelopmentWidth}
                              ></Form.Control>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_SITE_APPROACHABLE_A_ENTER_WIDTH_IN_METERS_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>
                            <h6>
                              {/* (b)  Whether acquired?  */}
                              {`${t("NWL_APPLICANT_N_2_B_WHETHER_ACQUIRED_SHAJRA_PLAN")}`}
                            </h6>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.sectorAndDevelopmentWidth === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.sectorAndDevelopmentWidth === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_B_WHETHER_ACQUIRED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>
                            <h6>
                              {/* (c)  Whether constructed?   */}
                              {`${t("NWL_APPLICANT_N_2_C_WHETHER_CONSTRUCTED_SHAJRA_PLAN")}`}
                            </h6>
                            <div className="d-flex flex-row align-items-center my-1 ">
                              <input type="radio" disabled value="Yes" checked={landScheduleData?.sectorAndDevelopmentWidth === "Y" ? true : false} />
                              <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                              <input type="radio" disabled value="No" checked={landScheduleData?.sectorAndDevelopmentWidth === "N" ? true : false} />
                              <label className="m-0 mx-2" for="No">No</label>
                              <ReportProblemIcon
                                style={{
                                  display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_C_WHETHER_CONSTRUCTED_SHAJRA_PLAN") ? "block" : "none",
                                  color: fieldIconColors.ordersUpload
                                }}
                                onClick={() => {
                                  setLabelValue("Orders Upload"),
                                    setOpennedModal("ordersUpload")
                                  setSmShow(true),
                                    setDocModal(false),
                                    console.log("modal open"),
                                    setFieldValue(landScheduleData?.orderUpload === "Y" ? "Yes" : landScheduleData?.orderUpload === "N" ? "No" : null);
                                }}
                              ></ReportProblemIcon>
                            </div>

                          </div>
                        </div>

                      )}
                    </div>
                  </div>

                )}

                {landScheduleData?.licenseApplied === "Y" && (
                  <div className="row m-0 mt-2">
                    <div className="col col-4 p-1">
                      <h6 data-toggle="tooltip" data-placement="top" title="Whether details/orders of release/exclusion of land uploaded.">
                        {/* (J) Whether approach from parent licence */}
                        {`${t("NWL_APPLICANT_N_2_J_WHETHER_APPROACH_FROM_PARENT_LICENCE_SHAJRA_PLAN")}`}
                        {/* <InfoIcon style={{color:"blue"}}/>  */}
                        <div className="d-flex flex-row align-items-center my-1 ">
                          {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                          <input type="radio" disabled value="Yes" checked={landScheduleData?.landCompensation === "Y" ? true : false} />
                          <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                          <input type="radio" disabled value="No" checked={landScheduleData?.landCompensation === "N" ? true : false} />
                          <label className="m-0 mx-2" for="No">No</label>

                          <ReportProblemIcon
                            style={{
                              display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_J_WHETHER_APPROACH_FROM_PARENT_LICENCE_SHAJRA_PLAN") ? "block" : "none",
                              color: fieldIconColors.landCompensationReceived
                            }}
                            onClick={() => {
                              setLabelValue("Whether land compensation received"),
                                setOpennedModal("landCompensationReceived")
                              setSmShow(true),
                                setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.compensationReceived === "Y" ? "Yes" : landScheduleData?.compensationReceived === "N" ? "No" : null);
                            }}
                          ></ReportProblemIcon>

                        </div>
                      </h6>
                    </div>
                    {/* <div className="col col-4 p-1">
                      <div className="form-group">
                        <label htmlFor="releasestatus">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Status of release">
                            Status of release
                            </h6>
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                           
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.releaseStatus}></Form.Control>

                          <ReportProblemIcon
                            style={{
                             display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("(i)(b) Enter Width in Meters") ? "block" : "none",
                              color: fieldIconColors.statusOfRelease
                            }}
                            onClick={() => {
                              setLabelValue("Status of release"),
                                setOpennedModal("statusOfRelease")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.statusOfRelease);
                            }}
                          ></ReportProblemIcon>

                        </div>
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="awarddate">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Award">Date of Award</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                          
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.awardDate}></Form.Control>
                          <ReportProblemIcon
                            style={{
                             display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("(i)(b) Enter Width in Meters") ? "block" : "none",
                              color: fieldIconColors.dateOfAward
                            }}
                            onClick={() => {
                              setLabelValue("Date of Award"),
                                setOpennedModal("dateOfAward")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.dateOfAward);
                            }}
                          ></ReportProblemIcon>
                        </div>
                   
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="releasedate">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Date of Release">Date of Release</h6>{" "}
                        </label>

                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                          
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.releaseDate}></Form.Control>
                          <ReportProblemIcon
                            style={{
                             display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("(i)(b) Enter Width in Meters") ? "block" : "none",
                              color: fieldIconColors.dateOfRelease
                            }}
                            onClick={() => {
                              setLabelValue("Date of Release"),
                                setOpennedModal("dateOfRelease")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.dateOfRelease);
                            }}
                          ></ReportProblemIcon>
                        </div>
                      </div>
                    </div>
                    <div className="col col-4 p-1">
                      <div className="form-group ">
                        <label htmlFor="sitedetails">
                          <h6 style={{ fontWeight: "initial" }} data-toggle="tooltip" data-placement="top" title="Site Details">Site Details</h6>
                        </label>
                        <div className="d-flex flex-row align-items-center my-1 ">
                          <Form.Control
                        
                            className={classes.formLabel}
                            disabled placeholder={landScheduleData?.siteDetail}></Form.Control>
                          <ReportProblemIcon
                            style={{
                             display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("(i)(b) Enter Width in Meters") ? "block" : "none",
                              color: fieldIconColors.siteDetails
                            }}
                            onClick={() => {
                              setLabelValue("Site Details"),
                                setOpennedModal("siteDetails")
                               setSmShow(true),
                     setDocModal(false),
                                console.log("modal open"),
                                setFieldValue(landScheduleData?.siteDetails);
                            }}
                          ></ReportProblemIcon>
                        </div>


                     
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            </div>
            <br></br>
            <div className="row mx-1">
              <div className="col col-12 p-1">
                <h6 style={{ fontWeight: "initial" }} >
                  {/* whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road. */}
                  {/* (k)  Any other type of existing approach available. */}
                  {`${t("NWL_APPLICANT_N_2_K_ANY_OTHER_TYPE_OF_EXISITING_APPROACH_AVAILABLE_SHAJRA_PLAN")}`}
                  <div className="d-flex flex-row align-items-center my-1 ">

                    <input type="radio" disabled value="Yes" checked={landScheduleData?.siteApproachable === "Y" ? true : false} />
                    <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                    <input type="radio" disabled value="No" checked={landScheduleData?.siteApproachable === "N" ? true : false} />
                    <label className="m-0 mx-2" for="No">No</label>
                    <ReportProblemIcon
                      style={{
                        display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_N_2_K_ANY_OTHER_TYPE_OF_EXISITING_APPROACH_AVAILABLE_SHAJRA_PLAN") ? "block" : "none",
                        color: fieldIconColors.internalSectoralPlan
                      }}
                      onClick={() => {
                        setLabelValue("whether the applied site is approachable from the proposed 18/24 m internal sectoral plan road/sector dividing road"),
                          setOpennedModal("internalSectoralPlan")
                        setSmShow(true),
                          setDocModal(false),
                          console.log("modal open"),
                          setFieldValue(landScheduleData?.siteApproachable === "Y" ? "Yes" : landScheduleData?.siteApproachable === "N" ? "No" : null);
                      }}
                    ></ReportProblemIcon>
                  </div>
                </h6>

              </div>
            </div>
            <hr className="my-3" />
            <h5 className="text-black ml-2 mb-2">
              {/* 4. Site condition */}
              {`${t("NWL_APPLICANT_4_SITE_CONDITION_SHAJRA_PLAN")}`}
            </h5>
            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6>
                  {`${t("NWL_APPLICANT_4_A_VACANT_SHAJRA_PLAN")}`}
                  {/* (a) vacant: (Yes/No){" "} */}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control> */}
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.vacant === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.vacant === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_4_A_VACANT_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.vacant
                    }}
                    onClick={() => {
                      setLabelValue("vacant"),
                        setOpennedModal("vacant")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.vacant === "Y" ? "Yes" : landScheduleData?.vacant === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.vacant === "Y" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label>
                        {`${t("NWL_APPLICANT_4_A_VACANT_REMARK_SHAJRA_PLAN")}`}
                        {/* Vacant Remark  */}
                      </label>
                      {/* <input type="number" className="form-control" disabled placeholder={landScheduleData?.vacantRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.vacantRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.vacant === "N" && (
                  <div className="row ml-1 mr-2">
                    <div className="col col p-1">
                      <label>
                        {/* Construction Remark */}
                        {`${t("NWL_APPLICANT_4_A_N_CONSTRUCTION_REMARK_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="number" className="form-control" disabled placeholder={landScheduleData?.vacantRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.vacantRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}

              </div>

              {/* {landScheduleData?.vacant === "N" && (
                
                  <div className="col col-3 p-1">
                <h6 onChange={(e) => setConstruction(e.target.value)} value={construction}>
                  (b) Construction: (Yes/No)
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.construction === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.construction === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks?"none":"block",
                      color: fieldIconColors.construction
                    }}
                    onClick={() => {
                      setLabelValue("Construction"),
                        setOpennedModal("construction")
                       setSmShow(true),
                     setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.construction === "Y" ? "Yes" : landScheduleData?.construction === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.construction === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Type of Construction</label>
  
                      <Form.Control placeholder={landScheduleData?.typeOfConstruction} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.construction === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>Remark</label>
      
                      <Form.Control placeholder={landScheduleData?.constructionRemark} height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
                )} */}

              <div className="col col-4 p-1">
                <h6 >
                  {/* (b) HT line */}
                  {`${t("NWL_APPLICANT_4_B_HT_LINE_SHAJRA_PLAN")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">

                  <input type="radio" disabled value="Yes" checked={landScheduleData?.ht === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.ht === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_4_B_HT_LINE_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.htLine
                    }}
                    onClick={() => {
                      setLabelValue("HT line"),
                        setOpennedModal("htLine")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.ht === "Y" ? "Yes" : landScheduleData?.ht === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.ht === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* HT Remarks */}
                        {`${t("NWL_APPLICANT_4_B_HT_REMARKS_SHAJRA_PLAN")}`}
                      </label>

                      <Form.Control
                        placeholder={landScheduleData?.htRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.ht === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {`${t("NWL_APPLICANT_4_B_HT_REMARKS_SHAJRA_PLAN")}`}
                      </label>

                      <Form.Control
                        placeholder={landScheduleData?.htRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6 >
                  {/* (C) IOC Gas Pipeline */}
                  {`${t("NWL_APPLICANT_4_C_IOC_GAS_PIPELINE_SHAJRA_PLAN")}`}
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.gas === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.gas === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_4_C_IOC_GAS_PIPELINE_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.iocGasPipeline
                    }}
                    onClick={() => {
                      setLabelValue("IOC Gas Pipeline"),
                        setOpennedModal("iocGasPipeline")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.gas === "Y" ? "Yes" : landScheduleData?.gas === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.gas === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* IOC Remark */}
                        {`${t("NWL_APPLICANT_4_Y_IOC_REMARKS_SHAJRA_PLAN")}`}
                      </label>

                      <Form.Control
                        placeholder={landScheduleData?.gasRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.gas === "N" && (
                  <div className="row ">
                    <div className={classes.formLabel} >
                      <label>
                        {/* IOC Remark */}
                        {`${t("NWL_APPLICANT_4_Y_IOC_REMARKS_SHAJRA_PLAN")}`}
                      </label>
                      <input type="text" className="form-control" disabled placeholder={landScheduleData?.gasRemark} />
                      {/* <Form.Control
                       placeholder={landScheduleData?.gasRemark}
                       className={classes.formLabel}
                        disabled>

                        </Form.Control> */}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="row mx-1">
              <div className="col col-4 p-1">
                <h6 >
                  {/* (d) Nallah{" "} */}
                  {`${t("NWL_APPLICANT_4_D_NALLAH_SHAJRA_PLAN")}`}
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.nallah === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.nallah === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_4_D_NALLAH_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.nallah
                    }}
                    onClick={() => {
                      setLabelValue("Nallah"),
                        setOpennedModal("nallah")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.nallah === "Y" ? "Yes" : landScheduleData?.nallah === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.nallah === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* Nallah Remarks  */}
                        {`${t("NWL_APPLICANT_4_D_Y_NALLAH_REMARKS_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.nallahRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.nallahRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.nallah === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* Nallah Remarks */}
                        {`${t("NWL_APPLICANT_4_D_N_NALLAH_REMARKS_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.nallahRemark} /> */}
                      <Form.Control placeholder={landScheduleData?.nallahRemark}
                        // height={30} style={{ maxWidth: 200, marginRight: 5 }} 
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6>
                  {/* (e)  Any revenue rasta/road passing through proposed site */}
                  {`${t("NWL_APPLICANT_4_E_ANY_REVENUE_REVENUE_RASTA_ROAD_PASSING_THROUGH_PROPOSED_SITE_SHAJRA_PLAN")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.road === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.road === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_4_E_ANY_REVENUE_REVENUE_RASTA_ROAD_PASSING_THROUGH_PROPOSED_SITE_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.anyRevenueRasta
                    }}
                    onClick={() => {
                      setLabelValue("Any revenue rasta/road"),
                        setOpennedModal("anyRevenueRasta")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.road === "Y" ? "Yes" : landScheduleData?.road === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.road === "Y" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>
                        {/* Width of Revenue rasta/road (in ft.) */}
                        {`${t("NWL_APPLICANT_4_WIDTH_OF_REVENUE_RASTA_ROAD_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadWidth} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.roadWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                    <div className="col col-12">
                      <label>
                        {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}
                        {/* Remark */}
                      </label>
                      <Form.Control
                        placeholder={landScheduleData?.roadRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadRemark} /> */}
                    </div>
                  </div>
                )}
                {landScheduleData?.road === "N" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>
                        {/* Remark */}
                        {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.roadRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.roadRemark}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6 onChange={(e) => setLand(e.target.value)} value={land}>
                  {/* (f) Utility/Permit Line */}
                  {`${t("NWL_APPLICANT_F_UTILITY_PERMIT_LINE_SHAJRA_PLAN")}`}
                </h6>{" "}
                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_F_UTILITY_PERMIT_LINE_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.utilityLine
                    }}
                    onClick={() => {
                      setLabelValue("Any marginal land"),
                        setOpennedModal("anyMarginalLand")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.utilityLine === "Y" ? "Yes" : landScheduleData?.utilityLine === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>
                {landScheduleData?.utilityLine === "Y" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* Width of ROW (in ft.)  */}
                        {`${t("NWL_APPLICANT_F_Y_WIDTH_OF_ROW_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.marginalLandRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.utilityWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
                {landScheduleData?.utilityLine === "N" && (
                  <div className="row ">
                    <div className="col col">
                      <label>
                        {/* Remark  */}
                        {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}
                      </label>
                      {/* <input type="text" className="form-control" disabled placeholder={landScheduleData?.marginalLandRemark} /> */}
                      <Form.Control
                        placeholder={landScheduleData?.utilityWidth}
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                  </div>
                )}
              </div>
              <div className="col col-4 p-1">
                <h6
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Whether any utility line passing through the site is incorporated/adjusted in the layout plan (Yes/No)"
                >
                  {/* (G)&nbsp;Utility Line &nbsp; */}
                  {`${t("NWL_APPLICANT_G_COMPACT_BLOCK_SHAJRA_PLAN")}`}
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_G_COMPACT_BLOCK_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.utilityLine
                    }}
                    onClick={() => {
                      setLabelValue("Utility Line"),
                        setOpennedModal("utilityLine")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.utilityLine === "Y" ? "Yes" : landScheduleData?.utilityLine === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.utilityLine === "Y" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>
                        {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}
                      </label>

                      <Form.Control placeholder={landScheduleData?.utilityWidth}

                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>
                    {/* <div className="col col-12">
                      <label>
                      {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}

                      </label>
                   
                      <Form.Control placeholder={landScheduleData?.utilityRemark}
                      
                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div> */}
                  </div>
                )}
                {landScheduleData?.utilityLine === "N" && (
                  <div className="col col">
                    <label>
                      {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}

                    </label>

                    <Form.Control placeholder={landScheduleData?.utilityRemark}

                      className={classes.formLabel}
                      disabled></Form.Control>
                  </div>

                )}
              </div>
              <div className="col col-4 p-1">
                <h6
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Whether any utility line passing through the site is incorporated/adjusted in the layout plan (Yes/No)"
                >
                  {/* (G)&nbsp;Utility Line &nbsp; */}
                  {`${t("NWL_APPLICANT_H_WHETHER_OTHERS_LAND_FALL_SHAJRA_PLAN")}`}
                </h6>

                <div className="d-flex flex-row align-items-center my-1 ">
                  <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                  <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                  <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                  <label className="m-0 mx-2" for="No">No</label>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_H_WHETHER_OTHERS_LAND_FALL_SHAJRA_PLAN") ? "block" : "none",
                      color: fieldIconColors.utilityLine
                    }}
                    onClick={() => {
                      setLabelValue("Utility Line"),
                        setOpennedModal("utilityLine")
                      setSmShow(true),
                        setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData?.utilityLine === "Y" ? "Yes" : landScheduleData?.utilityLine === "N" ? "No" : null);
                    }}
                  ></ReportProblemIcon>
                </div>

                {landScheduleData?.utilityLine === "Y" && (
                  <div className="row ">
                    <div className="col col-12">
                      <label>
                        {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}
                      </label>

                      <Form.Control placeholder={landScheduleData?.utilityWidth}

                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>

                  </div>
                )}
                {landScheduleData?.utilityLine === "N" && (
                  <div className="col col">
                    <label>
                      {`${t("NWL_APPLICANT_REMARKS_SHAJRA_PLAN")}`}

                    </label>

                    <Form.Control placeholder={landScheduleData?.utilityRemark}

                      className={classes.formLabel}
                      disabled></Form.Control>
                  </div>

                )}
              </div>


              <br></br>
              <div className="row">
                &nbsp;&nbsp;
                {`${t("NWL_APPLICANT_SURROUNDINGS_SHAJRA_PLAN")}`}
                &nbsp;&nbsp;
              </div>
              <div className="row">


                <div className="col col-2">
                  <label>
                    {`${t("NWL_APPLICANT_SURROUNDINGS_NORTH_SHAJRA_PLAN")}`}
                  </label>

                  <Form.Control placeholder={landScheduleData?.utilityWidth}

                    className={classes.formLabel}
                    disabled></Form.Control>
                </div>
                <div className="col col-2">
                  <label>

                    {`${t("NWL_APPLICANT_SURROUNDINGS_SOUTH_SHAJRA_PLAN")}`}
                  </label>

                  <Form.Control placeholder={landScheduleData?.utilityWidth}

                    className={classes.formLabel}
                    disabled></Form.Control>
                </div>
                <div className="col col-2">
                  <label>
                    {`${t("NWL_APPLICANT_SURROUNDINGS_EAST_SHAJRA_PLAN")}`}
                  </label>

                  <Form.Control placeholder={landScheduleData?.utilityWidth}

                    className={classes.formLabel}
                    disabled></Form.Control>
                </div>
                <div className="col col-2">
                  <label>
                    {`${t("NWL_APPLICANT_SURROUNDINGS_WEST_SHAJRA_PLAN")}`}
                  </label>

                  <Form.Control placeholder={landScheduleData?.utilityWidth}

                    className={classes.formLabel}
                    disabled></Form.Control>
                </div>
                <div className="col col-4 p-1">
                  <h6
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Whether any utility line passing through the site is incorporated/adjusted in the layout plan (Yes/No)"
                  >
                    {/* (G)&nbsp;Utility Line &nbsp; */}
                    {`${t("NWL_APPLICANT_J_ANY_OTHERS_PASSING_THROUGH_SITE_SHAJRA_PLAN")}`}
                  </h6>

                  <div className="d-flex flex-row align-items-center my-1 ">
                    <input type="radio" disabled value="Yes" checked={landScheduleData?.utilityLine === "Y" ? true : false} />
                    <label className="m-0  mx-2" for="Yes">Yes</label>&nbsp;&nbsp;
                    <input type="radio" disabled value="No" checked={landScheduleData?.utilityLine === "N" ? true : false} />
                    <label className="m-0 mx-2" for="No">No</label>
                    <ReportProblemIcon
                      style={{
                        display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_J_ANY_OTHERS_PASSING_THROUGH_SITE_SHAJRA_PLAN") ? "block" : "none",
                        color: fieldIconColors.utilityLine
                      }}
                      onClick={() => {
                        setLabelValue("Utility Line"),
                          setOpennedModal("utilityLine")
                        setSmShow(true),
                          setDocModal(false),
                          console.log("modal open"),
                          setFieldValue(landScheduleData?.utilityLine === "Y" ? "Yes" : landScheduleData?.utilityLine === "N" ? "No" : null);
                      }}
                    ></ReportProblemIcon>
                  </div>

                  {landScheduleData?.utilityLine === "Y" && (
                    <div className="row ">
                      <div className="col col-12">
                        <label>
                          {`${t("NWL_APPLICANT_DETAILS_THEREOF_SHAJRA_PLAN")}`}
                        </label>

                        <Form.Control placeholder={landScheduleData?.utilityWidth}

                          className={classes.formLabel}
                          disabled></Form.Control>
                      </div>

                    </div>
                  )}
                  {landScheduleData?.utilityLine === "N" && (
                    <div className="col col">
                      <label>
                        {`${t("NWL_APPLICANT_DETAILS_THEREOF_SHAJRA_PLAN")}`}

                      </label>

                      <Form.Control placeholder={landScheduleData?.utilityRemark}

                        className={classes.formLabel}
                        disabled></Form.Control>
                    </div>

                  )}
                </div>
              </div>
            </div>
            <hr className="my-3" />
            <h5 className={`text-black ml-2 mb-2 ${classes.formLabel}`}>
              {`${t("NWL_APPLICANT_5_ENCLOSE_THE_FOLLOWING_DOCUMENTS_AS_ANNEXURES")}`}
              {/* 5. Enclose the following documents as Annexures&nbsp;&nbsp; */}
              <div className="d-flex flex-row align-items-center my-1 ">
                {/* <Form.Control height={30} style={{ maxWidth: 200, marginRight: 5 }} disabled placeholder={landScheduleData?.documentsAsAnnexures}></Form.Control> */}
                <ReportProblemIcon
                  style={{
                    display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_5_ENCLOSE_THE_FOLLOWING_DOCUMENTS_AS_ANNEXURES") ? "block" : "none",
                    color: fieldIconColors.documentsAsAnnexures
                  }}
                  onClick={() => {
                    setLabelValue("Enclose the following documents as Annexures"),
                      setOpennedModal("documentsAsAnnexures")
                    setSmShow(true),
                      setDocModal(false),
                      console.log("modal open"),
                      setFieldValue(landScheduleData !== null ? landScheduleData?.documentsAsAnnexures : null);
                  }}
                ></ReportProblemIcon>
              </div>
            </h5>
            <div className="row mx-1">
              <div className="col col-3 p-1">
                <h6>
                  {/* Land schedule */}
                  {`${t("NWL_APPLICANT_LAND_SCHEDULE")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.landSchedule)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_LAND_SCHEDULE") ? "block" : "none",
                      color: fieldIconColors.landSchedule
                    }}
                    onClick={() => {
                      setLabelValue("Land schedule"),
                        setOpennedModal("landSchedule")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.landSchedule : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>
                  {/* Copy of Mutation */}
                  {`${t("NWL_APPLICANT_COPY_OF_MUTATIION")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.mutation)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_COPY_OF_MUTATIION") ? "block" : "none",
                      color: fieldIconColors.copyOfMutation
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Mutation"),
                        setOpennedModal("copyOfMutation")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.mutation : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>
                  {/* Copy of Jamabandi */}
                  {`${t("NWL_APPLICANT_COPY_OF_JAMABANDI")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.jambandhi)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_COPY_OF_JAMABANDI") ? "block" : "none",
                      color: fieldIconColors.copyOfJamabandi
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Jamabandi"),
                        setOpennedModal("copyOfJamabandi")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.jambandhi : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>
                  {/* Details of lease / patta, if any */}

                  {`${t("NWL_APPLICANT_DETAILS_OF_LEASE_PATTA")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.detailsOfLease)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_DETAILS_OF_LEASE_PATTA") ? "block" : "none",
                      color: fieldIconColors.detailsOfLease
                    }}
                    onClick={() => {
                      setLabelValue("Details of lease / patta, if any"),
                        setOpennedModal("detailsOfLease")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.detailsOfLease : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
            </div>
            <br></br>
            <div className="row mx-1">
              <div className="col col-3 p-1">
                {/* &nbsp;&nbsp; */}
                <h6>
                  {/* Add Sales/deed/exchange */}
                  {`${t("NWL_APPLICANT_SALES_DEED_EXCHANGE_DEED")}`}
                </h6>
                {/* &nbsp;&nbsp; */}
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.addSalesDeed)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>

                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_SALES_DEED_EXCHANGE_DEED") ? "block" : "none",
                      color: fieldIconColors.addSalesDeed
                    }}
                    onClick={() => {
                      setLabelValue("Add Sales/deed/exchange"),
                        setOpennedModal("addSalesDeed")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.addSalesDeed : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              <div className="col col-3 p-1">
                <h6>
                  {/* Copy of spa/GPA/board resolution */}
                  {`${t("NWL_APPLICANT_COPY_OF_SPA_GPA_BOARD")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.copyofSpaBoard)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_COPY_OF_SPA_GPA_BOARD") ? "block" : "none",
                      color: fieldIconColors.copyofSpaBoard
                    }}
                    onClick={() => {
                      setLabelValue("Copy of spa/GPA/board resolution"),
                        setOpennedModal("copyofSpaBoard")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.copyofSpaBoard : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>
              {/* <div className="col col-3 p-1">
                <h6>Revised Land Schedule</h6>
                <div className="d-flex flex-row align-items-center my-1 ">
                  
                  <IconButton onClick={() => getDocShareholding(landScheduleData?.revisedLansSchedule)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                     display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("Address") ? "block" : "none",
                      color: fieldIconColors.revisedLansSchedule
                    }}
                    onClick={() => {
                      setLabelValue("Revised Land Schedule"),
                        setOpennedModal("revisedLansSchedule")
                       setSmShow(true),
                     setDocModal(false),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.revisedLansSchedule : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div> */}

              <div className="col col-3 p-1">
                <h6>
                  {/* Copy of Shajra Plan */}
                  {`${t("NWL_APPLICANT_SHAJRA_PLAN_DOCUMENT")}`}
                </h6>
                <div className="d-flex flex-row align-items-center my-1 ">

                  <IconButton onClick={() => getDocShareholding(landScheduleData?.copyOfShajraPlan)}>
                    <DownloadForOfflineIcon color="primary" className="mx-1" />
                  </IconButton>
                  <ReportProblemIcon
                    style={{
                      display: hideRemarks && hideRemarksPatwari && showReportProblemIcon("NWL_APPLICANT_SHAJRA_PLAN_DOCUMENT") ? "block" : "none",
                      color: fieldIconColors.copyOfShajraPlan
                    }}
                    onClick={() => {
                      setLabelValue("Copy of Shajra Plan"),
                        setOpennedModal("copyOfShajraPlan")
                      setSmShow(true),
                        setDocModal(true),
                        console.log("modal open"),
                        setFieldValue(landScheduleData !== null ? landScheduleData?.copyOfShajraPlan : null);
                    }}
                  ></ReportProblemIcon>
                </div>
              </div>

            </div>
            <br></br>
            {/* <div style={{ position: "relative", marginBottom: 40 }}>
              <Button onClick={() => props.passUncheckedList({ data: uncheckedValue })}>Submit</Button>
            </div> */}
          </Form.Group>
        </div>
      </Collapse>
    </Form>
  );
};

export default Developerinfo;
