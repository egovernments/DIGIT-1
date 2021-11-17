import React, { Fragment, useMemo } from "react";
import { Table, StatusTable, Row, CardSubHeader, CardSectionHeader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const SubOccupancyTable = ({ edcrDetails, applicationData }) => {
  const { t } = useTranslation();

  const tableHeader = [
    {
      name: "BPA_TABLE_COL_FLOOR",
      id: "Floor",
    },
    {
      name: "BPA_TABLE_COL_LEVEL",
      id: "Level",
    },
    {
      name: "BPA_TABLE_COL_OCCUPANCY",
      id: "Occupancy",
    },
    {
      name: "BPA_TABLE_COL_BUILDUPAREA",
      id: "BuildupArea",
    },
    {
      name: "BPA_TABLE_COL_FLOORAREA",
      id: "FloorArea",
    },
    {
      name: "BPA_TABLE_COL_CARPETAREA",
      id: "CarpetArea",
    }
  ]

  const accessData = (plot) => {
    const name = plot;
    return (originalRow, rowIndex, columns) => {
      return originalRow[name];
    }
  }


  const tableColumns = useMemo(
    () => {
      return tableHeader.map((ob) => ({
        Header: t(`${ob.name}`),
        accessor: accessData(ob.id),
        id: ob.id
      }));
    });

  function getFloorData(block) {
    let floors = [];
    block?.building?.floors.map((ob) => {
      floors.push({
        Floor: t(`BPA_FLOOR_NAME_${ob.number}`),
        Level: ob.number,
        Occupancy: t(`${ob.occupancies?.[0]?.type}`),
        BuildupArea: ob.occupancies?.[0]?.builtUpArea,
        FloorArea: ob.occupancies?.[0]?.floorArea || 0,
        CarpetArea: ob.occupancies?.[0]?.CarpetArea || 0,
        key: t(`BPA_FLOOR_NAME_${ob.number}`),
      });
    });
    return floors;
  }

  function getSubOccupancyValues(index) {
    let values = applicationData?.landInfo?.unit;
    let returnValue = "";
    if (values?.length > 0) {
      let splitArray = values[index]?.usageCategory?.split(',');
      if (splitArray?.length) {
        const returnValueArray = splitArray.map(data => data ? `${t(`BPA_SUBOCCUPANCYTYPE_${data}`)}` : "NA");
        returnValue = returnValueArray.join(',')
      }
    }
    return returnValue ? returnValue : "NA";
  }

  return (
    <Fragment>
      <div style={window.location.href.includes("citizen")?{}:{ background: "#FAFAFA", border: "1px solid #D6D5D4", padding: "8px", borderRadius: "4px", maxWidth: "950px", minWidth: "280px" }}>
        <StatusTable>
          {edcrDetails?.values?.map((value, index) => {
            return <Row className="border-none" labelStyle={{width: "100%"}} key={`${value.title}:`} label={`${t(`${value.title}`)}:`} text={value?.value ? value?.value : ""} />
          })}
        </StatusTable>

        {edcrDetails?.subOccupancyTableDetails?.[0]?.value?.planDetail?.blocks.map((block, index) => (
          <div key={index}>
            <CardSubHeader style={{ marginBottom: "8px", paddingBottom: "9px", color: "#0B0C0C", fontSize: "16px", lineHeight: "19px" }}>{t("BPA_BLOCK_SUBHEADER")} {index + 1}</CardSubHeader>
            <StatusTable>
              <Row className="border-none" label={`${t("BPA_SUB_OCCUPANCY_LABEL")}:`} text={getSubOccupancyValues(index)}></Row>
            </StatusTable>
            <div style={window.location.href.includes("citizen")?{overflow:"scroll"}:{ maxWidth: "950px", maxHeight: "280px" }}>
              <Table
                className="customTable"
                t={t}
                disableSort={false}
                autoSort={true}
                manualPagination={false}
                isPaginationRequired={false}
                initSortId="S N "
                data={getFloorData(block)}
                columns={tableColumns}
                getCellProps={(cellInfo) => { return { style: {} } }}
              />
            </div>
          </div>))}
      </div>
    </Fragment>
  )
}

export default SubOccupancyTable;