import { ParagraphsProps } from "../models/props";
import { PreviewParagraph } from "./preview-paragraph";
import Image from "next/image";
import React, {MouseEvent, useEffect, useState } from 'react';
import { Paragraph } from "../models/paragraph";

export function Paragraphs({paragraphs}: ParagraphsProps): JSX.Element {
  const [paragraphsList, setParagraphsList]  = useState<Paragraph[]>([]);
  const [video, setVideo]  = useState<any>();
  const [isGenerated, setGenerated]  = useState<boolean>(false);
  const [fillColor, setFillColor]  = useState<string>('#FFFFFF');
  const [textColor, setTextColor]  = useState<string>('#1B1B1B');

  useEffect(() => {
    paragraphs.map (paragraph => {
      paragraph.fillColor = fillColor;
      paragraph.textColor = textColor;
      return paragraph;
    })
    setParagraphsList(paragraphs);
  });

  function handleDelete(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const index = paragraphsList.findIndex (paragraph => paragraph.id === event.currentTarget.accessKey)
    if (index !== -1) {
      setParagraphsList(paragraphsList.splice(index, 1));
    }
  }

  const getVideo = async () => {
    const url = 'http://localhost:5000/generate';
    let paragraphsSending = paragraphs;
    paragraphsSending.map (paragraph => {
      paragraph.img = paragraph.generateSVG()
      return paragraph;
    })
    paragraphsSending.push(paragraphsSending[0].generateEnding());
    const res = await fetch(url, {method: "POST", body: JSON.stringify (paragraphsSending)})
    const blob = await res.blob();
    setVideo(URL.createObjectURL(blob))
    setGenerated(true)
    paragraphsSending.pop();
    return res.body;
  }

  function customVideo(): void {
    let paragraphsCustom = paragraphs;
    paragraphsCustom.map (paragraph => {
      paragraph.fillColor = fillColor;
      paragraph.textColor = textColor;
      return paragraph;
    });
    paragraphs = paragraphsCustom
  }

  function handleChangeFillColor(event : React.ChangeEvent<HTMLInputElement>): void {
    setFillColor(event.target.value);
    customVideo();
  }

  function handleChangeTextColor(event : React.ChangeEvent<HTMLInputElement>): void {
    setTextColor(event.target.value);
    customVideo();
  }


  if (paragraphsList.length > 0){
    return (
      <section className="box-paragraphs">
        <h2>Vídeo</h2>
        <div className="actions-video">
          <button  type="button" className='btn btn-icon btn-success' onClick={getVideo}>
            <Image src={`/play.svg`} alt="Icono de reproducir vídeo" width={20} height={20} />
          </button>
        </div>
        { isGenerated &&
          <>
            <hr />
            <video src={video} controls>
            </video>
          </>
        }
        <h3>Personalizar</h3>
        <form>
          <div className="field" >
            <label htmlFor="fillColor">Fondo: </label>
            <input id="fillColor" type="color" value={fillColor} onChange={(e) => handleChangeFillColor(e)}/>
          </div>
          <div className="field" >
            <label htmlFor="textColor">Texto: </label>
            <input id="textColor" type="color" value={textColor} onChange={(e) => handleChangeTextColor(e)}/>
          </div>
        </form>
        <h2>Párrafos</h2>
        <ul className="paragraphs">
          {
            paragraphsList.map ((paragraph) => (
              <li key={paragraph.id} className="paragraph">
                <p>
                  {paragraph.text}
                </p>
                <div className="actions-of-paragraph">
                  <PreviewParagraph paragraph={paragraph} show={false}></PreviewParagraph>
                  <button type="button" accessKey={paragraph.id} className='btn btn-icon btn-red' onClick={handleDelete}>
                    <Image accessKey={paragraph.id} src={`/delete.svg`} alt="Icono de eliminar" width={20} height={20} />
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
