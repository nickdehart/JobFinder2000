import React from 'react';
import ReactDOM from 'react-dom';
import Pie from './Pie';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pie data={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
