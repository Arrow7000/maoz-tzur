import React from 'react';
import ReactDOM from 'react-dom';
import MaozTzur from './MaozTzur';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MaozTzur />, div);
});
