import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import { Text, ScrollView, AsyncStorage, StatusBar, View, Alert, Modal } from 'react-native';
import { Button, HeaderBar, Coupon } from 'coupon-components-native';
import styled from 'styled-components/native';
import { FormattedDate, injectIntl } from 'react-intl';
import { withApollo } from 'react-apollo';
import { HEADER_AUTHENTICATION_KEY } from '../../constants';
import { query } from '../../services/graphql';
import * as userActions from '../../actions/userActions';
import { graphqlService } from '../../services';
import CouponDetailScene from '../CouponDetail/CouponDetailScene';

const TodayContainer = styled(ScrollView)`
  flex: 1;
  background-color: white;
`;

const StyledCoupon = styled(Coupon)`
  margin-bottom: 10;
`;

const CampaignsContainer = styled(View)`
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
    modalVisible: false,
    currentDetails: {},
  }

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

  pressCoupon = (campaign) => {
    this.setState({ currentDetails: campaign, modalVisible: true });
  }

  handleCloseModal = () => {
    this.setState({ modalVisible: false, currentDetails: {} });
  }

  get getCampaigns() {
    return [
      {
        id: 0,
        imageSource: { uri: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82203e4d57fc0d3bdd8ffc0f66d09763&auto=format&fit=crop&w=1525&q=80" },
        avatarSource: { uri: "https://images.unsplash.com/profile-1481466571593-63d100a3cbd1?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" },
        numberOfCoupons: 150,
        title:"2x1 en Hamburguesas Mexicanas",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos natus, odit excepturi ex totam nulla aliquid mollitia, blanditiis iste esse velit consequatur labore culpa laborum ullam molestiae! Iure, eveniet nobis.",
        direction:"24 de Mayo y segundo cueva celi, esq. Departamento 81",
        date:"11 de Marzo - 12 de Abril",
        status:"available",
        maker: {
          name: "Carbon Burguer",
          slogan: "Hamburguesa para el alma",
        }
      },
      {
        id: 1,
        imageSource: { uri: "https://images.unsplash.com/photo-1485921198582-a55119c97421?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c6d9cabdc7f046b490c67663caa3754e&auto=format&fit=crop&w=800&q=60" },
        avatarSource: { uri: "https://images.unsplash.com/profile-1455100486911-21a209bba0cf?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" },
        numberOfCoupons: 30,
        title:"2x1 en Hamburguesas Mexicanas",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos natus, odit excepturi ex totam nulla aliquid mollitia, blanditiis iste esse velit consequatur labore culpa laborum ullam molestiae! Iure, eveniet nobis.",
        direction:"24 de Mayo y segundo cueva celi, esq. Departamento 81",
        date:"11 de Marzo - 12 de Abril",
        status:"available",
        maker: {
          name: "Carbon Burguer",
          // slogan: "Hamburguesa para el alma",
        }
      },
      {
        id: 2,
        imageSource: { uri: "https://images.unsplash.com/photo-1481070414801-51fd732d7184?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=82203e4d57fc0d3bdd8ffc0f66d09763&auto=format&fit=crop&w=1525&q=80" },
        avatarSource: { uri: "https://images.unsplash.com/profile-1481466571593-63d100a3cbd1?dpr=2&auto=format&fit=crop&w=64&h=64&q=60&cs=tinysrgb&crop=faces&bg=fff" },
        numberOfCoupons: 1200,
        title:"2x1 en Hamburguesas Mexicanas",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos natus, odit excepturi ex totam nulla aliquid mollitia, blanditiis iste esse velit consequatur labore culpa laborum ullam molestiae! Iure, eveniet nobis. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos natus, odit excepturi ex totam nulla aliquid mollitia, blanditiis iste esse velit consequatur labore culpa laborum ullam molestiae! Iure, eveniet nobis.",
        direction:"24 de Mayo y segundo cueva celi, esq. Departamento 81",
        date:"11 de Marzo - 12 de Abril",
        status: "available",
        maker: {
          name: "Carbon Burguer",
          slogan: "Hamburguesa para el alma",
        }
      }
    ]
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

        <CampaignsContainer>
          {(this.getCampaigns || []).map((campaign) =>
            <StyledCoupon key={campaign.id} {...campaign} onPress={() => this.pressCoupon(campaign)}/>
          )}
        </CampaignsContainer>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <CouponDetailScene {...this.props} {...this.state.currentDetails} onClose={this.handleCloseModal}/>
        </Modal>
      </TodayContainer>
    )
  }
}

export default withApollo(injectIntl(HomeScreen))