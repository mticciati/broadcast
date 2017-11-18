import React from 'react';
import _ from 'lodash';
import Broadcast from './Broadcast';

const BroadcastList = ({broadcasts}) => (
  <div>
    {_.map(broadcasts, (broadcast) => {
      return (
        <Broadcast key={broadcast._id} broadcast={broadcast} />
      );
    })}
  </div>
);

export default BroadcastList;
