import React, { Component } from 'react';
import { View } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { Typo } from '../../src/commons/components';

import CenterView from './CenterView'

const story = storiesOf('Typography', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Title', () => (
  <View>
    <Typo.Title>Titulo</Typo.Title>
    <Typo.Title highlight>Titulo highlight</Typo.Title>
    <Typo.Title error>Titulo error</Typo.Title>
    <Typo.Title secondary>Titulo secondary</Typo.Title>
    <Typo.Title disabled>Titulo disabled</Typo.Title>
    <Typo.Title small>Titulo small</Typo.Title>
  </View>
))

story.add('Text Body', () => (
  <View>
    <Typo.TextBody>Text Body</Typo.TextBody>
    <Typo.TextBody highlight>Text Body highlight</Typo.TextBody>
    <Typo.TextBody error>Text Body error</Typo.TextBody>
    <Typo.TextBody secondary>Text Body secondary</Typo.TextBody>
    <Typo.TextBody disabled>Text Body disabled</Typo.TextBody>
    <Typo.TextBody lead>Text Body lead</Typo.TextBody>
    <Typo.TextBody small>Text Body small</Typo.TextBody>
  </View>
))

story.add('Header', () => (
  <View>
    <Typo.Header>Text Body</Typo.Header>
    <Typo.Header highlight>Text Body highlight</Typo.Header>
    <Typo.Header error>Text Body error</Typo.Header>
    <Typo.Header secondary>Text Body secondary</Typo.Header>
    <Typo.Header disabled>Text Body disabled</Typo.Header>
    <Typo.Header lead>Text Body lead</Typo.Header>
    <Typo.Header small>Text Body small</Typo.Header>
  </View>
))
