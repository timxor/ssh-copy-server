import 'es6-promise/auto';

async function copyFile() {
  const fileNameInput = document.getElementById("fileName") as HTMLInputElement;
  const filePathInput = document.getElementById("filePath") as HTMLInputElement;

  const fileName = fileNameInput.value;
  const filePath = filePathInput.value;

  if (!fileName || !filePath) {
    alert("Please enter both file name and path.");
    return;
  }

  try {
    // Make an AJAX request to the server to resolve the file path
    const resolvedPathResponse = await fetch('/resolveFilePath', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filePath })
    });

    if (!resolvedPathResponse.ok) {
      throw new Error('Failed to resolve file path.');
    }

    const { resolvedPath } = await resolvedPathResponse.json();

    const downloadLink = document.createElement("a");
    downloadLink.href = resolvedPath;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while copying the file.');
  }
}

export { copyFile };
