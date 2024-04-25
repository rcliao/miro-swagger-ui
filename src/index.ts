import * as YAML from 'yamljs';

export async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({url: 'app.html'});
  });
  // Listen to the 'app_card:open' event
  miro.board.ui.on('app_card:open', async (event) => {
    const {appCard} = event;
    const specCollection = miro.board.storage.collection('swagger-spec');
    const specString = await specCollection.get(`spec-${appCard.id}`);
    const jsonSpec = YAML.parse(specString);

    // Fetch a specific app card by specifying its ID
    const url = `http://localhost:3000/swagger.html?spec=${encodeURIComponent(JSON.stringify(jsonSpec))}`;
    console.log('opening url', url);

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
    });
  });
}

init();
