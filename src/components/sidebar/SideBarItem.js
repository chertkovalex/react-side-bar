/**
 * Created by alexc on 13.01.17.
 */
import React, {Component, PropTypes} from 'react';

export default class SideBarItem extends Component {

    getFormattedDate = (dateObj) => {
        const dateArr = dateObj.toDateString().split(' ');
        return dateArr[1] + ' ' + dateArr[2];
    };
    getFormattedTime = (dateObj) => {
        const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
        const hours = dateObj.getHours() > 12 ? dateObj.getHours() % 12 : dateObj.getHours();
        const minutes = dateObj.getMinutes() < 10 ? '0' + dateObj.getMinutes() : dateObj.getMinutes();
        return `${hours}:${minutes} ${ampm}`;
    };

    render() {
        const {name, updated, location, type} = this.props;
        const dateObj = new Date(updated);
        const updatedDate = this.getFormattedDate(dateObj);
        const updatedTime = this.getFormattedTime(dateObj);
        return (
            <div className="sb-item">
                <div className="sb-item-left">
                    <div className="sb-name">{name}</div>
                    <div className="sb-type">{type}</div>
                    <div className="sb-location">{location}</div>
                </div>
                <div className="sb-item-right">
                    <div className="sb-date">{updatedDate}</div>
                    <div className="sb-time">{updatedTime}</div>
                </div>
            </div>
        );
    }
}

SideBarItem.propTypes = {
    name: PropTypes.string.isRequired,
    created: PropTypes.number,
    updated: PropTypes.number,
    location: PropTypes.string,
    type: PropTypes.string
};
