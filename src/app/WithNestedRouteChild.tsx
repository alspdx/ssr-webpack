import React from 'react';

export default function WithNestedRouteChild() {
  return (
    <div style={{ height: '200px', background: 'lightcoral'}}>
      This is a nested route child component
    </div>
  )
}
WithNestedRouteChild.loader = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));

  return {
    message: 'WithNestedRouteChild loaded',
    data: await fetch('https://mobile-staging.gametime.co/v1/search?q=seahawks').then(res => res.json()),
  };
};
