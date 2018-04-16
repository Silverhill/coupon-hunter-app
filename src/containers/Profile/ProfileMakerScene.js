import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Modal } from 'react-native';
import { Button, HeaderBar, Avatar, Typo, Coupon } from 'coupon-components-native';
import { Palette } from 'coupon-components-native/styles';
import { FormattedMessage } from 'react-intl';
import styled, { css } from 'styled-components/native';
import { Entypo } from '@expo/vector-icons';
import uuid from 'uuid/v4';
import { withApollo } from 'react-apollo';
import { injectIntl } from 'react-intl';

import { removeAuthenticationAsync } from '../../services/auth';
import { graphqlService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';

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

const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

const ContainerScreen = styled(View)`
  flex: 1;
`;

class ProfileMakerScene extends Component {
  state = {
    campaigns: [],
    modalVisible: false,
    loading: true,
    currentDetails: {},
    error: '', //TODO: Manejar los errores y agregarlos
  }

  async componentDidMount() {
    const { client, navigation: { state: { params } } } = this.props

    try {
      const res = await client.query({
        query: graphqlService.query.campaignsByMakerId,
        variables: { makerId: params.id },
      });

      const { data: { campaignsByMakerId }, loading } = res;

      this.setState({ campaigns: campaignsByMakerId, loading })
    } catch (error) {
      console.log(error.message);
    }
  }

  goToBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  pressCoupon = (campaign) => {
    this.setState({ currentDetails: campaign, modalVisible: true });
  }

  _renderItem = ({item: campaign }) => {
    const { intl } = this.props;

    const startAt = intl
      .formatDate(campaign.startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();

    const endAt = intl
      .formatDate(campaign.endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();

    return (
      <StyledCoupon
        {...campaign}
        key={uuid()}
        onPress={() => this.pressCoupon(campaign)}
        tagButton={{
          onPress: () => console.log('Obtener')
        }}
        startAt={startAt}
        endAt={endAt}
      />
    );
  }
  _keyExtractor = (item, index) => uuid();
  _renderCampaigns = (campaigns) => {
    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        data={campaigns}
      />
    );
  }
  _loading = () => (<ActivityIndicator size="large" color={Palette.accent} />);
  _error = (error) => {
    return <Typo.TextBody>{error.message}</Typo.TextBody>;
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  render() {
    const { loading, error, campaigns, modalVisible, currentDetails } = this.state;
    const { navigation: { state: { params } } } = this.props

    let currentContent;
    if(loading) currentContent = this._loading()
    else if(error) currentContent = this._error(error);
    else if(campaigns.length > 0) currentContent = this._renderCampaigns(campaigns);

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
              source={{ uri: 'https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png' }}
            />

            <ColumnGroup fullWidth>
              <Typo.Header numberOfLines={1} normal>{params.name}</Typo.Header>
              <Typo.TextBody small secondary>Cafecito para el alma</Typo.TextBody>
              <Typo.TextBody small secondary>{params.email}</Typo.TextBody>
            </ColumnGroup>
          </RowContent>


          <RowContent>
            <Typo.Header small bold>Campañas</Typo.Header>
          </RowContent>

          <ContainerScreen>
            {currentContent}
          </ContainerScreen>

        </Content>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <CouponDetailScene
            onClose={this.handleCloseModal}
            {...currentDetails}
          />
        </Modal>
      </ProfileContainer>
    )
  }
}

export default withApollo(injectIntl(ProfileMakerScene));