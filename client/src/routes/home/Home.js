import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';

import { get_Documents } from '../../store/reducers/documents';
import { get_Tag_Data } from '../../store/reducers/tag_data';
import { get_Time_Data } from '../../store/reducers/time_data';
import { get_Type_Data } from '../../store/reducers/type_data';

import Chart from '../../components/chart'
import Table from '../../components/table'


export class Home extends Component {

  componentDidMount() {
    const { 
      get_Documents, 
      get_Tag_Data, 
      get_Time_Data, 
      get_Type_Data 
    } = this.props;

    get_Documents({});
    get_Tag_Data({});
    get_Time_Data({});
    get_Type_Data({});
  }

  getData = () => {
    const { 
      get_Documents, 
      get_Type_Data 
    } = this.props;
    get_Documents({});
    get_Type_Data({});
  }
  
render() {
  const { 
    documents, 
    tag_data, 
    time_data,
    type_data
  } = this.props;
// style={{width: '95vw', height: '86vh', marginTop: '20px'}}
// style={{display: 'flex', justifyContent: 'space-between'}}
    return (
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid container item spacing={2} >
          <Chart data={time_data ? time_data : []} type='line' />
          <Chart data={tag_data ? tag_data : []} type='bar' />
          <Chart data={type_data ? type_data : []} type='pie' />
        </Grid>
        <Grid container item>
          <Paper>
            <Table data={documents ? documents : []} getData={this.getData}></Table>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// export default Home;
const mapState = (state, ownProps) => ({
  documents: state.documents,
  tag_data: state.tag_data,
  time_data: state.time_data,
  type_data: state.type_data,
});

const mapDispatch = (dispatch) => ({
  get_Documents: (params) => dispatch(get_Documents(params)),
  get_Tag_Data: (params) => dispatch(get_Tag_Data(params)),
  get_Time_Data: (params) => dispatch(get_Time_Data(params)),
  get_Type_Data: (params) => dispatch(get_Type_Data(params)),
});

export default connect(mapState, mapDispatch)(Home);