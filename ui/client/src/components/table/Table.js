import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Paper, Button } from '@material-ui/core';
import Detail from '../detail';

class Table extends Component {

stringContains = (filter, row) => {
  return row.title.toLowerCase().includes(filter.value.toLowerCase())
}

filterTags = (filter, row) => {
  for(var i = 0; i < row.tags.length; i++){
    if(row.tags[i].toLowerCase().includes(filter.value.toLowerCase())){
      return true;
    }
  }
  return false;
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
    Header: 'First Three Tags',
    accessor: 'tags',
    minWidth: 200,
    Cell: props => <div style={{display: 'flex'}}>{props.value.slice(0, 3).map((entry, index) => 
      <Button key={`tags-${index}`} style={{marginLeft: '5px', marginRight: '5px'}} variant="outlined" size='small'>{`${entry}`}</Button>
    )}</div>,
    filterMethod: this.filterTags,
   }, 
  {
   Header: 'Applied',
   accessor: 'applied',
   maxWidth: 125,
   Cell: props => <span>{props.value ? 'True' : 'False'}</span>,
   filterMethod: this.filterMethod,
   Filter: this.filter
  }, 
  {
   Header: 'Ext/Int',
   accessor: 'external',
   maxWidth: 125,
   Cell: props => <span>{props.value ? 'External' : 'Internal'}</span>,
   filterMethod: this.filterMethod,
   Filter: this.externalFilter
  }, 
  {
   Header: ' ',
   accessor: 'href',
   maxWidth: 100,
   Cell: props => <Detail props={props} getData={getData}/>
  }, 
]

    return (
      <div>
        <Paper style={{marginTop: '20px'}} square>
            <ReactTable
              data={data}
              columns={columns}
              showPageSizeOptions={false}
              defaultPageSize={8}
              sortable
              filterable
            />
        </Paper>
      </div>
    );
  }
}

export default Table;