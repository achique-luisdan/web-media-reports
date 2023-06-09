import { useState } from 'react';
import Image from "next/image";

import { ParagraphProps } from '../models/props';

export function PreviewParagraph ({paragraph, show}: ParagraphProps): JSX.Element {
  const [isShow, setIsShow]  = useState<boolean>(false);
  function handleIsShow(): void {
    setIsShow(!isShow);
  }

  function generateSVG (): void {
    paragraph.generateSVG(true);
  }

  if (show || isShow){
    return <article id="modal" className='show modal-preview' onAnimationStart={generateSVG}>
      <div className="exit-modal">
        <button className='btn btn-icon btn-red' onClick={handleIsShow}>
          <Image src={`/exit.svg`} alt="Icono de cerrar" width={16} height={16} />
        </button>
      </div>
    </article>
  }
  else {
    return (
      <button className='btn btn-icon' onClick={handleIsShow}>
        <Image src={`/preview.svg`} alt="Icono de vista previa" width={22} height={22} />
      </button>
    )
  }
}
