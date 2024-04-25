import * as React from 'react';
import {createRoot} from 'react-dom/client';

import * as YAML from 'yamljs';

import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

import '../src/assets/style.css';

const App: React.FC = () => {
  const [showSource, setShowSource] = React.useState(false);
  const specString = new URLSearchParams(window.location.search).get('spec');

  function toggleShowSource() {
    setShowSource(!showSource);
  }

  try {
    const spec = JSON.parse(specString || '{}');
    const specYAML = YAML.stringify(spec, 99, 2);
    return (
      <div>
        {showSource ? (
          <textarea className="textarea swagger-spec" value={specYAML} readOnly />
        ) : (
          <SwaggerUI spec={spec}>
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
