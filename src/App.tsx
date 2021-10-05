import { BrowserRouter, NavLink, Route, Switch, Redirect } from 'react-router-dom';
import style from './App.module.scss';
import { Home } from './Home/Home';
import { ReactContextCustom } from './examples/reactContextCustom/ReactContextCustom';
import { ReactContextReducer } from './examples/reactContextReducer/ReactContextReducer';
import { RecoilState } from './examples/recoilState/RecoilState';
import { ValtioProxyState } from './examples/valtio/ValtioProxyState';
import { ZustandContext } from './examples/zustand/ZustandContext';
import { ZustandContextAutoSelector } from './examples/zustandAutoSelector/ZustandAutoSelector';
import { ZustandSaga } from './examples/zustandSaga/ZustandSaga';
import { ReduxToolkit } from './examples/reduxToolkit/ReduxToolkit';
import { ReduxState } from './examples/redux/Redux';
import { EasyPeasyState } from './examples/easyPeasy/EasyPeasyState';
import { Summary } from './Summary/Summary';

const set = [
  { name: 'Home', path: '/', component: Home },
  { name: 'React Context Custom', path: '/reactContextCustom', component: ReactContextCustom },
  { name: 'React Context Reducer', path: '/reactContextReducer', component: ReactContextReducer },
  { name: 'Zustand', path: '/zustand1', component: ZustandContext },
  { name: 'Zustand AutoSelector', path: '/zustand2', component: ZustandContextAutoSelector },
  { name: 'Zustand Saga', path: '/zustand3', component: ZustandSaga },
  { name: 'Valtio Proxy', path: '/valtio', component: ValtioProxyState },
  { name: 'Recoil', path: '/recoil', component: RecoilState },
  { name: 'Redux', path: '/reduxOld', component: ReduxState },
  { name: 'Redux Toolkit', path: '/reduxToolkit', component: ReduxToolkit },
  { name: 'Easy Peasy', path: '/easyPeasy', component: EasyPeasyState },
  { name: 'Summary', path: '/sum', component: Summary },
];

function App() {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <header className={style.header}>
          <ul>
            {set.map(({ name, path }) => (
              <li key={path}>
                <NavLink to={path} activeClassName={style.active} exact>
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </header>
        <Switch>
          {set.map(props => (
            <Route key={props.path} {...props} exact />
          ))}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
