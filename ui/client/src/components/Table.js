import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import { Paper, Button } from '@material-ui/core';

class Table extends Component {
  
render() {
   const { data } = this.props

//   const data = [{
//     name: 'Tanner Linsley',
//     age: 26,
//     friend: {
//       name: 'Jason Maurer',
//       age: 23,
//     }
//   }]
 
  const columns = [
//   {
//     Header: 'Title',
//     accessor: 'age',
//     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
//   }, 
  {
   Header: 'Title',
   accessor: 'title',
   minWidth: 250,
   Cell: props => <span>{props.value}</span> // Custom cell components!
  },
//   {
//    Header: 'HREF',
//    accessor: 'href',
//    Cell: props => <span>{props.value}</span> // Custom cell components!
//   }, 
  {
   Header: 'Applied',
   accessor: 'applied',
   Cell: props => <span>{props.value ? 'True' : 'False'}</span> // Custom cell components!
  }, 
  {
   Header: 'External',
   accessor: 'external',
   Cell: props => <span>{props.value ? 'True' : 'False'}</span> // Custom cell components!
  }, 
  {
   Header: ' ',
   accessor: 'href',
   Cell: props => <a href={props.value} rel="noopener noreferrer" target='_blank' style={{textDecoration: 'none'}}>
                     <Button variant="contained" color="primary" size='small'>Apply!</Button>
                  </a> // Custom cell components!
  }, 
//   {
//     id: 'friendName', // Required because our accessor is not a string
//     Header: 'Type',
//     accessor: d => d.friend.name // Custom value accessors!
//   }, 
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