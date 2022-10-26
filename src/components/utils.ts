export async function fetchData(coin_name:string,day:number,period:string){
    const URL="https://api.coingecko.com/api/v3/coins/"+coin_name+"/market_chart?vs_currency=USD&days="+day+"&interval="+period;
    let response=await fetch(URL);
    const data=await response.json();
    const status=await response.status;
    let priceArray=data.prices;
    let prices=[]
    for(let i=0;i<priceArray.length;i++){
        prices.push(priceArray[i][1]);
    }
    return prices;    
} 