/* @flow */

import React, {PureComponent} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import type {
  ViewStyleProp,
  TextStyleProp,
} from 'react-native/Libraries/StyleSheet/StyleSheet';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/Fontisto'; 

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
    borderColor: '#0076FF',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  tab1Style: {
    paddingVertical: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#0076FF',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  activeTabStyle: {
    backgroundColor: '#0076FF',
  },
  tabTextStyle: {
    color: '#0076FF',
    fontFamily:'Mitr-Regular'
   
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
    borderWidth:1
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
        {index == 0 ? (
          <LinearGradient
            // Background Linear Gradient
            colors={
              isTabActive ? ['#f7941d', '#fcc63e'] : ['#ebf3f7', '#ebf3f7']
            }
            style={[
              // styles.tab1Style,
              tabStyle,

              ,
              isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
              // firstTabStyle,
              // lastTabStyle,

              {justifyContent: 'center',},
            ]}>
            <TouchableOpacity
              style={{width: 40, height: 25, justifyContent: 'center',}}
              onPress={() => onTabPress(index)}>
              {isTabActive ? (
                <Icon5
                  name="shopping-basket"
                  size={20}
                  color="#FFFFFF"
                  style={{alignSelf: 'center'}}
                />
              ) : (
                <Icon
                  name="shopping-basket"
                  size={20}
                  color="#73838f"
                  style={{alignSelf: 'center'}}
                />
              )}
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={[
              styles.tabStyle,
              tabStyle,
              isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
              // firstTabStyle,
              // lastTabStyle,

              // index === 0 && isTabActive ? {backgroundColor: ['#f7941d']} : {},
              // index === 0 && !isTabActive ? {backgroundColor: '#ebf3f7'} : {},

              // {backgroundColor: index == 0 && 'red'}
            ]}
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
        )}
      </>
    );
  }
}
