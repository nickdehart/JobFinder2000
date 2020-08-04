import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Label, ResponsiveContainer
} from 'recharts';

export default function BarGraph({data}) {
// style={{width: '30%', height: '25vh', padding: '20px'}}
  return (
    <ResponsiveContainer>
      <BarChart
      data={data.slice(0, 10)}
      margin={{
          top: 5, right: 30, left: 20, bottom: 5,
      }}
      >
          <XAxis dataKey="_id">
            <Label value="Top Ten Tags" offset={190} position="top"/>
          </XAxis>
          <YAxis hide={true}/>
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" isAnimationActive={false}/>
      </BarChart>
    </ResponsiveContainer>
  );
}
