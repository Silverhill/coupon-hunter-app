import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Achievement, HeaderBar, Typo, ModalOptions, Avatar, Bar, Button } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import { withApollo, Query } from 'react-apollo';
import uuid from 'uuid/v4';

import { removeAuthenticationAsync } from '../../services/auth';
import { Queries } from '../../graphql';
import adam from '../../assets/images/adam.png';
import stars from '../../assets/images/stars.png';

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

  onPressOptions = () => {
    this.setModalVisible(true);
  }

  render() {
    const { openOptions, currentAvatar } = this.state;
    const { navigation } = this.props;

    const options = [
      {label: <FormattedMessage id="commons.editProfile" />, id: uuid(), key: 'edit' },
    ];

    // TODO: add profile phrase o mini bio
    return (
      <ProfileContainer>
        <HeaderBarContainer>
          <FormattedMessage id="profileScene.titlePage">{(txt) => (
            <HeaderBar title={txt} />
          )}</FormattedMessage>
        </HeaderBarContainer>

        <Content>
          <Query query={Queries.ME}>{({ data: { me }, loading, error }) => {
            if(loading) return <Typo.TextBody>loading...</Typo.TextBody>;
            else if(error) return <Typo.TextBody>{error.message}</Typo.TextBody>;

            let avatarProfile = { source: { adam } };
            if(me.image) {
              avatarProfile = { source:{ uri: me.image }}
            }

            return (
              <Content>
                {/* Profile */}
                <RowContent>
                  <Avatar size={70} {...avatarProfile} />
                  <ColumnGroup style={{ marginLeft: 10 }} fullWidth>
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

                {/* Status */}
                <RowContent fullWidth horizontalCenter verticalCenter>
                  <DividerHorizontal top />

                  <ColumnGroup fullWidth>
                    <RowContent fullWidth spaceBetween>
                      <Typo.Header small bold>Hunter Status</Typo.Header>
                      <Typo.TextBody bold color={Palette.neutral.css()}>Level 1</Typo.TextBody>
                    </RowContent>

                    <Bar percentage={0.3}/>

                    <RowContent fullWidth spaceBetween>
                      <Typo.Header small bold>Total: 10 pts</Typo.Header>
                      <Typo.TextBody small color={Palette.neutral.css()}>Siguiente: 100/100 pts</Typo.TextBody>
                    </RowContent>
                  </ColumnGroup>
                </RowContent>

                {/* Stats */}
                <RowContent fullWidth verticalCenter spaceAround>
                  <DividerHorizontal top />

                  <ColumnGroup verticalCenter horizontalCenter>
                    <Achievement color={Palette.secondaryAccent.css()} content={<Typo.Title bold inverted>120</Typo.Title>}/>
                    <SubTitleContainer>
                      <Typo.TextBody center small bold>Promociones Capturadas</Typo.TextBody>
                    </SubTitleContainer>
                  </ColumnGroup>

                  <DividerVertical />

                  <ColumnGroup verticalCenter horizontalCenter>
                    <Achievement color={Palette.colors.aquamarine.css()} content={<Typo.Title bold inverted>50</Typo.Title>}/>
                    <SubTitleContainer>
                      <Typo.TextBody center small bold>Promociones Canjeadas</Typo.TextBody>
                    </SubTitleContainer>
                  </ColumnGroup>
                </RowContent>

                {/* Achievements */}
                <RowContent fullWidth horizontalCenter>
                  <DividerHorizontal top />

                  <ColumnGroup fullWidth>
                    <RowContent fullWidth spaceBetween>
                      <Typo.Header bold center small>Logros</Typo.Header>
                      <Typo.Header color={Palette.neutral.css()} bold center small>0</Typo.Header>
                    </RowContent>

                    <RowContent fullWidth horizontalCenter>
                      <ColumnGroup style={{ paddingVertical: 20, paddingHorizontal: 40 }} fullWidth horizontalCenter verticalCenter backgroundColor={Palette.neutralLight.css()}>
                        <WipImage resizeMode='contain' source={stars} />
                        <Typo.TextBody bold small secondary center>Pronto podrás acceder a nuestro sistema de logros, cumple con los retos y tendrás recompensas en el mundo real.</Typo.TextBody>
                      </ColumnGroup>
                    </RowContent>
                  </ColumnGroup>
                </RowContent>

                {/* Footer Log Out */}
                <RowContent fullWidth horizontalCenter verticalCenter>
                  <LogOutButton
                    onPress={this.signOut}
                    backgroundColor={Palette.accent.css()}
                    shadow={false}
                    title='Cerrar Sesión'
                  />
                </RowContent>
              </Content>
            )
          }}</Query>

        </Content>

        <ModalOptions
          isOpen={openOptions}
          // opacity={0.7}
          cancelLabel={<FormattedMessage id="commons.cancel" />}
          options={options}
          onClickOption={(option) => {
            if(option.key === 'edit') {
              navigation.navigate('ProfileEdit');
              this.setModalVisible(false);
            }
          }}
          onCloseRequest={() => this.setModalVisible(false)}
        />

      </ProfileContainer>
    )
  }
}

const ProfileContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;

const HeaderBarContainer = styled(View)`
`;

const Content = styled(View)`
`;

const RowContent = styled(View)`
  padding-horizontal: 10;
  margin-top: 5;
  padding-vertical: 10;
  flex-direction: row;
  align-items: center;
  background-color: ${Palette.white};

  ${props => props.spaceAround && css`
    justify-content: space-around;
  `};

  ${props => props.spaceBetween && css`
    justify-content: space-between;
  `};
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
  border-radius: 10;
  ${props => props.backgroundColor && css`backgroundColor: ${props.backgroundColor};`};
  ${props => props.fullWidth && css`flex: 1;`};
  ${props => props.verticalCenter && css`align-items: center;`};
  ${props => props.horizontalCenter && css`justify-content: center;`};
  ${props => props.spaceBetween && css`justify-content: space-between;`};
`;

const RowGroup = styled(View)`
  flex-direction: row;
  ${props => props.fullWidth && css`
    flex: 1;
  `};
`;

const DividerVertical = styled(View)`
  height: 90%;
  width: 2;
  background-color: ${Palette.neutral.alpha(0.2).css()};
  margin-left: 20;
`;

const DividerHorizontal = styled(View)`
  width: 90%;
  height: 1;
  background-color: ${Palette.neutral.alpha(0.3).css()};
  position: absolute;
  ${props => props.top && css`
    top: 0;
  `};
  ${props => props.bottom && css`
    bottom: 0;
  `};
`;

const SubTitleContainer = styled(View)`
  width: 100;
`;

const LogOutButton = styled(Button)`
  width: 100%;
`;

const WipImage = styled(Image)`
  width: 200;
  margin-vertical: 40;
`;

export default withApollo(ProfileScene);