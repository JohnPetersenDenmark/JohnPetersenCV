import { Paragraph } from '@tiptap/extension-paragraph'

const ParagraphWithLineHeightAndIndent = Paragraph.extend({
    addAttributes() {
        return {
            indent: {
                default: null,
                renderHTML: attributes => {

                   if (attributes.lineHeight && (!attributes.indent)) {
                        let lineHeightStyle =
                        {
                            style: `line-height: ${attributes.lineHeight}`
                        }
                        return lineHeightStyle;
                    }

                    if (attributes.indent && (!attributes.lineHeight)) {
                        let indentStyle =
                        {
                            style: ` margin-inline: ${attributes.indent}px`
                        }
                        return indentStyle
                    }

                    if (attributes.indent && attributes.lineHeight) {
                       return {style: `line-height: ${attributes.lineHeight}  margin-inline: ${attributes.indent}px`}
                    }

                    return {}

                },
                parseHTML: element => element.style.lineHeight || null,
            },
            lineHeight: {
                default: null,
                renderHTML: attributes => {

                   if (attributes.lineHeight && (!attributes.indent)) {
                        let lineHeightStyle =
                        {
                            style: `line-height: ${attributes.lineHeight}`
                        }
                        return lineHeightStyle;
                    }

                    if (attributes.indent && (!attributes.lineHeight)) {
                        let indentStyle =
                        {
                            style: ` margin-inline: ${attributes.indent}px`
                        }
                        return indentStyle
                    }

                    if (attributes.indent && attributes.lineHeight) {
                       return {style: `line-height: ${attributes.lineHeight}  margin-inline: ${attributes.indent}px`}
                    }

                    return {}

                },
                parseHTML: element => element.style.lineHeight || null,
            }
        }
    },
})

export default ParagraphWithLineHeightAndIndent