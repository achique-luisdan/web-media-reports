export class Paragraph {
  id!: string;
  text!: string;

  resizeLines(): string[] {
    const resize: string [] = this.text.split(' ');
    let newLines: string [] = [];
    resize.forEach (line  => {
      let indexBase = newLines.length -1;
      if (indexBase < 0) {
        indexBase = 0
      }
      try {
        if (newLines[indexBase].split(' ').length <= 5){
          newLines[indexBase] += ' ' + line;
        } else {
          newLines.push (line);
        }
      }
      catch (e) {
        newLines.push (line);
      }
    });
    return newLines;
  }
}
