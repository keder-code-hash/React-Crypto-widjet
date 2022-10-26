
/**
 * 
 * @param YAxisSeries : all values required to plot y axis;
 * @param XAxisSeries : all values required to plot x axis;
 * @param canvas_height : canvas Height;
 * @param canvas_width : canvas Width
 * @returns : serialized Y axis and X axis Data based upon the canvas Height And Width;
 */
export function serializeDataArray(YAxisSeries:number[],
                                    XAxisSeries:number[],
                                    canvas_height:number,
                                    canvas_width:number):number[][]{


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
    /**
     * Values for minimum Y axis and maximum Y axis values are fetched. Then based upon the 
     * can vas Height Y axis ratio is calculated to putdown all values in canvas properly.
     * Median for all Y axis values are calculated and set the values for serialized Y
     * axis accordingly.
     */
    for(let i=0;i<YAxisSeries.length;i++){
        let shiftedYAxisValue=medianYAxis-serializedYAxisSeries[i];
        let serializedYAxisValue:number;
        if(shiftedYAxisValue>medianYAxis){
            serializedYAxisValue=shiftedYAxisValue-medianYAxis;
            if(serializedYAxisValue>canvas_height/2){
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
