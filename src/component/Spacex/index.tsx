import React, { useEffect, useState, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import MaterialTable, { MTableHeader, MTableFilterRow } from 'material-table';
import { AutoSizer, List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import TableBody from '@material-ui/core/TableBody';
import { Grid, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { Table } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import { Ships } from './ships'
import { LAUNCHESPAST } from './Query'
interface Props {

}
const useStyles = makeStyles(() => ({
  AccountTableCss: {
      "& .MuiToolbar-regular": {
          minHeight: 0
      }
  },
  LabelStart: {
      fontSize: 16,
      paddingBottom: 10,
      color: "rgb(70, 81, 142)"
  },
  Labelend: {
      fontSize: 16,
      paddingBottom: 10,
      color: "rgb(70, 81, 142)",
      textAlign: "end"
  },
  denseTable: {
      '& td': { padding: "2px 5px", cursor: "pointer", textAlign: "center" },
      '& th': { padding: "5px 5px", cursor: "pointer", textAlign: "center" }
  },
}))
const StyledTableCell = withStyles((theme) => ({
  head: {
      backgroundColor: "#8CB836",
      color: theme.palette.common.white,
  },
  body: {
      fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
      '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
      },
  },
}))(TableRow);

const columns: any = [
  { title: 'Mission name', field: 'mission_name' },
  { title: 'Launch local date', field: 'launch_date_local', type: 'date' },
  { title: 'Site Name Long', field: 'launch_site.site_name_long' },
  { title: 'Article Link', field: 'links.article_link' },
  { title: 'Video Link', field: 'links.video_link' },
  { title: 'Rocket Name', field: 'rocket.rocket_name' },
]
export const Speacex: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const ListRef:any = React.useRef();

  const cache = React.useRef(
    new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    })
)
  const [loader, setLoader] = useState(false);
  const [endPostition, setPageSize] = useState(10)
  const [count, setCount] = useState(1)
  const [open, setOpen] = React.useState(false);

  const { data, loading, error } = useQuery(LAUNCHESPAST)
let NewData = data?.launchesPast || []
  // const GetspaceData: any = (query: any) => {
  //   return new Promise((resolve, reject) => {
  //     if (error)
  //       reject(error)
  //     let FullData = data?.launchesPast || []
  //     let StartingPage = query.pageSize * query.page + 1
  //     let EndingPage = query.pageSize * query.page + 1
  //     debugger
  //     let NewData = FullData.slice(StartingPage, EndingPage)
  //     resolve({
  //       data: NewData,
  //       page: query.page,
  //       totalCount: (data?.launchesPast || []).length
  //     })
  //   })
  // }

  // useEffect(() => {
  //   let RefTable: any = tableRef
  //   RefTable.current && RefTable.current.onQueryChange()
  // }, [data]);



  return (
    <div className="main-container" style={{ margin: "50px" }}>

<Grid xs={12} item className={`${classes.AccountTableCss} DenseTable`}>
            <TableContainer component={Paper}>
                <Table className={classes.denseTable}>
                    <TableHead>
                        <TableRow> 
                        <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}></StyledTableCell>
                           
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Mission name</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Launch local date</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Site Name Long</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Article Link</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Video Link</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>Rocket Name</StyledTableCell>
                        </TableRow>
                    </TableHead>
                </Table>
      <div style={{ width: "100%", height:600 }}>
        <AutoSizer>
          {({ width, height }) => {
            return <List
            ref={ListRef}
              height={height}
              width={width}
              rowHeight={70}
              deferredMeasurementCache={cache.current || ''}
              rowCount={(data?.launchesPast || []).length}
              rowRenderer={({ key, index, style, parent }) => {
                const rowData:any = NewData[index]                               
                return <CellMeasurer key={key} cache={cache.current} parent={parent} columnIndex={0} rowIndex={index} >
                  <div style={style}>
                    <div className="tbody"  >
                      <Table style={{ cursor: "pointer" }}>
                        <TableBody onClick={() =>{
                          debugger
                        } }>
                          <StyledTableRow >
                          <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>
                          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
                          </StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>{rowData.mission_name}</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }} >{rowData.launch_date_local}</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>{rowData.launch_site.site_name_long}</StyledTableCell>
                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}><div><a href={rowData.links.article_link}>Open Artical </a>{}</div></StyledTableCell>

                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}><a href={rowData.links.video_link}>Open Video </a></StyledTableCell>

                            <StyledTableCell style={{ textAlign: "left", width: "14.28%",wordBreak:"break-all" }}>{rowData.rocket.rocket_name}</StyledTableCell>


                          </StyledTableRow>
                          <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Typography variant="h6" gutterBottom component="div">
                                History
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Customer</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Total price ($)</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CellMeasurer>
              }}
            />
          }}
        </AutoSizer>
      </div>
      {/* <MaterialTable
              title="Space"
              tableRef={tableRef} 
              columns={columns}
              isLoading={loading}
              data={query=>GetspaceData(query)}
              options={ {
                showTitle: true,
                padding: 'dense',
                pageSize:10,
                pageSizeOptions: [5, 10, 15, 20, 25, 50],
                addRowPosition: 'first',
                filtering: false,
                sorting: true,
                search: false, 
                maxBodyHeight: window.innerHeight - 215,
              }}
              detailPanel={(rowData:any) => {
                 return <Ships ShipsData={rowData?.ships || []}/>
              }} 
            /> */}
            </TableContainer>
            </Grid>
    </div>
  )

}


