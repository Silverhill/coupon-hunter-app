import React, { PureComponent } from 'react'
import { View, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Typo } from 'coupon-components-native';
import { Query } from 'react-apollo';
import { injectIntl } from 'react-intl';
import uuid from 'uuid/v4';

import Campaign from '../Campaigns/Campaign';
import { HeaderBar } from 'coupon-components-native';
import { Queries } from '../../graphql';

class AllCampaigns extends PureComponent {
  _keyExtractor = (item, index) => uuid();
  _renderItem = ({ item }) => {
    const { onPressCampaign } = this.props;

    return (
      <Campaign
        campaign={item}
        onPress={onPressCampaign}
      />
    );
  }

  _renderHeader = () => {
    const { intl } = this.props;
    return (
      <Query query={Queries.ME}>{({ loading, data, error }) => {
        if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

        let subTitle;
        if(!loading) {
          const { me } = data;
          subTitle = intl.formatMessage({ id: 'commons.greetings' }, { name: me.name });
        }

        const title = intl.formatMessage({ id: 'todayScreen.header' });

        return (<HeaderBar title={title} subTitle={!loading && subTitle}/>);
      }}
      </Query>
    )
  }

  render() {
    return (
      <Query query={Queries.ALL_CAMPAIGNS}>
      {({ loading, data, error, networkStatus, refetch, fetchMore }) => {
        if(loading) return <Typo.TextBody>Loading...</Typo.TextBody>;
        else if(error) return <Typo.TextBody>{`Error:${error.name} ${error.message}`}</Typo.TextBody>

        const { allCampaigns: { campaigns } } = data;
        return (
          <ScreenContent>
            <FlatList
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              data={campaigns}
              ListHeaderComponent={this._renderHeader}
              refreshing={networkStatus === 4}
              onRefresh={() => refetch()}
              onEndReached={() => {
                fetchMore({
                  variables: { skip: campaigns.length },
                  updateQuery: (prevResults, { fetchMoreResult }) => {
                    if (!fetchMoreResult || fetchMoreResult.allCampaigns.campaigns.length === 0) return prevResults;

                    return {
                      allCampaigns: {
                        ...prevResults.allCampaigns,
                        campaigns: [...prevResults.allCampaigns.campaigns, ...fetchMoreResult.allCampaigns.campaigns]
                      }
                    }
                  }
                })
              }}
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