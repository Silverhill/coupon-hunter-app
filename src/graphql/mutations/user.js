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

export const UPDATE_USER = gql`
mutation updateUser($name: String, $email: String, $upload: Upload) {
  updateUser(input : { name: $name, email: $email, upload: $upload }) {
    id
    email
    name
    image
  }
}
`;