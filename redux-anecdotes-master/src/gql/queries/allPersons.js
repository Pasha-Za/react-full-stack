import { gql } from "apollo-boost";

export const ALL_PERSONS = gql`
  {
    allPersons {
      name
      id
      phone
    }
  }
`;