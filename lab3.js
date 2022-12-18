const U = (x) => Math.sqrt(x);
const Uo = (x) => 1/Math.sqrt(x);

const solution = (L) => {
    const spodivanuiVugrash = (L[0] + L[2])/2;
    const MUx = L[1]*U(L[0]) + (1-L[1]) * U(L[2]);
    const UMx = U(MUx);
    const MUxNeg = Uo(MUx);
    const result ={
        "премія": +(spodivanuiVugrash - MUxNeg).toFixed(3),
        "M(Ux)": MUx,
        "U(Mx)": UMx
    }

    if(result["U(Mx)"] > result["M(Ux)"] ){
        console.log("особа не схильна до ризику")
    }
    if(result["U(Mx)"] < result["M(Ux)"] ){
        console.log("особа  схильна до ризику")
    }
    if(result["U(Mx)"] === result["M(Ux)"] ){
        console.log("особі  байдуже")
    }
}

const L = [1000, 0.5, 3000];
solution(L);