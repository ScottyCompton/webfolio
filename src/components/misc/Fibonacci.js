import React, {useState, useEffect} from 'react';
import fibCalc from './fibCalc';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import './fibcalc.scss';

const Fibonacci = (props) => {
    const {resumeUrl} = props.siteSettings;
    const [outputTolerance, setOutputTolerance] = useState('');
    const [fibCount, setFibCount] = useState('');
    const [fibDisplay, setFibDisplay] = useState('');
    const [expectedResult, setExpectedResult] = useState('')


    useEffect(() => {
        doFibResultDisplay();
    },[expectedResult, fibCount,outputTolerance]);


    const doExpectedResultChange = (e) => {
        setExpectedResult(e.target.value);
    }

    const doFibCountChange = (e) => {
        setFibCount(e.target.value);
    }

    const doOutputToleranceChange = (e) => {
        setOutputTolerance(e.target.value);
    }


    const doFibResultDisplay = ()  => {
        const fibResult = fibCalc(parseInt(fibCount), parseInt(expectedResult), parseInt(outputTolerance));
        if(isNaN(fibResult)) {
            setFibDisplay(<h6>Enter values to the left to begin</h6>)
        } else {
            setFibDisplay(<h4>{fibResult.toLocaleString()}</h4>);
        }
    }



    return (
        
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                <p>&nbsp;</p>
                <h1>Fibonacci Sequence Calculator</h1>
                <h6>I'm sure this is quite fascinating, but wouldn't you rather</h6>
                <div className="fibBtns">
                    <div className="btnOr"><Link to="/" className="btnLeft btn btn-outline-warning">View My Portfolio</Link></div>
                    <div className="lblOr">Or</div>
                    <div className="btnOr"><a href={resumeUrl} target="_blank" className="btnRight btn btn-outline-warning">Download My Resume</a></div>
                </div>
                    <div className="card text-white bg-secondary mb-3 fib-card">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group"><label htmlFor="fibCount">Input (n)</label><br /><input type="text" className="text-center" id="fibCount" value={fibCount} onChange={doFibCountChange} /></div>
                                    <div className="form-group"><label htmlFor="outputTolerance">Tolerance</label><br /><input type="text" className="text-center" id="outputTolerance" value={outputTolerance} onChange={doOutputToleranceChange} /></div>
                                    <div className="form-group"><label htmlFor="expectedResult">Expected Result</label><br /><input type="text" className="text-center" id="expectedResult" value={expectedResult} onChange={doExpectedResultChange} /></div>                                            
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div><h5>Calculated Result:</h5> {fibDisplay}</div>                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="code-block">
                            <pre className="line-numbers"><code className="language-jsx">
                            {`const fibCalc = (n, expected, tolerance) => {
    const rho = 1.618034; // golden ratio
    const sqrtFive = 2.236068; // square root of 5

    // golden ratio doesn't apply to n < 2
    if(n < 2) return n;

    // calculate the result based off the Fibonacci Golden Ratio
    const fibResult = Math.round((Math.pow(rho,n) - Math.pow((1-rho), n))/sqrtFive);
                        
    // don't bother with tolerance or expected value if they don't exist
    if(isNaN(tolerance) || isNaN(expected)) {
        return fibResult;
    }
                        
    const delta = tolerance - Math.abs(expected-fibResult);
                        
    if(delta >= 0) {
        return fibResult;
    } else {
        return fibResult < expected ? fibResult - delta : fibResult + delta;            
    }        
}`}                            
                            
                            </code></pre>
                            </div>

                    </div>
                </div>
            
            </div>
      </div>
    )
}


const mapStateToProps = (state, props) => {
    return {
        siteSettings: state.siteSettings
    }
}

export default connect(mapStateToProps)(Fibonacci);