import "./index.sass";
import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { t } from "i18next";
import { getData } from "./service";

const AGGridPage = (props: any) => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100vh" }), []);
  const gridStyle = useMemo(() => ({ height: "40%", width: "100%" }), []);
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "country", pivot: true },
    { field: "year", rowGroup: true },
    { field: "sport", rowGroup: true },
    { field: "total", aggFunc: "sum" },
    { field: "gold", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 130,
      filter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onGridReady = useCallback(() => {
    getData().then((res: any) => {
      if (res.status === 200) {
        setRowData(res.data);
      }
    });
  }, []);

  const onFirstDataRendered = useCallback((event: any) => {
    var chartContainer = document.querySelector("#chart");
    var params = {
      chartType: "groupedColumn",
      chartContainer: chartContainer,
      chartThemeName: "ag-vivid",
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            enabled: true,
            position: "bottom",
          },
          navigator: {
            enabled: true,
            height: 10,
          },
        },
      },
    };
    event.api.createPivotChart(params);
    // expand one row for demonstration purposes
    setTimeout(function () {
      event.api.getDisplayedRowAtIndex(2).setExpanded(true);
    }, 0);
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            pivotMode={true}
            popupParent={popupParent}
            onGridReady={onGridReady}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <div
          id="chart"
          style={{ flex: "1 1 auto", overflow: "hidden", height: "60%" }}
        ></div>
      </div>
    </div>
  );
};

export default AGGridPage;
