import logo from "./logo.svg";
import "./App.css";
import './css/bootstrap-theme.css';
import './css/bootstrap.css';
import EmailTemplates from './EmailTemplates';


const initialMergeTags = {
  first_name: {
    name: "First Name",
    value: "{{first_name}}"
  },
  last_name: {
    name: "Last Name",
    value: "{{last_name}}"
  }
};
function App() {
  return (
    <div className="App">
      <EmailTemplates initialMergeTags={initialMergeTags} />
    </div>
  );
}

export default App;
