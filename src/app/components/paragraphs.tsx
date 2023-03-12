import { ParagraphsProps } from "../models/props";

export function Paragraphs({paragraphs}: ParagraphsProps): JSX.Element {
  if (paragraphs.length > 0){
  return <section className="box-paragraphs">
          <h2>Párrafos</h2>
          <ul className="paragraphs">
            {
               paragraphs.map ((paragraph) => (
                <li key={paragraph.id} className="paragraph">{paragraph.text}</li>
               ))
            }
         </ul>
        </section>;
  }
  else {
    return <></>
  }
}
