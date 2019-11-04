import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';

import { get_Documents } from '../../store/reducers/documents';
import { get_Tag_Data } from '../../store/reducers/tag_data';
import { get_Time_Data } from '../../store/reducers/time_data';
import { get_Type_Data } from '../../store/reducers/type_data';

import Line from '../../components/Line'
import Pie from '../../components/Pie'
import Bar from '../../components/Bar'
import Table from '../../components/Table'


class Home extends Component {

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

    return (
      <div>
        <div style={{width: '95vw', height: '86vh', marginTop: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Line data={time_data}></Line>
            <Bar data={tag_data}></Bar>
            <Pie data={type_data}></Pie>
          </div>
          <Paper>
            <Table data={documents} getData={this.getData}></Table>
          </Paper>
        </div>
      </div>
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