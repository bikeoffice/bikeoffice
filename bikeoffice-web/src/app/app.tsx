import { Admin, ListGuesser, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { authProvider } from '../authProvider';


export function App() {
  return (
    <div>
      <Admin dataProvider={simpleRestProvider("/api")} authProvider={authProvider}>
        <Resource name="users" list={ListGuesser} />
        <Resource name="employees" list={ListGuesser} />
      </Admin>
    </div>
  );
}

export default App;
