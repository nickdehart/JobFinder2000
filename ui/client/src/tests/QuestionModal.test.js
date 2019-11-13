import React from 'react';
import ReactDOM from 'react-dom';
import QuestionModal from '../components/QuestionModal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
