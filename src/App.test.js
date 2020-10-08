import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});
let wrapper;

beforeEach(() => {
    wrapper = mount(<App/>);
});

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('App', () => {
    test('snapshot renders', () => {
        const component = renderer.create(<App/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

});

describe('state interactions', () => {
    test('should change the tax detail states when onChange function of the monthly salary input is invoked', () => {
        const input = wrapper.find("input").at(0);
        input.simulate('change',
            {target: {value: '500000'}}
        );
        expect(wrapper.state('monthlyIncome')).toEqual('500.000.000 IDR');
        expect(wrapper.state('annualIncome')).toEqual('6.000.000.000 IDR');
        expect(wrapper.state('annualIncomeAfterTax')).toEqual('4.271.200.000 IDR');
        expect(wrapper.state('annualTax')).toEqual('1.728.800.000 IDR');
        expect(wrapper.state('salaryAfterTax')).toEqual('355.933.333 IDR');
        expect(wrapper.state('annualIncomeAfterTaxRelief')).toEqual('5.946.000.000 IDR');
        expect(wrapper.state('profile')).toEqual('TK0');

        input.simulate('change',
            {target: {value: '6500'}}
        );
        expect(wrapper.state('monthlyIncome')).toEqual('6.500.000 IDR');
        expect(wrapper.state('annualIncome')).toEqual('78.000.000 IDR');
        expect(wrapper.state('annualIncomeAfterTax')).toEqual('76.800.000 IDR');
        expect(wrapper.state('annualTax')).toEqual('1.200.000 IDR');
        expect(wrapper.state('salaryAfterTax')).toEqual('6.400.000 IDR');
        expect(wrapper.state('annualIncomeAfterTaxRelief')).toEqual('24.000.000 IDR');
        expect(wrapper.state('profile')).toEqual('TK0');
    });

  test('should change the taxbracket state when tax bracket button is invoked', () => {
    const input = wrapper.find("button");
    expect(wrapper.state('taxBracketStatus')).toEqual(false);
    input.props().onClick();
    expect(wrapper.state('taxBracketStatus')).toEqual(true);
  });

  test('should change the profile state when radio buttons are clicked', () => {
    const input = wrapper.find("input").at(1);
    input.simulate('change',
        {target: {value: 'K1'}}
    );
    const mockedHandleRecalculateTax = jest.fn();
    wrapper.instance().recalculate =  mockedHandleRecalculateTax;
    expect(wrapper.state('profile')).toEqual('K1');
    input.simulate('change',
        {target: {value: 'K2'}}
    );
    expect(wrapper.state('profile')).toEqual('K2');
    input.simulate('change',
        {target: {value: 'K3'}}
    );
    expect(wrapper.state('profile')).toEqual('K3');
    input.simulate('change',
        {target: {value: 'TK0'}}
    );
    expect(wrapper.state('profile')).toEqual('TK0');
    expect(mockedHandleRecalculateTax).toHaveBeenCalledTimes(3);
  });


});

describe('detail display', () => {
    test('should change the tax detail fields when monthly salary input is changed', () => {
        const input = wrapper.find("input").at(0);

        input.simulate('change',
            {target: {value: '500000'}}
        );
        const monthlyIncome = wrapper.find("#monthly-income");
        const annualIncome = wrapper.find("#annual-income");
        const annualTaxIncome = wrapper.find("#annual-tax-income");
        const annualIncomeDeductions = wrapper.find("#annual-income-deductions");
        const monthlyTax = wrapper.find("#monthly-tax");
        const takeHome = wrapper.find("#take-home");
        const annualTaxableincome = wrapper.find("#annual-taxable-income");

        expect(annualTaxableincome.props().value).toEqual('5.946.000.000 IDR');
        expect(monthlyIncome.props().value).toEqual('500.000.000 IDR');
        expect(annualIncome.props().value).toEqual('6.000.000.000 IDR');
        expect(annualTaxIncome.props().value).toEqual('1.728.800.000 IDR');
        expect(annualIncomeDeductions.props().value).toEqual('4.271.200.000 IDR');
        expect(monthlyTax.props().value).toEqual('144.066.667 IDR');
        expect(takeHome.props().value).toEqual('355.933.333 IDR');
    });

});
