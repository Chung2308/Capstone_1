import React, { Component } from 'react';
import Countdown from '../Countdown/Countdown.js';
import './WaitingRoom.css';

export default class WaitingRoom extends Component {

    render() {
        const currentDate = new Date();
        const open = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
        // const open = (currentDate.getTime())
        const today = new Date()
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
        return (
            <div className="waiting-room">
                <div className="row">
                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                        <div className="topic">
                            <label htmlFor className="infor-room">Exam Topic: </label>
                            <label htmlFor>DB CreateTest</label>
                        </div>
                        <div className="time">
                            <label htmlFor className="infor-room">Start Time: </label>
                            <label htmlFor>DB CreateTest</label>
                        </div>
                        <div className="countdown">
                            <label htmlFor className="infor-room">Time remaining:
                            </label><br />
                            <Countdown date={`${time}-${open}`} />
                        </div>
                    </div>
                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                        <h3>Chat Room</h3>
                    </div>
                </div>
            </div>

        )
    }
}
