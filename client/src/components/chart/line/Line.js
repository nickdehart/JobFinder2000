import React from 'react';
import {
  LineChart, Line, Tooltip, XAxis, Label, ResponsiveContainer
} from 'recharts';

export default function LineGraph({data}) {
  //  style={{width: '30%', height: '25vh', padding: '20px'}}
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <Line isAnimationActive={false} type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
        <XAxis dataKey="date2"  >
          <Label value="Listings Over Time" offset={190} position="top" />
        </XAxis>          
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
