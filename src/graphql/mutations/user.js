import gql from 'graphql-tag';

export const UPLOAD_IMAGE_USER = gql`
  mutation addImageToUser($upload: Upload!) {
    addImageToUser(upload: $upload) {
      image
      email
      role
      name
    }
  }
`;