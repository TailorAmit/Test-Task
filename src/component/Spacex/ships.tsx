import React, { useEffect, useState,useRef } from 'react'
import MaterialTable from 'material-table';

interface Props {
    ShipsData:any
}
const columns:any = [
    { title: 'Name', field: 'name'},
    { title: 'Home Port', field: 'home_port'},
    { title: 'Image', field: 'image',render:(rowData:any)=><img src={rowData.image} height={100} width={200}/>},
  ]
export const Ships: React.FC<Props> = ({ShipsData}) => {
  const tableRef = useRef();

    return (
        <div className="main-container" style={{width:"90%",margin:"0 auto"}}>
             <MaterialTable
              title="ships"
              tableRef={tableRef}
              columns={columns} 
              data={ShipsData}
              options={ {
                showTitle: true,
                padding: 'dense',
                pageSizeOptions: [5, 10, 15, 20, 25, 50],
                addRowPosition: 'first',
                filtering: false,
                paging:false,
                sorting: true,
                search: false, 
                maxBodyHeight: window.innerHeight - 215,
              }}              
            />
        </div>
    )    
}


