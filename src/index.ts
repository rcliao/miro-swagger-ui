import * as YAML from 'yamljs';

export async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({ url: 'app.html' });
  });
  // Listen to the 'app_card:open' event
  miro.board.ui.on('app_card:open', async (event) => {
    const { appCard } = event;

    // Fetch a specific app card by specifying its ID
    const url = `https://rcliao.github.io/miro-swagger-ui/swagger.html?appCardId=${appCard.id})}`;
    console.log('opening url', url);

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
    });
  });
}

init();
