import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { getStrapiUrl, transformStrapiResponse } from '../../utils/misc';
import { useParams } from 'react-router-dom';
import './style.scss';
import { Spin } from 'antd';

const PostPage = () => {
  const { slug } = useParams();

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPageData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const text = slug.split('-');
        const id = text.shift();
        const result = text.join('-');

        const strapiUrl = getStrapiUrl();
        const response = await axios.get(
          `${strapiUrl}/api/posts?filters[slug][$eq]=${result}&populate=*`
        );

        const data = transformStrapiResponse(response.data.data)[0];
        setPageData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageData();
  }, [slug]);

  return (
    <div className="page">
      {!loading && !pageData && (
        <div className="post-not-found">
          <div>
            <h1>Page Not Found</h1>
            <p>The requested page could not be found.</p>
          </div>
        </div>
      )}
      {loading ? (
        <div className="post-loading">
          <Spin size="large" />
        </div>
      ) : (
        <div className="container">
          {pageData?.cover?.data?.attributes?.url && (
            <div className="cover">
              <img
                src={pageData.cover.data.attributes.url}
                alt={pageData.title}
              />
            </div>
          )}

          {pageData && (
            <div className="content-wrapper">
              <p className="date">
                {moment(pageData?.updatedAt).format('MMMM DD, YYYY')}
              </p>

              <h1 className="title">{pageData?.title}</h1>

              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: pageData?.content }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostPage;
