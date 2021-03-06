import React, { Component } from 'react'
import { View } from 'react-native';
import { HeaderBar, Typo, Input, Avatar, PhotoPicker, Loader } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage, injectIntl } from 'react-intl';
import styled, { css } from 'styled-components/native';
import { Query, Mutation } from 'react-apollo';
import { ReactNativeFile } from 'apollo-upload-client';
import uuid from 'uuid/v4';

import { Queries, Mutations } from '../../graphql';
import { UpdateQuery } from '../../services';
import adam from '../../assets/images/adam.png';

class ProfileEditScene extends Component {
  state = {
    currentAvatar: null,
    user: {},
    isUpdating: false,
  }

  goToBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  onChangeText = (text, label) => {
    this.setState(prevState => ({ user: {
      ...prevState.user,
      [label]: text
    } }));
  }

  render() {
    let { currentAvatar, user, isUpdating } = this.state;
    const { intl } = this.props;

    const RightButtonText = (
      <Typo.TextBody color={Palette.secondaryAccent.css()}>{intl.formatMessage({ id: 'commons.updateProfile' })}</Typo.TextBody>
    );

    if(Object.keys(currentAvatar || {}).length > 0) {
      const imageUpload = new ReactNativeFile({
        uri: currentAvatar.uri,
        type: currentAvatar.type,
        name: `profile-${uuid()}.jpg`
      })

      user = {
        ...user,
        image: imageUpload,
      }
    }

    return (
      <ProfileContainer>
        <Mutation
          variables={user}
          update={UpdateQuery.me}
          mutation={Mutations.UPDATE_USER}>{(updateUser, { loading }) => {
            return (
              <HeaderBarContainer>
                <FormattedMessage id="profileScene.edit.titlePage">{(txt) => (
                  <HeaderBar
                    backButton={this.goToBack}
                    title={txt}
                    // loading={loading}
                    rightButton={RightButtonText}
                    onPressRightButton={async () => {
                      this.setState({ isUpdating: true });

                      try {
                        if(Object.keys(user).length > 0) {
                          await updateUser()
                        }
                      } catch (error) {
                        console.log(error);
                      }

                      this.setState({ isUpdating: false });
                    }}
                  />
                )}</FormattedMessage>
              </HeaderBarContainer>
            )
          }
        }
        </Mutation>

        <Content>
          <Query query={Queries.ME}>{({ data: { me }, loading, error }) => {
            if(loading) return <Typo.TextBody>loading...</Typo.TextBody>;
            else if(error) return <Typo.TextBody>{error.message}</Typo.TextBody>;

            let avatar = adam;
            if(me.image) avatar = { uri: me.image };
            if(Object.keys(currentAvatar || {}).length > 0) {
              avatar = { uri: currentAvatar.uri };
            }

            return (
              <Content>
                <RowGroup>
                  <DividerText><FormattedMessage id="commons.avatar"/></DividerText>
                </RowGroup>

                <RowContent horizontalCenter verticalCenter>
                  <ColumnGroup verticalCenter>
                    <Avatar size={100} source={avatar} />

                    <LinkChangePhoto
                      onPickerImage={(result) => this.setState({ currentAvatar: result })}
                      pickPhotoLabel={intl.formatMessage({ id: 'commons.pickPhoto' })}
                      takePhotoLabel={intl.formatMessage({ id: 'commons.takePhoto' })}
                      cancelLabel={intl.formatMessage({ id: 'commons.cancel' })}
                    >
                      <Typo.TextBody  color={Palette.secondaryAccent.css()}>Cambiar foto de perfil</Typo.TextBody>
                    </LinkChangePhoto>
                  </ColumnGroup>
                </RowContent>

                <RowGroup>
                  <DividerText><FormattedMessage id="commons.personalInfo"/></DividerText>
                </RowGroup>

                <RowContent>
                  <ColumnGroup>
                    <InfoInputs
                      label={<FormattedMessage id="commons.name"/>}
                      value={this.state.user.name}
                      defaultValue={me.name}
                      onChangeText={(text) => this.onChangeText(text, 'name')}
                    />
                    <InfoInputs
                      label={<FormattedMessage id="commons.email"/>}
                      value={this.state.user.email}
                      defaultValue={me.email}
                      onChangeText={(text) => this.onChangeText(text, 'email')}
                    />
                  </ColumnGroup>
                </RowContent>
              </Content>
            )
          }}</Query>

          {/* Loader */}
          <Loader
            visible={isUpdating}
            loadingText={intl.formatMessage({id: 'profileScene.edit.updatingProfile'})}
          />
        </Content>
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
  background-color: ${Palette.white};
  flex: 1;
  width: 100%;

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
    width: 100%;
  `};
`;

const DividerVertical = styled(View)`
  height: 100%;
  width: 1;
  background-color: ${Palette.neutral};
  margin-left: 20;
`;

const DividerText = styled(Typo.TextBody)`
  padding: 5px 5px;
`;

const InfoInputs = styled(Input)`
  margin-bottom: 10;
`;

const LinkChangePhoto = styled(PhotoPicker)`
  margin-top: 10;
`;

export default injectIntl(ProfileEditScene);