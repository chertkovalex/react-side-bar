/**
 * Created by alexc on 13.01.17.
 */

import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import SideBarHeader from './SideBarHeader';
import SideBarFilter from './SideBarFilter';
import SideBarItem from './SideBarItem';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './sideBar.css';

injectTapEventPlugin();

export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dataArr: [],
            originalData: [],
            sortingAsc: false,
            filterValue: ''
        };
    }

    updateDataArr = (dataArr) => this.setState({dataArr: dataArr});

    componentDidMount() {
        this.loadOriginalData();
    }

    loadOriginalData = () => {
        this.setState({filterValue: ''});
        let sb = this;
        fetch('./sidebar.json')
            .then(function (response) {
                return response.json();
            }).then(function (json) {
            sb.setState({dataArr: json, originalData: json});
        }).catch(function (ex) {
            console.log('parsing failed', ex);
        });
    };

    handleToggle = () => this.setState({open: !this.state.open});

    setFilteredArray = (filterValue) => {
        this.setState({filterValue: filterValue});
        const result = this.state.originalData.filter((item) => {
            return item.name.indexOf(filterValue) !== -1;
        });
        this.updateDataArr(result);
    };

    toggleSorting = () => {
        this.setState({sortingAsc: !this.state.sortingAsc});
        const sortingAsc = this.state.sortingAsc;
        const result = this.state.dataArr.sort((a, b) => {
                return sortingAsc ? (b.updated - a.updated) : (a.updated - b.updated);
            }
        );
        this.updateDataArr(result);
    };


    render() {
        const items = this.state.dataArr;

        const itemsTemplate = items.map((item) => {
            const itemId = item.id;
            return (
                <li key={itemId} className="sidebar-item">
                    <SideBarItem {...item}/>
                </li>
            );
        });

        const reports = items.length;

        return (
            <MuiThemeProvider>
                <div>
                    <RaisedButton
                        label="Toggle SideBar"
                        onTouchTap={this.handleToggle}
                    />
                    <Drawer width={250} open={this.state.open}>
                        <SideBarHeader reports={reports} onClose={this.handleToggle.bind(this)}
                                       onRefresh={this.loadOriginalData.bind(this)}/>
                        <SideBarFilter onFilterInput={this.setFilteredArray.bind(this)}
                                       onSortChange={this.toggleSorting.bind(this)}
                                       filterValue={this.state.filterValue}/>
                        <Divider />
                        <ul className="sb-items">
                            {itemsTemplate}
                        </ul>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}
