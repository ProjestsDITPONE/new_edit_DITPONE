import React from 'react';
import {connect} from 'react-redux';
import Routes from './Routes';

const AppRoutes = () => {
  return <Routes />;
};

const mapStateToProps = state => {
  return {
    navigationState: state.NavigationReducer,
  };
};

export default connect(mapStateToProps)(AppRoutes);
