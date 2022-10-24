import React, { useEffect, useRef } from 'react'
import { plotGraph,_drawLine } from '../plot-graph/chart-plot';
import "./Canvas.css";

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


export const Canvas : React.FC<{}> = () => {
  
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(()=>
    {
      const canvas = canvasRef.current;
      if(canvas!=null){
          // let data:number[]=[1,2,3,4,5,6,7,8];
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;
          fetchData("bitcoin",7,"hourly").then((data)=>plotGraph(canvas,context,data));
      }
    },[]);
    
  return( 
    <canvas id="canvas" height="400" width="600" ref={canvasRef}/>
  )
}