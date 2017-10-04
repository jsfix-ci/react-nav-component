import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { shallow,mount,configure} from 'enzyme';
import sinon from 'sinon';
import Share from '../src/share/share';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe("<Share/>", ()=>{
    it("renders without crashing", ()=>{
        const div = document.createElement('div');
        ReactDOM.render(<Share />, div);
    })
    it("render props correctly", ()=>{
        const wrapper = mount(<Share title='test' />);
        expect(wrapper.props().title).toBe('test');
        expect(wrapper.props().description).toBe('A web developer based in Glasgow Scotland');

    });

});