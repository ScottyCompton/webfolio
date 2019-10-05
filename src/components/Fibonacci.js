import React, {useState, useEffect} from 'react';
import fibCalc from './misc/fibCalc';

const Fibonacci = (props) => {

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
            setFibDisplay(fibResult.toLocaleString());
        }
    }




    return (
        
        <div className="container">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                <p>&nbsp;</p>
                <h1>Fibonacci Sequence Calculator</h1>
                    <div className="card text-white bg-secondary mb-3" style={{maxWidth:"42rem", margin:"0 auto", padding: "2rem"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group"><label htmlFor="fibCount">Iterations (n)</label><br /><input type="text" id="fibCount" value={fibCount} onChange={doFibCountChange} /></div>
                                    <div className="form-group"><label htmlFor="outputTolerance">Tolerance</label><br /><input type="text" id="outputTolerance" value={outputTolerance} onChange={doOutputToleranceChange} /></div>
                                    <div className="form-group"><label htmlFor="expectedResult">Expected Result</label><br /><input type="text" id="expectedResult" value={expectedResult} onChange={doExpectedResultChange} /></div>                                            
                                </div>
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <div><h5>Calculated Result:</h5> <h4>{fibDisplay}</h4></div>                                
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div style={{maxWidth:"42rem", margin:"0 auto", padding: "2rem", backgroundColor:"#fff", color: "#202020", marginBottom: "100px"}}>
                        <pre>{fibCalc.toString()}</pre>
                        </div>
                    

                    </div>
                </div>
            
            </div>
      </div>
    )
}

export default Fibonacci;