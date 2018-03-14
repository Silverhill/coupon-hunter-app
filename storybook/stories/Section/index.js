import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    alignSelf: 'stretch',
  },
  childStyles : {
    marginBottom: 10,
  }
});

const Section = props => {
  const children = React.Children.toArray(props.children)
    .map((child, i) => {
      const customProps = {
        style: styles.childStyles,
        key: i,
      }

      const Child = child.type
      return <Child {...child.props} {...customProps}/>
    });

  return (
    <View style={[styles.main, props.style]}>{children}</View>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Section as default };
