import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

const ServicePlanService = () => {
  const { register, handleSubmit } = useForm();

  const [LOCNumber, setLOCNumber] = useState("");
  const [submitDataLabel, setSubmitDataLabel] = useState([]);
  const [ServicePlanDataLabel, setServicePlanDataLabel] = useState([]);

  const servicePlan = async (data) => {
    console.log(data);
    try {
      const postDistrict = {
        requestInfo: {
          api_id: "1",
          ver: "1",
          ts: null,
          action: "create",
          did: "",
          key: "",
          msg_id: "",
          requester_id: "",
          auth_token: null,
        },

        servicePlanRequest: {
          loiNumber: data?.loiNumber,
          undertaking: data?.undertaking,
          selfCertifiedDrawingsFromCharetedEng: data?.selfCertifiedDrawingsFromCharetedEng,
          selfCertifiedDrawingFromEmpaneledDoc: data?.selfCertifiedDrawingFromEmpaneledDoc?.[0]?.name,
          environmentalClearance: data?.environmentalClearance?.[0]?.name,
          shapeFileAsPerTemplate: data?.shapeFileAsPerTemplate?.[0]?.name,
          autoCadFile: data?.autoCadFile?.[0]?.name,
          certifieadCopyOfThePlan: data?.certifieadCopyOfThePlan?.[0]?.name,
        },
      };
      const Resp = await axios.post("/land-services/serviceplan/_create", postDistrict);
      setServicePlanDataLabel(Resp.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log("uu", ServicePlanDataLabel);
  // const getSubmitDataLabel = async () => {
  //   try {
  //     const postDistrict = {
  //       requestInfo: {
  //         api_id: "1",
  //         ver: "1",
  //         ts: null,
  //         action: "create",
  //         did: "",
  //         key: "",
  //         msg_id: "",
  //         requester_id: "",
  //         auth_token: null,
  //       },
  //     };

  //     const Resp = await axios.post(`http://10.1.1.18:8443/land-services/serviceplan/_get?loiNumber=123`, postDistrict);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  // useEffect(() => {
  //   getSubmitDataLabel();
  // }, []);

  return (
    <form onSubmit={handleSubmit(servicePlan)}>
      <Card style={{ width: "126%", border: "5px solid #1266af" }}>
        <h4 style={{ fontSize: "25px", marginLeft: "21px" }}>Service Plan </h4>
        <Card style={{ width: "126%", marginLeft: "-2px", paddingRight: "10px", marginTop: "40px", marginBottom: "52px" }}>
          <Row>
            <Col className="col-4">
              <div>
                <label>
                  <h2>
                    LOI Number <span style={{ color: "red" }}>*</span>
                  </h2>
                </label>
              </div>
              <input
                type="number"
                className="form-control"
                {...register("loiNumber")}
                onChange={(e) => setLOCNumber(e.target.value)}
                value={LOCNumber}
              />
            </Col>
            <Col className="col-4">
              <div>
                <label>
                  <h2 data-toggle="tooltip" data-placement="top" title=" Is the uploaded Service Plan in accordance to the Standard designs?">
                    Uploaded Service Plan <span style={{ color: "red" }}>*</span>
                  </h2>
                </label>
              </div>
              <Form.Check
                value="true"
                type="radio"
                id="default-radio"
                label="Yes"
                name="true"
                {...register("selfCertifiedDrawingsFromCharetedEng")}
                inline
              ></Form.Check>
              <Form.Check
                value="false"
                type="radio"
                id="default-radio"
                label="No"
                name="false"
                {...register("selfCertifiedDrawingsFromCharetedEng")}
                inline
              ></Form.Check>
            </Col>
            <Col className="col-4">
              <div>
                <label>
                  <h2>Undertaking</h2>
                </label>
              </div>
              <Form.Check value="true" type="radio" id="default-radio" label="Yes" name="true" {...register("undertaking")} inline></Form.Check>
              <Form.Check value="false" type="radio" id="default-radio" label="No" name="false" {...register("undertaking")} inline></Form.Check>
            </Col>
          </Row>
          <br></br>
          <div className="table table-bordered table-responsive">
            <thead>
              <tr>
                <td style={{ textAlign: "center" }}> Sr.No.</td>
                <td style={{ textAlign: "center" }}>Type Of Map/Plan</td>
                <td style={{ textAlign: "center" }}>Annexure</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">1.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Self-certified drawings from empanelled/certified architects that conform to the standard approved template.</h2>
                </td>
                <td component="th" scope="row">
                  <input type="file" className="form-control" {...register("selfCertifiedDrawingFromEmpaneledDoc")} />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">2.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Environmental Clearance.</h2>
                </td>
                <td component="th" scope="row">
                  <input type="file" className="form-control" {...register("environmentalClearance")} />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">3.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>PDF (OCR Compatible) + GIS format (shapefile as per the template uploaded on the department website).</h2>
                </td>
                <td component="th" scope="row">
                  <input type="file" className="form-control" {...register("shapeFileAsPerTemplate")} />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">4.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>AutoCAD (DXF) file.</h2>
                </td>
                <td component="th" scope="row">
                  <input type="file" className="form-control" {...register("autoCadFile")} />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="px-2">
                    <p className="mb-2">5.</p>
                  </div>
                </td>
                <td component="th" scope="row">
                  <h2>Certified copy of the plan verified by a third party.</h2>
                </td>
                <td component="th" scope="row">
                  <input type="file" className="form-control" {...register("certifieadCopyOfThePlan")} />
                </td>
              </tr>
            </tbody>
          </div>

          <div class="row">
            <div class="col-sm-12 text-right">
              <button type="submit" id="btnSearch" class="btn btn-primary btn-md center-block">
                Submit
              </button>
            </div>
          </div>
        </Card>
      </Card>
    </form>
  );
};

export default ServicePlanService;
