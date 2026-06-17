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

  const rawKeywords =
    store?.seo_data?.keywords ||
    `pet store in ${store?.city || ''}, cat food, dog food, pet accessories`;

  // Convert comma-separated keywords into a clean array
  const keywordList = rawKeywords
    .split(',')
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  // Convert cleaned array back to comma-separated string for meta tag
  const keywords = keywordList.join(', ');

  const metaTitle =
    store?.seo_data?.meta_title ||
    `${store?.name || 'Pet Store'} in ${store?.city || ''}`;

  const metaDescription =
    store?.seo_data?.meta_description ||
    `${store?.name || 'Our store'} provides pet products and services in ${store?.city || 'your area'}.`;

  const canonicalUrl =
    store?.seo_data?.canonical_url || window.location.href;

  const googleMapUrl =
    store?.location?.lat && store?.location?.lng
      ? `https://www.google.com/maps/search/?api=1&query=${store.location.lat},${store.location.lng}`
      : null;

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',

    '@id': canonicalUrl,
    name: store?.name,
    telephone: store?.contact?.phone,
    email: store?.contact?.email,
    url: canonicalUrl,

    // Schema keywords as proper comma-separated string
    keywords,

    address: {
      '@type': 'PostalAddress',
      streetAddress: store?.address?.street,
      addressLocality: store?.city,
      addressRegion: store?.address?.state,
      postalCode: store?.address?.zipCode,
      addressCountry: 'IN'
    },

    geo: {
      '@type': 'GeoCoordinates',
      latitude: store?.location?.lat,
      longitude: store?.location?.lng
    },

    areaServed: {
      '@type': 'City',
      name: store?.city
    }
  };

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
        <title>{metaTitle}</title>

        <meta name="description" content={metaDescription} />

        {/* Proper comma-separated SEO keywords */}
        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={canonicalUrl} />

        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
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
          Pet store serving the {store?.city} community
        </p>
      </header>

      <section style={{ marginTop: '20px' }}>
        <h2>Store Details</h2>

        <p>
          <strong>Address:</strong>{' '}
          {store?.address?.street}, {store?.city},{' '}
          {store?.address?.state} - {store?.address?.zipCode}
        </p>

        <p>
          <strong>Phone:</strong> {store?.contact?.phone}
        </p>

        <p>
          <strong>Email:</strong> {store?.contact?.email}
        </p>

        {googleMapUrl && (
          <p>
            <strong>Location:</strong>{' '}
            <a
              href={googleMapUrl}
              target="_blank"
              rel="noreferrer"
            >
              View Store on Google Maps
            </a>
          </p>
        )}
      </section>

      <section style={{ marginTop: '25px' }}>
        <h2>Pet Products and Services in {store?.city}</h2>

        <p>
          {store?.name} provides pet-related products and services
          for customers in {store?.city}. You can contact us for
          cat products, dog products, pet accessories, and other
          pet care needs.
        </p>
      </section>

      <section style={{ marginTop: '25px' }}>
        <h2>Related Search Keywords</h2>

        <div>
          {keywordList.map((keyword, index) => (
            <span
              key={`${keyword}-${index}`}
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                margin: '4px',
                backgroundColor: '#e9f2ff',
                color: '#0056b3',
                borderRadius: '20px',
                fontSize: '13px'
              }}
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StorePage;