import React from 'react';
import ReactDOM from 'react-dom';
import DetailModal from '../components/DetailModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DetailModal props={{value: 'http://google.com'}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
