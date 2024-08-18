export const saveToStorage = async (jsonBlocks) => {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
};

export const loadFromStorage = async () => {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString ? JSON.parse(storageString) : undefined;
};
