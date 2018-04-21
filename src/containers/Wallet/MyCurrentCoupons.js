import React, { Component } from 'react'
import { View, ActivityIndicator, ScrollView, FlatList, Modal, Dimensions } from 'react-native';
import { Typo, HeaderBar, Coupon } from 'coupon-components-native';
import { FormattedMessage } from 'react-intl';
import { injectIntl } from 'react-intl';
import styled, { css } from 'styled-components/native';
import { withApollo, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { Palette } from 'coupon-components-native/styles';
import uuid from 'uuid/v4';

import { graphqlService } from '../../services';
import * as userActions from '../../actions/userActions';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';

const WalletContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
  padding-top: 10;
`;

const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

const ScreenContent = styled(View)`
  flex: 1;

  ${props => props.center && css`
    justify-content: center;
    align-items: center;
  `}
`;

const Container = styled(View)`
  height: 100%;
`;

@connect(state => ({
  myCoupons: state.user.myCoupons,
}),{
  setMyCoupons: userActions.setMyCoupons,
})
class MyCurrentCoupons extends Component {
  state = {
    modalVisible: false,
    error: '',
    currentDetails: {},
  }

  pressCoupon = (campaign) => {
    this.setState({ currentDetails: campaign, modalVisible: true });
  }

  renderCoupon = ({item: coupon }) => {
    const { intl } = this.props;
    const { campaign: _campaign, code, id, status } = coupon;

    const campaign = {
      ..._campaign,
      status,
    };

    const startAt = intl
      .formatDate(campaign.startAt, { month: 'short', day: 'numeric' })
      .toUpperCase();

    const endAt = intl
      .formatDate(campaign.endAt, { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();

    return (
      <StyledCoupon
        {...campaign}
        key={coupon.id}
        onPress={() => this.pressCoupon(campaign)}
        tagButton={{
          onPress: () => console.log('Obtener')
        }}
        startAt={startAt}
        endAt={endAt}
      />
    );
  }

  _loading = () => (<ActivityIndicator size="large" color={Palette.accent} />);
  _error = (error) => {
    return <Typo.TextBody>{error.message}</Typo.TextBody>;
  }

  _keyExtractor = (item, index) => uuid();
  _renderMyCoupons = (coupons = []) => {

    return (
      <FlatList
        keyExtractor={this._keyExtractor}
        renderItem={this.renderCoupon}
        data={coupons}
      />
    )
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  render() {
    const { modalVisible, currentDetails } = this.state;
    const { navigation } = this.props;
    if(!navigation) console.warn('Require pass navigation props to MyCurrentCoupons Component');

    return (
      <WalletContainer>
        <Container>
        <Query query={graphqlService.query.myCoupons}>{({ data, loading, error }) => {

          let screenContent;
          if(loading) screenContent = this._loading();
          else if(error) screenContent = this._error(error);
          else if(data.myCoupons.length > 0) screenContent = this._renderMyCoupons(data.myCoupons);

          return (
            <ScreenContent>
              {screenContent}
            </ScreenContent>
          )
        }}</Query>
        </Container>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
        >
          <CouponDetailScene
            navigation={navigation}
            onClose={this.handleCloseModal}
            {...currentDetails}
          />
        </Modal>
      </WalletContainer>
    )
  }
}

export default withApollo(injectIntl(MyCurrentCoupons));