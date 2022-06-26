async function getData() {
  toggleLoader();
  let Todo = {
    dataSource: "Cluster0",
    database: "aeropad",
    collection: "Launchpad"
  };
  const response = await fetch('https://proxy.aerochain.id/https://data.mongodb-api.com/app/data-yzwpa/endpoint/data/beta/action/find', {
    method: 'POST',
    body: JSON.stringify(Todo),
    headers: {
      'Access-Control-Request-Headers': '*',
      'Content-Type': 'application/json',
      "api-key": "yCbqe7v2kKidNosqMrKZwB8FZKUMjbXLCPAEGDRjM5PpUeBjS3Ll4UGhNGkL7AAF"
    }
  })
  const data = await response.json();
  toggleLoader();
  return data;
}