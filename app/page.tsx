import { gql } from '@apollo/client';
import Image from 'next/image';
import { initializeApollo } from '../util/client';
import GitHubProfile from './GitHubProfile';

type GitHubProfileResponse = {
  user: {
    name: string;
    avatarUrl: string;
    repositories: {
      edges: {
        node: {
          name: string;
          id: string;
        };
      }[];
    };
  };
};

export default async function HomePage() {
  const client = initializeApollo(null);
  const { data } = await client.query<GitHubProfileResponse>({
    query: gql`
      query profileQuery($username: String = "diasospanov") {
        user(login: $username) {
          name
          avatarUrl
          repositories(last: 10) {
            edges {
              node {
                name
                defaultBranchRef {
                  name
                  id
                }
              }
            }
          }
        }
      }
    `,
  });

  return (
    <main>
      <ApolloClientProvider
        initialApolloState={JSON.stringify(client.cache.extract())}
      >
        <GitHubProfile />
      </ApolloClientProvider>
    </main>
  );
}
