const matSpodivanniRandomValue = (obj) =>{
    let M = new Map();
    obj.forEach((values, keys, index ) => {
        var sum = 0;
        values = new Map(Object.entries(values));
        values.forEach(result =>{
            result = new Map(Object.entries(result));
            sum += result.get("possibility") * result.get("damage")
        })
       M.set(keys,sum)
        sum = 0;
    });
    return M;
}

const duspersion = (obj, M) =>{
    let V = new Map();
    let keyArrM = [];
    var index = 0;
    M.forEach((value, key)=>{
        keyArrM.push(key);
    })
    console.log(keyArrM)
    console.log("work")
    obj.forEach((values, keys) => {
        var sum = 0;
        values = new Map(Object.entries(values));
        values.forEach(result =>{
            result = new Map(Object.entries(result)); 
            sum += result.get("possibility") * Math.pow((result.get("damage") - M.get(keyArrM[index])),2) 
        })
        V.set(keys,sum)
        sum = 0;
        index++
    });
    return V
}

const serSquareEqual = (V) =>{
  let Del = new Map();
  V.forEach((value, key) =>{
      let res;
      res = Math.sqrt(value);
      Del.set(key, +res.toFixed(3))
  })
  return Del
}

const coefVar = (Del,M) =>{
    let CV = new Map();
    M.forEach((value, key) =>{
        let res;
        res = Del.get(key) / value;
        CV.set(key, +res.toFixed(3))
    })
    return CV;
}

const semikvadrVidhulennia = (M,obj) =>{
    let SSV = new Map();
    let keyArrM = [];
    var index = 0;
    M.forEach((value, key)=>{
        keyArrM.push(key);
    })
    
    obj.forEach((values, keys) => {
        var sum = 0;
        var res = 0;
        values = new Map(Object.entries(values));
        values.forEach(result =>{
            result = new Map(Object.entries(result)); 
            
            if(result.get("damage") <= 0){
                sum += result.get("possibility") * Math.pow((result.get("damage") - M.get(keyArrM[index])),2) 
                res = Math.sqrt(sum)
            }
           
        })
        SSV.set(keys,+res.toFixed(3))
        sum = 0;
        res = 0;
        index++
    });
    return SSV
}

const coefSemiVariation = (SSV,M)=>{
    let CSV = new Map();
    SSV.forEach((value, key) =>{
        let res;
        res =  value / M.get(key);
        CSV.set(key, +res.toFixed(3))
    })
    return CSV;
}

const checkedNebazhanaEvent = (obj) =>{
    let P = new Map();
    obj.forEach((values, key) =>{
        let res = 0;
        values = new Map(Object.entries(values));
        values.forEach(result =>{
            result = new Map(Object.entries(result)); 
            if(result.get("damage") <= 0){
                res += result.get("possibility");
            }
        })
        
        P.set(key, +res.toFixed(3))
    })
    return P;
}

const checkedValueSpodivanuh = (obj) =>{
    let Z = new Map();
    obj.forEach((values, key) =>{
        let res = 0;
        values = new Map(Object.entries(values));
        values.forEach(result =>{
            result = new Map(Object.entries(result)); 
            if(result.get("damage") < 0){
                res += result.get("possibility") * result.get("damage");
            }
        })
        
        Z.set(key, +res.toFixed(3))
    })
    return Z;
}

const calc = (obj) =>{
    let M = matSpodivanniRandomValue(obj);
    let MSort = new Map([...matSpodivanniRandomValue(obj).entries()].sort((a, b) => a[1] - b[1]));

    let V = duspersion(obj,M);
    let VSort =  new Map([...duspersion(obj,M).entries()].sort((a, b) => a[1] - b[1]));

    let Del = serSquareEqual(V);
    let DelSort =  new Map([...serSquareEqual(V).entries()].sort((a, b) => a[1] - b[1]));

    let CV = coefVar(Del,M)
    let CVSort =  new Map([...coefVar(Del,M).entries()].sort((a, b) => a[1] - b[1]));

    let SSV = semikvadrVidhulennia(M,obj)
    let SSVSort =  new Map([...semikvadrVidhulennia(M,obj).entries()].sort((a, b) => a[1] - b[1]));
   
    let CSV = coefSemiVariation(SSV,M);
    let CSVSort =  new Map([...coefSemiVariation(SSV,M).entries()].sort((a, b) => a[1] - b[1]));

    let P = checkedNebazhanaEvent(obj);
    let PSort = new Map([...checkedNebazhanaEvent(SSV,M).entries()].sort((a, b) => a[1] - b[1]));

    let Z = checkedValueSpodivanuh(obj);
    let ZSort = new Map([...checkedValueSpodivanuh(SSV,M).entries()].sort((a, b) => a[1] - b[1]));

    console.log("метематичні сподівання",M)
    console.log("дисперсії",V)
    console.log("середньоквадратичне відхилення",Del)
    console.log("коeфіцієнти варіації",CV)
    console.log("семіквадратичне відхилення",SSV)
    console.log("коефіцієнт семіваріації",CSV)
    console.log("небажані події",PSort)
    console.log("сподівані збитки", ZSort)
    let lastIndex = [...MSort].length-1;
    console.log(
        "За математичним сподівання найменш ризикованим є:", [...MSort][0]," найбільш ризикований:", [...MSort][lastIndex],  "\n" ,
        "За дисперсією найменш ризикованим є:", [...VSort][0], " найбільш ризикований:", [...VSort][lastIndex], "\n" ,
        "За середньоквадратичним відхиленням найменш ризикованим є:", [...DelSort][0], " найбільш ризикований:", [...DelSort][lastIndex],"\n" , 
        "За коефіцієнтами варіації найменш ризикованим є:", [...CVSort][0], " найбільш ризикований:", [...CVSort][lastIndex],"\n" , 
        "За семіквадратичним відхиленням найменш ризикованим є:", [...SSVSort][0], " найбільш ризикований:", [...SSVSort][lastIndex],"\n" , 
        "За коефіцієнтами семіварацій найменш ризикованим є:", [...CSVSort][0], " найбільш ризикований:", [...CSVSort][lastIndex],"\n" , 
        "За небажаними подіями найменш ризикованим є:", [...PSort][0], " найбільш ризикований:", [...PSort][lastIndex],"\n" , 
        "За сподіваними збитками найменш ризикованим є:", [...ZSort][0], " найбільш ризикований:", [...ZSort][lastIndex],"\n" , 
    );
};

let obj = {
    "data": {
        "first": {
            "possibility": 0.2,
            "damage": 300
        },
        "second": {
            "possibility": 0.3,
            "damage": 100   
        },
        "third": {
            "possibility": 0.1,
            "damage": 200
        },
        "fourth":{
            "possibility": 0.4,
            "damage": 400
        }
    }
};

let umova = new Map(Object.entries(obj));

calc(umova);
