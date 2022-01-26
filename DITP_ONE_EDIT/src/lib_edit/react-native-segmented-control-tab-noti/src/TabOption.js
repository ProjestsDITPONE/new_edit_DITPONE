/* @flow */

import React, {PureComponent} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon from 'react-native-vector-icons/Feather';

type Props = {
  isTabActive?: boolean,
  index?: number,
  badge?: any,
  text: string,
  firstTabStyle?: ViewStyleProp,
  lastTabStyle?: ViewStyleProp,
  tabStyle?: ViewStyleProp,
  activeTabStyle?: ViewStyleProp,
  tabTextStyle?: TextStyleProp,
  activeTabTextStyle?: TextStyleProp,
  tabBadgeContainerStyle?: TextStyleProp,
  activeTabBadgeContainerStyle?: TextStyleProp,
  tabBadgeStyle?: TextStyleProp,
  activeTabBadgeStyle?: TextStyleProp,
  onTabPress: Function,
  textNumberOfLines?: number,
  allowFontScaling?: boolean,
  accessible?: boolean,
  activeTabOpacity?: number,
  accessibilityLabel?: string,
  enabled?: boolean,
};

const styles = StyleSheet.create({
  tabStyle: {
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2d6dc4',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  tab2Style: {
    paddingVertical: 2,
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2d6dc4',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  tab1Style: {
    paddingVertical: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#2d6dc4',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#2d6dc4',
  },
  tabTextStyle: {
    color: '#2d6dc4',
    fontFamily: 'Kittithada Bold 75',
    fontSize: 22,
  },
  activeTabTextStyle: {
    color: 'white',
  },
  tabBadgeContainerStyle: {
    borderRadius: 20,
    backgroundColor: 'red',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
    marginBottom: 3,
    borderWidth: 1,
  },
  activeTabBadgeContainerStyle: {
    backgroundColor: 'white',
  },
  tabBadgeStyle: {
    color: 'white',
    fontSize: 1,
    fontWeight: 'bold',
  },
  activeTabBadgeStyle: {
    color: 'black',
  },
});

export default class TabOption extends PureComponent<Props> {
  static defaultProps = {
    isTabActive: false,
    index: 0,
    badge: '',
    firstTabStyle: {},
    lastTabStyle: {},
    tabStyle: {},
    activeTabStyle: {},
    tabTextStyle: {},
    activeTabTextStyle: {},
    tabBadgeContainerStyle: {},
    activeTabBadgeContainerStyle: {},
    tabBadgeStyle: {},
    activeTabBadgeStyle: {},
    textNumberOfLines: 1,
    allowFontScaling: false,
    accessible: true,
    activeTabOpacity: 1,
    accessibilityLabel: '',
    enabled: false,
    onTabPress: () => {},
    
  };

  render() {
    const {
      
      isTabActive,
      index,
      badge,
      text,
      firstTabStyle,
      lastTabStyle,
      tabStyle,
      activeTabStyle,
      tabTextStyle,
      activeTabTextStyle,
      tabBadgeContainerStyle,
      activeTabBadgeContainerStyle,
      tabBadgeStyle,
      activeTabBadgeStyle,
      onTabPress,
      textNumberOfLines,
      allowFontScaling,
      accessible,
      activeTabOpacity,
      accessibilityLabel,
      enabled,
    } = this.props;
    return (
      <>
        {index == 2 ? (
          <LinearGradient
            // Background Linear Gradient
            colors={
              isTabActive ? ['#ffffff', '#ffffff'] : ['#ffffff', '#ffffff']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tab2Style,
              tabStyle,

              ,
              // isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
              // firstTabStyle,
              // lastTabStyle,

              {
                justifyContent: 'center',
                flex: 0.2,
                borderColor: '#2d6dc4',
                borderWidth: 0.7,
                height: 42,
                width: 10,
              },
            ]}>
            <TouchableOpacity
                  // onPress={() => onTabPress(index)}
              style={{
                width: 40,
                height: 25,
                justifyContent: 'center',
              }}>
              {/* <Icon
                name="menu"
                size={25}
                color="#2d6dc4"
                style={{alignSelf: 'center'}}
              /> */}
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <LinearGradient
            // Background Linear Gradient
            colors={
              isTabActive ? ['#5dbde6', '#1d61bd'] : ['#ffffff', '#ffffff']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tab1Style,
              tabStyle,

              ,
              // isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
              // firstTabStyle,
              // lastTabStyle,

              {
                justifyContent: 'center',
                flex: 1,
                borderColor: '#5dbde6',
                borderWidth: 0.7,
                height: 42,
              },
            ]}>
            <TouchableOpacity
              style={
                {
                 
                  width: '100%',
                  alignSelf: 'center',
                  alignItems: 'center',
                }
                //   styles.tabStyle,
                //   tabStyle,
                //   isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
                // firstTabStyle,
                // lastTabStyle,
                // {backgroundColor: index == 0 && 'red'}
              }
              accessible={accessible}
              accessibilityLabel={accessibilityLabel}
              accessibilityTraits={isTabActive ? 'selected' : 'button'}
              accessibilityComponentType="button"
              onPress={() => onTabPress(index)}
              disabled={!enabled}
              activeOpacity={activeTabOpacity}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.tabTextStyle,
                    tabTextStyle,
                    isTabActive
                      ? [styles.activeTabTextStyle, activeTabTextStyle]
                      : {},
                  ]}
                  numberOfLines={textNumberOfLines}
                  allowFontScaling={allowFontScaling}
                  ellipsizeMode="tail">
                  {text}
                </Text>
                {Boolean(badge) && (
                  <View
                    style={[
                      styles.tabBadgeContainerStyle,
                      tabBadgeContainerStyle,
                      isTabActive
                        ? [
                            styles.activeTabBadgeContainerStyle,
                            activeTabBadgeContainerStyle,
                          ]
                        : {},
                    ]}>
                    <Text
                      style={[
                        styles.tabBadgeStyle,
                        tabBadgeStyle,
                        isTabActive
                          ? [styles.activeTabBadgeStyle, activeTabBadgeStyle]
                          : {},
                      ]}
                      allowFontScaling={allowFontScaling}>
                      {badge}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </>
    );
  }
}
