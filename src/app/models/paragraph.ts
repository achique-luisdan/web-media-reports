import { SVG } from '@svgdotjs/svg.js'

export class Paragraph {
  id!: string;
  text!: string;
  img!: string;

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

  generateSVG (): string {
    var draw = SVG().addTo('body').size(640, 360)
    const lines: string [] = this.resizeLines();
    var text = draw.text(function(add) {
      lines.forEach (line => {
        add.tspan(line).newLine()
      })
    })
    text.move(20,20).font({ fill: 'black', family: 'Arial', size: '26' })
    draw.remove();
    return draw.node.outerHTML
  }

}
