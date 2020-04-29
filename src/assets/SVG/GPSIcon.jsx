import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg width={100} height={100} viewBox='0 0 100 100' {...props}>
      <Path id='GPSIcon' fill='#fff' d='M51,32.818A18.182,18.182,0,1,0,69.182,51,18.177,18.177,0,0,0,51,32.818ZM91.636,46.455A40.883,40.883,0,0,0,55.545,10.364V1H46.455v9.364A40.883,40.883,0,0,0,10.364,46.455H1v9.091h9.364A40.883,40.883,0,0,0,46.455,91.636V101h9.091V91.636A40.883,40.883,0,0,0,91.636,55.545H101V46.455H91.636ZM51,82.818A31.818,31.818,0,1,1,82.818,51,31.795,31.795,0,0,1,51,82.818Z' transform='translate(-1 -1)' />
    </Svg>
  );
}

export default SvgComponent;
