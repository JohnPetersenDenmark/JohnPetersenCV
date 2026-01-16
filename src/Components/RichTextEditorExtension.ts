import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from '@tiptap/extension-font-family'
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { FontSize } from "@tiptap/extension-text-style";
import { Checkmark } from "./Common/Checkmark";
import { RawHTML } from "./Common/RawHTML";
import Image from '@tiptap/extension-image'
import { Rating } from "./Common/Rating";
import { RatingUserSelection } from "./Common/RatingUserSelection";
import { SvgIconTipTapExtension } from "./Common/SvgIconTipTapExtension";
import { IndentableParagraph } from "./IndentableParagraph";
import ParagraphWithLineHeightAndIndent from "./Common/ParagraphWithLineHeightAndIndent";


import ParagraphWithLineHeight from "./Common/ParagraphWithLineHeight";

import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

export const tiptapExtensions = [
  StarterKit.configure({   
    //  paragraph: false,
  }),

  TextStyle, // ✅ named export
  FontFamily,
  TaskList,
  TaskItem,
  Checkmark,
  RawHTML,
  Rating,
  RatingUserSelection,
   SvgIconTipTapExtension,
   ParagraphWithLineHeightAndIndent,
  // IndentableParagraph,
  Color,
  Image,
  FontSize,
    // ParagraphWithLineHeight,
  BulletList,
  OrderedList,
  ListItem,

  Highlight.configure({ multicolor: true }),

  Placeholder.configure({
    placeholder: "Write something…",
  }),
];
