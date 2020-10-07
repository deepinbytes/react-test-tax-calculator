import React, { Component } from "react";
import Typography from '@material-ui/core/Typography';



class TaxBracket extends Component {

    render() {
        return (
            <div>
                <Typography variant="h4">
                    Income Tax Brackets
                </Typography>
                <Typography variant="subtitle1">Indonesian Tax Rates</Typography>
                <ol>
                    <li><Typography variant="body1">Annual Income from 0 to 50.000.000 IDR - tax rate is 5 %.</Typography></li>
                    <li><Typography variant="body1">Annual Income from 50.000.000 to 250.000.000 IDR - tax rate is 15 %.</Typography></li>
                    <li><Typography variant="body1">Annual Income from 250.000.000 to 500.000.000 IDR - tax rate is 25 %.</Typography></li>
                    <li><Typography variant="body1">Annual Income above 500.000.000 IDR - tax rate is 30 %.</Typography></li>
                </ol>
            </div>
        )
    }
}

export default TaxBracket;