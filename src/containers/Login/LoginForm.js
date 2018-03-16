import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Input, Button } from 'coupon-components-native';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginForm = (props) => {
  return (
    <View>
      <Field
        component={Input}
        reduxFormInput
        label="Email"
        placeholder="Nombre"
        autoCorrect={false}
        keyboardType="email-address"
        autoCapitalize="none"
        name="email"
      />
      <Field
        component={Input}
        reduxFormInput
        label="Contraseña"
        placeholder='Contraseña'
        secureTextEntry
        name="password"
      />
      <Button title="Ingresar" onPress={props.handleSubmit} />
    </View>
  )
}

export default connect()(
  reduxForm({
    form: 'login'
  })(LoginForm)
);