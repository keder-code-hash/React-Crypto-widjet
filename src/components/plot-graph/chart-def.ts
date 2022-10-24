export interface IAxisLabelConfig{
    text?:string;
    position?:string|any;
}
export interface IAxisConfig{
    label:IAxisLabelConfig;
    value_rendering_format?: string|number;
    min_value:number;
    max_value:number;
}

export interface IAxisConfigAPI{
    series_length?:number;
    serialized_array?:number[];
    input_array?:number[];
}

export interface IPlot{
    plot_name?:string;
    x:IAxisConfigAPI;
    y:IAxisConfigAPI;
}
export interface ICanvas extends HTMLCanvasElement{
    canvas_height:number;
    canvas_width:number;
    plot:IPlot;
    context:CanvasRenderingContext2D;
}
