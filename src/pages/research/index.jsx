import React from 'react';
import { ReactComponent as MapIcn } from '../../images/map-icn.svg';
import { ReactComponent as DataIcn } from '../../images/data-icn.svg';
import { ReactComponent as FactIcn } from '../../images/fact-icn.svg';
import './styles.scss';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Map from './Map';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';
// import ScrollToTop from 'components/utils/ScrollToTop';
// import Layout from 'components/Layout/Layout';
import useFetch from 'ssfa-components/utils/useFetch';
import { setPositionValue, getFromStorage } from 'ssfa-components/utils/utils';
import Data from './Data/Data';
import DataExtraction from './Data/DataExtraction';
import ResearchLandscape from './Data/ResearchLandscape';
import Methodology from './Data/Methodology';
import ScientificResearch from './Data/ScientificResearch';
import Humanities from './Data/Humanities';
import Policy from './Data/Policy';
import Factsheets from './Factsheets';
import About from './About';

let theme = createTheme({
  palette: {
    primary: {
      main: '#EDEEEE',
    },
    secondary: {
      main: '#f0c8b6',
    },
    tertiary: {
      main: '#475657',
    },
    quaternary: {
      main: '#c8a464',
    },
    error: {
      main: '#c53655',
    },
    warning: {
      main: '#cf5500',
    },
    info: {
      main: '#89bc00',
    },
    success: {
      main: '#34bd6f',
    },
    divider: 'rgba(0, 0, 0, 0.3)',
  },
  typography: {
    fontFamily: 'DM Sans',
  },
});

theme = responsiveFontSizes(theme);

const View = () => {
  const { isPending, isDataChanged, databaseLink } = useSelector(
    (state) => state.rootData
  );

  useFetch(databaseLink);

  React.useEffect(() => {
    if (!Boolean(getFromStorage('position')) && !isPending) setPositionValue();
    else if (isDataChanged) setPositionValue();
  }, [isDataChanged, isPending]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <div>
          <div id="research-db">
            <nav>
              <div className="cnt">
                <NavLink to="/research/about">
                  <span>About</span>
                </NavLink>
                <NavLink to="/research/map">
                  <MapIcn /> <span>Map</span>
                </NavLink>
                <NavLink to="/research/data">
                  <DataIcn /> <span>Data & analytics</span>
                </NavLink>
                <NavLink to="/research/factsheets">
                  <FactIcn /> <span>Fact sheets</span>
                </NavLink>
              </div>
            </nav>
            <Switch>
              <Route exact path="/research/about" component={About} />
              <Route
                exact
                path="/research/map"
                component={() => <Map isDataChanged={isDataChanged} />}
              />

              <Route exact path="/research/data" component={Data} />
              <Route
                exact
                path="/research/data/custom-data-subset"
                component={DataExtraction}
              />
              <Route
                exact
                path="/research/data/research-landscape"
                component={ResearchLandscape}
              />
              <Route
                exact
                path="/research/data/methodology-and-ontology"
                component={Methodology}
              />
              <Route
                exact
                path="/research/data/scientific-research"
                component={ScientificResearch}
              />
              <Route
                exact
                path="/research/data/research-in-humanities"
                component={Humanities}
              />
              <Route
                exact
                path="/research/data/information-for-policy-making"
                component={Policy}
              />

              <Route exact path="/research/factsheets" component={Factsheets} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default View;
