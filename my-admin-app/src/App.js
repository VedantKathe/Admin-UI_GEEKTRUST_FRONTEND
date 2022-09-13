import "./App.css";
import Admin from "./components/Admin";

export const config = {
  endpoint: `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`,
};

function App() {
  return (
    <div className="App">
      <Admin />
    </div>
  );
}

export default App;
