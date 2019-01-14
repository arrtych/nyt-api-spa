import React from "react";
import PropTypes from "prop-types";

class Loader extends React.Component {
    static propTypes = {
        loading: PropTypes.bool.isRequired
    };
    static defaultProps = {
        loading: false
    };
    render() {
        const { loading } = this.props;
        return loading ? (
            <div className="loading">
                <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        ) : null;
    }
}
export default Loader;