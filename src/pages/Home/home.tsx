import React, { Component, useEffect } from 'react'
import './home.css';
import {Canvas} from "../../components/canvas/Canvas";
import {Error} from "../../components/Error/Error";
import { fetchData } from '../../components/utils';


export function Home(){
    const [data,setData]=React.useState<number[]>([]);
    const [period,setPeriod]=React.useState<number>(1);
    const [coin,setCoin]=React.useState<string>("bitcoin");
    const [unitDiff,setUnitDiff]=React.useState<number>(0);
    const [percentageGain,setPercentageGain]=React.useState<string>('');
    const [coinPrice,setCoinPrice]=React.useState<string>('');
    const [error,setError]=React.useState<string>('');

    const handleClickPeriod=(e:any)=>{
        let innerText:string=e.target.innerText;
        if(innerText==='1D'){
            setPeriod(1);
        }
        else if(innerText==='7D'){
            setPeriod(7);
        }
        else if(innerText==='30D'){
            setPeriod(30);
        }
    } 
    const handleClickCoins=(e:any)=>{
        let innerText:string=e.target.innerText;
        if(innerText==='ETH'){
            setCoin("ethereum");
        }
        else if(innerText==='BTC'){
            setCoin("bitcoin");
        }
    }

    useEffect(()=>{ 
        fetchData(coin,1,"minutely").then((data)=>{ 
            let price:number=data[data.length-1]; 
            setCoinPrice(String(Math.floor(price))); 
        }).catch((error)=>{
            setError("Please Check Internet Connnection.")
        }).then(()=>{
            fetchData(coin,period,"minutely").then((data)=>{
                setData(data);
                let diff:number=data[data.length-1]-data[0];
                setUnitDiff(diff);
                let percentDiff:number=(diff/data[data.length-1])*100;
                if(percentDiff>=0){
                    setPercentageGain("+"+percentDiff.toFixed(2));
                }
                else{
                    setPercentageGain("-"+percentDiff.toFixed(2));
                }
            }).catch((error)=>{
                setError("Please Check Internet Connnection.")
            });
        })
         
    },[period,coin]);

    return(
        <React.Fragment>
            {
                error!=='' ? 
                <Error error={error}/>  :
                <div className="container">
                
                    <div className="row">
                        <div className="col col-sm-12 col-md-12 col-lg-12">
                            <Canvas data={data} coinName={coin} unitDiff={unitDiff} percentGain={percentageGain} coinPrice={coinPrice}/>
                        </div>
                    </div>
                    
                    <div className="row"> 
                        <div className="btn-group">
                            <button id='period-btn-1D' className='period-btn' onClick={handleClickPeriod}>1D</button>
                            <button id='period-btn-7D' className='period-btn' onClick={handleClickPeriod}>7D</button>
                            <button id='period-btn-30D' className='period-btn' onClick={handleClickPeriod}>30D</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="btn-group">
                            <button id='period-btn-btc' className='period-btn' onClick={handleClickCoins}>BTC</button>
                            <button id='period-btn-eth' className='period-btn' onClick={handleClickCoins}>ETH</button> 
                        </div>
                    </div>
                </div>
            }
            
        </React.Fragment>
    )
}