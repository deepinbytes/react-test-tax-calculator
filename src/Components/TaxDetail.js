import React, {Component} from "react";


class TaxDetail extends Component {


    render() {
        return (
            <div className="container">
                <div>
                    <div className="row">
                        <div className="col-25">
                            <label>Monthly Income</label>
                        </div>
                        <div className="col-75">
                            <input id="monthly-income" type="text" value={this.props.monthlyIncome} disabled/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-25">
                            <label>Annual Income</label>
                        </div>
                        <div className="col-75">
                            <input id="annual-income" type="text" value={this.props.annualIncome} disabled/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-25">
                            <label>Tax Relief Profile</label>
                        </div>
                        <div className="col-75">
                            <input type="text" value={this.props.profile} disabled/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Annual Taxable Income</label>
                        </div>
                        <div className="col-75">
                            <input id="annual-taxable-income" type="text"
                                   style={{color: "red", fontWeight: "600"}}
                                   value={this.props.annualIncomeAfterTaxRelief} disabled/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-25">
                            <label>Annual Tax Income</label>
                        </div>
                        <div className="col-75">
                            <input id="annual-tax-income" type="text" style={{color: "red", fontWeight: "600"}}
                                   value={this.props.annualTax}
                                   disabled/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Annual Income After Deductions</label>
                        </div>
                        <div className="col-75">
                            <input
                                id="annual-income-deductions"
                                type="text"
                                value={this.props.annualIncomeAfterTax}
                                style={{color: "green", fontWeight: "600"}}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Monthly Tax</label>
                        </div>
                        <div className="col-75">
                            <input
                                id="monthly-tax"
                                type="text"
                                value={this.props.monthlyTax}
                                style={{color: "red", fontWeight: "600"}}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Take Home Pay(Monthly)</label>
                        </div>
                        <div className="col-75">
                            <input id="take-home" type="text" style={{color: "green", fontWeight: "600"}}
                                   value={this.props.salaryAfterTax} disabled/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaxDetail;