import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './Detail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Detail props={{value: 'http://google.com'}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
