import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Paper } from '@material-ui/core';
import ApplyModal from './ApplyModal';

class Table extends Component {

stringContains = (filter, row) => {
  return row.title.toLowerCase().includes(filter.value.toLowerCase())
}

filterMethod = (filter, row) => {
  if (filter.value === "all") {
    return true;
  }
  if (filter.value === "true") {
    return row[filter.id] === true;
  }
  return row[filter.id] === false;
}

filter = ({ filter, onChange }) => {
  return(
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
  )
}

externalFilter = ({ filter, onChange }) => {
  return(
      <select
        onChange={event => onChange(event.target.value)}
        style={{ width: "100%" }}
        value={filter ? filter.value : "all"}
      >
        <option value="all">All</option>
        <option value="true">External</option>
        <option value="false">Internal</option>
      </select>
  )
}
  
render() {
   const { data, getData } = this.props
 
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
   Cell: props => <span>{props.value}</span>,
   filterMethod: this.stringContains,
  },
  {
   Header: 'Applied',
   accessor: 'applied',
   maxWidth: 150,
   Cell: props => <span>{props.value ? 'True' : 'False'}</span>,
   filterMethod: this.filterMethod,
   Filter: this.filter
  }, 
  {
   Header: 'Ext/Int',
   accessor: 'external',
   maxWidth: 150,
   Cell: props => <span>{props.value ? 'External' : 'Internal'}</span>,
   filterMethod: this.filterMethod,
   Filter: this.externalFilter
  }, 
  {
   Header: ' ',
   accessor: 'href',
   maxWidth: 160,
   Cell: props => <ApplyModal props={props} getData={getData}/>
  }, 
]


    return (
      <div>
        <Paper style={{marginTop: '20px'}} square>
          <ReactTable
            data={data}
            columns={columns}
            showPageSizeOptions={false}
            defaultPageSize={9}
            sortable
            filterable
          />
        </Paper>
      </div>
    );
  }
}

export default Table;