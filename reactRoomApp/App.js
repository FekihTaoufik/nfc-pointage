// In App.js in a new project
import * as React from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import Routes from './src/Routes';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
       <Routes />
     </QueryClientProvider>
  );
}

export default App;