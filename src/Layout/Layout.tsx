import { PropsWithChildren } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import style from './Layout.module.scss';

export const Layout = ({ title, children, code }: PropsWithChildren<{ title: string; code: string[] }>) => {
  return (
    <div className={style.container}>
      <div className={style.example}>
        <h1>{title}</h1>
        {children}
      </div>

      {code.length > 0 && (
        <div className={style.code}>
          {code.map((section, idx) => (
            <SyntaxHighlighter key={idx} language="typescript" style={vscDarkPlus}>
              {section}
            </SyntaxHighlighter>
          ))}
        </div>
      )}
    </div>
  );
};
