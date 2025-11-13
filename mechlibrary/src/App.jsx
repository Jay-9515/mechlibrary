import React, { useState } from 'react';
import { Search, Upload, Grid, List, Filter, Download, Eye, Share2, Save, Box, Sparkles, Zap, Moon, Sun } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const categories = [
    { name: 'Fasteners', count: 15420, icon: '🔩' },
    { name: 'Bearings', count: 8234, icon: '⚙️' },
    { name: 'Gears', count: 5678, icon: '⚡' },
    { name: 'Actuators', count: 3421, icon: '🔧' },
    { name: 'Sensors', count: 2890, icon: '📡' },
    { name: 'Springs', count: 4567, icon: '🌀' }
  ];

  const components = [
    { id: 1, name: 'M8 Hex Bolt', category: 'Fasteners', standard: 'ISO 4017', material: 'Steel', dimensions: 'M8 x 50mm', confidence: 95, image: '🔩', downloads: 1243 },
    { id: 2, name: '608 Ball Bearing', category: 'Bearings', standard: 'ISO 15', material: 'Chrome Steel', dimensions: '8x22x7mm', confidence: 98, image: '⚙️', downloads: 2891 },
    { id: 3, name: 'Spur Gear 20T', category: 'Gears', standard: 'DIN 867', material: 'Brass', dimensions: 'Module 1.5', confidence: 92, image: '⚡', downloads: 756 },
    { id: 4, name: 'Linear Actuator', category: 'Actuators', standard: 'Custom', material: 'Aluminum', dimensions: '200mm stroke', confidence: 88, image: '🔧', downloads: 432 },
    { id: 5, name: 'Compression Spring', category: 'Springs', standard: 'DIN 2095', material: 'Spring Steel', dimensions: 'D=10mm, L=50mm', confidence: 94, image: '🌀', downloads: 891 },
    { id: 6, name: 'Proximity Sensor', category: 'Sensors', standard: 'IEC 60947', material: 'Plastic Housing', dimensions: 'M12 x 50mm', confidence: 90, image: '📡', downloads: 567 }
  ];

  // Option 5: Slate + Green Theme
  const colors = {
    dark: {
      bg: '#0f172a',           // Deep slate
      card: '#1e293b',         // Slate
      accent: '#10b981',       // Green
      text: '#ffffff',         // White
      textMuted: '#94a3b8'     // Gray
    },
    light: {
      bg: '#f1f5f9',           // Light slate
      card: '#ffffff',         // White
      accent: '#10b981',       // Green
      text: '#0f172a',         // Dark slate
      textMuted: '#64748b'     // Gray
    }
  };

  const theme = isDarkMode ? colors.dark : colors.light;

  const renderHome = () => {
    return (
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: theme.card }}>
          <div className="relative p-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles style={{ color: theme.accent }} size={32} />
              <span className="px-4 py-1 rounded-full text-sm font-semibold" style={{ 
                backgroundColor: `${theme.accent}20`, 
                color: theme.accent,
                border: `1px solid ${theme.accent}40`
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
            
            <div className="flex gap-4 max-w-4xl flex-wrap">
              <div className="flex-1 min-w-80 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" style={{ color: theme.accent }} size={22} />
                <input
                  type="text"
                  placeholder="Search components, parts, or standards..."
                  className="w-full pl-14 pr-4 py-5 rounded-xl text-lg focus:outline-none focus:ring-2 transition-all"
                  style={{ 
                    backgroundColor: theme.bg,
                    color: theme.text,
                    border: `2px solid ${theme.card}`,
                    borderColor: theme.accent + '40'
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = theme.accent}
                  onBlur={(e) => e.target.style.borderColor = theme.accent + '40'}
                />
              </div>
              <button 
                onClick={() => setView('search')}
                className="px-10 py-5 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                style={{ backgroundColor: theme.accent, color: '#ffffff' }}
              >
                Search
              </button>
              <button 
                onClick={() => setView('upload')}
                className="px-8 py-5 rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg"
                style={{ 
                  backgroundColor: theme.bg,
                  color: theme.text,
                  border: `2px solid ${theme.accent}`
                }}
              >
                <Upload size={22} />
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{ color: theme.text }}>Browse Categories</h2>
            <span className="text-sm" style={{ color: theme.textMuted }}>50,000+ components</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setView('search')}
                className="p-8 rounded-2xl border-2 transition-all text-center transform hover:-translate-y-2 hover:shadow-2xl"
                style={{ 
                  backgroundColor: theme.card,
                  borderColor: theme.card,
                  color: theme.text
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#e2e8f0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = theme.card;
                  e.currentTarget.style.backgroundColor = theme.card;
                }}
              >
                <div className="text-5xl mb-4 transform transition-transform duration-300 hover:scale-125">{cat.icon}</div>
                <div className="font-bold text-lg mb-2">{cat.name}</div>
                <div style={{ color: theme.textMuted }} className="text-sm">{cat.count.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Search, title: 'Smart Search', desc: 'Advanced AI-powered search with natural language processing' },
            { icon: Box, title: 'AI 3D Conversion', desc: 'Convert 2D drawings to accurate 3D models' },
            { icon: Download, title: 'Multi-Format Export', desc: 'Export to all major CAD formats' }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl border-2 transition-all transform hover:-translate-y-2 hover:shadow-2xl"
              style={{ 
                backgroundColor: theme.card,
                borderColor: theme.card
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#e2e8f0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.card;
                e.currentTarget.style.backgroundColor = theme.card;
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

        {/* Stats */}
        <div className="rounded-2xl p-8 border-2" style={{ backgroundColor: theme.card, borderColor: theme.card }}>
          <div className="grid grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Components' },
              { value: '98%', label: 'AI Accuracy' },
              { value: '10+', label: 'CAD Formats' },
              { value: '24/7', label: 'Available' }
            ].map((stat, idx) => (
              <div key={idx} className="transform hover:scale-110 transition-all cursor-pointer">
                <div className="text-4xl font-bold mb-2" style={{ color: theme.accent }}>{stat.value}</div>
                <div style={{ color: theme.textMuted }}>{stat.label}</div>
              </div>
            ))}
          </div>
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
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 transition-all"
              style={{ 
                backgroundColor: theme.card,
                color: theme.text,
                borderColor: theme.card
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={(e) => e.target.style.borderColor = theme.accent}
              onBlur={(e) => e.target.style.borderColor = theme.card}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all"
            style={{ 
              backgroundColor: showFilters ? theme.accent : theme.card,
              color: showFilters ? '#ffffff' : theme.text,
              border: `2px solid ${showFilters ? theme.accent : theme.card}`
            }}
          >
            <Filter size={20} />
            Filters
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
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.textMuted }}>Category</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 focus:outline-none" 
                  style={{ backgroundColor: theme.bg, color: theme.text, borderColor: theme.card }}>
                  <option>All Categories</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((comp) => (
            <div
              key={comp.id}
              onClick={() => setSelectedComponent(comp)}
              className="rounded-2xl border-2 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:shadow-2xl transition-all"
              style={{ backgroundColor: theme.card, borderColor: theme.card }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.card}
            >
              <div className="h-48 flex items-center justify-center text-7xl border-b-2" 
                style={{ backgroundColor: theme.bg, borderColor: theme.card }}>
                {comp.image}
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl" style={{ color: theme.text }}>{comp.name}</h3>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold" 
                    style={{ backgroundColor: theme.accent + '20', color: theme.accent, border: `1px solid ${theme.accent}50` }}>
                    <Zap size={12} />
                    {comp.confidence}%
                  </div>
                </div>
                <p className="text-sm mb-4" style={{ color: theme.textMuted }}>{comp.category}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-lg transition-all"
                    style={{ backgroundColor: theme.accent, color: '#ffffff' }}>
                    <Eye size={16} />
                    View 3D
                  </button>
                  <button className="p-2.5 rounded-lg border-2 transition-all" 
                    style={{ backgroundColor: theme.bg, borderColor: theme.card }}>
                    <Save size={18} style={{ color: theme.textMuted }} />
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
          <p className="text-lg" style={{ color: theme.textMuted }}>Upload drawings for instant conversion</p>
        </div>

        <div className="rounded-3xl border-4 border-dashed p-20 text-center transition-all cursor-pointer hover:shadow-xl"
          style={{ backgroundColor: theme.card, borderColor: theme.card }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = theme.accent}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = theme.card}>
          <Upload className="mx-auto mb-6" style={{ color: theme.accent }} size={64} />
          <h3 className="text-3xl font-bold mb-4" style={{ color: theme.text }}>Drop files here</h3>
          <p className="text-lg" style={{ color: theme.textMuted }}>or click to browse</p>
        </div>

        <button className="w-full py-5 rounded-xl font-bold text-xl shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: theme.accent, color: '#ffffff' }}>
          Start Conversion
        </button>
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
