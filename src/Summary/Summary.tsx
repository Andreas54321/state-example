import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import style from './Summary.module.scss';

export const Summary = () => {
  const [md, setMd] = useState('');
  useEffect(() => {
    axios.get<string>('README.md').then(
      data => setMd(data.data),
      () => {}
    );
  }, []);
  return (
    <div className={style.container}>
      <ReactMarkdown children={md} remarkPlugins={[remarkGfm]} />
    </div>
  );
};
