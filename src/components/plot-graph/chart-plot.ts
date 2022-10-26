import {serializeDataArray} from "./chart-data-serializers";

/**
 * 
 * @param context : cnavas context;
 * @param prevX : Initial coordinates value for x;
 * @param prevY : Initial coordinates value for y;
 * @param currentX : Final coordinates value for x;
 * @param currentY : Final coordinates value for y;
 */
export function _drawLine(context:CanvasRenderingContext2D,prevX:number,prevY:number,currentX:number,currentY:number):void{
    context.beginPath();
    context.moveTo(prevX, prevY);
    context.lineTo(currentX, currentY);
    context.stroke();
}

/**
 * 
 * @param context : Cnavas Context;
 * @param seriesX : Serialized X axis Value;
 * @param seriesY : Serialized Y Axis Value;
 * 
 * Here filling color for the plot is fixed.
 */
export function _putColor(context:CanvasRenderingContext2D,seriesX:number[],seriesY:number[]):void{ 
    var grd = context.createLinearGradient(0, 0, 0, 450);
    grd.addColorStop(0, "#b5e6c2");
    grd.addColorStop(1, "black");

    context.beginPath();
    context.moveTo(0,600);
    for(let i=0;i<seriesX.length;i++){
        context.lineTo(seriesX[i],seriesY[i]);
    }
    context.lineTo(seriesX[seriesX.length-1],600);
    context.closePath();

    context.lineWidth = 0;
    context.strokeStyle = '#42f566';
    context.stroke();
    context.fillStyle = grd;
    context.fill(); 
}

/**
 * 
 * @param canvas : Canvas Object;
 * @param context : Canvas context;
 * @param data : Raw Price Data fetched from API; 
 */
export function plotGraph(canvas:HTMLCanvasElement,context:CanvasRenderingContext2D,data:number[]):void{
    let XAxisSeries:number[]=[];
    for(let i=0;i<data.length;i++){
        XAxisSeries.push(i);
    } 
    if (context != null) {
        context.strokeStyle = "#42f566";
        context.lineWidth = 1;
        context.fillStyle = "red";
    }
    let [serializedXaxis,serializedYaxis] =serializeDataArray(data,XAxisSeries,canvas.clientHeight,canvas.clientWidth);
    let prevX=0,prevY=canvas.height/2;
    for (var i = 0; i < data.length; i++) { 
        _drawLine(context,prevX,prevY,serializedXaxis[i], serializedYaxis[i]);
        prevX=serializedXaxis[i];
        prevY=serializedYaxis[i];  
    }
    _putColor(context,serializedXaxis,serializedYaxis);
}