import React, {Component} from 'react';
import {ImageBackground, Text} from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../utils/I18n';

export default class LiveIcon extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    style: PropTypes.style,
  };

  render() {
    return (
      <ImageBackground
        source={require('../image/LiveHome.png')}
        style={[
          {
            width: 30,
            height: 12,
            alignItems: 'center',
            justifyContent: 'center',
          },
          this.props.style,
        ]}>
        <Text
          style={[
            {
              fontSize: 12,
              color: '#fff',
            },
            this.props.style,
          ]}>
          {I18n.t('translate_Live_HOME')}
        </Text>
      </ImageBackground>
    );
  }
}
