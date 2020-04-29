import React, { useState, useEffect } from 'react';
import Svg, { Defs, RadialGradient, Stop, G, Circle, Path } from 'react-native-svg';

function SvgComponent(P) {
  const [fillColor, setFillColor] = useState('');
  const [strokeColor, setStrokeColor] = useState('#6E7FAA');
  // Change colours when isActive changes
  useEffect(() => { P.isActive ? (setFillColor("#ff7800"), setStrokeColor("")) : (setFillColor("#FFFFFF"), setStrokeColor("#6E7FAA")); }, [P.isActive]);


  return (
    <Svg width={138.24} height={138.24} viewBox='0 0 138.24 138.24' {...P}>
      <Defs>
        <RadialGradient id='radial-gradient' cx={69.11} cy={69.102} r={69.076} gradientTransform='matrix(1 0 0 -1 0 138.205)' gradientUnits='userSpaceOnUse'>
          <Stop offset={0} stopColor='#ff7800' />
          <Stop offset={0.523} stopColor='#ff7800' stopOpacity={0.322} />
          <Stop offset={0.736} stopColor='#ff7800' stopOpacity={0.102} />
          <Stop offset={0.954} stopColor='#ff7800' stopOpacity={0.012} />
          <Stop offset={1} stopColor='#ff7800' stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <G id='MapGroup' transform='translate(-30.264 -10.546)'>
        {P.isActive ? <Circle id='MapActiveHighlight' cx={69.12} cy={69.12} r={69.12} fill='url(#radial-gradient)' opacity={0.35} transform='translate(30.264 10.546)' /> : null }
        <Path id='MapIcon' fill={fillColor} stroke={strokeColor} strokeWidth={3} d='M57.093,0A24.977,24.977,0,0,0,32.115,24.978c0,11.153,16.325,31.48,22.579,38.859a3.127,3.127,0,0,0,4.8,0c6.254-7.378,22.579-27.706,22.579-38.859A24.977,24.977,0,0,0,57.093,0Zm0,33.3a8.326,8.326,0,1,1,8.326-8.326A8.325,8.325,0,0,1,57.093,33.3ZM3.989,42.81A6.345,6.345,0,0,0,0,48.7V98.322a3.172,3.172,0,0,0,4.349,2.946L31.718,88.811V42.605a60.034,60.034,0,0,1-4.213-9.2ZM57.093,71.3a9.472,9.472,0,0,1-7.238-3.362c-3.9-4.6-8.043-9.837-11.793-15.209V88.809L76.123,101.5V52.731C72.373,58.1,68.23,63.341,64.33,67.94A9.477,9.477,0,0,1,57.093,71.3Zm52.743-39.352L82.467,44.405V101.5L110.2,90.406a6.343,6.343,0,0,0,3.989-5.89V34.894a3.172,3.172,0,0,0-4.349-2.946Z' transform='translate(42.907 28.807)' />
      </G>
    </Svg>
  );
}

export default SvgComponent;
