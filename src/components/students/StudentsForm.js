import React, { Component, Fragment } from "react";

export class StudentsForm extends Component {
  render() {
    return (
      <Fragment>
        <div className=" card card-body shadow rounded mt-1 mb-4">
          <h4>Add Student Form</h4>
          <br />
          <form>
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
                />
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
                />
              </div>

              {/* Class */}
              <div className="form-group col-md-3">
                <label>
                  <h6>Class</h6>
                </label>
                <select className="form-control">
                  <option>...</option>
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>
                  <h6>Dormitory</h6>
                </label>
                <select className="form-control">
                  <option>...</option>
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
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>
                    <h6>Religion</h6>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Religion"
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
                />
              </div>
            </div>

            <div className="form-group ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked="checked"
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
                />
              </div>
            </div>
            <div className="form-group ">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked="checked"
                />
                <label className="form-check-label">Mother is alive</label>
              </div>
            </div>
            <br />
            <hr />
            <br />

            <div className="form-group">
              <label>
                <h6>Health</h6>
              </label>
              <textarea
                class="form-control"
                rows="3"
                placeholder="Any health issue"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default StudentsForm;
