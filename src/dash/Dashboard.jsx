import  { useState, useEffect, useCallback } from 'react';
import { firestore } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

export default function DashboardPage() {
  // Navigation Routing & Global UI Rendering Switches
  const [activeTab, setActiveTab] = useState('meta');
  const [selectedSubCategory, setSelectedSubCategory] = useState('breeder'); // Nested tab selection for Service Types
  const [selectedServiceSpecies, setSelectedServiceSpecies] = useState('dog'); // Dynamic tracker for service species tab
  const [loading, setLoading] = useState(false);
  
  // Data Containers matching database JSON structures
  const [meta, setMeta] = useState({ heading: '', subheading: '', speciesTabs: [], combinedBreedFilters: [] });
  const [registryList, setRegistryList] = useState([]);
  const [serviceDirectories, setServiceDirectories] = useState({});

  // Dynamic Workspace Edit Forms States
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Constants Mapped Directly to your Client-Side Dropdown selectors
  const BREED_FILTERS = [
    { id: "all", label: "All Breeds" },
    { id: "toy-breed", label: "🧸 Toy Breeds" },
    { id: "small-size", label: "✨ Small Size" },
    { id: "medium-size", label: "⚡ Medium Size" },
    { id: "giant-size", label: "🐕 Giant Size" },
    { id: "apartment-breed", label: "🏠 Apartment Breeds" },
    { id: "office-breed", label: "💼 Office Breeds" },
    { id: "family-breed", label: "👨‍👩‍👧‍👦 Family Breeds" },
    { id: "gifting-breed", label: "🎁 Gifting Breeds" },
    { id: "farm-breed", label: "🚜 Farm Breeds" },
    { id: "alarming-breed", label: "🚨 Alert & Guard" },
    { id: "trending", label: "🔥 Trending Breeds" }
  ];

  const BREED_STAGE_OPTIONS = [
    { id: 'adult', label: 'Adult' },
    { id: 'puppy', label: 'Puppy' },
    { id: 'new-breed', label: 'New Breed' }
  ];

  const speciesLabelMap = {
    dog: "🐕 Dog",
    cat: "🐈 Cat",
    small: "🐹 Small Animal",
    fish: "🐟 Fish",
    bird: "🦜 Bird"
  };

  // Synchronized Firestore Read Handler Engine
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeTab === 'meta') {
        const metaDoc = await getDoc(doc(firestore, 'metadata', 'configuration'));
        if (metaDoc.exists()) setMeta(metaDoc.data());
      } else if (activeTab.endsWith('-registry')) {
        const speciesId = activeTab.split('-')[0];
        const querySnapshot = await getDocs(collection(firestore, `registry_${speciesId}`));
        const items = [];
        querySnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
        setRegistryList(items);
      } else if (activeTab === 'global-services') {
        const docRef = doc(firestore, 'serviceDirectories', selectedServiceSpecies);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setServiceDirectories(prev => ({ ...prev, [selectedServiceSpecies]: docSnap.data() }));
        } else {
          setServiceDirectories(prev => ({ ...prev, [selectedServiceSpecies]: {} }));
        }
      }
    } catch (err) {
      console.error("Error retrieving dataset configuration arrays: ", err);
    }
    setLoading(false);
  }, [activeTab, selectedServiceSpecies]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setSelectedItem(null);
    setIsEditing(false);
  }, [activeTab, selectedSubCategory, selectedServiceSpecies]);

  // Automated form helper matching the new description and pricing field variables
  const handleAutofillForm = () => {
    const speciesId = activeTab.split('-')[0];

    if (activeTab.endsWith('-registry')) {
      const samples = {
        dog: { name: "Beagle", sizeGroup: "small-size", traitGroup: "family-breed", breedStage: "puppy", scaleAndType: "Small Size • Compact Hound", origin: "United Kingdom", lifespan: "12-15 Years", temperament: "Amiable, intelligent, determined", description: "Beagles are cheerful, compact tracking hounds known for their incredible sense of smell and friendly demeanor, making them outstanding all-around family pets.", puppyImg: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600" },
        cat: { name: "Siamese Cat", sizeGroup: "small-size", traitGroup: "office-breed", breedStage: "adult", scaleAndType: "Small Size • Vocal Dynast", origin: "Thailand", lifespan: "12-20 Years", temperament: "Vocal, affectionate, active", description: "Siamese cats are exceptionally expressive, elegant, and social companions who love chatting with their humans and thrive in active households.", puppyImg: "https://images.unsplash.com/photo-1513360309081-36f20c28596f?w=600" },
        small: { name: "Syrian Hamster", sizeGroup: "toy-breed", traitGroup: "apartment-breed", breedStage: "new-breed", scaleAndType: "Toy Variant • Pocket Builder", origin: "Syria", lifespan: "2-3 Years", temperament: "Solitary, active, curious", description: "Ideal small apartment companion that loves running on wheels and building complex tunnels. Best kept individually due to territorial habits.", puppyImg: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600" },
        fish: { name: "Super Delta Betta", sizeGroup: "toy-breed", traitGroup: "office-breed", breedStage: "adult", scaleAndType: "Toy Variant • Aquatic Canvas", origin: "Southeast Asia", lifespan: "3-5 Years", temperament: "Territorial, elegant, reactive", description: "Stunning freshwater fish boasting long, vibrant fan fins. Requires minimal desk space but thrives best in warm, filtered environments.", puppyImg: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600" },
        bird: { name: "Cockatiel", sizeGroup: "small-size", traitGroup: "family-breed", breedStage: "puppy", scaleAndType: "Small Size • Crested Whistler", origin: "Australia", lifespan: "15-20 Years", temperament: "Gentle, cheerful, highly musical", description: "A beautifully expressive companion parrot capable of learning popular household whistle tunes and showing immense affection to family members.", puppyImg: "https://images.unsplash.com/photo-1522850959403-e28d1c9ef007?w=600" }
      };
      setSelectedItem(prev => ({ ...prev, ...(samples[speciesId] || samples.dog) }));
    } else {
      const samples = {
        breeder: { title: `Premium ${selectedServiceSpecies.toUpperCase()} Breeders`, sub: "Ethical & Verified Standards", rating: "4.9", loc: "National Network", badge: "Certified Purebred", img: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500" },
        trainer: { title: "Behavior Specialist Center", sub: "Positive Reinforcement Coaching", rating: "5.0", loc: "In-Home & Facility", badge: "Expert Certified", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" },
        walker: { title: "Paws & Trails Group Walks", sub: "Daily Walk Trackers", rating: "4.8", loc: "Metro Regions", badge: "Insured Guides", img: "https://images.unsplash.com/photo-1551712702-4b7335dd8706?w=500" },
        food: { title: "All-Natural Organic Kibble", sub: "Superfood Vitamins Mix", rating: "5.0", loc: "Online Express", badge: "Top Quality", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500" },
        accessories: { title: "Comfort Fit Heavy Duty Harness", sub: "Reflective Premium Nylon Trim", rating: "4.7", price: "₹1,299", badge: "Highly Durable", img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500" },
        stay: { title: "Pet Paradise Luxury Resort", sub: "Monitored Climate Boarding", rating: "4.9", loc: "City Suburbs", badge: "Luxury Accommodation", img: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500" },
        medicine: { title: "Multi-Vitamin Immunity Care Drops", sub: "Veterinary Approved Formula", rating: "5.0", price: "₹450", badge: "Vet Endorsed", img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=500" }
      };
      setSelectedItem(prev => ({ ...prev, ...(samples[selectedSubCategory] || samples.breeder) }));
    }
  };

  const handleSeedDatabase = async () => {
    if (!window.confirm("Initialize complete mockup payload data matching global blueprints?")) return;
    setLoading(true);
    try {
      await setDoc(doc(firestore, 'metadata', 'configuration'), {
        heading: "Pets & Cat Categories",
        subheading: "Explore Dogs, Cats, Birds, Fish, Small Pets, and Trusted Veterinary Care Services",
        speciesTabs: [
          { id: "dog", name: "🐕 Dog", prefix: "Dog", foodIcon: "🥩" },
          { id: "cat", name: "🐈 Cat", prefix: "Cat", foodIcon: "🐟" },
          { id: "small", name: "🐹 Small Animal", prefix: "Small Pet", foodIcon: "🥕" },
          { id: "fish", name: "🐟 Fish", prefix: "Fish", foodIcon: "🫙" },
          { id: "bird", name: "🦜 Bird", prefix: "Bird", foodIcon: "🌾" }
        ],
        combinedBreedFilters: BREED_FILTERS
      });

      await setDoc(doc(firestore, 'registry_dog', 'DOG-1717582451000'), {
        breedId: "DOG-1717582451000", name: "French Bulldog", sizeGroup: "small-size", traitGroup: "apartment-breed",
        scaleAndType: "Small Size • Cozy & Adaptable", origin: "France", lifespan: "10-12 Years",
        temperament: "Playful, loving, easygoing, and very quiet",
        description: "The French Bulldog is a stylish, affectionate companion characterized by massive bat ears and a steady, universally quiet indoor disposition.",
        puppyImg: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600",
        adultImg: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600"
      });

      const baseCategories = { breeder: [], trainer: [], walker: [], food: [], accessories: [], stay: [], medicine: [] };
      await setDoc(doc(firestore, 'serviceDirectories', 'dog'), {
        ...baseCategories,
        breeder: [{ id: "SRV-BRE-DOG", title: "Royal Golden Kennels", sub: "KCI Certified Breeder", rating: "4.9", loc: "Delhi, NCR", badge: "Verified Champion Lines", img: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=500" }]
      });
      await setDoc(doc(firestore, 'serviceDirectories', 'cat'), baseCategories);
      await setDoc(doc(firestore, 'serviceDirectories', 'small'), baseCategories);
      await setDoc(doc(firestore, 'serviceDirectories', 'fish'), baseCategories);
      await setDoc(doc(firestore, 'serviceDirectories', 'bird'), baseCategories);

      alert("Firestore initialized across all modules successfully!");
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error seeding global schema configurations.");
    }
    setLoading(false);
  };

  const handleSaveMeta = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await setDoc(doc(firestore, 'metadata', 'configuration'), meta);
      alert('Application UI headers synchronized.');
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSaveRegistryItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const speciesId = activeTab.split('-')[0];
    try {
      const generatedDocId = isEditing ? selectedItem.breedId : `${speciesId.toUpperCase()}-${Date.now()}`;
      const payload = { ...selectedItem, breedId: generatedDocId };
      await setDoc(doc(firestore, `registry_${speciesId}`, generatedDocId), payload);
      alert(`Record saved under ID: ${generatedDocId}`);
      setIsEditing(false);
      setSelectedItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDeleteRegistryItem = async (id) => {
    if (!window.confirm("Permanently wipe out this record line item?")) return;
    setLoading(true);
    const speciesId = activeTab.split('-')[0];
    try {
      await deleteDoc(doc(firestore, `registry_${speciesId}`, id));
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSaveServiceItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentSpeciesServices = serviceDirectories[selectedServiceSpecies] || {};
      let subCategoryList = [...(currentSpeciesServices[selectedSubCategory] || [])];

      if (isEditing) {
        subCategoryList = subCategoryList.map(item => item.id === selectedItem.id ? selectedItem : item);
      } else {
        const autoGeneratedId = `SRV-${selectedSubCategory.substring(0,3).toUpperCase()}-${Date.now()}`;
        const newItem = { ...selectedItem, id: autoGeneratedId };
        subCategoryList.push(newItem);
      }

      const updatedPayload = { ...currentSpeciesServices, [selectedSubCategory]: subCategoryList };
      await setDoc(doc(firestore, 'serviceDirectories', selectedServiceSpecies), updatedPayload);
      alert(`Marketplace directory updated for ${selectedServiceSpecies.toUpperCase()}`);
      setIsEditing(false);
      setSelectedItem(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleDeleteServiceItem = async (id) => {
    if (!window.confirm("Remove this item card from current catalog arrays?")) return;
    setLoading(true);
    try {
      const currentSpeciesServices = serviceDirectories[selectedServiceSpecies] || {};
      const updatedList = (currentSpeciesServices[selectedSubCategory] || []).filter(item => item.id !== id);
      const updatedPayload = { ...currentSpeciesServices, [selectedSubCategory]: updatedList };
      await setDoc(doc(firestore, 'serviceDirectories', selectedServiceSpecies), updatedPayload);
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const getFilterLabel = (id) => {
    const match = BREED_FILTERS.find(f => f.id === id);
    return match ? match.label : id;
  };

  const styles = {
    layoutContainer: { display: 'flex', minHeight: '100vh', width: '100vw', backgroundColor: '#f8fafc', fontFamily: '"Inter", system-ui, sans-serif' },
    sidebar: { width: '280px', backgroundColor: '#0f172a', color: '#f8fafc', display: 'flex', flexDirection: 'column', padding: '30px 16px', position: 'fixed', top: 0, left: 0, bottom: 0, boxShadow: '4px 0 12px rgba(15,23,42,0.15)' },
    sidebarHeader: { fontSize: '20px', fontWeight: 'bold', color: '#f59e0b', textAlign: 'center', marginBottom: '35px', borderBottom: '1px solid #334155', paddingBottom: '15px' },
    sidebarBtn: (isActive) => ({ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', width: '100%', border: 'none', borderRadius: '8px', backgroundColor: isActive ? '#f59e0b' : 'transparent', color: isActive ? '#0f172a' : '#94a3b8', cursor: 'pointer', textAlign: 'left', fontSize: '14px', fontWeight: isActive ? '600' : '400', transition: 'all 0.15s ease', marginBottom: '6px' }),
    workArea: { marginLeft: '280px', flexGrow: 1, padding: '40px', boxSizing: 'border-box' },
    topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #e2e8f0', paddingBottom: '15px' },
    pageTitle: { fontSize: '24px', fontWeight: '700', color: '#1e293b' },
    btnPrimary: { padding: '10px 20px', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' },
    btnSecondary: { padding: '10px 20px', backgroundColor: '#64748b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', marginRight: '10px' },
    btnDanger: { padding: '6px 12px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' },
    btnEdit: { padding: '6px 12px', backgroundColor: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '6px' },
    seedBtn: { padding: '10px 16px', backgroundColor: '#334155', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '500' },
    autofillBtn: { padding: '8px 14px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', marginBottom: '20px', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '25px' },
    card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', position: 'relative', display: 'flex', flexDirection: 'column' },
    cardImg: { width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '14px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' },
    input: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', width: '100%', boxSizing: 'border-box', backgroundColor: '#fff' },
    textarea: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', width: '100%', minHeight: '80px', boxSizing: 'border-box', backgroundColor: '#fff', fontFamily: 'inherit', resize: 'vertical' },
    select: { padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', width: '100%', boxSizing: 'border-box', backgroundColor: '#fff', cursor: 'pointer' },
    subTabsBar: { display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto', paddingBottom: '6px' },
    subTabBtn: (active) => ({ padding: '8px 16px', backgroundColor: active ? '#0f172a' : '#e2e8f0', color: active ? '#fff' : '#475569', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', whiteSpace: 'nowrap' }),
    speciesTabBtn: (active) => ({ padding: '10px 20px', backgroundColor: active ? '#f59e0b' : '#fff', color: active ? '#0f172a' : '#475569', border: active ? '2px solid #f59e0b' : '2px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }),
    badgeStyle: { background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '12px', fontWeight: '500', color: '#334155' }
  };

  const menuOptions = [

    { id: 'dog-registry', label: 'Dog Registry', icon: '🐩' },
    { id: 'cat-registry', label: 'Cat Registry', icon: '🐱' },
    { id: 'small-registry', label: 'Small Pets Registry', icon: '🐹' },
    { id: 'fish-registry', label: 'Fish Registry', icon: '🐠' },
    { id: 'bird-registry', label: 'Bird Registry', icon: '🐦' },
    { id: 'global-services', label: 'Service Directories', icon: '🩺' }
  ];

  const isProductCategory = ['accessories', 'medicine'].includes(selectedSubCategory);

  return (
    <div style={styles.layoutContainer}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>🐾 Admin Workspace</div>
        {menuOptions.map((opt) => (
          <button key={opt.id} style={styles.sidebarBtn(activeTab === opt.id)} onClick={() => setActiveTab(opt.id)}>
            <span>{opt.icon}</span> {opt.label}
          </button>
        ))}
      </div>

      <div style={styles.workArea}>
        <div style={styles.topBar}>
          <div style={styles.pageTitle}>
            {activeTab === 'meta' && "Application Platform Configuration Setup"}
            {activeTab.endsWith('-registry') && `${activeTab.split('-')[0].toUpperCase()} Catalog Inventory`}
            {activeTab === 'global-services' && "Global Services Directory Matrix"}
          </div>
          <button style={styles.seedBtn} onClick={handleSeedDatabase}>⚡ Seed Blueprints</button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: '40px', fontSize: '16px', color: '#64748b', fontWeight: '600' }}>🔄 Contacting Cloud Infrastructure Hub...</div>}

        {!loading && (
          <>
            {activeTab === 'meta' && (
              <form onSubmit={handleSaveMeta} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div style={styles.formGroup}>
                  <label style={{ fontWeight: '600', color: '#334155' }}>Platform Core Headline</label>
                  <input style={styles.input} type="text" placeholder="e.g., Pets & Cat Categories" value={meta.heading || ''} onChange={e => setMeta({ ...meta, heading: e.target.value })} />
                </div>
                <div style={styles.formGroup}>
                  <label style={{ fontWeight: '600', color: '#334155' }}>Platform Sub-Headline Context Statement</label>
                  <input style={styles.input} type="text" placeholder="e.g., Explore Dogs, Cats..." value={meta.subheading || ''} onChange={e => setMeta({ ...meta, subheading: e.target.value })} />
                </div>
                <button type="submit" style={styles.btnPrimary}>💾 Push Changes Live</button>
              </form>
            )}

            {activeTab.endsWith('-registry') && !selectedItem && (
              <div>
                <button style={styles.btnPrimary} onClick={() => setSelectedItem({ name: '', sizeGroup: 'small-size', traitGroup: 'all', scaleAndType: '', origin: '', lifespan: '', temperament: '', description: '', puppyImg: '' })}>➕ Append Custom Breed Variant</button>
                <div style={styles.cardGrid}>
                  {registryList.map((breed) => (
                    <div key={breed.id} style={styles.card}>
                      <img src={breed.puppyImg || 'https://via.placeholder.com/150'} alt="Breed Visual Thumbnail" style={styles.cardImg} />
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>{breed.name}</h3>
                      <p style={{ margin: '3px 0', fontSize: '12px', color: '#64748b' }}><b>Breed Stage:</b> <span style={styles.badgeStyle}>{getFilterLabel(breed.breedStage)}</span></p>
                      <p style={{ margin: '3px 0', fontSize: '12px', color: '#64748b' }}><b>Breed:</b> <span style={styles.badgeStyle}>{getFilterLabel(breed.traitGroup)}</span></p>
                      {breed.description && <p style={{ margin: '8px 0', fontSize: '12px', color: '#475569', lineClamp: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{breed.description}</p>}
                      <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button style={styles.btnEdit} onClick={() => { setSelectedItem(breed); setIsEditing(true); }}>📝 Edit</button>
                        <button style={styles.btnDanger} onClick={() => handleDeleteRegistryItem(breed.id)}>🗑️ Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'global-services' && !selectedItem && (
              <div>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>
                  {['dog', 'cat', 'small', 'fish', 'bird'].map((spKey) => (
                    <button key={spKey} style={styles.speciesTabBtn(selectedServiceSpecies === spKey)} onClick={() => setSelectedServiceSpecies(spKey)}>
                      {speciesLabelMap[spKey]}
                    </button>
                  ))}
                </div>

                <div style={styles.subTabsBar}>
                  {['breeder', 'trainer', 'walker', 'food', 'accessories', 'stay', 'medicine'].map((category) => (
                    <button key={category} style={styles.subTabBtn(selectedSubCategory === category)} onClick={() => setSelectedSubCategory(category)}>
                      {category.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
                    Viewing <b>{selectedSubCategory.toUpperCase()}</b> marketplace configurations for <b>{selectedServiceSpecies.toUpperCase()}</b>
                  </span>
                  <button style={styles.btnPrimary} onClick={() => setSelectedItem(isProductCategory ? { title: '', sub: '', rating: '5.0', price: '', badge: '', img: '' } : { title: '', sub: '', rating: '5.0', loc: '', badge: '', img: '' })}>
                    ➕ Add {selectedSubCategory} Listing
                  </button>
                </div>

                <div style={styles.cardGrid}>
                  {((serviceDirectories[selectedServiceSpecies] || {})[selectedSubCategory] || []).map((srv, index) => (
                    <div key={srv.id || index} style={styles.card}>
                      {srv.img && <img src={srv.img} alt="Vendor Profile Representation" style={styles.cardImg} />}
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>{srv.title}</h3>
                      <p style={{ margin: '2px 0', fontSize: '12px', color: '#475569' }}>{srv.sub}</p>
                      <p style={{ margin: '2px 0', fontSize: '12px', color: '#d97706' }}>⭐ <b>{srv.rating}</b></p>
                      {isProductCategory ? (
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '700', color: '#10b981' }}>{srv.price || 'Price Pending'}</p>
                      ) : (
                        <p style={{ margin: '2px 0', fontSize: '12px', color: '#64748b' }}>📍 {srv.loc}</p>
                      )}
                      <div style={{ marginTop: 'auto', paddingTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button style={styles.btnEdit} onClick={() => { setSelectedItem(srv); setIsEditing(true); }}>📝 Edit</button>
                        <button style={styles.btnDanger} onClick={() => handleDeleteServiceItem(srv.id)}>🗑️ Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedItem && (
              <div style={{ backgroundColor: '#fff', padding: '35px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, fontSize: '18px', color: '#0f172a' }}>
                    {isEditing ? "⚙️ Edit Existing Element" : "✨ Create New Entry Component"}
                  </h3>
                  
                  {!isEditing && (
                    <button type="button" style={styles.autofillBtn} onClick={handleAutofillForm}>
                      ⚡ Autofill Form with Sample Data
                    </button>
                  )}
                </div>

                <form onSubmit={activeTab.endsWith('-registry') ? handleSaveRegistryItem : handleSaveServiceItem}>
                  {activeTab.endsWith('-registry') ? (
                    <>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Common Breed Name</label>
                        <input style={styles.input} placeholder="e.g., French Bulldog, Persian Cat, Golden Retriever" value={selectedItem.name || ''} onChange={e => setSelectedItem({ ...selectedItem, name: e.target.value })} required />
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Trait Category ID Tag</label>
                        <select style={styles.select} value={selectedItem.traitGroup || 'all'} onChange={e => setSelectedItem({ ...selectedItem, traitGroup: e.target.value })}>
                          {BREED_FILTERS.map((f) => (
                            <option key={`tr-${f.id}`} value={f.id}>{f.label} ({f.id})</option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Breed Stage</label>
                        <select style={styles.select} value={selectedItem.breedStage || 'adult'} onChange={e => setSelectedItem({ ...selectedItem, breedStage: e.target.value })}>
                          {BREED_STAGE_OPTIONS.map((stage) => (
                            <option key={`stage-${stage.id}`} value={stage.id}>{stage.label}</option>
                          ))}
                        </select>
                      </div>

                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Scale Type Configuration Line</label>
                        <input style={styles.input} placeholder="e.g., Small Size • Cozy & Adaptable" value={selectedItem.scaleAndType || ''} onChange={e => setSelectedItem({ ...selectedItem, scaleAndType: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Origin Country</label>
                        <input style={styles.input} placeholder="e.g., France, Germany, United Kingdom" value={selectedItem.origin || ''} onChange={e => setSelectedItem({ ...selectedItem, origin: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Lifespan Metrics</label>
                        <input style={styles.input} placeholder="e.g., 10-12 Years, 12-15 Years" value={selectedItem.lifespan || ''} onChange={e => setSelectedItem({ ...selectedItem, lifespan: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Behavioral Temperament Summary</label>
                        <input style={styles.input} placeholder="e.g., Playful, loving, easygoing, and very quiet" value={selectedItem.temperament || ''} onChange={e => setSelectedItem({ ...selectedItem, temperament: e.target.value })} />
                      </div>
                      
                      {/* COMPREHENSIVE COMPONENT BRIEF DESCRIPTION FIELD */}
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Detailed Catalog Variant Description</label>
                        <textarea style={styles.textarea} placeholder="Write a brief structural narrative highlighting behavior, historical details, or space compatibility..." value={selectedItem.description || ''} onChange={e => setSelectedItem({ ...selectedItem, description: e.target.value })} />
                      </div>

                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Phase Image Resource Location URL</label>
                        <input style={styles.input} placeholder="e.g., https://images.unsplash.com/photo-..." value={selectedItem.puppyImg || ''} onChange={e => setSelectedItem({ ...selectedItem, puppyImg: e.target.value })} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Item/Service Title Name</label>
                        <input style={styles.input} placeholder="e.g., Comfort Fit Nylon Harness, Hip & Joint Supplement" value={selectedItem.title || ''} onChange={e => setSelectedItem({ ...selectedItem, title: e.target.value })} required />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Sub-Heading Profile Context Description</label>
                        <input style={styles.input} placeholder="e.g., Adjustable Reflective Trim, Glucosamine Complex Formulation" value={selectedItem.sub || ''} onChange={e => setSelectedItem({ ...selectedItem, sub: e.target.value })} />
                      </div>
                      
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Numerical Performance Score (Rating)</label>
                        <select style={styles.select} value={selectedItem.rating || '5.0'} onChange={e => setSelectedItem({ ...selectedItem, rating: e.target.value })}>
                          <option value="5.0">⭐⭐⭐⭐⭐ (5.0 / 5.0)</option>
                          <option value="4.8">⭐⭐⭐⭐🥂 (4.8 / 5.0)</option>
                          <option value="4.5">⭐⭐⭐⭐✨ (4.5 / 5.0)</option>
                          <option value="4.0">⭐⭐⭐⭐ (4.0 / 5.0)</option>
                          <option value="3.5">⭐⭐⭐✨ (3.5 / 5.0)</option>
                        </select>
                      </div>

                      {/* CONTEXT-SENSITIVE PRICE OR LOCATION INJECTOR SWITCH */}
                      {isProductCategory ? (
                        <div style={styles.formGroup}>
                          <label style={{ fontSize: '12px', fontWeight: '600', color: '#10b981' }}>Retail / Market Pricing Configuration</label>
                          <input style={styles.input} placeholder="e.g., ₹1,299 or ₹450" value={selectedItem.price || ''} onChange={e => setSelectedItem({ ...selectedItem, price: e.target.value })} required />
                        </div>
                      ) : (
                        <div style={styles.formGroup}>
                          <label style={{ fontSize: '12px', fontWeight: '600' }}>Service Region Operational Location</label>
                          <input style={styles.input} placeholder="e.g., Delhi, NCR or In-Home & Center" value={selectedItem.loc || ''} onChange={e => setSelectedItem({ ...selectedItem, loc: e.target.value })} required />
                        </div>
                      )}

                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Image Hosting Target Link Source</label>
                        <input style={styles.input} placeholder="e.g., https://images.unsplash.com/photo-..." value={selectedItem.img || ''} onChange={e => setSelectedItem({ ...selectedItem, img: e.target.value })} />
                      </div>
                      <div style={styles.formGroup}>
                        <label style={{ fontSize: '12px', fontWeight: '600' }}>Certification Tag Labels / Specialty</label>
                        <input style={styles.input} placeholder="e.g., Premium Build, Vet Recommended, Verified Line" value={selectedItem.badge || ''} onChange={e => setSelectedItem({ ...selectedItem, badge: e.target.value })} />
                      </div>
                    </>
                  )}

                  <div style={{ marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '25px' }}>
                    <button type="button" style={styles.btnSecondary} onClick={() => { setSelectedItem(null); setIsEditing(false); }}>Discard Actions</button>
                    <button type="submit" style={styles.btnPrimary}>Commit Object Instance</button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}