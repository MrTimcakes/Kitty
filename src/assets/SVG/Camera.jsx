import React, { useState, useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(P) {
  const [fillColor, setFillColor] = useState('');
  const [strokeColor, setStrokeColor] = useState('#6E7FAA');
  // Change colours when isActive changes
  useEffect(() => { P.isActive ? (setFillColor("#5663FF"), setStrokeColor("")) : (setFillColor("#FFFFFF"), setStrokeColor("#6E7FAA")); }, [P.isActive]);

  return (
    <Svg width={100} height={100} viewBox='0 0 100 100' {...P}>
      <G id='MFIcons' transform='translate(-355 -1285)'>
        <G id='Camera' fill={fillColor} stroke={strokeColor} strokeWidth={4}>
          <Path id='Path_439' d='M201.171,201.523a10.549,10.549,0,1,1-14.919,0,10.549,10.549,0,0,1,14.919,0' data-name='Path 439' transform='translate(211.515 1128.244)' />
          <Path id='Path_440' d='M73.844,40.522H66.555l-5.277-10H23.111l-5.272,10-7.279.012a10.3,10.3,0,0,0-10.531,10L0,90.52a10.3,10.3,0,0,0,10.55,10H73.844a10.3,10.3,0,0,0,10.55-10v-40A10.3,10.3,0,0,0,73.844,40.522ZM42.2,88.022c-11.634,0-21.1-8.972-21.1-20s9.465-20,21.1-20,21.1,8.972,21.1,20-9.465,20-21.1,20Z' data-name='Path 440' transform='translate(363.031 1269.26)' />
        </G>
      </G>
    </Svg>
  );
}

export default SvgComponent;
