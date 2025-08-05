import { Button, Divider, Modal, Card } from 'antd';
import { Link } from 'react-router-dom';
import MenuBar from '../../components/menu';
import ContactModal from 'components/contact-modal';
import React, { useEffect, useState } from 'react';
import './style.scss';
import { KnowledgeLibrary } from 'components/icons';
import { CaseStudy } from 'components/icons';
import { LearningCenter } from 'components/icons';
import { Database } from 'components/icons';
import { Dashboard } from 'components/icons';
import { Map } from 'components/icons';
import { Network } from 'components/icons';
import { Events } from 'components/icons';
import { Search } from 'components/icons';
import { stripHtml } from 'utils/misc';
import { getApiUrl } from 'utils/misc';
import { transformStrapiResponse } from 'utils/misc';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { ArrowRightOutlined } from '@ant-design/icons';
import { getStrapiUrl } from 'utils/misc';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <div id="landing">
      <div className="hero">
        <MenuBar landing />
        <div className="ui container landing-content">
          <span className="sub-heading">REGIONAL NODE</span>
          <h1>East Asian Seas</h1>
          <div className="gpml">
            <div>
              <img src="/unep-landing.svg" alt="GPML" />
            </div>
            <div>
              <img src="/plastic-hub.svg" alt="GPML" />
            </div>
          </div>
          <h4>
            The web platform of the Regional Node provides stakeholders in the
            East Asian Seas region with access to knowledge, resources and
            networking services on marine litter and plastic pollution for
            informed action.
          </h4>
          <Button
            type="ghost"
            size="large"
            onClick={() => {
              setModalOpen(true);
            }}
          >{`Read more`}</Button>
        </div>
      </div>
      <div className="highlights">
        <FeatureCards />
        <LatestNews />
      </div>
      <div className="contact-section">
        <div className="ui container">
          <h5>Don’t hesitate to give us feedback or get involved</h5>
          <Button
            type="ghost"
            size="large"
            onClick={() => {
              setShowContactModal(true);
            }}
          >
            Contact us
          </Button>
        </div>
      </div>
      <div className="supporters-section">
        <div className="ui container">
          <h5>Our partners and sponsors</h5>
        </div>
        <div className="ui container">
          <div className="col">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://gpmarinelitter.org/"
            >
              <img src="/unep-combined.svg" alt="GPML" width={160} />
            </a>
          </div>
          <div className="col">
            <img src="/giz.svg" alt="GPML" width={199} />
          </div>
          <div className="col">
              <img src="/giz-buv.svg" alt="GPML" width={150} />
          </div>
          <div className="col">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.unep.org/regions/asia-and-pacific/our-projects/sea-circular-project"
            >
              <img src="/sea-circular.svg" alt="SEA Circular" width={115} />
            </a>
          </div>
          <div className="col">
            <img src="/sweden-sverige.svg" alt="Sweden Sverige" width={163} />
          </div>
        </div>
      </div>
      <Modal
        width={600}
        title="ABOUT THE REGIONAL NODE"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        The East Asian Seas Regional Node of the Global Partnership on Plastic
        Pollution and Marine Litter (GPML) is a regional marine litter knowledge
        management and networking hub of the Coordinating Body on the Seas of
        East Asia (COBSEA). The Regional Node was established by the resumed
        Twenty-fifth Intergovernmental Meeting (IGM 25) of COBSEA in 2022 to
        support the achievement of the COBSEA Regional Action Plan on Marine
        Litter (RAP MALI). The web platform of the Regional Node provides access
        to marine litter knowledge, resources, good practices, data, networks
        and learning in the East Asian Seas region.
        <br />
        <br />
        The Regional Node brings together resources and stakeholders in the
        region to promote evidence-based and collaborative action on marine
        litter and plastic pollution. It provides access to policies,
        frameworks, and knowledge products on marine litter, promotes the
        replication of good practices, bridges science and policy with access to
        a regional research and data, and strengthens learning, capacity
        building and partnerships. In the interim, functions of the Regional
        Node are carried out by the COBSEA Secretariat.
        <br />
        <br />
        The GPML is a multi-stakeholder partnership that provides a global
        cooperation mechanism to prevent marine litter and microplastics, with
        the aim of sharing knowledge and experience and advancing solutions.
        Regional Nodes of the GPML create regional networks to address regional
        knowledge, capacity and networking needs and priorities, leveraging
        engagement across stakeholder groups and building on and providing
        linkages to the global-level framework provided by the GPML. The
        Regional Node is linked to the{' '}
        <a
          href="https://digital.gpmarinelitter.org/"
          target="_blank"
          rel="noreferrer"
        >
          Global Digital Platform of the GPML
        </a>
        .
        <Divider />
        <h3>About COBSEA</h3>
        The Coordinating Body on the Seas of East Asia (COBSEA) is a regional
        intergovernmental mechanism and one of 18 Regional Seas programmes. It
        is the decision-making body for the East Asian Seas Action Plan,
        bringing together nine countries – Cambodia, China, Indonesia, Republic
        of Korea, Malaysia, the Philippines, Thailand, Singapore and Viet Nam –
        in protection and sustainable development of the marine and coastal
        environment. COBSEA focuses on marine pollution, ecosystem-based marine
        and coastal planning and management, and ocean governance. The COBSEA
        Secretariat is hosted by Thailand in Bangkok and administered by the
        UNEP Ecosystems Division in Nairobi.
        <br />
        <br />
        <a href="www.cobsea.org" target="_blank" rel="noreferrer">
          www.cobsea.org
        </a>
      </Modal>

      <ContactModal
        {...{
          showContactModal,
          setShowContactModal,
        }}
      />
    </div>
  );
};

const FeatureCards = () => {
  return (
    <div className="feature-cards">
      <div className="ui container">
        <span className="label">FEATURES</span>
        <h3>Explore The Platform</h3>
        <div className="feature-container">
          <div className="feature-card">
            <div className="img">
              <img
                src="/knowledge-hub.svg"
                width={250}
                height={180}
                alt="knowledge hub"
              />
            </div>
            <div className="cnt">
              <h5>Knowledge Hub</h5>
              <div className="feature-items">
                <Link to="/knowledge-hub" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <KnowledgeLibrary />
                    </div>
                    <div className="content">
                      <h6>Knowledge Library</h6>
                      <p>National & regional policies and initiatives</p>
                    </div>
                  </div>
                </Link>
                <Link to="/case-studies" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <CaseStudy />
                    </div>
                    <div className="content">
                      <h6>Case Studies</h6>
                      <p>A map of good practices</p>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/knowledge/learning-centre"
                  className="feature-item-link"
                >
                  <div className="feature-item">
                    <div className="icon">
                      <LearningCenter />
                    </div>
                    <div className="content">
                      <h6>Learning Centre</h6>
                      <p>Learning and capacity-building resources</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="img">
              <img
                src="/data-hub.svg"
                width={250}
                height={180}
                alt="data hub"
              />
            </div>
            <div className="cnt">
              <h5>Data Hub</h5>
              <div className="feature-items">
                <Link to="/research/about" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Database />
                    </div>
                    <div className="content">
                      <h6>Research Database</h6>
                      <p>Data sets on plastic pollution and marine litter</p>
                    </div>
                  </div>
                </Link>
                <Link to="/research/map" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Map />
                    </div>
                    <div className="content">
                      <h6>Maps</h6>
                      <p>Visual map of location-specific data</p>
                    </div>
                  </div>
                </Link>
                <Link to="/research/data" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Dashboard />
                    </div>
                    <div className="content">
                      <h6>Country Dashboard</h6>
                      <p>A snapshot of plastic flows</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="img">
              <img
                src="/community-hub.svg"
                width={250}
                height={180}
                alt="community"
              />
            </div>
            <div className="cnt">
              <h5>Community Hub</h5>
              <div className="feature-items">
                <Link to="/research-network" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Search />
                    </div>
                    <div className="content">
                      <h6>Research Network</h6>
                      <p>Directory of organizations</p>
                    </div>
                  </div>
                </Link>
                <a href="https://www.unep.org/cobsea/events" target="_blank" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Events />
                    </div>
                    <div className="content">
                      <h6>Events</h6>
                      <p>Upcoming sector events</p>
                    </div>
                  </div>
                </a>
                <a href="https://globalplasticshub.org/community-hub" target="_blank" className="feature-item-link">
                  <div className="feature-item">
                    <div className="icon">
                      <Network />
                    </div>
                    <div className="content">
                      <h6>Partner Network</h6>
                      <p>Partners collaborating through joint action</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LatestNews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const apiUrl = getStrapiUrl();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/cobsea-latest-news?populate=cover&sort=id:desc&pagination[limit]=8`
        );
        const data = await response.json();
        setItems(transformStrapiResponse(data.data || data));
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="latest-news">
        <div className="ui container">
          <div className="loading-state">Loading latest news...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="latest-news">
      <div className="ui container">
        <div className="news-wrapper">
          <span className="label">HIGHLIGHTS</span>
          <h3>Latest news</h3>
        </div>

        <Swiper
          slidesPerView={isMobile ? 1 : Math.min(items.length, 4)}
          spaceBetween={20}
          modules={[Pagination]}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <Card
                bordered={false}
                cover={
                  <div className="cover-image-container">
                    <div className="cover-image-overlay"></div>
                    <Link to={`/post/${item.id}-${item.slug}`}>
                      <div
                        style={{
                          width: '100%',
                          height: '220px',
                          background: item.cover?.data?.attributes?.formats
                            ?.medium?.url
                            ? `url(${item.cover.data.attributes.formats.medium.url})`
                            : 'linear-gradient(135deg, #91CAC1 0%, #5D8D94 100%)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '600',
                          textAlign: 'center',
                          padding: '20px',
                          borderRadius: '16px',
                        }}
                      >
                        {!item.cover?.data?.attributes?.formats?.medium
                          ?.url && <span>Latest News</span>}
                      </div>
                    </Link>
                  </div>
                }
                className="news-card"
              >
                <Link
                  to={`/post/${item.id}-${item.slug}`}
                  className="news-title-link"
                >
                  <h5 className="bold news-title">{item.title}</h5>
                </Link>
                <p className="news-excerpt">
                  {stripHtml(item.content)?.substring(0, 150)}...
                </p>
                <Link to={`/post/${item.id}-${item.slug}`}>
                  <Button type="link" className="read-more-btn">
                    Read More <ArrowRightOutlined />
                  </Button>
                </Link>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Home;
