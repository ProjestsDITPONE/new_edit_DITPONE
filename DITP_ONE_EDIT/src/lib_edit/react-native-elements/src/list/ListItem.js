import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Switch,
  TouchableHighlight,
  View,
} from 'react-native';

import { renderNode, nodeType } from '../helpers';
import { withTheme } from '../config';

import Avatar from '../avatar/Avatar';
import Badge from '../badge/Badge';
import CheckBox from '../checkbox/CheckBox';
import Icon from '../icons/Icon';
import Text from '../text/Text';
import ButtonGroup from '../buttons/ButtonGroup';
import Input from '../input/Input';

const ANDROID_SECONDARY = 'rgba(0, 0, 0, 0.54)';

const chevronDefaultProps = {
  type: Platform.OS === 'ios' ? 'ionicon' : 'material',
  color: '#bcbccb',
  name: Platform.OS === 'ios' ? 'ios-arrow-forward' : 'keyboard-arrow-right',
  size: 18,
};

const checkmarkDefaultProps = theme => ({
  name: 'check',
  size: 20,
  color: theme.colors.primary,
});

const renderText = (content, defaultProps, style) =>
  renderNode(Text, content, {
    ...defaultProps,
    style: StyleSheet.flatten([style, defaultProps && defaultProps.style]),
  });

const renderAvatar = content =>
  renderNode(Avatar, content, {
    size: 40,
    rounded: true,
  });

const renderIcon = content =>
  renderNode(Icon, content, {
    color: Platform.OS === 'ios' ? null : ANDROID_SECONDARY,
    size: 24,
  });

const ListItem = props => {
  const {
    title,
    titleStyle,
    titleProps,
    subtitle,
    subtitleStyle,
    subtitleProps,
    containerStyle,
    onPress,
    onLongPress,
    Component = onPress || onLongPress ? TouchableHighlight : View,
    leftIcon,
    leftAvatar,
    leftElement,
    rightIcon,
    rightAvatar,
    rightElement,
    rightTitle,
    rightTitleStyle,
    rightTitleProps,
    rightSubtitle,
    rightSubtitleStyle,
    rightSubtitleProps,
    input,
    buttonGroup,
    switch: switchProps, // switch is a reserved keyword
    checkBox,
    badge,
    chevron,
    contentContainerStyle,
    rightContentContainerStyle,
    checkmark,
    disabled,
    disabledStyle,
    bottomDivider,
    topDivider,
    pad,
    linearGradientProps,
    ViewComponent = linearGradientProps && global.Expo
      ? global.Expo.LinearGradient
      : View,
    theme,
    ...attributes
  } = props;
  return (
    <Component
      {...attributes}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <PadView
        Component={ViewComponent}
        {...linearGradientProps}
        style={StyleSheet.flatten([
          styles.container(theme),
          (buttonGroup || switchProps) && { paddingVertical: 8 },
          topDivider && { borderTopWidth: StyleSheet.hairlineWidth },
          bottomDivider && { borderBottomWidth: 3, borderColor: '#3978c008' },
          containerStyle,
          disabled && disabledStyle,
        ])}
        pad={pad}
      >
        {renderNode(Text, leftElement)}
        {renderIcon(leftIcon)}
        {renderAvatar(leftAvatar)}

        {(typeof title !== 'undefined' || subtitle) && (
          <View
            style={StyleSheet.flatten([
              styles.contentContainer,
              contentContainerStyle,
            ])}
          >
            {renderText(
              title,
              { testID: 'listItemTitle', ...titleProps },
              StyleSheet.flatten([styles.title, titleStyle])
            )}
            {renderText(
              subtitle,
              subtitleProps,
              StyleSheet.flatten([styles.subtitle, subtitleStyle])
            )}
          </View>
        )}

        {(!!rightTitle || !!rightSubtitle) && (
          <View
            style={StyleSheet.flatten([
              styles.rightContentContainer,
              rightContentContainerStyle,
            ])}
          >
            {renderText(
              rightTitle,
              rightTitleProps,
              StyleSheet.flatten([
                styles.title,
                styles.rightTitle,
                rightTitleStyle,
              ])
            )}

            {renderText(
              rightSubtitle,
              rightSubtitleProps,
              StyleSheet.flatten([
                styles.subtitle,
                styles.rightSubtitle,
                rightSubtitleStyle,
              ])
            )}
          </View>
        )}

        {input && (
          <Input
            renderErrorMessage={false}
            {...input}
            inputStyle={StyleSheet.flatten([
              styles.input,
              input && input.inputStyle,
            ])}
            inputContainerStyle={StyleSheet.flatten([
              styles.inputContentContainer,
              input && input.inputContainerStyle,
            ])}
            containerStyle={StyleSheet.flatten([
              styles.inputContainer,
              input && input.containerStyle,
            ])}
          />
        )}
        {switchProps && <Switch {...switchProps} />}
        {checkBox && (
          <CheckBox
            {...checkBox}
            containerStyle={StyleSheet.flatten([
              styles.checkboxContainer,
              checkBox && checkBox.containerStyle,
            ])}
          />
        )}
        {badge && <Badge {...badge} />}
        {buttonGroup && (
          <ButtonGroup
            {...buttonGroup}
            containerStyle={StyleSheet.flatten([
              styles.buttonGroupContainer,
              buttonGroup && buttonGroup.containerStyle,
            ])}
          />
        )}
        {renderAvatar(rightAvatar)}
        {renderIcon(rightIcon)}
        {renderNode(Text, rightElement)}
        {renderNode(Icon, checkmark, checkmarkDefaultProps(theme))}
        {renderNode(Icon, chevron, chevronDefaultProps)}
      </PadView>
    </Component>
  );
};

const styles = {
  container: theme => ({
    ...Platform.select({
      ios: {
        padding: 14,
      },
      default: {
        padding: 16,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: theme.colors.divider,
  }),
  title: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      default: {
        color: ANDROID_SECONDARY,
        fontSize: 14,
      },
    }),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContentContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputContainer: {
    flex: 1,
    paddingRight: 0,
  },
  inputContentContainer: {
    flex: 1,
    borderBottomWidth: 0,
    width: null,
    height: null,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    width: null,
    height: null,
  },
  checkboxContainer: {
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
    padding: 0,
  },
  buttonGroupContainer: {
    flex: 1,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  rightTitle: {
    color: ANDROID_SECONDARY,
  },
  rightSubtitle: {
    color: ANDROID_SECONDARY,
  },
};

ListItem.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  contentContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  rightContentContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  Component: PropTypes.elementType,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  titleProps: PropTypes.object,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  subtitleProps: PropTypes.object,
  leftIcon: nodeType,
  leftAvatar: nodeType,
  leftElement: nodeType,
  rightIcon: nodeType,
  rightAvatar: nodeType,
  rightElement: nodeType,
  rightTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rightTitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rightTitleProps: PropTypes.object,
  rightSubtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  rightSubtitleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rightSubtitleProps: PropTypes.object,
  input: PropTypes.object,
  buttonGroup: PropTypes.object,
  switch: PropTypes.object,
  checkBox: PropTypes.object,
  badge: PropTypes.object,
  chevron: nodeType,
  checkmark: nodeType,
  disabled: PropTypes.bool,
  disabledStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  topDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  pad: PropTypes.number,
  linearGradientProps: PropTypes.object,
  ViewComponent: PropTypes.elementType,
  theme: PropTypes.object,
};

ListItem.defaultProps = {
  pad: 16,
  title: '',
};

class PadView extends React.Component {
  constructor(props) {
    super(props);
    this._root = React.createRef();
  }

  setNativeProps = nativeProps => {
    this._root.current.setNativeProps(nativeProps);
  };

  render() {
    const { children, pad, Component, ...props } = this.props;
    const childrens = React.Children.toArray(children);
    const { length } = childrens;
    const Container = Component || View;
    return (
      <Container {...props} ref={this._root}>
        {React.Children.map(
          childrens,
          (child, index) =>
            child && [child, index !== length - 1 && <View width={pad} />]
        )}
      </Container>
    );
  }
}

PadView.propTypes = {
  children: PropTypes.node,
  pad: PropTypes.number,
  Component: PropTypes.elementType,
};

export { ListItem };
export default withTheme(ListItem, 'ListItem');
