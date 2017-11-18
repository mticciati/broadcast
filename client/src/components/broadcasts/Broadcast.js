import React from 'react';

const Broadcast = ({broadcast}) => (
  <div key={broadcast._id} className="card blue-grey darken-1">
    <div className="card-content white-text">
      <span className="card-title">{broadcast.title}</span>
      <p>{broadcast.body}</p>
      <p>Sent on: {new Date(broadcast.created_at).toLocaleDateString()}</p>
    </div>
    <div className="card-action">
      <a>Positions: {broadcast.totalPositions}</a>
      <a>Positions Left: {broadcast.openPositions}</a>
    </div>
  </div>
);

export default Broadcast;
