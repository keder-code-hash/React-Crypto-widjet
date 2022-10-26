import React, { useEffect, useRef } from 'react'
import { plotGraph,_drawLine } from '../plot-graph/chart-plot';
import "./Canvas.css";

type coinData={
  data:number[];
}

export const Canvas = (props:coinData) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(()=>
  {
    const canvas = canvasRef.current;
    if(canvas!=null){
          console.log(props.data);
          const context = canvas.getContext('2d') as CanvasRenderingContext2D;
          context.clearRect(0, 0, canvas.width, canvas.height);
          plotGraph(canvas,context,props.data);
      }
    },[props]);
    
  return( 
    <canvas id="canvas" height="400" width="600" ref={canvasRef}/>
  )
}