import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addStudent } from "../../actions/students/students";

export class StudentsForm extends Component {
  state = {
    student_id: "",
    class_ns: "",
    dormitory: "",
    first_name: "",
    sir_name: "",
    other_name: "",
    father_alive: "",
    mother_alive: "",
    father_first_name: "",
    father_sir_name: "",
    father_email: "",
    father_phone: "",
    mother_first_name: "",
    mother_sir_name: "",
    mother_email: "",
    mother_phone: "",
    date_of_birth: "",
    gender: "",
    admission_date: "",
    is_enrolled: "",
    home_country: "",
    home_county: "",
    home_town: "",
    religion: "",
    health: ""
  };

  static propTypes = {
    addStudent: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value }); // grab the name and set thet to the value

  onSubmit = e => {
    e.preventDefault();

    const {
      student_id,
      class_ns,
      dormitory,
      first_name,
      sir_name,
      other_name,
      father_alive,
      mother_alive,
      father_first_name,
      father_sir_name,
      father_email,
      father_phone,
      mother_first_name,
      mother_sir_name,
      mother_email,
      mother_phone,
      date_of_birth,
      gender,
      admission_date,
      is_enrolled,
      home_country,
      home_county,
      home_town,
      religion,
      health
    } = this.state; // get them from the state

    // values from the staate to the student const
    const student = {
      student_id: student_id,
      class_ns: class_ns,
      dormitory: dormitory,
      first_name,
      sir_name,
      other_name,
      father_alive,
      mother_alive,
      father_first_name,
      father_sir_name,
      father_email,
      father_phone,
      mother_first_name,
      mother_sir_name,
      mother_email,
      mother_phone,
      date_of_birth,
      gender,
      admission_date,
      is_enrolled,
      home_country,
      home_county,
      home_town,
      religion,
      health
    };

    // pass the student const to the action
    console.log(student);
    this.props.addStudent(student);

    // empty the fields    // Commented out to allow testing
    // this.setState({
    //   student_id: "",
    //   class_ns: "",
    //   dormitory: "",
    //   first_name: "",
    //   sir_name: "",
    //   other_name: "",
    //   father_alive: "",
    //   mother_alive: "",
    //   father_first_name: "",
    //   father_sir_name: "",
    //   father_email: "",
    //   father_phone: "",
    //   mother_first_name: "",
    //   mother_sir_name: "",
    //   mother_email: "",
    //   mother_phone: "",
    //   date_of_birth: "",
    //   gender: "",
    //   admission_date: "",
    //   is_enrolled: "",
    //   home_country: "",
    //   home_county: "",
    //   home_town: "",
    //   religion: "",
    //   health: ""
    // });
  };

  render() {
    const {
      student_id,
      class_ns,
      dormitory,
      first_name,
      sir_name,
      other_name,
      father_alive,
      mother_alive,
      father_first_name,
      father_sir_name,
      father_email,
      father_phone,
      mother_first_name,
      mother_sir_name,
      mother_email,
      mother_phone,
      date_of_birth,
      gender,
      admission_date,
      is_enrolled,
      home_country,
      home_county,
      home_town,
      religion,
      health
    } = this.state; // get them from the state

    return (
      <Fragment>
        <div className=" card card-body shadow rounded mt-1 mb-4">
          <h4>Add Student Form</h4>

          <br />

          <form onSubmit={this.onSubmit}>
            {/* Student */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>First name</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" Student's first name"
                  name="first_name"
                  onChange={this.onChange}
                  value={first_name}
                />
              </div>

              <div className="form-group col-md-3">
                <label>
                  <h6>Sir name</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" Student's sir name"
                  name="sir_name"
                  onChange={this.onChange}
                  value={sir_name}
                />
              </div>

              <div className="form-group col-md-3">
                <label>
                  <h6>Other name</h6>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=" Student's other name"
                  name="other_name"
                  onChange={this.onChange}
                  value={other_name}
                />
              </div>
              {/* Class */}
              <div className="form-group col-md-2">
                <label>
                  <h6>Gender</h6>
                </label>
                <select
                  className="form-control"
                  name="gender"
                  onChange={this.onChange}
                  value={gender}
                >
                  <option>...</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>Student ID number</h6>
                </label>
                <input
                  type="number"
                  min="0"
                  step="1"
                  className="form-control"
                  placeholder="Student's identification number"
                  name="student_id"
                  onChange={this.onChange}
                  value={student_id}
                />
              </div>

              {/* Class */}
              <div className="form-group col-md-3">
                <label>
                  <h6>Class</h6>
                </label>
                <select
                  className="form-control"
                  name="class_ns"
                  onChange={this.onChange}
                  value={class_ns}
                >
                  <option>...</option>
                </select>
              </div>

              {/* Dormitory */}
              <div className="form-group col-md-3">
                <label>
                  <h6>Dormitory</h6>
                </label>
                <select
                  className="form-control"
                  name="dormitory"
                  onChange={this.onChange}
                  value={dormitory}
                  id="Dormitory"
                >
                  <option value="oy">Oyugi</option>
                  <option value="kal">Kalonzo</option>
                </select>
              </div>

              {/* Home */}
              <div className="form-row">
                <div className="form-group col-md-3">
                  <label>
                    <h6>Country</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Home Country"
                    name="home_country"
                    onChange={this.onChange}
                    value={home_country}
                  />
                </div>

                <div className="form-group col-md-3">
                  <label>
                    <h6>County</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="County/Province"
                    name="home_county"
                    onChange={this.onChange}
                    value={home_county}
                  />
                </div>

                <div className="form-group col-md-3">
                  <label>
                    <h6>Town</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Home Town"
                    name="home_town"
                    onChange={this.onChange}
                    value={home_town}
                  />
                </div>

                {/* Religion */}
                <div className="form-group col-md-3">
                  <label>
                    <h6>Religion</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Religion"
                    name="religion"
                    onChange={this.onChange}
                    value={religion}
                  />
                </div>
              </div>
            </div>

            <br />
            <hr />
            <br />

            {/* Father */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>Father's first name</h6>
                </label>
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Male guardian's first name"
                  name="father_first_name"
                  onChange={this.onChange}
                  value={father_first_name}
                />
              </div>

              <div className="form-group col-md-4">
                <label>
                  <h6>Father's sir name</h6>
                </label>
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Male guardian's sir name"
                  name="father_sir_name"
                  onChange={this.onChange}
                  value={father_sir_name}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>Father's phone number</h6>
                </label>
                <input
                  type="number"
                  min="99999999"
                  step="1"
                  className=" form-control"
                  placeholder="Male guardian's phone number"
                  name="father_phone"
                  onChange={this.onChange}
                  value={father_phone}
                />
              </div>

              <div className="form-group col-md-4">
                <label>
                  <h6>Father's email address</h6>
                </label>
                <input
                  type="email"
                  className=" form-control"
                  placeholder="Male guardian's email address"
                  name="father_email"
                  onChange={this.onChange}
                  value={father_email}
                />
              </div>
            </div>

            <div className="form-group ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked="checked"
                  name="father_alive"
                  onChange={this.onChange}
                  value={father_alive}
                />
                <label className="form-check-label">Father is alive</label>
              </div>
            </div>

            <br />

            {/* Mother */}
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>Mother's first name</h6>
                </label>
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Female guardian's first name"
                  name="mother_first_name"
                  onChange={this.onChange}
                  value={mother_first_name}
                />
              </div>

              <div className="form-group col-md-4">
                <label>
                  <h6>Mother's sir name</h6>
                </label>
                <input
                  type="text"
                  className=" form-control"
                  placeholder="Female guardian's sir name"
                  name="mother_sir_name"
                  onChange={this.onChange}
                  value={mother_sir_name}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>
                  <h6>Mother's phone number</h6>
                </label>
                <input
                  type="number"
                  min="99999999"
                  step="1"
                  className=" form-control"
                  placeholder="Female guardian's phone number"
                  name="mother_phone"
                  onChange={this.onChange}
                  value={mother_phone}
                />
              </div>

              <div className="form-group col-md-4">
                <label>
                  <h6>Mother's email address</h6>
                </label>
                <input
                  type="email"
                  className=" form-control"
                  placeholder="Female guardian's email address"
                  name="mother_email"
                  onChange={this.onChange}
                  value={mother_email}
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked="checked"
                  name="mother_alive"
                  onChange={this.onChange}
                  value={mother_alive}
                />
                <label className="form-check-label">Mother is alive</label>
              </div>
            </div>
            <br />
            <hr />
            <br />

            {/* Health */}
            <div className="form-group">
              <label>
                <h6>Health</h6>
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Any health issue"
                name="health"
                onChange={this.onChange}
                value={health}
              ></textarea>
            </div>

            <div className="form-group">
              <button
                type="submit"
                value="Submit"
                className="btn btn-sm btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default connect(null, { addStudent })(StudentsForm);
