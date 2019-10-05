
    const fibCalc = (n, expected, tolerance) => {
        const rho = 1.618034; // golden ratio
        const sqrtFive = 2.236068; // square root of 5

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
    }


export default fibCalc;    