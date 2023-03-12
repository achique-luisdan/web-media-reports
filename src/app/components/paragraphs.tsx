import { ParagraphsProps } from "../models/props";
import { ImageParagraph } from "./image-paragraph";
import Image from "next/image";
import React, {MouseEvent, useEffect, useState } from 'react';
import { Paragraph } from "../models/paragraph";

export function Paragraphs({paragraphs}: ParagraphsProps): JSX.Element {
  const [paragraphsList, setParagraphsList]  = useState<Paragraph[]>([]);

  useEffect(() => {
    setParagraphsList(paragraphs);
  });

  function handleDelete(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const index = paragraphsList.findIndex (paragraph => paragraph.id === event.currentTarget.accessKey)
    if (index !== -1) {
      setParagraphsList(paragraphsList.splice(index, 1));
    }
  }

  if (paragraphsList.length > 0){
    return (
      <section className="box-paragraphs">
        <h2>Párrafos</h2>
        <ul className="paragraphs">
          {
            paragraphsList.map ((paragraph) => (
              <li key={paragraph.id} className="paragraph">
                <p>
                  {paragraph.text}
                </p>
                <div className="actions-of-paragraph">
                  <ImageParagraph paragraph={paragraph} show={false}></ImageParagraph>
                  <button  type="button" accessKey={paragraph.id} className='btn btn-icon btn-red' onClick={handleDelete}>
                    <Image  accessKey={paragraph.id} src={`/delete.svg`} alt="Icono de eliminar" width={20} height={20} />
                  </button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    );
  }
  else {
    return <></>
  }
}
