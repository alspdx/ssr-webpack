import React from 'react';

export default function WithNestedRoute(props: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '300px', background: 'skyblue', padding: '60px' }}>
      <span>This is a nested route parent component</span>
      {props.children || 'no children provided'}
    </div>
  )
}
WithNestedRoute.loader = async () => {
  return {
    message: 'WithNestedRoute loaded',
    data: await fetch('https://mobile-staging.gametime.co/v1/search?q=warriors').then(res => res.json()),
  };
}
