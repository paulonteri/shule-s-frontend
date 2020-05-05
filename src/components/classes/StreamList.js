import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getStreams } from "../../actions/classes/stream";

import List from "antd/es/list";

export class StreamList extends Component {
    static propTypes = {
        streams: PropTypes.array.isRequired,
        getStreams: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getStreams();
    }

    render() {
        return (
            <div
                style={{ height: "100%", maxHeight: "39vh" }}
                className="table-responsive card card-body shadow rounded mb-1"
            >
                <List
                    size="small"
                    header={<div>Streams</div>}
                    dataSource={this.props.streams}
                    renderItem={str => (
                        <List.Item key={str.name}> {str.name}</List.Item>
                    )}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    streams: state.streamsReducer.streams
});

export default connect(mapStateToProps, { getStreams })(StreamList);
