import React, { Component } from 'react';
import { View } from 'react-native'

import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import { Input } from '../../src/commons/components'

import CenterView from './CenterView'
import Section from './Section'

const story = storiesOf('Inputs', module)
story.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)

story.add('Basic Input', () => (
  <Section style={{paddingHorizontal: 10}}>
    <Input placeholder='Escribe tu nombre' />
    <Input pill placeholder='Escribe tu nombre, pill input'/>
    <Input label='Nombre' pill placeholder='Nombre' />
    <Input label='Apellidos' placeholder='Apellidos' />
  </Section>
))
