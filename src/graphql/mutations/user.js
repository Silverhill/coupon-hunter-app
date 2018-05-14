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
mutation updateUser($name: String, $email: String, $image: Upload) {
  updateUser(input : { name: $name, email: $email, upload: $image }) {
    id
    email
    name
    image
  }
}
`;

export const SIGN_UP = gql`
  mutation signUp( $email: String!, $password: String!, $company: String, $name: String!){
    signUp(input: { email: $email, password: $password, company: $company, name: $name, role: "hunter" }) {
      id
      name
      email
      role
      company {
        id
        businessName
        slogan
      }
    }
  }
`;
