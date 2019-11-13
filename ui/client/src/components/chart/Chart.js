import React, { Fragment } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';

import logo from '../../assets/logo.svg';
import './Chart.css'

import Bar from './bar';
import Line from './line';
import Pie from './pie';

export default function Chart({data, type}) {

  return (
    <Grid item sm={12} md={4}>
      <Paper style={{height: '25vh', padding: '10px'}} square>
        {data.length > 0 ?
         <Fragment>
          {type === 'bar' && <Bar data={data}/>}
          {type === 'line' && <Line data={data ? data : []}/>}
          {type === 'pie' && <Pie data={data}/>}
         </Fragment>
        :
        <div className="Chart-preloader-container">
          <img src={logo} className="Chart-preloader" alt="preloader" />
          <Typography variant='h6'>Loading...</Typography>
        </div>
        }
      </Paper>
    </Grid>
  );
}
