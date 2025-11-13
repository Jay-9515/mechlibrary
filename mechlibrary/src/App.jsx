import React, { useState, useMemo } from 'react';
import { Search, Upload, Grid, List, Filter, Download, Eye, Save, Box, Sparkles, Zap, Moon, Sun, X } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [savedComponents, setSavedComponents] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStandard, setSelectedStandard] = useState('Any Standard');
  const [selectedMaterial, setSelectedMaterial] = useState('Any Material');
  const [selectedConfidence, setSelectedConfidence] = useState('Any');
  const [sortBy, setSortBy] = useState('Most Downloaded');
  
  // Upload states
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [convertedModel, setConvertedModel] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [componentType, setComponentType] = useState('Auto-detect');
  const [qualityLevel, setQualityLevel] = useState('High');
  const [selectedFormats, setSelectedFormats] = useState(['STL', 'DXF', 'STEP']);

  const categories = [
    { name: 'Fasteners', count: 15420, icon: '🔩' },
    { name: 'Bearings', count: 8234, icon: '⚙️' },
    { name: 'Gears', count: 5678, icon: '⚡' },
    { name: 'Actuators', count: 3421, icon: '🔧' },
    { name: 'Sensors', count: 2890, icon: '📡' },
    { name: 'Springs', count: 4567, icon: '🌀' }
  ];

  const allComponents = [
    { id: 1, name: 'M8 Hex Bolt', category: 'Fasteners', standard: 'ISO 4017', material: 'Steel', dimensions: 'M8 x 50mm', confidence: 95, image: '🔩', downloads: 1243, rating: 4.8 },
    { id: 2, name: '608 Ball Bearing', category: 'Bearings', standard: 'ISO 15', material: 'Chrome Steel', dimensions: '8x22x7mm', confidence: 98, image: '⚙️', downloads: 2891, rating: 4.9 },
    { id: 3, name: 'Spur Gear 20T', category: 'Gears', standard: 'DIN 867', material: 'Brass', dimensions: 'Module 1.5', confidence: 92, image: '⚡', downloads: 756, rating: 4.6 },
    { id: 4, name: 'Linear Actuator', category: 'Actuators', standard: 'Custom', material: 'Aluminum', dimensions: '200mm stroke', confidence: 88, image: '🔧', downloads: 432, rating: 4.3 },
    { id: 5, name: 'Compression Spring', category: 'Springs', standard: 'DIN 2095', material: 'Spring Steel', dimensions: 'D=10mm, L=50mm', confidence: 94, image: '🌀', downloads: 891, rating: 4.7 },
    { id: 6, name: 'Proximity Sensor', category: 'Sensors', standard: 'IEC 60947', material: 'Plastic Housing', dimensions: 'M12 x 50mm', confidence: 90, image: '📡', downloads: 567, rating: 4.5 },
    { id: 7, name: 'M6 Socket Cap Screw', category: 'Fasteners', standard: 'ISO 4762', material: 'Stainless Steel', dimensions: 'M6 x 30mm', confidence: 96, image: '🔩', downloads: 1567, rating: 4.9 },
    { id: 8, name: 'Deep Groove Bearing', category: 'Bearings', standard: 'ISO 15', material: 'Steel', dimensions: '6x19x6mm', confidence: 97, image: '⚙️', downloads: 1823, rating: 4.8 },
    { id: 9, name: 'Helical Gear', category: 'Gears', standard: 'DIN 3960', material: 'Steel', dimensions: 'Module 2', confidence: 91, image: '⚡', downloads: 654, rating: 4.4 },
    { id: 10, name: 'Pneumatic Cylinder', category: 'Actuators', standard: 'ISO 6432', material: 'Aluminum', dimensions: '32mm bore', confidence: 89, image: '🔧', downloads: 723, rating: 4.6 },
    { id: 11, name: 'Torsion Spring', category: 'Springs', standard: 'DIN 2089', material: 'Spring Steel', dimensions: 'D=8mm', confidence: 93, image: '🌀', downloads: 445, rating: 4.5 },
    { id: 12, name: 'Capacitive Sensor', category: 'Sensors', standard: 'IEC 60947', material: 'Plastic', dimensions: 'M18 x 60mm', confidence: 92, image: '📡', downloads: 834, rating: 4.7 }
  ];

  const filteredComponents = useMemo(() => {
    let filtered = [...allComponents];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(comp => 
        comp.name.toLowerCase().includes(query) ||
        comp.category.toLowerCase().includes(query) ||
        comp.standard.toLowerCase().includes(query) ||
        comp.material.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(comp => comp.category === selectedCategory);
    }

    if (selectedStandard !== 'Any Standard') {
      filtered = filtered.filter(comp => comp.standard.includes(selectedStandard));
    }

    if (selectedMaterial !== 'Any Material') {
      filtered = filtered.filter(comp => comp.material.includes(selectedMaterial));
    }

    if (selectedConfidence === '90%+') {
      filtered = filtered.filter(comp => comp.confidence >= 90);
    } else if (selectedConfidence === '95%+') {
      filtered = filtered.filter(comp => comp.confidence >= 95);
    }

    if (sortBy === 'Most Downloaded') {
      filtered.sort((a, b) => b.downloads - a.downloads);
    } else if (sortBy === 'Highest Rated') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Highest Confidence') {
      filtered.sort((a, b) => b.confidence - a.confidence);
    } else if (sortBy === 'Name (A-Z)') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedStandard, selectedMaterial, selectedConfidence, sortBy]);

  const standards = ['Any Standard', ...new Set(allComponents.map(c => c.standard.split(' ')[0]))];
  const materials = ['Any Material', ...new Set(allComponents.map(c => c.material))];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSelectedStandard('Any Standard');
    setSelectedMaterial('Any Material');
    setSelectedConfidence('Any');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All Categories' || 
    selectedStandard !== 'Any Standard' || selectedMaterial !== 'Any Material' || 
    selectedConfidence !== 'Any';

  const colors = {
    dark: {
      bg: '#0f172a',
      card: '#1e293b',
      accent: '#10b981',
      text: '#ffffff',
      textMuted: '#94a3b8'
    },
    light: {
      bg: '#f1f5f9',
      card: '#ffffff',
      accent: '#10b981',
      text: '#0f172a',
      textMuted: '#64748b'
    }
  };

  const theme = isDarkMode ? colors.dark : colors.light;

  // Handle file upload
  const handleFileUpload = (file) => {
    if (file && (file.type.startsWith('image/') || file.type === 'application/pdf')) {
      setUploadedFile(file);
      setConvertedModel(null);
      setConversionProgress(0);
    } else {
      alert('Please upload an image (JPG, PNG) or PDF file');
    }
  };

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Simulate AI conversion
  const startConversion = () => {
    if (!uploadedFile) {
      alert('Please upload a file first');
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setConversionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsConverting(false);
          setConvertedModel({
            name: uploadedFile.name.replace(/\.[^/.]+$/, ''),
            confidence: Math.floor(Math.random() * 10) + 90,
            formats: selectedFormats,
            preview: '🔩',
            status: 'completed'
          });
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  // Toggle format selection
  const toggleFormat = (format) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter(f => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  // Download converted file
  const handleDownload = (format) => {
    alert(`Downloading ${convertedModel.name}.${format.toLowerCase()}...\n\nIn a real app, this would download the converted 3D model in ${format} format.`);
  };

  // Reset upload
  const resetUpload = () => {
    setUploadedFile(null);
    setConvertedModel(null);
    setIsConverting(false);
    setConversionProgress(0);
  };

  const renderHome = () => {
    return (
      <div className="space-y-12">
        <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: theme.card }}>
          <div className="relative p-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles style={{ color: theme.accent }} size={32} />
              <span className="px-4 py-1 rounded-full text-sm font-semibold" style={{ 
                backgroundColor: theme.accent + '20', 
                color: theme.accent,
                border: '1px solid ' + theme.accent + '40'
              }}>
                AI-Powered Platform
              </span>
            </div>
            
            <h1 className="text-6xl font-bold mb-4 tracking-tight" style={{ color: theme.text }}>
              MechLibrary
            </h1>
            <p className="text-2xl mb-8 max-w-3xl leading-relaxed" style={{ color: theme.textMuted }}>
              Intelligent mechanical component library with AI-powered 3D conversion
            </p>
            
            <div className="flex gap-4 max-w-4xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: theme.accent }} size={22} />
                <input
                  type="text"
                  placeholder="Search components, parts, or standards..."
                  className="w-full pl-14 pr-4 py-5 rounded-xl text-lg focus:outline-none transition-all"
                  style={{ 
                    backgroundColor: theme.bg,
                    color: theme.text,
                    border: '2px solid ' + theme.accent + '40'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setView('search');
                    }
                  }}
                />
              </div>
              <button 
                onClick={() => setView('search')}
                className="px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: theme.accent, color: '#ffffff' }}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: theme.text }}>Browse Categories</h2>
            <span className="text-sm" style={{ color: theme.textMuted }}>50,000+ components</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setView('search');
                }}
                className="p-8 rounded-2xl border-2 transition-all text-center transform hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  backgroundColor: theme.card,
                  borderColor: theme.card,
                  color: theme.text
                }}
              >
                <div className="text-5xl mb-4">{cat.icon}</div>
                <div className="font-bold text-lg mb-2">{cat.name}</div>
                <div style={{ color: theme.textMuted }} className="text-sm">{cat.count.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: 'Smart Search', desc: 'AI-powered search' },
            { icon: Box, title: 'AI 3D Conversion', desc: 'Convert 2D to 3D' },
            { icon: Download, title: 'Multi-Format Export', desc: 'Export to CAD formats' }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border-2 transition-all transform hover:-translate-y-2 hover:shadow-2xl"
              style={{ 
                backgroundColor: theme.card,
                borderColor: theme.card
              }}
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" 
                style={{ backgroundColor: theme.accent + '20' }}>
                <feature.icon style={{ color: theme.accent }} size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>{feature.title}</h3>
              <p style={{ color: theme.textMuted }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSearch = () => {
    return (
      <div className="space-y-6">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex-1 relative min-w-64">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: theme.accent }} size={20} />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all"
              style={{ 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.card
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all"
            style={{ 
              backgroundColor: showFilters ? theme.accent : theme.card,
              color: showFilters ? '#ffffff' : theme.text,
              border: '2px solid ' + (showFilters ? theme.accent : theme.card)
            }}
          >
            <Filter size={20} />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                Active
              </span>
            )}
          </button>
          <div className="flex gap-2 rounded-xl p-1 border-2" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
            <button
              onClick={() => setViewMode('grid')}
              className="p-2 rounded-lg transition-all"
              style={{ 
                backgroundColor: viewMode === 'grid' ? theme.accent : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : theme.textMuted
              }}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className="p-2 rounded-lg transition-all"
              style={{ 
                backgroundColor: viewMode === 'list' ? theme.accent : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : theme.textMuted
              }}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg" style={{ color: theme.text }}>Filters</h3>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{ backgroundColor: theme.bg, color: theme.accent }}
                >
                  <X size={16} />
                  Clear All
                </button>
              )}
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>Category</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none" 
                  style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>Standard</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                  style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                  value={selectedStandard}
                  onChange={(e) => setSelectedStandard(e.target.value)}
                >
                  {standards.map(std => (
                    <option key={std}>{std}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>Material</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                  style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                >
                  {materials.map(mat => (
                    <option key={mat}>{mat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>Min Confidence</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none"
                  style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                  value={selectedConfidence}
                  onChange={(e) => setSelectedConfidence(e.target.value)}
                >
                  <option>Any</option>
                  <option>90%+</option>
                  <option>95%+</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p style={{ color: theme.textMuted }}>
            Showing <span className="font-bold" style={{ color: theme.text }}>{filteredComponents.length}</span> of {allComponents.length} components
          </p>
          <select 
            className="px-4 py-2 rounded-lg border-2 focus:outline-none"
            style={{ backgroundColor: theme.card, color: theme.text, borderColor: theme.card }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Most Downloaded</option>
            <option>Highest Rated</option>
            <option>Highest Confidence</option>
            <option>Name (A-Z)</option>
          </select>
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-16 rounded-2xl" style={{ backgroundColor: theme.card }}>
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>No components found</h3>
            <p className="mb-6" style={{ color: theme.textMuted }}>
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 rounded-xl font-semibold transition-all"
              style={{ backgroundColor: theme.accent, color: '#ffffff' }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelectedComponent(comp)}
              className="rounded-2xl border-2 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all"
              style={{ backgroundColor: theme.card, borderColor: theme.card }}
            >
              <div className="h-48 flex items-center justify-center text-7xl border-b-2" 
                style={{ backgroundColor: theme.bg, borderColor: theme.card }}>
                {comp.image}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl" style={{ color: theme.text }}>{comp.name}</h3>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold" 
                    style={{ backgroundColor: theme.accent + '20', color: theme.accent }}>
                    <Zap size={12} />
                    {comp.confidence}%
                  </div>
                </div>
                <p className="text-sm mb-2" style={{ color: theme.textMuted }}>{comp.category}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-lg transition-all"
                    style={{ backgroundColor: theme.accent, color: '#ffffff' }}>
                    <Eye size={16} />
                    View 3D
                  </button>
                  <button 
                    className="p-2.5 rounded-lg border-2 transition-all" 
                    style={{ backgroundColor: theme.bg, borderColor: theme.card }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (savedComponents.includes(comp.id)) {
                        setSavedComponents(savedComponents.filter(id => id !== comp.id));
                      } else {
                        setSavedComponents([...savedComponents, comp.id]);
                      }
                    }}
                  >
                    <Save 
                      size={18} 
                      style={{ color: savedComponents.includes(comp.id) ? theme.accent : theme.textMuted }}
                      fill={savedComponents.includes(comp.id) ? theme.accent : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderUpload = () => {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: theme.text }}>Upload & Convert to 3D</h2>
          <p className="text-lg" style={{ color: theme.textMuted }}>
            {!uploadedFile ? 'Upload technical drawings for instant AI conversion' : 
             isConverting ? 'Converting your file...' :
             convertedModel ? 'Conversion complete!' : 'File uploaded, ready to convert'}
          </p>
        </div>

        {/* Upload Area */}
        {!uploadedFile && (
          <div 
            className="rounded-3xl border-4 border-dashed p-20 text-center transition-all cursor-pointer"
            style={{ 
              backgroundColor: dragActive ? theme.accent + '10' : theme.card, 
              borderColor: dragActive ? theme.accent : theme.card 
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <Upload className="mx-auto mb-6" style={{ color: theme.accent }} size={64} />
            <h3 className="text-3xl font-bold mb-4" style={{ color: theme.text }}>
              {dragActive ? 'Drop your file here' : 'Drop files here'}
            </h3>
            <p className="text-lg mb-2" style={{ color: theme.textMuted }}>or click to browse</p>
            <p className="text-sm" style={{ color: theme.textMuted }}>Supported: JPG, PNG, PDF • Max 50MB</p>
            <input
              id="fileInput"
              type="file"
              accept="image/*,.pdf"
              style={{ display: 'none' }}
              onChange={(e) => e.target.files[0] && handleFileUpload(e.target.files[0])}
            />
          </div>
        )}

        {/* File Preview */}
        {uploadedFile && !convertedModel && (
          <div className="rounded-2xl border-2 p-6" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  style={{ backgroundColor: theme.accent + '20' }}>
                  📄
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: theme.text }}>{uploadedFile.name}</h3>
                  <p className="text-sm" style={{ color: theme.textMuted }}>
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={resetUpload}
                className="px-4 py-2 rounded-lg font-semibold transition-all"
                style={{ backgroundColor: theme.bg, color: theme.textMuted }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Conversion Progress */}
            {isConverting && (
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold" style={{ color: theme.text }}>Converting...</span>
                  <span className="font-semibold" style={{ color: theme.accent }}>{Math.floor(conversionProgress)}%</span>
                </div>
                <div className="w-full h-3 rounded-full" style={{ backgroundColor: theme.bg }}>
                  <div 
                    className="h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${conversionProgress}%`,
                      backgroundColor: theme.accent 
                    }}
                  />
                </div>
                <p className="text-sm mt-2" style={{ color: theme.textMuted }}>
                  {conversionProgress < 30 ? 'Analyzing image...' :
                   conversionProgress < 60 ? 'Detecting features...' :
                   conversionProgress < 90 ? 'Generating 3D model...' :
                   'Finalizing...'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Conversion Result */}
        {convertedModel && (
          <div className="rounded-2xl border-2 p-8" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{convertedModel.preview}</div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>{convertedModel.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="px-4 py-2 rounded-lg font-bold" 
                  style={{ backgroundColor: theme.accent + '20', color: theme.accent }}>
                  <Zap size={16} className="inline mr-1" />
                  {convertedModel.confidence}% AI Confidence
                </span>
                <span className="px-4 py-2 rounded-lg font-bold" 
                  style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
                  ✓ Ready to Download
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg" style={{ color: theme.text }}>Available Formats:</h4>
              <div className="grid grid-cols-2 gap-3">
                {convertedModel.formats.map(format => (
                  <button
                    key={format}
                    onClick={() => handleDownload(format)}
                    className="flex items-center justify-between p-4 rounded-xl border-2 transition-all hover:shadow-lg"
                    style={{ 
                      backgroundColor: theme.bg, 
                      borderColor: theme.card,
                      color: theme.text 
                    }}
                  >
                    <span className="font-semibold">{format}</span>
                    <Download size={20} style={{ color: theme.accent }} />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={resetUpload}
              className="w-full mt-6 py-3 rounded-xl font-bold transition-all"
              style={{ backgroundColor: theme.bg, color: theme.text }}
            >
              Upload Another File
            </button>
          </div>
        )}

        {/* Settings */}
        {!convertedModel && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 border-2 transition-all hover:shadow-xl" 
              style={{ backgroundColor: theme.card, borderColor: theme.card }}>
              <h3 className="font-bold text-xl mb-6" style={{ color: theme.text }}>Conversion Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>
                    Component Type
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                    style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                    value={componentType}
                    onChange={(e) => setComponentType(e.target.value)}
                  >
                    <option>Auto-detect (AI)</option>
                    <option>Fastener</option>
                    <option>Bearing</option>
                    <option>Gear</option>
                    <option>Custom Part</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>
                    Quality Level
                  </label>
                  <select 
                    className="w-full px-4 py-3 rounded-lg border-2 focus:outline-none"
                    style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}
                    value={qualityLevel}
                    onChange={(e) => setQualityLevel(e.target.value)}
                  >
                    <option>Standard (Fast)</option>
                    <option>High (Recommended)</option>
                    <option>Premium (Slower)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 border-2 transition-all hover:shadow-xl" 
              style={{ backgroundColor: theme.card, borderColor: theme.card }}>
              <h3 className="font-bold text-xl mb-6" style={{ color: theme.text }}>Export Formats</h3>
              <div className="space-y-3">
                {['STL', 'DXF', 'STEP', 'IGES', 'Solidworks', 'Fusion 360'].map((format) => (
                  <label key={format} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedFormats.includes(format)}
                      onChange={() => toggleFormat(format)}
                      className="w-5 h-5 rounded"
                      style={{ accentColor: theme.accent }}
                    />
                    <span className="transition-colors" style={{ 
                      color: selectedFormats.includes(format) ? theme.text : theme.textMuted 
                    }}>
                      {format}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Convert Button */}
        {uploadedFile && !isConverting && !convertedModel && (
          <button 
            onClick={startConversion}
            disabled={selectedFormats.length === 0}
            className="w-full py-5 rounded-xl font-bold text-xl shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: theme.accent, color: '#ffffff' }}
          >
            {selectedFormats.length === 0 ? 'Select at least one format' : 
             `Start AI Conversion (${selectedFormats.length} format${selectedFormats.length > 1 ? 's' : ''})`}
          </button>
        )}
      </div>
    );
  };

  const renderComponent = () => {
    if (!selectedComponent) return null;
    
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <button 
          onClick={() => setSelectedComponent(null)}
          className="font-semibold transition-colors"
          style={{ color: theme.accent }}
        >
          ← Back
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl h-96 flex items-center justify-center border-2"
            style={{ backgroundColor: theme.card, borderColor: theme.card }}>
            <div className="text-center">
              <div className="text-9xl mb-4">{selectedComponent.image}</div>
              <p className="font-semibold" style={{ color: theme.textMuted }}>3D Viewer</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-3" style={{ color: theme.text }}>{selectedComponent.name}</h1>
              <p className="text-lg" style={{ color: theme.textMuted }}>{selectedComponent.category}</p>
            </div>

            <div className="rounded-2xl p-6 border-2" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
              <h3 className="font-bold text-xl mb-6" style={{ color: theme.text }}>Export</h3>
              <button className="w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
                style={{ backgroundColor: theme.accent, color: '#ffffff' }}>
                <Download size={20} />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      <nav className="sticky top-0 z-50 backdrop-blur-sm border-b" 
        style={{ backgroundColor: theme.bg + 'cc', borderColor: theme.card }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => { setView('home'); setSelectedComponent(null); }}
              className="text-2xl font-bold transition-all"
              style={{ color: theme.accent }}
            >
              MechLibrary
            </button>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setView('home')}
                className="font-semibold transition-colors"
                style={{ color: view === 'home' && !selectedComponent ? theme.accent : theme.textMuted }}
              >
                Home
              </button>
              <button 
                onClick={() => setView('search')}
                className="font-semibold transition-colors"
                style={{ color: view === 'search' && !selectedComponent ? theme.accent : theme.textMuted }}
              >
                Browse
              </button>
              <button 
                onClick={() => setView('upload')}
                className="font-semibold transition-colors"
                style={{ color: view === 'upload' ? theme.accent : theme.textMuted }}
              >
                Upload
              </button>
              <button 
                onClick={() => setView('workspace')}
                className="font-semibold transition-colors flex items-center gap-2"
                style={{ color: view === 'workspace' ? theme.accent : theme.textMuted }}
              >
                My Workspace
                {savedComponents.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                    {savedComponents.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg border-2 transition-all hover:scale-110"
                style={{ backgroundColor: theme.card, borderColor: theme.card }}
              >
                {isDarkMode ? <Sun size={20} style={{ color: theme.accent }} /> : <Moon size={20} style={{ color: theme.accent }} />}
              </button>
              <button className="px-6 py-2 rounded-lg font-semibold shadow-lg transition-all"
                style={{ backgroundColor: theme.accent, color: '#ffffff' }}>
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedComponent ? renderComponent() : view === 'home' ? renderHome() : view === 'search' ? renderSearch() : renderUpload()}
      </main>
    </div>
  );
};

export default App;
