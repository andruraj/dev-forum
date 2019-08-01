import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/spinner";
import ProfileActions from "./ProfileActions";

export class Dashboard extends Component {
  static = {};

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  delete = e => {
    this.props.deleteAccount();
  };
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dash;
    if (profile === null || loading) {
      dash = <Spinner />;
    } else {
      //check user has profile
      if (Object.keys(profile).length > 0) {
        dash = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />

            <div style={{ marginBottom: "60px" }} />
            <button className="btn btn-danger" onClick={this.delete}>
              Delete My Account
            </button>
          </div>
        );
      } else {
        dash = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have yet to setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dash}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
