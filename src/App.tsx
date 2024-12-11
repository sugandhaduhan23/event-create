import { useEffect } from "react";
import Layout from "./pages/Layout"
import { addUsersToDB } from "./utils/loadData";
import { getUsers } from "./services/user.service";

function App() {
  //This is not related to the implementation
  //This function has been implemented to load the initial data into indexedDB
  useEffect(() => {
    async function loadDataIntoDB(){
      const data = await getUsers();
      if(!data.length)
        await addUsersToDB();
    }
    loadDataIntoDB();
  }, [])
  return <Layout></Layout>;
}

export default App;
