import React from 'react';
import ReactDOM from 'react-dom';
import Line from './Line';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Line data={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
