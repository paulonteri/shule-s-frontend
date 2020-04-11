import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addClassNumeral } from "../../actions/classes/classNumeral";

export class ClassNForm extends Component {
    state = { name: "" };

    static propTypes = {
        addClassNumeral: PropTypes.func.isRequired
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

    onSubmit = e => {
        e.preventDefault();
        const { name } = this.state;
        const classNumeral = { name };
        this.props.addClassNumeral(classNumeral);
        this.setState({ name: "" });
    };

    render() {
        const { name } = this.state; // pull out of the state
        return (
            <div className="card px-4 py-2 shadow rounded h-100">
                <h4>Add Class Numeral</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Enter Class Numeral"
                            type="number"
                            min="0"
                            step="1"
                            name="name"
                            onChange={this.onChange} // call the onChange function & update the state
                            value={name}
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            {" "}
                            Enter Class numeral. Eg: 1, 3, 4 e.t.c
                        </small>
                    </div>

                    <div className="form-group">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(null, { addClassNumeral })(ClassNForm);
