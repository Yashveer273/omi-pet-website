
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const StorePage = () => {
  const { storeSlug } = useParams();

  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const docRef = doc(firestore, 'stores', storeSlug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setStore(docSnap.data());
        } else {
          console.error('Store not found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [storeSlug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!store) {
    return <div>Store information is not available.</div>;
  }

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <Helmet>
        <title>{store?.seo_data?.meta_title}</title>

        <meta
          name="description"
          content={store?.seo_data?.meta_description}
        />

        <link
          rel="canonical"
          href={store?.seo_data?.canonical_url}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',

            name: store?.name,

            telephone: store?.contact?.phone,

            email: store?.contact?.email,

            url: store?.seo_data?.canonical_url,

            keywords: store?.seo_data?.keywords || '',

            address: {
              '@type': 'PostalAddress',
              streetAddress: store?.address?.street,
              addressLocality: store?.city,
              addressRegion: store?.address?.state,
              postalCode: store?.address?.zipCode
            },

            geo: {
              '@type': 'GeoCoordinates',
              latitude: store?.location?.lat,
              longitude: store?.location?.lng
            }
          })}
        </script>
      </Helmet>

      <header
        style={{
          borderBottom: '2px solid #eee',
          paddingBottom: '20px'
        }}
      >
        <h1>{store?.name}</h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: '#555'
          }}
        >
          Serving the {store?.city} community
        </p>
      </header>

      <section
        style={{
          marginTop: '20px'
        }}
      >
        <h2>Store Details</h2>

        <p>
          <strong>Address:</strong>{' '}
          {store?.address?.street},
          {' '}
          {store?.city},
          {' '}
          {store?.address?.state}
          {' - '}
          {store?.address?.zipCode}
        </p>

        <p>
          <strong>Phone:</strong>{' '}
          {store?.contact?.phone}
        </p>

        <p>
          <strong>Email:</strong>{' '}
          {store?.contact?.email}
        </p>
      </section>
    </div>
  );
};

export default StorePage;

