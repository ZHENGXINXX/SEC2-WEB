export const down = (data) => {
  const byteCharacters = atob(data.fileContent);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const file = new Blob([byteArray], { type: data.fileType });
  const fileUrl = URL.createObjectURL(file);
  var link = document.createElement('a');
  link.style.display = 'none';
  link.href = fileUrl;
  link.setAttribute(
    'download',
    data.fileName
  );
  document.body.appendChild(link);
  link.click();
};