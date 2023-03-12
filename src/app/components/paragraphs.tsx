import { ParagraphsProps } from "../models/props";
import { ImageParagraph } from "./image-paragraph";

export function Paragraphs({paragraphs}: ParagraphsProps): JSX.Element {
  if (paragraphs.length > 0){
  return <section className="box-paragraphs">
          <h2>Párrafos</h2>
          <ul className="paragraphs">
            {
               paragraphs.map ((paragraph) => (
                <li key={paragraph.id} className="paragraph">
                  <p>
                    {paragraph.text}
                  </p>
                  <ImageParagraph paragraph={paragraph} show={false}></ImageParagraph>
                </li>
               ))
            }
         </ul>

        </section>;
  }
  else {
    return <></>
  }
}
