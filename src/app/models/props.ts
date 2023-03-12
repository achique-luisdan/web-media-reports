import { Paragraph } from "./paragraph";

export class  ParagraphsProps {
  paragraphs: Paragraph[] = []
}

export class  ParagraphProps {
  paragraph: Paragraph = new Paragraph();
  show: boolean = false;
}
