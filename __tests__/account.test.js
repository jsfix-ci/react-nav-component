import React from 'react';
import ReactDOM from 'react-dom';
import {
  MemoryRouter as Router,
} from 'react-router-dom'
import TestUtils from 'react-dom/test-utils';
import { shallow,mount } from 'enzyme';
import sinon from 'sinon';
import Account from '../src/account/account';

describe("<Account/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Account/>, div);
    })
});