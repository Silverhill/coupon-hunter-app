import React, { Component } from 'react'
import { View, FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Typo, PhotoPicker, Avatar } from 'coupon-components-native';
import { Mutation } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { ReactNativeFile } from 'apollo-upload-client';
import { Queries, Mutations } from '../../graphql';

class UploadProfile extends Component{
  state = {
    stateImage: ''
  }

  _onPickerImage = async (result, mutation) => {
    const { onPickerImage } = this.props;

    if(!result) return;
    if(onPickerImage) onPickerImage(result);

    const image = new ReactNativeFile({
      uri: result.uri,
      type: result.type,
      name: `profile-${uuid()}.jpg`
    })

    try {
      await this.setState({ stateImage: result.uri });

      await mutation.addImageToUser({ variables: { upload: image } })

      Alert.alert('Cool, new image profile is updated!')
      await this.setState({ stateImage: '' });
    } catch (error) {
      console.log(error);

      this.setState({ stateImage: '' });
      Alert.alert('Ups!')
    }
  }

  render() {
    const { avatar, onPickerImage } = this.props;
    const { stateImage } = this.state;

    return (
      <Mutation
        mutation={Mutations.UPLOAD_IMAGE_USER}
        update={(cache, { data: { addImageToUser  } }) => {
          const { allCampaigns, me } = cache.readQuery({ query: Queries.ALL_CAMPAIGNS_AND_ME });

          cache.writeQuery({
            query: Queries.ALL_CAMPAIGNS_AND_ME,
            data: {
              allCampaigns: { ...allCampaigns },
              me: { ...me, image: addImageToUser.image },
            },
          })
        }}
      >{(addImageToUser, { data }) => {

        let avatarProfile
        if(avatar) avatarProfile = {source:{ uri: avatar }}
        if(stateImage) avatarProfile = {source:{ uri: stateImage }};

        return(
          <PhotoPicker
            onPickerImage={(result) => this._onPickerImage(result, {addImageToUser})}
            cancelLabel={<FormattedMessage id="commons.cancel" />}>
            <Avatar size={70} {...avatarProfile}/>
          </PhotoPicker>
        );
      }}</Mutation>
    )
  }
}

export default UploadProfile;