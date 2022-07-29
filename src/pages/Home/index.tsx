import "./index.sass";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getTickets } from "./service";
import { t } from "i18next";
import moment from "moment";

const HomePage = (props: any) => {
  const { t } = useTranslation();

  return (
    <div className="page__home home">
      <ExchangeList t={t} />
    </div>
  );
};
const ExchangeList = (props: any) => {
  const [data, setData]: [GridColDef[], any] = useState([]);

  const [columns, setColumns]: any = useState([]);

  useEffect(() => {
    getTickets().then((res: any) => {
      if (res.status === 200) {
        setData(
          res.data.map((item: any, i: number) => {
            return {
              ...item,
              openTime: moment(item.openTime).format("YYYY-MM-DD HH:mm:ss"),
              closeTime: moment(item.closeTime).format("YYYY-MM-DD HH:mm:ss"),
              // openPrice: Number(item.openPrice).toLocaleString(),
              // lastPrice: Number(item.lastPrice).toLocaleString(),
              // bidPrice: Number(item.bidPrice).toLocaleString(),
              // askPrice: Number(item.askPrice).toLocaleString(),
              id: i + 1,
            };
          }) || []
        );
      }
    });
  }, []);

  useEffect(() => {
    setColumns([
      {
        field: "symbol",
        headerName: props.t("HOME.ASSET"),
        headerAlign: "center",
        align: "center",
        width: 200,
      },
      {
        field: "openTime",
        headerName: props.t("HOME.OPEN_TIME"),
        headerAlign: "center",
        align: "center",
        width: 250,
        editable: true,
      },
      {
        field: "closeTime",
        headerName: props.t("HOME.CLOSE_TIME"),
        headerAlign: "center",
        align: "center",
        width: 250,
        editable: true,
      },
      {
        field: "openPrice",
        headerName: props.t("HOME.OPEN_PRICE"),
        headerAlign: "right",
        align: "right",
        width: 250,
        editable: true,
      },
      {
        field: "lastPrice",
        headerName: props.t("HOME.CLOSE_PRICE"),
        headerAlign: "right",
        align: "right",
        width: 250,
        editable: true,
      },
      {
        field: "bidPrice",
        headerName: props.t("HOME.BID"),
        headerAlign: "right",
        align: "right",
        width: 250,
        editable: true,
      },
      {
        field: "askPrice",
        headerName: props.t("HOME.ASK"),
        headerAlign: "right",
        align: "right",
        width: 250,
        editable: true,
      },
      {
        field: "volume",
        headerName: props.t("HOME.VOLUME"),
        headerAlign: "right",
        align: "right",
        width: 250,
        editable: true,
      },
    ]);
  }, [props.t]);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
      />
    </Box>
  );
};

export default HomePage;
