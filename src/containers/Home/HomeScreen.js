import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Text, ScrollView, AsyncStorage, StatusBar, View } from 'react-native';
import { Button, HeaderBar, Coupon } from 'coupon-components-native';
import styled from 'styled-components/native';
import { FormattedDate, injectIntl } from 'react-intl';
import { withApollo } from 'react-apollo';
import { HEADER_AUTHENTICATION_KEY } from '../../constants';
import { query } from '../../services/graphql';
import * as userActions from '../../actions/userActions';
import { graphqlService } from '../../services';

const TodayContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;

const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

@connect(state => ({ user: state.user }), {
  setUserProfile: userActions.setUserProfile,
})
class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    header: null,
  }

  state = {
    loading: true,
  }

  // componentWillReceiveProps(nextProps) {
  //   const { setUserProfile } = this.props;
  //   if(nextProps.data.me) setUserProfile(nextProps.data.me);
  // }

  async componentDidMount() {
    const { client: { query }, setUserProfile } = this.props;

    try {
      const { data: { me }, loading } = await query({
        query: graphqlService.query.getMyInfo,
      });

      setUserProfile(me)
      this.setState({ loading });

    } catch (error) {
      console.log(error)
      return;
    }
  }

  goToProfile = () => {
    const { navigation } = this.props;
    navigation.navigate('Profile');
  }

  pressCoupon = () => {
    const { navigation } = this.props;
    navigation.navigate('CouponExtended');
  }

  render() {
    const { loading } = this.state;
    const { user: { profile }, intl } = this.props;

    if(loading) return <Text>Loading...</Text>
    // else if(error) return <Text>{error.message}</Text>

    return (
      <TodayContainer>
        <HeaderBar
          title='Hoy'
          date={intl.formatDate(Date.now(), { year: 'numeric', month: 'long', day: '2-digit' })}
          avatarOptions={{
            source: {uri: 'https://i.pinimg.com/originals/11/0f/00/110f0057f178a5f1357925aad67a9dd4.png'},
            onPress: this.goToProfile,
          }}
        />

        <StyledCoupon
          onPress={this.pressCoupon}
          imageSource={{ uri: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82203e4d57fc0d3bdd8ffc0f66d09763&auto=format&fit=crop&w=1525&q=80" }}
          avatarSource={{ uri: "https://images.unsplash.com/profile-1481466571593-63d100a3cbd1?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" }}
          numberOfCoupons={ 50 }
          title="2x1 en Hamburguesas Mexicanas"
          subTitle="Carbon Burguer"
          date="11 de Marzo - 12 de Abril"
        />

        <StyledCoupon
          imageSource={{ uri: "https://images.unsplash.com/photo-1485921198582-a55119c97421?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c6d9cabdc7f046b490c67663caa3754e&auto=format&fit=crop&w=800&q=60" }}
          avatarSource={{ uri: "https://images.unsplash.com/profile-1455100486911-21a209bba0cf?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" }}
          numberOfCoupons={ 120 }
          title="Picaditas"
          subTitle="Avenue"
          date="11 de Marzo - 12 de Abril"
        />

        <StyledCoupon
          imageSource={{ uri: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9443baefd581d4e532b6d4f1e7879be&auto=format&fit=crop&w=800&q=60" }}
          avatarSource={{ uri: "https://images.unsplash.com/profile-1481466571593-63d100a3cbd1?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" }}
          numberOfCoupons={ 200 }
          title="50% descuento en Parmesana"
          subTitle="Pizzería Roma"
          date="11 de Marzo - 12 de Abril"
        />
      </TodayContainer>
    )
  }
}

export default withApollo(injectIntl(HomeScreen))