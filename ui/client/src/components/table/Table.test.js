import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Table data={[]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
