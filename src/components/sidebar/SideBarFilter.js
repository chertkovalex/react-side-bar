/**
 * Created by alexc on 1/16/2017.
 */
import React, {Component, PropTypes} from 'react';
import IconButton from 'material-ui/IconButton';
import ContentSort from 'material-ui/svg-icons/content/sort';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

export default class SideBarFilter extends Component {

    render() {

        const onFilterInputHandle = (event, newVal) => {
            this.props.onFilterInput(newVal);
        };

        const onSortChange = this.props.onSortChange;

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
            textField: {
                float: 'left',
                width: 169,
                paddingLeft: 20
            }
        };

        return (
            <div>
                <TextField
                    hintText="search reports"
                    fullWidth={false}
                    onChange={onFilterInputHandle}
                    style={styles.textField}
                    underlineShow={false}
                    id="filterInput"
                    value={this.props.filterValue}
                />
                <IconButton
                    onTouchTap={onSortChange}
                    iconStyle={styles.smallIcon}
                    style={styles.small}
                >
                    <ContentSort />
                </IconButton>
                <Divider />
            </div>
        );
    }
}

SideBarFilter.propTypes = {
    onFilterInput: PropTypes.func,
    onSortChange: PropTypes.func,
    filterValue: PropTypes.string
};