
import Hero from './components/Hero';
import CoffeeForm from './components/CoffeeForm';
import Stats from './components/Stats';
import History from './components/History';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import { coffeeConsumptionHistory } from './utils';

function App() {

  const { globalUser, isLoading} = useAuth();
  const globalData = coffeeConsumptionHistory;
  // if globalUser is not null, then the user is authenticated
  const isAuthenticated = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length

  const authenticatedContent = (
    <>
     <Stats />
     <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} /> 
      {( isAuthenticated && isLoading) && (
        <p>Loading data...</p>
      )}
      {(isAuthenticated && isData) && (authenticatedContent) }
    </Layout>
  ) 
}

export default App
