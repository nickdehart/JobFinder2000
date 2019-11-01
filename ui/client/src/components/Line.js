import React, { PureComponent } from 'react';
import {
  LineChart, Line, ResponsiveContainer, Tooltip, XAxis
} from 'recharts';
import Paper from '@material-ui/core/Paper';

export default class LineGraph extends PureComponent {
  
  render() {
  const { data } = this.props;

    return (
      <Paper style={{width: '30%', height: '25vh', padding: '20px'}} square>
        <ResponsiveContainer>
          <LineChart data={data}>
            <Line isAnimationActive={false} type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            <XAxis dataKey="date" hide={true}/>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    );
  }
}
