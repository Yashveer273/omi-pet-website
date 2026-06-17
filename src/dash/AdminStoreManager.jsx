
import { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// Marker Fix
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ChangeMapView = ({ center }) => {
  const map = useMap();

  map.setView([center.lat, center.lng], 15);

  return null;
};

const LocationPicker = ({ position, setPosition }) => {
  useMapEvents({
    click: (e) => {
      setPosition({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return position ? (
    <Marker position={[position.lat, position.lng]} />
  ) : null;
};

const AdminStoreManager = () => {
  const [searchLocation, setSearchLocation] = useState('');

  const [storeData, setStoreData] = useState({
    store_id: '',
    name: '',
    city: '',

    location: {
      lat: 27.8974,
      lng: 78.0777
    },

    address: {
      street: '',
      state: '',
      zipCode: ''
    },

    contact: {
      phone: '',
      email: ''
    },

    seo_data: {
      meta_title: '',
      meta_description: '',
      canonical_url: '',
      keywords: ''
    }
  });

  const handleChange = (e, category, field) => {
    if (category) {
      setStoreData((prev) => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: e.target.value
        }
      }));
    } else {
      setStoreData((prev) => ({
        ...prev,
        [field]: e.target.value
      }));
    }
  };

  const searchPlace = async () => {
    try {
      const provider = new OpenStreetMapProvider();

      const results = await provider.search({
        query: searchLocation
      });

      if (results.length > 0) {
        const result = results[0];

        setStoreData((prev) => ({
          ...prev,
          city: result.label,

          location: {
            lat: result.y,
            lng: result.x
          }
        }));
      }
    } catch (err) {
      console.error(err);
      alert('Location search failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(
        doc(
          firestore,
          'stores',
          storeData.store_id || 'default_id'
        ),
        storeData
      );

      alert('Store saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    }
  };

  const styles = {
    container: {
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    },

    section: {
      marginBottom: '20px',
      padding: '15px',
      borderLeft: '4px solid #007bff',
      backgroundColor: '#fff',
      borderRadius: '0 4px 4px 0'
    },

    grid: {
      display: 'grid',
      gridTemplateColumns:
        'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '15px'
    },

    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      boxSizing: 'border-box'
    },

    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },

    backBtn: {
      padding: '8px 16px',
      backgroundColor: '#6c757d',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <button
          style={styles.backBtn}
          onClick={() => window.history.back()}
        >
          Back
        </button>

        <h2>Store Manager</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.section}>
          <h3>Basic Details</h3>

          <div style={styles.grid}>
            <input
              placeholder="Store ID"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, null, 'store_id')
              }
            />

            <input
              placeholder="Store Name"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, null, 'name')
              }
            />

            <input
              placeholder="City"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, null, 'city')
              }
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3>Address & Contact</h3>

          <div style={styles.grid}>
            <input
              placeholder="Street"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'address', 'street')
              }
            />

            <input
              placeholder="State"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'address', 'state')
              }
            />

            <input
              placeholder="Zip Code"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'address', 'zipCode')
              }
            />

            <input
              placeholder="Phone"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'contact', 'phone')
              }
            />

            <input
              placeholder="Email"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'contact', 'email')
              }
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3>SEO Settings</h3>

          <div style={styles.grid}>
            <input
              placeholder="Meta Title"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'seo_data', 'meta_title')
              }
            />

            <input
              placeholder="Canonical URL"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'seo_data', 'canonical_url')
              }
            />

            <input
              placeholder="SEO Keywords"
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'seo_data', 'keywords')
              }
            />
          </div>

          <textarea
            placeholder="Meta Description"
            style={{
              ...styles.input,
              marginTop: '10px',
              height: '80px'
            }}
            onChange={(e) =>
              handleChange(
                e,
                'seo_data',
                'meta_description'
              )
            }
          />
        </div>

        <div style={styles.section}>
          <h3>Store Location</h3>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '15px'
            }}
          >
            <input
              type="text"
              value={searchLocation}
              placeholder="Search location..."
              onChange={(e) =>
                setSearchLocation(e.target.value)
              }
              style={styles.input}
            />

            <button
              type="button"
              onClick={searchPlace}
              style={styles.button}
            >
              Search
            </button>
          </div>

          <div
            style={{
              height: '400px',
              width: '100%'
            }}
          >
            <MapContainer
              center={[
                storeData.location.lat,
                storeData.location.lng
              ]}
              zoom={13}
              style={{
                height: '100%',
                width: '100%'
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <ChangeMapView
                center={storeData.location}
              />

              <LocationPicker
                position={storeData.location}
                setPosition={(pos) =>
                  setStoreData((prev) => ({
                    ...prev,
                    location: pos
                  }))
                }
              />
            </MapContainer>
          </div>
        </div>

        <button
          type="submit"
          style={styles.button}
        >
          Save To Firebase
        </button>
      </form>
    </div>
  );
};

export default AdminStoreManager;
