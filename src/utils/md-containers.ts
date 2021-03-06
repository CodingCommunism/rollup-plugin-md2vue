// 把md中的demo部分取出来 分成两份，一份代码高亮展示，一份渲染
import mdContainer from 'markdown-it-container'
import MarkdownIt from 'markdown-it/lib'

export default (md: MarkdownIt) => {
  md.use(mdContainer, 'demo', {
    validate (params: string) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render (tokens: {
      info: string;
      nesting: number;
      type: string;
      content: string;
    }[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content =
          tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--docs-demo: ${content}:docs-demo-->
        `
      }
      return '</demo-block>'
    }
  })

  md.use(mdContainer, 'tip')
  md.use(mdContainer, 'warning')
  return md
}
