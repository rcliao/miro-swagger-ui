import * as React from 'react';
import {createRoot} from 'react-dom/client';

import * as YAML from 'yamljs';

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

import '../src/assets/style.css';

const App: React.FC = () => {
  const [showSource, setShowSource] = React.useState(false);
  const [jsonSpec, setJsonSpec] = React.useState(null);
  const [yamlSpec, setYamlSpec] = React.useState('');

  init();

  async function init() {
    const data = await miro.board.ui.getModalData<{spec: string}>();
    const specYAML = data?.spec || '';
    const specJSON = YAML.parse(specYAML);

    setYamlSpec(specYAML);
    setJsonSpec(specJSON);
  }

  function toggleShowSource() {
    setShowSource(!showSource);
  }

  try {
    return (
      <div>
        {showSource || !jsonSpec ? (
          <textarea className="textarea swagger-spec" value={yamlSpec} readOnly />
        ) : (
          <SwaggerUI spec={jsonSpec} docExpansion={"full"}>
          </SwaggerUI>
        )}
        <div className="cs1 ce12 centered">
          <a
            className="button button-primary"
            onClick={toggleShowSource}
          >
            Toggle Source
          </a>
        </div>
      </div>
    );
  } catch (e) {
    return (
      <div>Unknown error</div>
    );
  }
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
