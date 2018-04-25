import React, { Component } from 'react'
import { View, FlatList, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Typo, PhotoPicker, Avatar } from 'coupon-components-native';
import { Mutation } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import uuid from 'uuid/v4';
import { ReactNativeFile } from 'apollo-upload-client';
import { ALL_CAMPAIGNS_AND_ME } from '../Campaigns/AllCampaigns';

const UPLOAD_FILE = gql`
  mutation addImageToUser($upload: Upload!) {
    addImageToUser(upload: $upload) {
      image
      email
      role
      name
    }
  }
`;

class UploadProfile extends Component{
  state = {
    stateImage: ''
  }

  render() {
    const { avatar, onPickerImage } = this.props;

    return (
      <Mutation
        mutation={UPLOAD_FILE}
        update={(cache, { data: { addImageToUser  } }) => {
          const { allCampaigns, me } = cache.readQuery({ query: ALL_CAMPAIGNS_AND_ME });

          cache.writeQuery({
            query: ALL_CAMPAIGNS_AND_ME,
            data: {
              allCampaigns: { ...allCampaigns },
              me: { ...me, image: addImageToUser.image },
            },
          })
        }}
      >{(addImageToUser, { data }) => {

        let avatarProfile;
        if(avatar) avatarProfile = {source:{ uri: avatar }}

        return(
          <PhotoPicker
            onPickerImage={async (result) => {
              if(!result) return;
              if(onPickerImage) onPickerImage(result);

              const image = new ReactNativeFile({
                uri: result.uri,
                type: result.type,
                name: `profile-${uuid()}.jpg`
              })

              try {
                await addImageToUser({ variables: { upload: image } })
                Alert.alert('Cool, new image profile is updated!')
              } catch (error) {
                console.log(error);
                Alert.alert('Ups!')
              }
            }}
            cancelLabel={<FormattedMessage id="commons.cancel" />}>
            <Avatar size={70} {...avatarProfile}/>
          </PhotoPicker>
        );
      }}</Mutation>
    )
  }
}

export default UploadProfile;