import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, HeaderBar, Typo, ModalOptions } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { withApollo, Query } from 'react-apollo';
import uuid from 'uuid/v4';
import UploadProfile from '../../components/User/UploadProfile';

import { removeAuthenticationAsync } from '../../services/auth';
import { Queries } from '../../graphql';

@connect((state) => ({
  auth: state.user.auth,
}))
class ProfileScene extends Component {
  state = {
    openOptions: false,
    currentAvatar: ''
  }

  setModalVisible(visible) {
    this.setState({openOptions: visible});
  }

  signOut = async () => {
    const { navigation, auth, client } = this.props;

    if(auth.logged) {
      await removeAuthenticationAsync();
      client.resetStore(); // TODO: necesitamos confirmar el reset store
      navigation.navigate('Auth');
    }
  }

  goToBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  onPressOptions = () => {
    this.setModalVisible(true);
  }

  render() {
    const { openOptions, currentAvatar } = this.state;

    const options = [
      {label: <FormattedMessage id="commons.editProfile" />, id: uuid(), key: 'edit' },
    ];

    let avatarProfile;
    if(currentAvatar) {
      avatarProfile = {source:{ uri: currentAvatar }}
    }

    // TODO: add profile phrase o mini bio
    return (
      <ProfileContainer>
        <HeaderBarContainer>
          <FormattedMessage id="profileScene.titlePage">{(txt) => (
            <HeaderBar backButton={this.goToBack} title={txt} />
          )}</FormattedMessage>
        </HeaderBarContainer>

        <Content>
          <Query query={Queries.ME}>{({ data: { me }, loading, error }) => {
            if(loading) return <Typo.TextBody>loading...</Typo.TextBody>;
            else if(error) return <Typo.TextBody>{error.message}</Typo.TextBody>;

            return (
              <RowContent>
                <UploadProfile avatar={me.image} />

                <ColumnGroup fullWidth>
                  <Typo.Header numberOfLines={1} normal>{me.name}</Typo.Header>
                  <Typo.TextBody small secondary>Cafecito para el alma</Typo.TextBody>
                  <Typo.TextBody small secondary>{me.email}</Typo.TextBody>
                </ColumnGroup>

                <RowGroup>
                  <TouchableOpacity onPress={this.onPressOptions}>
                    <Entypo name="cog" size={30}/>
                  </TouchableOpacity>
                </RowGroup>
              </RowContent>
            )
          }}</Query>

          <RowContent fullWidth horizontalCenter>
            <ColumnGroup>
              <Typo.Header center small>410</Typo.Header>
              <Typo.TextBody small secondary>capturados</Typo.TextBody>
            </ColumnGroup>

            <DividerVertical/>

            <ColumnGroup>
              <Typo.Header center small>200</Typo.Header>
              <Typo.TextBody small secondary>canjeados</Typo.TextBody>
            </ColumnGroup>

            <DividerVertical/>

            <ColumnGroup>
              <Typo.Header center small>210</Typo.Header>
              <Typo.TextBody small secondary>perdidos</Typo.TextBody>
            </ColumnGroup>
          </RowContent>

          <RowContent fullWidth horizontalCenter>
            <TouchableOpacity onPress={this.signOut}>
              <Typo.Header highlight small>Cerrar Sesión</Typo.Header>
            </TouchableOpacity>
          </RowContent>

        </Content>

        <ModalOptions
          isOpen={openOptions}
          // opacity={0.7}
          cancelLabel={<FormattedMessage id="commons.cancel" />}
          options={options}
          onClickOption={(option) => console.log('click', option)}
          onCloseRequest={() => this.setModalVisible(false)}
        />

      </ProfileContainer>
    )
  }
}

const ProfileContainer = styled(View)`
  flex: 1;
`;

const HeaderBarContainer = styled(View)`
`;

const Content = styled(View)`
`;

const RowContent = styled(View)`
  margin-bottom: 5;
  padding-horizontal: 10;
  margin-top: 5;
  padding-vertical: 10;
  flex-direction: row;
  align-items: center;
  background-color: ${Palette.white};

  ${props => props.fullWidth && css`
    width: 100%;
  `};
  ${props => props.verticalCenter && css`
    align-items: center;
  `};
  ${props => props.horizontalCenter && css`
    justify-content: center;
  `};
`;

const ColumnGroup = styled(View)`
  flex-direction: column;
  margin-left: 20;

  ${props => props.fullWidth && css`
    flex: 1;
  `};
  ${props => props.verticalCenter && css`
    align-items: center;
  `};
  ${props => props.horizontalCenter && css`
    justify-content: center;
  `};
`;

const RowGroup = styled(View)`
  flex-direction: row;
  ${props => props.fullWidth && css`
    flex: 1;
  `};
`;

const DividerVertical = styled(View)`
  height: 100%;
  width: 1;
  background-color: ${Palette.neutral};
  margin-left: 20;
`;

export default withApollo(ProfileScene);