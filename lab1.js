const solution = (prob, dict) =>{
    let result = new Map();
    let res = 0;
    var index = 0;
    let arrProb = [];
    arrProb.push(prob) 
    arrProb.push(1 - prob)  
      
    dict.forEach((values, keys)  =>  {
    values = new Map(Object.entries(values))
        values.forEach((value) => {
            res += value * arrProb[index];
            index++;
        });
        
        result.set(keys,res)
        res = 0;
        index = 0;
    });

    const mapSort = new Map([...result.entries()].sort((a, b) => b[1] - a[1]));
    console.log("Оскільки " , "W(",[...mapSort][0][0],")" , " > ", "W(",[...mapSort][1][0],")", " за умови імовірності дощу ",prob,  ", вибираємо подію  " + [...mapSort][0][0])
};

let obj = {
    "вдома": {
        "дощ":8,
        "сонце":3
    },
    "ліс": {
        "дощ":1,
        "сонце":10
    }
};

let condition = new Map(Object.entries(obj));
solution(0.75, condition);