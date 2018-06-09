import React, { PureComponent } from "React";
import { Query } from 'react-apollo';
import { FlatList } from 'react-native';
import { injectIntl } from 'react-intl';
import { HeaderBar, Typo } from 'coupon-components-native';
import Campaign from '../Campaigns/Campaign';
import { Queries } from '../../graphql';

class Campaigns extends PureComponent {
  _keyExtractor = (item, index) => item.id;
  _renderItem = ({ item }) => {
    const { onPressCampaign, onCatchCampaign } = this.props;
    return (
      <Campaign
        campaign={item}
        onPress={onPressCampaign}
        hasBeenCatched={onCatchCampaign}
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
    const { campaigns, networkStatus, refetch, fetchMore } = this.props;
    return (
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
    )
  }
}

export default injectIntl(Campaigns);