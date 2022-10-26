import React, { useEffect, useRef } from 'react'
import { plotGraph,_drawLine } from '../plot-graph/chart-plot';
import "./Canvas.css";

type coinData={
  data:number[];
  coinName:string;
  unitDiff:number;
  percentGain:string;
  coinPrice:string;
}

export const Canvas = (props:coinData) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(()=>
  {
    const canvas = canvasRef.current;
    if(canvas!=null){

          const context = canvas.getContext('2d') as CanvasRenderingContext2D;
          context.clearRect(0, 0, canvas.width, canvas.height);
          
          // coin name in canvas
          context.font = "30px Bahnschrift";
          context.fillStyle = "#f2faf4";
          context.textAlign = "center";
          let coinName:string=props.coinName;
          context.fillText(coinName.charAt(0).toUpperCase()+coinName.slice(1),100,50);

          // coin price difference in canvas
          context.font = "20px Bahnschrift";
          context.fillStyle = "#81c995";
          context.textAlign = "center";
          context.fillText("$"+String(props.unitDiff.toFixed(3)),500,50);
          context.fillText(String(props.percentGain)+"%",500,75);
          
          // coin price in canvas
          context.font = "40px Bahnschrift";
          context.fillStyle = "#f2faf4";
          context.textAlign = "center";
          context.fillText(props.coinPrice,100,85);

          plotGraph(canvas,context,props.data);
      }
    },[props]);
    
  return( 
    <canvas id="canvas" height="500" width="700" ref={canvasRef}/>
  )
}


