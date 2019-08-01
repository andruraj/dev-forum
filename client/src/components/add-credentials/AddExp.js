import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profileActions";

class AddExp extends Component {
  state = {
    company: "",
    location: "",
    title: "",
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
    const exp = {
      company: this.state.company,
      location: this.state.location,
      title: this.state.title,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addExperience(exp, this.props.history);
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
      <div class="section add-experience">
        <div class="container">
          <div class="row">
            <div class="col-md-8 m-auto">
              <Link to="/dashboard" class="btn btn-light">
                Go Back
              </Link>
              <h1 class="display-4 text-center">Add Your Experience</h1>
              <p class="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small class="d-block pb-3">* = required field</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  error={errors.title}
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleChange}
                  error={errors.location}
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
                <div class="form-check mb-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    name="current"
                    id="current"
                  />
                  <label class="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  info="Some of your responsabilities, etc"
                  value={this.state.description}
                  onChange={this.handleChange}
                  error={errors.description}
                />
                <input type="submit" class="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExp.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExp));
