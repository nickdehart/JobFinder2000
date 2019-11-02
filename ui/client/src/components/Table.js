import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Paper } from '@material-ui/core';
import ApplyModal from './ApplyModal';

class Table extends Component {
  
render() {
   const { data } = this.props
 
  const columns = [
  {
    Header: 'Date',
    accessor: 'timestamp',
    maxWidth: 150,
    Cell: props => <span>{new Date(props.value).toLocaleDateString()}</span>
  },
  {
   Header: 'Title',
   accessor: 'title',
   minWidth: 250,
   Cell: props => <span>{props.value}</span>
  },
  {
   Header: 'Applied',
   accessor: 'applied',
   maxWidth: 150,
   Cell: props => <span>{props.value ? 'True' : 'False'}</span>
  }, 
  {
   Header: 'External',
   accessor: 'external',
   maxWidth: 150,
   Cell: props => <span>{props.value ? 'True' : 'False'}</span>
  }, 
  {
   Header: ' ',
   accessor: 'href',
   maxWidth: 150,
   Cell: props => <ApplyModal props={props}/>
  }, 
]


    return (
      <div>
        <Paper style={{marginTop: '20px'}} square>
          <ReactTable
            data={data}
            columns={columns}
            showPageSizeOptions={false}
            defaultPageSize={10}
            sortable
            // filterable
          />
        </Paper>
      </div>
    );
  }
}

export default Table;