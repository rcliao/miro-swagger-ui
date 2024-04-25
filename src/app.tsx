import * as React from 'react';
import {createRoot} from 'react-dom/client';

import * as YAML from 'yamljs';

import '../src/assets/style.css';

function addSwaggerEmbed(textareaRef) {
  return async function () {
    const textareaValue = textareaRef.current.value;
    const spec = YAML.parse(textareaValue);
    // TODO: handle validation error

    const appCard = await miro.board.createAppCard({
      title: `Swagger UI for ${spec.info.title}`,
      description: 'Click to open Swagger UI preview to interact with API',
      width: 320,
      status: 'connected'
    });
    const specCollection = miro.board.storage.collection('swagger-spec');
    await specCollection.set(`spec-${appCard.id}`, textareaValue);
    await miro.board.viewport.zoomTo(appCard);
  }
}

const App: React.FC = () => {
  const textareaRef = React.useRef(null);

  return (
    <div className="grid wrapper">
      <div className="form-group cs1 ce12">
        <label>Swagger Spec</label>
        <textarea
            ref={textareaRef}
            className="swagger-spec textarea"
            placeholder="openapi: 3.1.0"
        />
      </div>
      <div className="cs1 ce12 centered">
        <a
          className="button button-primary"
          onClick={addSwaggerEmbed(textareaRef)}
        >
          Embed Swagger
        </a>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
