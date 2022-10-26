import * as React from 'react';
import { Component } from 'react';

type errorDetails={
    error:string;
}

export const Error=(props:errorDetails)=>{
    return(
        <React.Fragment>
            <div className='container'>
                <h1>{props.error}</h1>
            </div>
        </React.Fragment>
    )
}