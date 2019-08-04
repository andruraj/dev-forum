import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import PropTypes from "prop-types";

export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.location}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.company) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {isEmpty(profile.website) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.website.includes("https://") ||
                      profile.website.includes("http://")
                        ? profile.website
                        : "https://" + profile.website
                    }
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.twitter.includes("https://") ||
                      profile.social.twitter.includes("http://")
                        ? profile.social.twitter
                        : "https://" + profile.social.twitter
                    }
                    target="_blank"
                  >
                    <i className="fas fa-twitter fa-2x" />
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.facebook.includes("https://") ||
                      profile.social.facebook.includes("http://")
                        ? profile.social.facebook
                        : "https://" + profile.social.facebook
                    }
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.linkedin.includes("https://") ||
                      profile.social.linkedin.includes("http://")
                        ? profile.social.linkedin
                        : "https://" + profile.social.linkedin
                    }
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                )}

                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a
                    className="text-white p-2"
                    href={
                      profile.social.instagram.includes("https://") ||
                      profile.social.instagram.includes("http://")
                        ? profile.social.instagram
                        : "https://" + profile.social.instagram
                    }
                    target="_blank"
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileHeader.propTypes = {
  profile: PropTypes.object.isRequired
};
