import {ICanvas, IPlot} from "./chart-def"

export function serializeDataArray(YAxisSeries:number[],XAxisSeries:number[],canvas_height:number,canvas_width:number):number[][]{

    let maxYAxisSeries=Math.max(...YAxisSeries);
    let minYAxisSeries=Math.min(...YAxisSeries);
    let YAxisRange=maxYAxisSeries-minYAxisSeries;
    let YAxisRatio=(canvas_height)/YAxisRange;
    let medianYAxis=(canvas_height)/2;
    let serializedYAxisSeries:number[]=[];
    let serializedXAxisSeries:number[]=[];
    let XData:number[]=[];
    let YData:number[]=[];

    for(let i=0;i<YAxisSeries.length;i++){
        serializedYAxisSeries[i]=(YAxisSeries[i]-minYAxisSeries)*YAxisRatio;
    }
    for(let i=0;i<YAxisSeries.length;i++){
        let shiftedYAxisValue=medianYAxis-serializedYAxisSeries[i];
        let serializedYAxisValue:number;
        if(shiftedYAxisValue>medianYAxis){
            serializedYAxisValue=shiftedYAxisValue-medianYAxis;
            if(serializedYAxisValue>canvas_height/2){
                console.log(YAxisSeries[i]);
                serializedYAxisValue=canvas_height;
            }
        }
        else{
            serializedYAxisValue=shiftedYAxisValue+medianYAxis;
        }
        let serializedXAxisValue:number=0;
        if(i>0){
            serializedXAxisValue=i*(canvas_width/YAxisSeries.length);
        }
        YData.push(serializedYAxisValue);
        XData.push(serializedXAxisValue);
    }  
    return [XData,YData];
}
