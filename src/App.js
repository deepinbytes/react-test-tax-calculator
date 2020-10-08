import React, {Component} from "react";
import "./App.css";
import Appbar from "./Components/Appbar";
import Footer from "./Components/Footer";
import TaxBracket from "./Components/TaxBracket";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Fab from "@material-ui/core/Fab";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RELIEF_PROFILE_TK0 = 54000, RELIEF_PROFILE_K0 = 58500, RELIEF_PROFILE_K1 = 63000, RELIEF_PROFILE_K2 = 67500,
    RELIEF_PROFILE_K3 = 72000;

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: '',
            monthlyIncome: "",
            monthlyTax: "",
            salaryAfterTax: "",
            annualIncome: "",
            annualTax: "",
            annualIncomeAfterTax: "",
            taxBracketStatus: false,
            limit: false,
            profile: "TK0",
            annualIncomeAfterTaxRelief: "",
        };

        this.processDetails = this.processDetails.bind(this);

    }

    currencyFormat = num => num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " IDR";

    setDetails = (value, limit, monthlyIncome, monthlyTax, salaryAfterTax,
                  annualIncome, annualTax, annualIncomeAfterTax, annualTaxAfterRelief) => {
        this.setState({
            value: value,
            limit: limit,
            monthlyIncome: this.currencyFormat(parseFloat(monthlyIncome).toFixed(3)),
            monthlyTax: this.currencyFormat(parseFloat(monthlyTax).toFixed(3)),
            salaryAfterTax: this.currencyFormat(parseFloat(salaryAfterTax).toFixed(3)),
            annualIncome: this.currencyFormat(parseFloat(annualIncome).toFixed(3)),
            annualTax: this.currencyFormat(parseFloat(annualTax).toFixed(3)),
            annualIncomeAfterTax: this.currencyFormat(parseFloat(annualIncomeAfterTax).toFixed(3)),
            annualIncomeAfterTaxRelief: this.currencyFormat(parseFloat(annualTaxAfterRelief).toFixed(3))
        });
    };


    calculateTaxRelief = annualSalary => {
        /*
        Tax Relief
        TK0 = 54.000.000 IDR
        K0 = 58.500.000 IDR
        K1 = 63.000.000 IDR
        K2 = 67.500.000 IDR
        K3 = 72.000.000 IDR
        */
        let profile = this.state.profile;
        if (profile === "TK0") {
            return annualSalary - RELIEF_PROFILE_TK0
        }
        if (profile === "K0") {
            return annualSalary - RELIEF_PROFILE_K0
        }
        if (profile === "K1") {
            return annualSalary - RELIEF_PROFILE_K1
        }
        if (profile === "K2") {
            return annualSalary - RELIEF_PROFILE_K2
        }
        if (profile === "K3") {
            return annualSalary - RELIEF_PROFILE_K3
        }
    };

    computeTax = income => {
        /*
        Annual Income from 0 to 50.000.000 IDR - tax rate is 5 %.
        Annual Income from 50.000.000 to 250.000.000 IDR - tax rate is 15 %.
        Annual Income from 250.000.000 to 500.000.000 IDR - tax rate is 25 %.
        Annual Income above 500.000.000 IDR - tax rate is 30 %.
        */
        const tierOneRate = 0.05;
        const tierTwoRate = 0.15;
        const tierThreeRate = 0.25;
        const tierFourRate = 0.30;

        const bracketOne = 50000;
        const bracketTwo = 250000;
        const bracketThree = 500000;

        const bracketOneMaxTax = tierOneRate * bracketOne;
        const bracketTwoMaxTax =
            bracketOneMaxTax + tierTwoRate * (bracketTwo - bracketOne);
        const bracketThreeMaxTax =
            bracketTwoMaxTax + tierThreeRate * (bracketThree - bracketTwo);


        if (income <= bracketOne) return income * tierOneRate;
        if (income > bracketOne && income <= bracketTwo)
            return bracketOneMaxTax + tierTwoRate * (income - bracketOne);
        if (income > bracketTwo && income <= bracketThree)
            return bracketTwoMaxTax + tierThreeRate * (income - bracketTwo);
        return bracketThreeMaxTax + tierFourRate * (income - bracketThree);
    };

    recalculate = () => {
        let income = this.state.value;
        let annualIncome = income * 12;
        let annualIncomeAfterTaxRelief = this.calculateTaxRelief(annualIncome);
        let annualTax = this.computeTax(annualIncomeAfterTaxRelief);
        let monthlyTax = annualTax / 12;
        let annualIncomeAfterTaxDeduction = annualIncome - annualTax;
        let takeHomePay = annualIncomeAfterTaxDeduction / 12;

        this.setDetails(
            income,
            false,
            income,
            monthlyTax,
            takeHomePay,
            annualIncome,
            annualTax,
            annualIncomeAfterTaxDeduction,
            annualIncomeAfterTaxRelief
        );
        if (
            income === "" ||
            income === 0 ||
            income === null ||
            income === undefined
        ) {
            this.setState({
                monthlyIncome: "",
                monthlyTax: "",
                salaryAfterTax: "",
                annualIncome: "",
                annualTax: "",
                annualIncomeAfterTax: "",
                limit: false,
                value: '',
                annualIncomeAfterTaxRelief: ''
            });
        }
    };

    processDetails = e => {
        const income = Number(e.target.value);
        let flag = false;

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            flag = true;
        }
        let annualIncome = income * 12;
        let annualIncomeAfterTaxRelief = this.calculateTaxRelief(annualIncome);
        let annualTax = this.computeTax(annualIncomeAfterTaxRelief);
        let monthlyTax = annualTax / 12;
        let annualIncomeAfterTaxDeduction = annualIncome - annualTax;
        let takeHomePay = annualIncomeAfterTaxDeduction / 12;

        if (flag) {
            this.setDetails(
                income,
                false,
                income,
                monthlyTax,
                takeHomePay,
                annualIncome,
                annualTax,
                annualIncomeAfterTaxDeduction,
                annualIncomeAfterTaxRelief
            );
        }
        if (
            income === "" ||
            income === 0 ||
            income === null ||
            income === undefined
        ) {
            this.setState({
                monthlyIncome: "",
                monthlyTax: "",
                salaryAfterTax: "",
                annualIncome: "",
                annualTax: "",
                annualIncomeAfterTax: "",
                limit: false,
                value: '',
            });
        }
    };


    handleProfileChange = (event) => {
        this.setState({
            profile: event.target.value,
        });
        this.recalculate()
    };


    render() {
        const {
            monthlyIncome,
            monthlyTax,
            salaryAfterTax,
            annualIncome,
            annualTax,
            annualIncomeAfterTax,
            annualIncomeAfterTaxRelief,
            profile,
            taxBracketStatus,
            limit
        } = this.state;


        return (
            <div>
                <Appbar/>
                <Container>
                    <br/>
                    <Typography variant="h5">
                        Enter Your Monthly Salary
                    </Typography>

                    <TextField
                        id="monthly-sal"
                        label="Monthly Salary "
                        type="text"
                        margin="normal"
                        variant="outlined"
                        value={this.state.value}
                        fullWidth={true}
                        inputProps={{
                            style: {fontSize: 30},
                            maxLength: "12",
                        }}
                        onChange={this.processDetails}
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Profile</FormLabel>
                        <RadioGroup aria-label="profile" name="profile" value={this.state.profile}
                                    onChange={this.handleProfileChange}>
                            <FormControlLabel value="TK0" control={<Radio/>} label="Single"/>
                            <FormControlLabel value="K0" control={<Radio/>} label="Married with no dependants"/>
                            <FormControlLabel value="K1" control={<Radio/>} label="Married with 1 dependants"/>
                            <FormControlLabel value="K2" control={<Radio/>} label="Married with 2 dependants"/>
                            <FormControlLabel value="K3" control={<Radio/>} label="Married with 3 dependants"/>
                        </RadioGroup>
                    </FormControl>
                    <br/>
                    <br/>

                    {limit && (
                        <div>
                            <Typography variant="h3">
                                Invalid Input.
                            </Typography>
                        </div>
                    )}
                </Container>

                {!limit && (
                    <div className="container">
                        <div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Monthly Income</label>
                                </div>
                                <div className="col-75">
                                    <input id="monthly-income" type="text" value={monthlyIncome} disabled/>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-25">
                                    <label>Annual Income</label>
                                </div>
                                <div className="col-75">
                                    <input id="annual-income" type="text" value={annualIncome} disabled/>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-25">
                                    <label>Tax Relief Profile</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" value={profile} disabled/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-25">
                                    <label>Annual Taxable Income</label>
                                </div>
                                <div className="col-75">
                                    <input id="annual-taxable-income" type="text"
                                           style={{color: "red", fontWeight: "600"}}
                                           value={annualIncomeAfterTaxRelief} disabled/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-25">
                                    <label>Annual Tax Income</label>
                                </div>
                                <div className="col-75">
                                    <input id="annual-tax-income" type="text" style={{color: "red", fontWeight: "600"}}
                                           value={annualTax}
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
                                        value={annualIncomeAfterTax}
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
                                        value={monthlyTax}
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
                                           value={salaryAfterTax} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>

                )}
                <br/>

                {!taxBracketStatus && (
                    <div align="center"><Fab
                        id = "tax-bracket"
                        color="primary"
                        variant="extended"
                        aria-label="Delete"
                        style={{margin: "0", marginTop: "5px", backgroundColor: "black"}}
                        onClick={() => {
                            this.setState({taxBracketStatus: !taxBracketStatus});
                        }}
                    >
                        <VisibilityIcon style={{marginRight: "0"}}/>
                        ­Show Income Tax Bracket
                    </Fab></div>
                )}
                <br/>
                {taxBracketStatus && (
                    <Container>
                        <TaxBracket/>
                        <div align="center"><Fab
                            id = "tax-bracket-close"
                            color="secondary"
                            variant="extended"
                            aria-label="Delete"
                            style={{margin: "0", backgroundColor: "black"}}
                            onClick={() => {
                                this.setState({taxBracketStatus: !taxBracketStatus});
                            }}
                        >
                            <VisibilityOffIcon style={{marginRight: "0"}}/>
                            ­Hide Income Tax Bracket
                        </Fab></div>
                    </Container>
                )}
                <br/>

                <Footer/>
            </div>
        );
    }
}

export default App;