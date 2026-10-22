import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { CodeBlock } from '@/components/code-block'

export function ArticleContent({ body }: { body: string }) {
  return (
    <div className='article-body'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeHighlight]}
        skipHtml
        components={{
          pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
          h2: ({ children, id }) => (
            <h2 id={id}>
              <a href={`#${id}`}>{children}</a>
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id}>
              <a href={`#${id}`}>{children}</a>
            </h3>
          ),
          table: ({ children }) => (
            <div className='table-scroll' role='region' aria-label='Article table' tabIndex={0}>
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {body}
      </Markdown>
    </div>
  )
}
