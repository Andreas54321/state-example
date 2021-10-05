import { Layout } from '../Layout/Layout';
import code from '../store/code';
import replaceRedux from './ReplaceRedux.jpeg';
// import reduxImg from './ReduxOverview.png';

export const Home = () => {
  return (
    <Layout title="Redux / State / Replacements" code={code}>
      <img src={replaceRedux} alt="replace redux" />
      {/* <img src={reduxImg} alt="redux overview" /> */}
    </Layout>
  );
};
