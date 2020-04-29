import * as React from 'react';
import Svg, { Path, G } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={107} height={107} viewBox="0 0 107 107" {...props}>
      <G fill='none' stroke='#fff' strokeLinecap='round' strokeWidth={8}>
        <Path d='M53.187 23.122v61.582' data-name='Line 3' />
        <Path d='M22.396 53.913h61.582' data-name='Line 4' />
      </G>
    </Svg>
  );
}

export default SvgComponent;
