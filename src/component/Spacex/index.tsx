import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import VisibilityIcon from "@material-ui/icons/Visibility";
import {
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache,
} from "react-virtualized";
import {
  TextField,
  TableBody,
  Grid,
  TableHead,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Table,
  Button,
  Checkbox,
} from "@material-ui/core";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { LAUNCHESPAST } from "./Query";
import { CommonModal } from "../../container/CommonModal";
import { Ships } from "../ships/index";
import { CompareDates } from "../../container/Compare";

const useStyles = makeStyles(() => ({
  AccountTableCss: {
    "& .MuiToolbar-regular": {
      minHeight: 0,
    },
  },
  LabelStart: {
    fontSize: 16,
    paddingBottom: 10,
    color: "rgb(70, 81, 142)",
  },
  Labelend: {
    fontSize: 16,
    paddingBottom: 10,
    color: "rgb(70, 81, 142)",
    textAlign: "end",
  },
  denseTable: {
    "& td": { padding: "2px 5px", cursor: "pointer", textAlign: "center" },
    "& th": { padding: "5px 5px", cursor: "pointer", textAlign: "center" },
  },
}));

interface Props {}

export const Speacex: React.FC<Props> = (props: Props) => {
  //states
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openCompareModal, setOpenCompareModal] = useState<boolean>(false);
  const [shipsData, setShipsData] = useState<any>();
  const [resultData, setResultData] = useState<any>();
  const [missionName, setMissionName] = useState<string>("");
  const [rocketName, setRocketName] = useState<string>("");
  const [CompareData, setCompareData] = useState<any>();

  //class
  const classes = useStyles();
  //ref
  const ListRef: any = React.useRef();

  const cache = React.useRef(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 100,
    })
  );

  //graphql query or mutation
  const { data, loading, error } = useQuery(LAUNCHESPAST);

  const ToggleFun = (data: any) => {
    if (data) {
      setShipsData(data);
    } else {
      setShipsData([]);
    }
    setOpenModal(!openModal);
  };
  const ToggleCompareModal = () => {
    setOpenCompareModal(!openCompareModal);
  };

  useEffect(() => {
    setResultData(data?.launchesPast || []);
  }, [data]);

  const FilterBuutonHandler = () => {
    let Data = _.cloneDeep(data?.launchesPast || []);
    let missionResult = [];
    let rocketResult = [];
    if (missionName !== "") {
      missionResult = _.filter(Data, (d) => d.mission_name === missionName);
    }
    if (rocketName !== "") {
      rocketResult = _.filter(Data, (d) => d.rocket_name === rocketName);
    }
    let Res = _.concat(missionResult, rocketResult);
    setResultData([...Res]);
  };

  const CompareCheckBoxHandler = (e: any, data: any) => {
    let Data = CompareData ? CompareData : [];
    if (e.target.checked) {
      Data.push(data);
    } else {
      Data = _.filter(Data, (d) => d.mission_name !== data.mission_name);
    }
    setCompareData([...Data]);
  };

  return (
    <div className="main-container" style={{ margin: "50px" }}>
      <Grid xs={12} container justify="flex-start">
        <Grid xs={6} item>
          {CompareData && CompareData.length === 2 && (
            <Button
              onClick={() => ToggleCompareModal()}
              variant="contained"
              color="primary"
            >
              Compare
            </Button>
          )}
        </Grid>

        <Grid xs={6} container justify="flex-end">
          <Grid item xs={2} style={{ paddingRight: 5 }}>
            <TextField
              id="outlined-basic"
              label="Mission Name"
              variant="outlined"
              defaultValue={missionName}
              onChange={({ target }) => setMissionName(target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              label="Rocket Name"
              variant="outlined"
              defaultValue={rocketName}
              onChange={({ target }) => setRocketName(target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              onClick={() => FilterBuutonHandler()}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item className={`${classes.AccountTableCss} DenseTable`}>
        <TableContainer component={Paper}>
          <Table className={classes.denseTable}>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{ textAlign: "left", width: "10%" }}
                ></TableCell>
                <TableCell style={{ textAlign: "left", width: "10%" }}>
                  {" "}
                  Mission name{" "}
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  Launch local date
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  Site Name Long
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  Article Link
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  Video Link
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  Rocket Name
                </TableCell>
                <TableCell style={{ textAlign: "left", width: "15%" }}>
                  ships
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <div style={{ width: "100%", height: 600 }}>
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <List
                    ref={ListRef}
                    height={height}
                    width={width}
                    rowHeight={70}
                    deferredMeasurementCache={cache.current || ""}
                    rowCount={resultData?.length || 0}
                    rowRenderer={({ key, index, style, parent }) => {
                      const rowData: any = resultData[index];
                      return (
                        <CellMeasurer
                          key={key}
                          cache={cache.current}
                          parent={parent}
                          columnIndex={0}
                          rowIndex={index}
                        >
                          <div style={style}>
                            <div className="tbody">
                              <Table style={{ cursor: "pointer" }}>
                                <TableBody>
                                  <TableRow>
                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "10%",
                                        padding: "0px 10px",
                                      }}
                                    >
                                      <Checkbox
                                        onChange={(e) =>
                                          CompareCheckBoxHandler(e, rowData)
                                        }
                                        name="checkedB"
                                        color="primary"
                                      />
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "10%",
                                        padding: "0px 10px",
                                      }}
                                    >
                                      {rowData?.mission_name || ""}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                    >
                                      {rowData?.launch_date_local || ""}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                    >
                                      {rowData?.launch_site.site_name_long ||
                                        ""}
                                    </TableCell>
                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                    >
                                      <div>
                                        <a
                                          href={
                                            rowData?.links.article_link || ""
                                          }
                                        >
                                          Open Artical{" "}
                                        </a>
                                        {}
                                      </div>
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                    >
                                      <a href={rowData?.links.video_link || ""}>
                                        Open Video{" "}
                                      </a>
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                    >
                                      {rowData?.rocket?.rocket_name || ""}
                                    </TableCell>

                                    <TableCell
                                      style={{
                                        textAlign: "left",
                                        width: "15%",
                                      }}
                                      onClick={() => ToggleFun(rowData.ships)}
                                    >
                                      <VisibilityIcon />
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </div>
                          </div>
                        </CellMeasurer>
                      );
                    }}
                  />
                );
              }}
            </AutoSizer>
          </div>
        </TableContainer>
      </Grid>
      <CommonModal
        open={openModal}
        handleClose={() => ToggleFun(null)}
        modalTitle={"Ships List"}
      >
        <Ships ShipsData={shipsData} />
      </CommonModal>
      <CommonModal
        open={openCompareModal}
        handleClose={() => ToggleCompareModal()}
        modalTitle={"Compare Result"}
      >
        <CompareDates CompareData={CompareData} />
      </CommonModal>
    </div>
  );
};
