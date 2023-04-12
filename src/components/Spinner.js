import React, { Component } from 'react'


export default class Spinner extends Component {
    render() {
        return (
            <div className='text-center my-3'>
                {/* <div className="spinner-grow text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> */}
                <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}
