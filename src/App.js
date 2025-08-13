import React, { useEffect } from 'react';
import './fonts.css';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import Landing from 'pages/landing';

import api from 'utils/api';
import { UIStore } from './store.js';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import Research from './pages/research';
import ResearchNetwork from './pages/research-network';
import Events from './pages/events';
import Footer from 'footer';
import MenuBar from 'components/menu';
import KnowledgeHub from 'pages/knowledge-hub';
import CapacityBuilding from 'pages/learning-centre';
import CaseStudy from 'pages/case-study';
import AboutUs from 'pages/about-us';
import ContactUs from 'pages/contact-us';
import PostPage from 'pages/post';

Promise.all([
  api.get('/tag'),
  api.get('/country'),
  api.get('/country-group'),
  api.get('/organisation'),
  api.get('/non-member-organisation'),
]).then((res) => {
  const [tag, country, countryGroup, organisation, nonMemberOrganisations] =
    res;
  UIStore.update((e) => {
    e.tags = tag.data;
    e.countries = uniqBy(country.data).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    e.regionOptions = countryGroup.data.filter((x) => x.type === 'region');
    e.meaOptions = countryGroup.data.filter((x) => x.type === 'mea');
    e.transnationalOptions = countryGroup.data.filter(
      (x) => x.type === 'transnational'
    );
    e.organisations = uniqBy(sortBy(organisation.data, ['name'])).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    e.nonMemberOrganisations = uniqBy(
      sortBy(nonMemberOrganisations.data, ['name'])
    ).sort((a, b) => a.name.localeCompare(b.name));
  });
});

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { pathname } = useLocation();
  return (
    <div className="App">
      {pathname !== '/' && <MenuBar />}
      <ScrollToTop />
      <div className="main-content">
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/knowledge-hub" component={KnowledgeHub} />
          <Route
            path="/knowledge/learning-centre"
            component={CapacityBuilding}
          />
          <Route path="/research" component={Research} />
          <Route path="/research-network" component={ResearchNetwork} />
          <Route path="/case-study/:view?/:type?" component={CaseStudy} />
          <Route path="/case-studies" component={CaseStudy} />
          <Route path="/events" component={Events} />
          <Route path="/about-us" component={AboutUs} />
          <Route path="/contact-us" component={ContactUs} />
          <Route path="/post/:slug" component={PostPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
