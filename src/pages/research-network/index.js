import React, { useState, useEffect } from 'react';
import './styles.scss';
import { Row, Col, Button, Card, Spin, notification } from 'antd';
import { ReactComponent as LocPin } from '../../images/loc-pin.svg';
import ContactModal from 'components/contact-modal';
import axios from 'axios';
import { getStrapiUrl } from 'utils/misc';

function ResearchNetwork() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearchNetworkData = async () => {
      setLoading(true);
      try {
        const strapiURL = getStrapiUrl();
        const response = await axios.get(
          `${strapiURL}/api/cobsea-research-networks`
        );

        const simplifiedData = response.data.data.map((item) => {
          const {
            Institution,
            Sub_National,
            Country,
            Area_of_expertise,
            Name,
            Contact,
          } = item.attributes;

          return {
            Institution,
            'Sub-national': Sub_National,
            Country,
            'Area of expertise': Area_of_expertise,
            Name,
            Contact,
          };
        });

        setData(simplifiedData);
      } catch (error) {
        notification.error({
          message: 'Failed to fetch research network data',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResearchNetworkData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div id="research-network">
        <div className="header">
          <div>
            <h3>What is the Regional Research Network of the Regional Node?</h3>
            <p>
              A network of research scientists from research institutions in the
              East Asian Seas Region that come together to share findings on
              marine litter and plastic pollution research and develop a
              regional understanding of knowledge and gaps. The network is
              interdisciplinary and aims to catalyse collaborative research to
              inform policy-priorities with science-based information and
              address knowledge needs.
            </p>
          </div>
          <div className="call-to-action">
            <h3>Are you a researcher?</h3>
            <Button
              key="submit"
              ghost
              className="action-button"
              onClick={() => setShowContactModal(true)}
            >
              Get in touch
            </Button>
          </div>
        </div>
        <div className="profile-section">
          <div className="ui container">
            <div className="profiles-grid">
              {data.map((item, index) => (
                <Card className="profile-details" key={index}>
                  <div type="flex">
                    <h4>{item.Name}</h4>
                    <div className="loc meta">
                      <LocPin />
                      <span>
                        {item['Sub-national']} {item.Country}
                      </span>
                    </div>
                    <p>{item['Area of expertise']}</p>
                    <div className="contact meta">
                      <span>{item.Institution}</span>
                      <span className="dot">&#183;</span>
                      <a href={`mailto:${item.Contact}`}>
                        <Button type="link" size="small">
                          Get in touch
                        </Button>
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ContactModal
        {...{
          showContactModal,
          setShowContactModal,
        }}
      />
    </div>
  );
}

export default ResearchNetwork;
