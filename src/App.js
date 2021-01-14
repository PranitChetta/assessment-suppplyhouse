import { useState } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormBuilder from "./FormBuilder";
import Preview from "./Preview";


function App() {
  const [key, setKey] = useState("home");
  return (
    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey="form_builder" title="Form Builder App">
        <FormBuilder />
      </Tab>
      <Tab eventKey="preview" title="Preview">
        <Preview />
      </Tab>
    </Tabs>
  );
}
export default App;
