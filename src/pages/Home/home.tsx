import React, { Component } from 'react'
import './home.css';
import {Canvas} from "../../components/canvas/Canvas"

function handleClickPeriod():void{

}
function handleClickCoins():void{

}
export function Home(){
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col col-sm-12 col-md-12 col-lg-12">
                        <Canvas/>
                    </div>
                </div>
                <div className="row"> 
                    <div className="btn-group">
                        <button id='period-btn' onClick={handleClickPeriod}>1D</button>
                        <button id='period-btn' onClick={handleClickPeriod}>7D</button>
                        <button id='period-btn' onClick={handleClickPeriod}>30D</button>
                    </div>
                    <div className="btn-group">
                        <button id='period-btn' onClick={handleClickCoins}>BTC</button>
                        <button id='period-btn' onClick={handleClickCoins}>ETH</button> 
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}