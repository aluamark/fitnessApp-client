import UserProvider from "./context/UserContext";

export default function Provider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
