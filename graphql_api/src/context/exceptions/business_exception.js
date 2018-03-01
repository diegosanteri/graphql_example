import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
  constructor(error) {
    super(error);
  }
}

export default ValidationError;