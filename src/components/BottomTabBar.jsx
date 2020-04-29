import React, { useState, useEffect } from 'react';
import { 
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Keyboard,
} from 'react-native';

import Colors from '../constants/Colors';

import Svg, { Defs, RadialGradient, Stop, LinearGradient, ClipPath, Path, G, Circle, Ellipse, Rect } from 'react-native-svg';

import Map from 'kitty/assets/SVG/Map.jsx';
import CHOMKER from 'kitty/assets/SVG/CHOMKER.jsx';

import Camera from 'kitty/assets/SVG/Camera.jsx';
import Plus from 'kitty/assets/SVG/Plus.jsx';

function BottomTabBar({ state, descriptors, navigation }) {
  const ViewBox = { width: 1120, height: 256, };
  
  const TabBarWidth = Dimensions.get('window').width;
  const TabBarHeight = Dimensions.get('window').width * (ViewBox.height/ViewBox.width);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Sate to hide tab bar when keyboard visible
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardVisible(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardVisible(false);
  };

  const MultiFunction = () => {  
    const onPress = ()=>{
      navigation.emit({ type: 'MultiFuncPress' });
    }

    const MFSize = TabBarHeight*(2.6/4);
    const MFS = StyleSheet.flatten([ TB.MultiFunc, {
      width: MFSize,
      height: MFSize,
      left: (Dimensions.get('window').width / 2) - (MFSize/2),
      // top: 15,
      bottom: 20,
    } ]);

    const MFIcon = () => {
      switch(state.routeNames[state.index]){
        case 'Map':
          return <Camera width={MFSize*0.7} height={MFSize*0.7} style={{transform: [{ rotate: '-45deg'}]}} />
          break;
        // case 'Recipies':
        //   return <RollingPin width={MFSize*0.7} height={MFSize*0.7} style={{transform: [{ rotate: '-45deg'}]}} />
        //   break;
        default:
          return <Plus width={MFSize*0.7} height={MFSize*0.7} style={{transform: [{ rotate: '-45deg'}]}} />
      }
    }
  
    return(
      <TouchableHighlight style={ MFS } onPress={onPress} activeOpacity={0.9} underlayColor={Colors.color1} >
        <MFIcon />
      </TouchableHighlight>
    )
  }

  const RenderBackground = () => {
    return (
      <Svg width={TabBarWidth} height={TabBarHeight} viewBox={`0 0 ${ViewBox.width} ${ViewBox.height}`} style={{backgroundColor:'transparent'}}>
        <Defs>
          <RadialGradient id='GlowGradient' cx={128.03} cy={131.304} r={127.97} gradientTransform='matrix(1 -.002 -.002 -1 .294 262.894)' gradientUnits='userSpaceOnUse'><Stop offset={0} stopColor='#5663ff' /><Stop offset={0.498} stopColor='#5663ff' stopOpacity={0.502} /><Stop offset={0.879} stopColor='#5663ff' stopOpacity={0.051} /><Stop offset={1} stopColor='#5663ff' stopOpacity={0} /></RadialGradient>
          <RadialGradient id='ShadowCornerGradient' cx={0.5} cy={0.5} r={0.5} gradientUnits='objectBoundingBox'><Stop offset={0} stopOpacity={0.102} /><Stop offset={0.038} stopOpacity={0.102} /><Stop offset={0.268} stopOpacity={0.102} /><Stop offset={0.423} stopOpacity={0.031} /><Stop offset={0.661} stopOpacity={0} /><Stop offset={1} stopOpacity={0} /></RadialGradient>
          <LinearGradient id='ShadowTopGradient' x1={0.5} x2={0.5} y2={1} gradientUnits='objectBoundingBox'><Stop offset={0} stopOpacity={0} /><Stop offset={0.17} stopOpacity={0} /><Stop offset={0.289} stopOpacity={0.031} /><Stop offset={0.368} stopOpacity={0.102} /><Stop offset={1} stopOpacity={0.102} /></LinearGradient>
          <ClipPath id='clip-path'><Rect id="TopRightMask" width="77" height="256" transform="translate(1048)" fill="#fff"/></ClipPath>
        </Defs>
        <G id='TabBarMk2' transform='translate(-24 .8)'>
          <G id='FakeShadow' transform='translate(24 .2)'>
            <Path id='FakeShadowMain' fill='url(#ShadowTopGradient)' d='M0 0H971V256H0z' transform='translate(77 -1)' />
            <G id='FakeShadowTopRight' clipPath='url(#clip-path)' transform='translate(0 -1)'><Circle id='FakeShadowTopRight-2' cx={128} cy={128} r={128} fill='url(#ShadowCornerGradient)' data-name='FakeShadowTopRight' transform='translate(920)' /></G>
            <G id='FakeShadowTopleft' clipPath='url(#clip-path)' transform='translate(-1048 -1)'><Circle id='FakeShadowTopLeft-2' cx={128} cy={128} r={128} fill='url(#ShadowCornerGradient)' data-name='FakeShadowTopLeft' transform='translate(997)' /></G>
          </G>
  
          <Path id='TabBarPath' fill='#fff' d='M438.626,91.1a32.324,32.324,0,0,1,32.094,28.5l2.5,20.1a42.2,42.2,0,0,0,12,24.6l62.489,62.3a54.426,54.426,0,0,0,76.586,0L687.282,164a42.275,42.275,0,0,0,12.2-25.6l1.9-18.8a32.241,32.241,0,0,1,32.094-28.5h335.44A80.142,80.142,0,0,1,1149,171.2v84.6H24V171.2a80.078,80.078,0,0,1,80.086-80.1H438.626Z' transform='translate(0 -.2)' />
  
          <G id='MultiFunc' transform='translate(458.818 .2)'>
            <Circle id='Glow' cx={128} cy={128} r={128} fill='url(#GlowGradient)' />
            {/* <Path id='MultiFuncPath' fill='#5663ff' d='M31.787,87.332,87.332,31.787a44.86,44.86,0,0,1,63.537,0l55.545,55.545a44.86,44.86,0,0,1,0,63.537l-55.545,55.545a44.86,44.86,0,0,1-63.537,0L31.787,150.868A44.86,44.86,0,0,1,31.787,87.332Z' transform='translate(7.884 -.2)' /> */}
          </G>
        </G>
      </Svg>
    );
  }

  const RenderButtons = (route, index) => {
    const { options } = descriptors[route.key];
    const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

    const isFocused = state.index === index;

    const onRoutePress = () => {
      if(route.name=='MULTIFUNC'){return} // Do nothing for the placeholder/spacer item
      const event = navigation.emit({ type: 'tabPress', target: route.key, });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    const RouteButton = (P) =>{
      const iconSize = TabBarHeight*(2.75/4);
      switch(route.name){
        case 'Map':
          return <Map width={iconSize} height={iconSize} isActive={isFocused} {...P} />
          break;
        case 'Profile':
            return <CHOMKER width={iconSize} height={iconSize} isActive={isFocused} {...P}/>
          break;
        case 'MULTIFUNC':
            return <View width={iconSize} height={iconSize} style={{marginLeft:10,marginRight:10}}></View>
            // return <Feed width={iconSize} height={iconSize} isActive={isFocused} {...P} />
          break;
        default:
          console.log(route.name)
          return <Map width={iconSize} height={iconSize}/>
          break;
      }
    }

    return (
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onRoutePress}
        onLongPress={onLongPress}
        key={route.key}
      >
        <RouteButton style={TB.RouteButton} />
      </TouchableOpacity>
    );
  }
  
  if(!isKeyboardVisible){
    return (
      <View style={ StyleSheet.flatten([ TB.Container, {height: TabBarHeight, } ]) } pointerEvents='box-none'>
        <View style={TB.SvgBackground} pointerEvents='none'>
          <RenderBackground />
        </View>
        <MultiFunction />
        <View style={TB.ActiveRegion}>
          {state.routes.map(RenderButtons)}
        </View>
      </View>
    );
  }else{
    return <View></View>
  }

}

const TB = StyleSheet.create({
  Container:{
    width: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    // backgroundColor: '#322',
    justifyContent: 'flex-end',
  },
  SvgBackground: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  ActiveRegion:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // position: 'absolute',
    width: '100%',
    left: 0,
    bottom: 0,
    // backgroundColor: '#00AAFFC0',
  },
  RouteButton: {
    marginLeft: 7.5,
    marginRight: 7.5,
  },
  MultiFunc: {
    // backgroundColor: '#FFAA0080',
    backgroundColor: Colors.color2,
    position: 'absolute',
    borderRadius: 15,
    transform: [{ rotate: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});

export default BottomTabBar;