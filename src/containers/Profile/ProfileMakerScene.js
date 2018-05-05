import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, ActivityIndicator, Modal, Alert } from 'react-native';
import { Button, HeaderBar, Avatar, Typo, Coupon } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import uuid from 'uuid/v4';
import { Query, withApollo } from 'react-apollo';
import { injectIntl } from 'react-intl';

import { removeAuthenticationAsync } from '../../services/auth';
import { graphqlService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';
import CampaignsByMakerId from '../../components/Campaigns/CampaignsByMakerId';

class ProfileMakerScene extends Component {
  state = {
    modalVisible: false,
    currentDetails: {},
    error: '', //TODO: Manejar los errores y agregarlos
  }

  goToBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  pressCoupon = (campaign) => {
    const { navigation: { state: { params: maker } } } = this.props
    const campaignWithMaker = {
      ...campaign,
      maker,
    };

    this.setState({ currentDetails: campaignWithMaker, modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  render() {
    const { modalVisible, currentDetails } = this.state;
    const { navigation: { state: { params: maker } } } = this.props

    // TODO: add profile slogan
    return (
      <ProfileContainer>
        <HeaderBarContainer>
          <FormattedMessage id="makerProfileScene.titlePage">{(txt) => (
            <HeaderBar backButton={this.goToBack} title={txt} />
          )}</FormattedMessage>
        </HeaderBarContainer>

        <Content>
          <RowContent>
            <Avatar
              size={70}
              source={{ uri: maker.image }}
            />

            <ColumnGroup fullWidth>
              <Typo.Header numberOfLines={1} normal>{maker.name}</Typo.Header>
              <Typo.TextBody small secondary>Cafecito para el alma</Typo.TextBody>
              <Typo.TextBody small secondary>{maker.email}</Typo.TextBody>
            </ColumnGroup>
          </RowContent>

          <RowContent>
            <Typo.Header small bold>Campañas</Typo.Header>
          </RowContent>

          <ContainerScreen>
            <CampaignsByMakerId
              makerId={maker.id}
              onPressCampaign={this.pressCoupon}
            />
          </ContainerScreen>

        </Content>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <CouponDetailScene
            withoutMakerProfile
            onClose={this.handleCloseModal}
            {...currentDetails}
          />
        </Modal>
      </ProfileContainer>
    )
  }
}


const ProfileContainer = styled(View)`
  flex: 1;
`;

const HeaderBarContainer = styled(View)`
`;

const Content = styled(ScrollView)`
  background-color: white;
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


const ContainerScreen = styled(View)`
  flex: 1;
`;

export default withApollo(injectIntl(ProfileMakerScene));