'use client';

import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';

const githubQuery = gql`
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
`;

export default function GitHubProfile() {
  const [username, setUsername] = useState('');
  const { loading, error, data, refetch } = useQuery(githubQuery, {
    variables: {
      name: 'diasospanov',
    },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <form>
        <input value={username} onChange={(event)=> setUsername(event.currentTarget.value)} />
        <button onClick={()=>}>Get Profile</button>
      </form>
    </div>
  )
}
