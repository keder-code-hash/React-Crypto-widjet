import React, { Component, useEffect } from 'react'
import './home.css';
import {Canvas} from "../../components/canvas/Canvas";


async function fetchData(coin_name:string,day:number,period:string){
    const URL="https://api.coingecko.com/api/v3/coins/"+coin_name+"/market_chart?vs_currency=USD&days="+day+"&interval="+period;
    let response=await fetch(URL);
    const data=await response.json();
    let priceArray=data.prices;
    let prices=[]
    for(let i=0;i<priceArray.length;i++){
        prices.push(priceArray[i][1]);
    }
    return prices;
  }
  


export function Home(){
    const [data,setData]=React.useState<number[]>([]);
    const [period,setPeriod]=React.useState<number>(1);
    const [coin,setCoin]=React.useState<string>("bitcoin");

    const handleClickPeriod=(e:any)=>{
        let innerText:string=e.target.innerText;
        if(innerText==='1D'){
            setPeriod(1);
        }
        else if(innerText=='7D'){
            setPeriod(7);
        }
        else if(innerText=='30D'){
            setPeriod(30);
        }
        fetchData(coin,period,"hourly").then((data)=>setData(data));
    } 
    const handleClickCoins=(e:any)=>{
        let innerText:string=e.target.innerText;
        if(innerText==='ETH'){
            setCoin("ethereum");
        }
        else if(innerText=='BTC'){
            setCoin("bitcoin");
        }
        fetchData(coin,period,"hourly").then((data)=>setData(data));
    }

    useEffect(()=>{
        fetchData(coin,period,"hourly").then((data)=>setData(data));
    },[]);

    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12">
                        <Canvas data={data}/>
                    </div>
                </div>
                <div className="row"> 
                    <div className="btn-group">
                        <button id='period-btn-1D' className='period-btn' onClick={handleClickPeriod}>1D</button>
                        <button id='period-btn-7D' className='period-btn' onClick={handleClickPeriod}>7D</button>
                        <button id='period-btn-30D' className='period-btn' onClick={handleClickPeriod}>30D</button>
                    </div>
                    <div className="btn-group">
                        <button id='period-btn-btc' className='period-btn' onClick={handleClickCoins}>BTC</button>
                        <button id='period-btn-eth' className='period-btn' onClick={handleClickCoins}>ETH</button> 
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}