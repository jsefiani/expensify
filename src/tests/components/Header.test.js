import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('Should render Header component correctly', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot()
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
});