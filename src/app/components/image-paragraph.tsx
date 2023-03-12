import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
import { useState } from 'react';

import { ParagraphProps } from '../models/props';

export function ImageParagraph ({paragraph, show}: ParagraphProps): JSX.Element {
  const [isShow, setIsShow]  = useState<boolean>(false);
  function handleIsShow(): void {
    setIsShow(!isShow);
  }

  function generateSVG (): void {
    var draw = SVG().addTo('article').size(640, 360)
    const lines: string [] = paragraph.resizeLines();
    var text = draw.text(function(add) {
      lines.forEach (line => {
        add.tspan(line).newLine()
      })
    })
    text.move(20,20).font({ fill: 'black', family: 'Arial', size: '20' })
  }

  if (show || isShow){
    return <article id="modal" className='show modal-preview' onClick={generateSVG}>
      <button onClick={handleIsShow}>x</button>
    </article>
  }
  else {
    return <button className='btn btn-icon' onClick={handleIsShow}>Ver</button>
  }
}
