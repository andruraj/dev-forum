import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profileActions";

class AddEdu extends Component {
  state = {
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    errors: {},
    disabled: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const edu = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(edu, this.props.history);
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, college, etc you have attended
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleChange}
                  error={errors.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleChange}
                  error={errors.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldofstudy"
                  value={this.state.fieldofstudy}
                  onChange={this.handleChange}
                  error={errors.fieldofstudy}
                />

                <h6>* From Date</h6>
                <TextFieldGroup
                  placeholder="From Date"
                  name="from"
                  value={this.state.from}
                  onChange={this.handleChange}
                  error={errors.from}
                  type="date"
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To Date"
                  name="to"
                  value={this.state.to}
                  onChange={this.handleChange}
                  error={errors.to}
                  type="date"
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    name="current"
                    id="current"
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Course
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Course Description"
                  name="description"
                  info="Some of your syllabus, subjects, topics, etc"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEdu.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEdu));
