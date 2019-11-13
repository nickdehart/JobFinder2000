import React, { PureComponent } from 'react';
import {
  PieChart, Pie, ResponsiveContainer, Tooltip, Cell, Legend
} from 'recharts';
import { Paper, Typography } from '@material-ui/core';

import logo from '../logo.svg';
import './Component.css'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieGraph extends PureComponent {

  render() {
    const { data } = this.props;

    return (
      <Paper style={{width: '30%', height: '25vh', padding: '20px'}} square>
        {data.length > 0 ?
        <ResponsiveContainer>
          <PieChart>
            <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="count"
            isAnimationActive={false}
            >
              {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align="right" />
          </PieChart>
        </ResponsiveContainer>
        :
        <div className="Component-preloader-container">
          <img src={logo} className="Component-preloader" alt="preloader" />
          <Typography variant='h6'>Loading...</Typography>
        </div>
        }
      </Paper>
    );
  }
}
