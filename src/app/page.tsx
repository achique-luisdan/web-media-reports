"use client"; // this is a client component 👈🏽

import { useState } from "react";
import { Paragraphs } from "./components/paragraphs";
import { v4 as uuidv4 } from 'uuid';
import { Paragraph } from "./models/paragraph";

export default function Home() {

  const [textReport, setTextReport]  = useState<string>('');
  const [paragraphs, setParagraphs]  = useState<Paragraph[]>([]);


  function handleSubmit(event : React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let processingParagraphs: string[] =  textReport.split ('\n').filter (paragraph => paragraph != '');
    let paragraphsProcessed: Paragraph[] = [];

    processingParagraphs.forEach (paragraph => {
      let newParagraph = new Paragraph();
      newParagraph.text = paragraph;
      newParagraph.id =  uuidv4().slice(0, 6);
      paragraphsProcessed.push(newParagraph);

    })
    setParagraphs ( [...paragraphs , ...paragraphsProcessed]);
    setTextReport('');
  }

  function handleChange(event : React.ChangeEvent<HTMLTextAreaElement>): void {
    setTextReport(event.target.value);
  }

  function clear (): void{
    setTextReport('');
  }

  return (
    <main>
      <h1>Lit Media Reports 💟</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="field" >
          <label htmlFor="text-report" className="label-text-report">Textos del reporte:</label>
          <textarea  id="text-report" required className="textarea-text-report" placeholder="Pega en esta casilla textos del reporte."  value={textReport} onChange={(e) => handleChange(e)} ></textarea>
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-add-text-report">Agregar</button>
          <button type="button" className="btn btn-clear-text-report" onClick={clear}>Limpiar</button>
        </div>
      </form>
      <Paragraphs paragraphs={paragraphs} />
    </main>
  )
}

