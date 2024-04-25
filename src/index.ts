export async function init() {
  miro.board.ui.on('icon:click', async () => {
    await miro.board.ui.openPanel({ url: 'app.html' });
  });
  // Listen to the 'app_card:open' event
  miro.board.ui.on('app_card:open', async (event) => {
    const { appCard } = event;

    const specCollection = miro.board.storage.collection('swagger-spec');
    const specString = await specCollection.get(`spec-${appCard.id}`);

    // Fetch a specific app card by specifying its ID
    const url = `https://rcliao.github.io/miro-swagger-ui/swagger.html`;

    // Open the modal to display the content of the fetched app card
    miro.board.ui.openModal({
      url,
      data: {
        spec: specString
      }
    });
  });
}

init();
