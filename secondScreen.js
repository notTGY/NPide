let secondFilePath = '';

function hotSwap() {
  const sFile = secondFilePath;
  const fFile = sourcePath;

  secondFilePath = fFile;
  sourcePath = sFile;

  const firstContent = tarea.getValue();
  const secondContent = secondTarea.getValue();
  const firstSelection = tarea.getCursor();
  const secondSelection = secondTarea.getCursor();
  secondTarea.setValue(firstContent);
  secondTarea.focus();
  secondTarea.setCursor(firstSelection);

  tarea.setValue(secondContent);
  tarea.focus();
  tarea.setCursor(secondSelection);
}
