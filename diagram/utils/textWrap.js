export function wrapText(label, maxWidth = 140) {

  const words = label.split(" ");

  let line = "";
  const lines = [];

  words.forEach(word => {

    const testLine = line + word + " ";

    // crude width estimation
    const estimatedWidth = testLine.length * 7;

    if (estimatedWidth > maxWidth && line.length > 0) {
      lines.push(line.trim());
      line = word + " ";
    } else {
      line = testLine;
    }

  });

  if (line.trim().length > 0) {
    lines.push(line.trim());
  }

  return lines;

}