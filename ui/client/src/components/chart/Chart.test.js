import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './Chart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <div>
      <Chart data={[]} type='bar' />
      <Chart data={[]} type='line' />
      <Chart data={[]} type='pie' />
    </div>
    , div);
  ReactDOM.unmountComponentAtNode(div);
});
