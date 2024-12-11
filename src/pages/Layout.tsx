import Header from "../components/Header";
import { ThemeProvider } from "../context/ThemeContext";
import { UserContextProvider } from "../context/UserContext";
import Dashboard from "./Dashboard";

export default function Layout() {
  return (
    <ThemeProvider>
      <Header></Header>
      <main>
        <UserContextProvider>
          <Dashboard></Dashboard>
        </UserContextProvider>
      </main>
    </ThemeProvider>
  );
}
