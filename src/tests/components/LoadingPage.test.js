import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

test('Should render page loader', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(wrapper).toMatchSnapshot();

});