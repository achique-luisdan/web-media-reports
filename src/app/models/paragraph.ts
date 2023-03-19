import { SVG } from '@svgdotjs/svg.js'
import { v4 as uuidv4 } from 'uuid';
export class Paragraph {
  id!: string;
  text!: string;
  img!: string;
  fillColor!: string;
  textColor!: string;

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

  generateSVG (isAdd: boolean = false): string {
    var draw;
    if (isAdd){
      draw = SVG().addTo('article').size(640, 360);
    }
    else {
      draw = SVG().addTo('body').size(640, 360);
    }
    var rect = draw.rect(640, 360)
    rect.fill(this.fillColor)
    const lines: string [] = this.resizeLines();
    var text = draw.text(function(add) {
      lines.forEach (line => {
        add.tspan(line).newLine()
      })
    })
    text.move(20, 20).font({ fill: this.textColor, family: 'Arial', size: '26' })
    if (!isAdd){
      draw.remove();
    }
    return draw.node.outerHTML
  }

  generateSVGEnd (): string {
    var draw = SVG().addTo('body').size(640, 360);
    var rect = draw.rect(640, 360)
    rect.fill(this.fillColor)
    draw.remove();
    return draw.node.outerHTML;
  }

  generateEnding(): Paragraph{
    let paragraphEnd = new Paragraph();
    paragraphEnd.text = '';
    paragraphEnd.id =  uuidv4().slice(0, 6);
    paragraphEnd.fillColor = this.fillColor;
    paragraphEnd.img = this.generateSVGEnd();
    return paragraphEnd;
  }

  generateCode (): string {
    return uuidv4().slice(0, 10);
  }

}
