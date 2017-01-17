/**
 * Created by alexc on 1/16/2017.
 */

import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';

export default class SideBarHeader extends Component {

    render() {

        const {onRefresh, onClose} = this.props;
        const styles = {
            smallIcon: {
                width: 24,
                height: 24,
            },
            small: {
                width: 24,
                height: 24,
                padding: 0,
                margin: 10,
                float: 'right'
            },
        };

        return (
            <header className="sb-header">
                <h3>Reports {this.props.reports}</h3>
                <IconButton
                    onTouchTap={onClose}
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                >
                    <NavigationClose />
                </IconButton>
                <IconButton
                    onTouchTap={onRefresh}
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                >
                    <NavigationRefresh />
                </IconButton>

            </header>
        );
    }
}

SideBarHeader.propTypes = {
    reports: PropTypes.number,
    onRefresh: PropTypes.func,
    onClose: PropTypes.func
};
