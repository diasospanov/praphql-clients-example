'use client';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../util/client';

export default function ApolloClientProvider(props) {
  const apolloClient = useApollo(JSON.parse(props.initialApolloState));

  return (
    <ApolloProvider client={apolloClient}>{props.children}</ApolloProvider>
  );
}
