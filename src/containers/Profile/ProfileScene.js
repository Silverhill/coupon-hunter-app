import React, { Component } from 'react'
import { View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
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
import { InfoLevel } from '../../services';
import achievements from '../../assets/images/recommended.png';

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

  get modalOptions() {
    const { navigation } = this.props;

    return [
      {
        label: <FormattedMessage id="commons.editProfile" />,
        id: uuid(),
        key: 'edit',
        fn: () => {
          navigation.navigate('ProfileEdit');
          this.setModalVisible(false);
        }
      },
      {
        label: <FormattedMessage id="commons.logOut" />,
        id: uuid(),
        key: 'logout',
        fn: () => this.signOut(),
        cancel: true,
      },
    ];
  }

  render() {
    const { openOptions, currentAvatar } = this.state;
    // TODO: add profile phrase o mini bio
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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

              let avatarProfile = adam;
              if(me.image) {
                avatarProfile = { uri: me.image }
              }

              const profileLevel = new InfoLevel({ points: me.score });
              const currentScore = profileLevel.points;
              const currentLevel = profileLevel.currentLevel();
              const percentageBar = profileLevel.percentage;

              return (
                <Content>
                  {/* Profile */}
                  <RowContent>
                    <Avatar size={70} source={avatarProfile} />
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
                        <Typo.TextBody bold color={Palette.neutral.css()}>Level {currentLevel} - {Math.round(percentageBar * 100)}%</Typo.TextBody>
                      </RowContent>

                      <Bar percentage={percentageBar} />

                      <RowContent fullWidth spaceBetween>
                        <Typo.Header small bold>Total: {currentScore} pts</Typo.Header>
                        <Typo.TextBody small color={Palette.neutral.css()}>Siguiente Nivel: {profileLevel.pointsToNextLevel} pts</Typo.TextBody>
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
                        <Typo.Header color={Palette.neutral.css()} bold center small>0/0</Typo.Header>
                      </RowContent>

                      <RowContent fullWidth horizontalCenter>
                        <ColumnGroup style={{ paddingVertical: 20, paddingHorizontal: 40 }} fullWidth horizontalCenter verticalCenter backgroundColor={Palette.neutralLight.css()}>
                          <WipImage resizeMode='contain' source={achievements} />
                          <Typo.TextBody bold small secondary center>Pronto podrás acceder a nuestro sistema de logros, cumple con los retos y tendrás recompensas en el mundo real.</Typo.TextBody>
                        </ColumnGroup>
                      </RowContent>
                    </ColumnGroup>
                  </RowContent>
                </Content>
              )
            }}</Query>

          </Content>

          <ModalOptions
            isOpen={openOptions}
            options={this.modalOptions}
            onCloseRequest={() => this.setModalVisible(false)}
          />

        </ProfileContainer>
      </SafeAreaView>
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

  ${props => props.flexEnd && css`
    justify-content: flex-end;
  `};

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