import { gql } from "apollo-boost";
import { PERSON_DETAILS } from '../fragments/'

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`;