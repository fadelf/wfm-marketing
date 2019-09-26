import React, { Component } from "react";
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment'
import FooterComponentList from './FooterComponentList.jsx';
import HeaderComponent from '../views/HeaderComponent.jsx';
import AuthenticationService from '../services/AuthenticationService.js';

class OptimizerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''    }
        this.loginClicked = this.loginClicked.bind(this);
    }

    loginClicked() {
        console.log("Optimize!");
    }

    render() {
        const isAdminLoggedIn = AuthenticationService.isAdminLoggedIn();

        const groups = [
            {id: 1, title: 'Dedi Cahyadi'}, 
            {id: 2, title: 'Nurrahma Oktaviani'},
            {id: 3, title: 'Yang Mi Ovelien'},
            {id: 4, title: 'Yunita Wulansari'}
        ]

        const items = [
            {
              id: 1,
              group: 1,
              title: 'Stand By',
              start_time: moment(),
              end_time: moment().add(2, 'hour')
            },
            {
              id: 2,
              group: 2,
              title: 'Stand By',
              start_time: moment().add(2.5, 'hour'),
              end_time: moment().add(5, 'hour')
            },
            {
              id: 3,
              group: 1,
              title: 'Promosi',
              start_time: moment().add(2.5, 'hour'),
              end_time: moment().add(5, 'hour')
            },
            {
                id: 4,
                group: 3,
                title: 'Follow Up',
                start_time: moment().add(-2, 'hour'),
                end_time: moment().add(3, 'hour')
            },
            {
                id: 5,
                group: 4,
                title: 'Follow Up',
                start_time: moment().add(-2, 'hour'),
                end_time: moment().add(3, 'hour')
            }
          ]

        return (
            <div>
                <HeaderComponent/>
                <div className="container">
                    <h3>Employee Scheduling</h3>
                    <Timeline
                        groups={groups}
                        items={items}
                        defaultTimeStart={moment().add(-12, 'hour')}
                        defaultTimeEnd={moment().add(12, 'hour')}
                    />
                    <br/>
                    {isAdminLoggedIn && <button className="btn btn-md btn-success" onClick={this.loginClicked}>
                        Optimize
                    </button>}                      
                </div>
                <FooterComponentList/>
            </div>
        )
    }
}

export default OptimizerComponent