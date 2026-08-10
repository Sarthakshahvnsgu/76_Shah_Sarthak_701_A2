import React, { useState } from 'react';

export default function UserProfileCard({ name, role, bio, initialFollowers, avatarUrl }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(initialFollowers);

  const handleFollowToggle = () => {
    if (isFollowing) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="card card-custom h-100">
      <div className="profile-header"></div>
      <div className="card-body text-center d-flex flex-column align-items-center">
        <div className="avatar-wrapper mb-3">
          <div className="avatar bg-primary text-white d-flex align-items-center justify-content-center fs-2 fw-bold">
            {name.charAt(0)}
          </div>
        </div>
        <h5 className="card-title fw-bold mb-1">{name}</h5>
        <p className="text-muted small mb-3">{role}</p>
        <p className="card-text text-secondary mb-4 px-2" style={{ flexGrow: 1 }}>{bio}</p>
        <div className="d-flex justify-content-around w-100 mb-4 border-top border-bottom py-2">
          <div className="text-center">
            <span className="d-block fw-bold fs-5">{followersCount}</span>
            <span className="text-muted small">Followers</span>
          </div>
          <div className="text-center">
            <span className="d-block fw-bold fs-5">248</span>
            <span className="text-muted small">Following</span>
          </div>
          <div className="text-center">
            <span className="d-block fw-bold fs-5">42</span>
            <span className="text-muted small">Projects</span>
          </div>
        </div>
        <button 
          className={`btn w-100 rounded-pill fw-semibold transition-all ${isFollowing ? 'btn-outline-secondary' : 'btn-primary'}`}
          onClick={handleFollowToggle}
        >
          {isFollowing ? (
            <span><i className="bi bi-person-check-fill me-1"></i> Following</span>
          ) : (
            <span><i className="bi bi-person-plus-fill me-1"></i> Follow</span>
          )}
        </button>
      </div>
    </div>
  );
}
