import React, { PureComponent } from 'react'
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';
import { injectIntl } from 'react-intl';

import Campaign from '../Campaigns/Campaign';
import { HeaderBar, Typo } from 'coupon-components-native';
import { Queries, Subscriptions } from '../../graphql';
import Campaigns from './Campaigns';
import Loading from '../Animations/Loading';

class AllCampaigns extends PureComponent {
  render() {
    const { onPressCampaign, onCatchCampaign, intl } = this.props;
    return (
      <Query query={Queries.ALL_CAMPAIGNS}>
      {({ loading, data, error, subscribeToMore, ...results }) => {

        if(loading) return <Loading loadingText={ intl.formatMessage({ id:'todayScreen.loading' })} />;
        else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

        const { allCampaigns: { campaigns } } = data;

        return (
          <ScreenContent>
            <Campaigns
            {...results}
            campaigns={campaigns}
            onPressCampaign={onPressCampaign}
            onCatchCampaign={onCatchCampaign}
          />
          </ScreenContent>
        );
      }}
      </Query>
    )
  }
}

const ScreenContent = styled(View)`
  flex: 1;

  ${props => props.center && css`
    justify-content: center;
    align-items: center;
  `}
`;

export default injectIntl(AllCampaigns);