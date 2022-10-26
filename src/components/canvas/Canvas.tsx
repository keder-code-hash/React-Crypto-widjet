import React, { useEffect, useRef } from 'react'
import { plotGraph,_drawLine } from '../plot-graph/chart-plot';
import "./Canvas.css";

type coinData={
  data:number[];
  coinName:string;
  unitDiff:number;
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
          context.fillStyle = "white";
          context.textAlign = "center";
          context.fillText(props.coinName,100,50);

          context.fillText(String(props.unitDiff.toFixed(3)),400,50);

          plotGraph(canvas,context,props.data);
      }
    },[props]);
    
  return( 
    <canvas id="canvas" height="400" width="600" ref={canvasRef}/>
  )
}