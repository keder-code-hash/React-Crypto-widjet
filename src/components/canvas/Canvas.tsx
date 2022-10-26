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
          
          context.font = "30px Bahnschrift";
          context.fillStyle = "#81c995";
          context.textAlign = "center";
          let coinName:string=props.coinName;
          context.fillText(coinName.charAt(0).toUpperCase()+coinName.slice(1),100,50);

          context.font = "20px Bahnschrift";
          context.fillStyle = "#81c995";
          context.textAlign = "center";
          context.fillText("$"+String(props.unitDiff.toFixed(3)),500,50);
          context.fillText(String(props.percentGain)+"%",500,75);

          context.font = "40px Bahnschrift";
          context.fillStyle = "#81c995";
          context.textAlign = "center";
          context.fillText(props.coinPrice,100,90);

          plotGraph(canvas,context,props.data);
      }
    },[props]);
    
  return( 
    <canvas id="canvas" height="400" width="600" ref={canvasRef}/>
  )
}