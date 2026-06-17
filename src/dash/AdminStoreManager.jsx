import { useState, useEffect } from 'react';
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
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection
} from 'firebase/firestore';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const WEBSITE_CANONICAL_URL = 'https://omi-pet-website.vercel.app/';
const ITEMS_PER_PAGE = 10;

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const generateStoreId = () => {
  const randomCode = Math.random().toString(36).substring(2, 8);
  return `location-${randomCode}`;
};

const emptyStoreData = {
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
    canonical_url: WEBSITE_CANONICAL_URL,
    keywords: ''
  }
};

const ChangeMapView = ({ center }) => {
  const map = useMap();
  map.setView([center.lat, center.lng], 15);
  return null;
};

const MapLockController = ({ isMapUnlocked }) => {
  const map = useMap();

  if (isMapUnlocked) {
    map.scrollWheelZoom.enable();
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.touchZoom.enable();
  } else {
    map.scrollWheelZoom.disable();
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
  }

  return null;
};

const LocationPicker = ({ position, setPosition, isMapUnlocked }) => {
  useMapEvents({
    click: (e) => {
      if (!isMapUnlocked) return;

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
  const [isMapUnlocked, setIsMapUnlocked] = useState(false);
  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const [storeData, setStoreData] = useState(emptyStoreData);
  const [storesList, setStoresList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingStoreId, setEditingStoreId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const fetchStores = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'stores'));

      const stores = querySnapshot.docs.map((item) => ({
        firebase_id: item.id,
        ...item.data()
      }));

      setStoresList(stores);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

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
      if (!searchLocation.trim()) {
        alert('Please enter a location to search');
        return;
      }

      const provider = new OpenStreetMapProvider();

      const results = await provider.search({
        query: searchLocation
      });

      if (results.length > 0) {
        const result = results[0];

        setStoreData((prev) => ({
          ...prev,
          location: {
            lat: Number(result.y),
            lng: Number(result.x)
          }
        }));
      } else {
        alert('No location found');
      }
    } catch (err) {
      console.error(err);
      alert('Location search failed');
    }
  };

  const handleEdit = (store) => {
    setIsEditing(true);
    setEditingStoreId(store.store_id || store.firebase_id);

    setStoreData({
      ...emptyStoreData,
      ...store,
      seo_data: {
        ...emptyStoreData.seo_data,
        ...store.seo_data,
        canonical_url: WEBSITE_CANONICAL_URL
      }
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleDelete = async (storeId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this store?'
    );

    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(firestore, 'stores', storeId));

      alert('Store deleted successfully');

      if (editingStoreId === storeId) {
        handleResetForm();
      }

      fetchStores();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete store');
    }
  };

  const handleResetForm = () => {
    setStoreData(emptyStoreData);
    setIsEditing(false);
    setEditingStoreId(null);
    setSearchLocation('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalStoreId = isEditing ? editingStoreId : generateStoreId();

      const finalStoreData = {
        ...storeData,
        store_id: finalStoreId,
        seo_data: {
          ...storeData.seo_data,
          canonical_url: WEBSITE_CANONICAL_URL
        }
      };

      await setDoc(
        doc(firestore, 'stores', finalStoreId),
        finalStoreData
      );

      alert(
        isEditing
          ? 'Store updated successfully!'
          : `Store saved successfully! Store ID: ${finalStoreId}`
      );

      handleResetForm();
      fetchStores();
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    }
  };

  const totalPages = Math.ceil(storesList.length / ITEMS_PER_PAGE);

  const paginatedStores = storesList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
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
    mapTypeButton: {
      padding: '10px 20px',
      backgroundColor: isSatelliteView ? '#111827' : '#0d6efd',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    lockButton: {
      padding: '10px 20px',
      backgroundColor: isMapUnlocked ? '#dc3545' : '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    editButton: {
      padding: '8px 14px',
      backgroundColor: '#ffc107',
      color: '#000',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    deleteButton: {
      padding: '8px 14px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#6c757d',
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
    },
    mapBox: {
      height: '400px',
      width: '100%',
      position: 'relative'
    },
    mapStatus: {
      marginTop: '10px',
      fontSize: '14px',
      color: isMapUnlocked ? '#dc3545' : '#28a745'
    },
    listCard: {
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      marginBottom: '10px',
      backgroundColor: '#fff'
    },
    keywordBadge: {
      display: 'inline-block',
      padding: '5px 10px',
      margin: '4px',
      backgroundColor: '#e9f2ff',
      color: '#0056b3',
      borderRadius: '20px',
      fontSize: '12px'
    },
    paginationButton: {
      padding: '8px 14px',
      margin: '4px',
      border: '1px solid #007bff',
      backgroundColor: '#fff',
      color: '#007bff',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    activePageButton: {
      padding: '8px 14px',
      margin: '4px',
      border: '1px solid #007bff',
      backgroundColor: '#007bff',
      color: '#fff',
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

        <h2>{isEditing ? 'Edit Store' : 'Store Manager'}</h2>

        <p>
          <strong>Canonical URL:</strong> {WEBSITE_CANONICAL_URL}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.section}>
          <h3>Basic Details</h3>

          <div style={styles.grid}>
            <input
              placeholder="Store Name"
              value={storeData.name}
              style={styles.input}
              onChange={(e) => handleChange(e, null, 'name')}
            />

            <input
              placeholder="City"
              value={storeData.city}
              style={styles.input}
              onChange={(e) => handleChange(e, null, 'city')}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3>Address & Contact</h3>

          <div style={styles.grid}>
            <input
              placeholder="Street"
              value={storeData.address.street}
              style={styles.input}
              onChange={(e) => handleChange(e, 'address', 'street')}
            />

            <input
              placeholder="State"
              value={storeData.address.state}
              style={styles.input}
              onChange={(e) => handleChange(e, 'address', 'state')}
            />

            <input
              placeholder="Zip Code"
              value={storeData.address.zipCode}
              style={styles.input}
              onChange={(e) => handleChange(e, 'address', 'zipCode')}
            />

            <input
              placeholder="Phone"
              value={storeData.contact.phone}
              style={styles.input}
              onChange={(e) => handleChange(e, 'contact', 'phone')}
            />

            <input
              placeholder="Email"
              value={storeData.contact.email}
              style={styles.input}
              onChange={(e) => handleChange(e, 'contact', 'email')}
            />
          </div>
        </div>

        <div style={styles.section}>
          <h3>SEO Settings</h3>

          <div style={styles.grid}>
            <input
              placeholder="Meta Title"
              value={storeData.seo_data.meta_title}
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'seo_data', 'meta_title')
              }
            />

            <input
              placeholder="SEO Keywords comma separated"
              value={storeData.seo_data.keywords}
              style={styles.input}
              onChange={(e) =>
                handleChange(e, 'seo_data', 'keywords')
              }
            />
          </div>

          <textarea
            placeholder="Meta Description"
            value={storeData.seo_data.meta_description}
            style={{
              ...styles.input,
              marginTop: '10px',
              height: '80px'
            }}
            onChange={(e) =>
              handleChange(e, 'seo_data', 'meta_description')
            }
          />
        </div>

        <div style={styles.section}>
          <h3>Store Location</h3>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginBottom: '15px',
              flexWrap: 'wrap'
            }}
          >
            <input
              type="text"
              value={searchLocation}
              placeholder="Search location..."
              onChange={(e) => setSearchLocation(e.target.value)}
              style={styles.input}
            />

            <button
              type="button"
              onClick={searchPlace}
              style={styles.button}
            >
              Search
            </button>

            <button
              type="button"
              style={styles.mapTypeButton}
              onClick={() => setIsSatelliteView((prev) => !prev)}
            >
              {isSatelliteView ? 'Switch to Map View' : 'Switch to Satellite View'}
            </button>

            <button
              type="button"
              style={styles.lockButton}
              onClick={() => setIsMapUnlocked((prev) => !prev)}
            >
              {isMapUnlocked ? 'Lock Map Zoom' : 'Unlock Map Zoom'}
            </button>
          </div>

          <p style={styles.mapStatus}>
            {isMapUnlocked
              ? 'Map is unlocked. You can zoom, drag, and click to select location.'
              : 'Map is locked. Page scrolling will work normally.'}
          </p>

          <p>
            <strong>Latitude:</strong> {storeData.location.lat}
            {' | '}
            <strong>Longitude:</strong> {storeData.location.lng}
          </p>

          <div style={styles.mapBox}>
            <MapContainer
              center={[
                storeData.location.lat,
                storeData.location.lng
              ]}
              zoom={13}
              scrollWheelZoom={false}
              dragging={false}
              doubleClickZoom={false}
              touchZoom={false}
              style={{
                height: '100%',
                width: '100%'
              }}
            >
              {isSatelliteView ? (
                <TileLayer
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  attribution="Tiles &copy; Esri"
                />
              ) : (
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
              )}

              <ChangeMapView center={storeData.location} />

              <MapLockController isMapUnlocked={isMapUnlocked} />

              <LocationPicker
                position={storeData.location}
                isMapUnlocked={isMapUnlocked}
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

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" style={styles.button}>
            {isEditing ? 'Update Store' : 'Save To Firebase'}
          </button>

          {isEditing && (
            <button
              type="button"
              style={styles.cancelButton}
              onClick={handleResetForm}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div style={styles.section}>
        <h3>Saved Stores List</h3>

        {paginatedStores.length === 0 ? (
          <p>No store data saved yet.</p>
        ) : (
          paginatedStores.map((store) => {
            const keywordList = store?.seo_data?.keywords
              ? store.seo_data.keywords
                  .split(',')
                  .map((item) => item.trim())
                  .filter(Boolean)
              : [];

            return (
              <div
                key={store.store_id || store.firebase_id}
                style={styles.listCard}
              >
                <h4>{store.name || 'Unnamed Store'}</h4>

                <p>
                  <strong>ID:</strong>{' '}
                  {store.store_id || store.firebase_id}
                </p>

                <p>
                  <strong>City:</strong> {store.city}
                </p>

                <p>
                  <strong>Phone:</strong> {store.contact?.phone}
                </p>

                <p>
                  <strong>Latitude:</strong>{' '}
                  {store.location?.lat || 'Not available'}
                </p>

                <p>
                  <strong>Longitude:</strong>{' '}
                  {store.location?.lng || 'Not available'}
                </p>

                <div>
                  <strong>SEO Keywords:</strong>
                  <div>
                    {keywordList.length > 0 ? (
                      keywordList.map((keyword, index) => (
                        <span
                          key={`${keyword}-${index}`}
                          style={styles.keywordBadge}
                        >
                          {keyword}
                        </span>
                      ))
                    ) : (
                      <span> Not added</span>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    marginTop: '12px'
                  }}
                >
                  <button
                    type="button"
                    style={styles.editButton}
                    onClick={() => handleEdit(store)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    style={styles.deleteButton}
                    onClick={() =>
                      handleDelete(store.store_id || store.firebase_id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}

        {totalPages > 1 && (
          <div style={{ marginTop: '20px' }}>
            <button
              type="button"
              style={styles.paginationButton}
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                type="button"
                style={
                  currentPage === index + 1
                    ? styles.activePageButton
                    : styles.paginationButton
                }
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              type="button"
              style={styles.paginationButton}
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStoreManager;