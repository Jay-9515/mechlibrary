import React, { useState } from 'react';
import { Search, Upload, Grid, List, Filter, Download, Eye, Share2, Save, Box } from 'lucide-react';

const App = () => {
  const [view, setView] = useState('home');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

  const renderHome = () => {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h1 className="text-5xl font-bold mb-4">MechLibrary</h1>
          <p className="text-xl mb-8 opacity-90">Your intelligent mechanical component library with AI-powered 3D conversion</p>
          
          <div className="flex gap-3 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search components..."
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setView('search')}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Search
            </button>
            <button 
              onClick={() => setView('upload')}
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all"
            >
              <Upload size={20} />
              Upload
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setView('search')}
                className="bg-white p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all text-center group"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform">{cat.icon}</div>
                <div className="font-semibold text-gray-800">{cat.name}</div>
                <div className="text-sm text-gray-500 mt-1">{cat.count.toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
            <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Search className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Smart Search</h3>
            <p className="text-gray-600">Find any mechanical component with intelligent filters</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
            <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Box className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">AI 3D Conversion</h3>
            <p className="text-gray-600">Convert 2D images to accurate 3D models</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
            <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Download className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">Multi-Format Export</h3>
            <p className="text-gray-600">Download in DXF, STEP, STL, and all major CAD formats</p>
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
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search components..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-all ${showFilters ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            <Filter size={20} />
            Filters
          </button>
          <div className="flex gap-2 bg-gray-200 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-300'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>All Categories</option>
                  <option>Fasteners</option>
                  <option>Bearings</option>
                  <option>Gears</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Standard</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Any Standard</option>
                  <option>ISO</option>
                  <option>DIN</option>
                  <option>ANSI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Any Material</option>
                  <option>Steel</option>
                  <option>Aluminum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confidence</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Any</option>
                  <option>90%+</option>
                  <option>95%+</option>
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
              className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 rounded-t-xl flex items-center justify-center text-7xl">
                {comp.image}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600">{comp.name}</h3>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">{comp.confidence}%</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{comp.category}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold">
                    <Eye size={16} />
                    View 3D
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-all">
                    <Save size={18} />
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
          <h2 className="text-3xl font-bold mb-3 text-gray-800">Upload & Convert to 3D</h2>
          <p className="text-gray-600">Upload technical drawings or component photos</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-4 border-dashed border-blue-300 p-16 text-center hover:border-blue-500 transition-all cursor-pointer">
          <Upload className="mx-auto mb-6 text-blue-500" size={64} />
          <h3 className="text-2xl font-bold mb-3 text-gray-800">Drop your images here</h3>
          <p className="text-gray-600 mb-6">or click to browse files</p>
          <p className="text-sm text-gray-500">Supported: JPG, PNG, PDF, DXF</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Conversion Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Component Type</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Auto-detect</option>
                  <option>Fastener</option>
                  <option>Bearing</option>
                  <option>Gear</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quality Level</label>
                <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                  <option>Standard</option>
                  <option>High</option>
                  <option>Premium</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Export Formats</h3>
            <div className="space-y-3">
              {['STL', 'DXF', 'STEP', 'Solidworks', 'Fusion 360'].map((format, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked={idx < 3} className="w-5 h-5" />
                  <span className="text-gray-700">{format}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all">
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
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          ← Back to search
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center border-2 border-gray-300">
              <div className="text-center">
                <div className="text-8xl mb-4">{selectedComponent.image}</div>
                <p className="text-gray-600 font-semibold">Interactive 3D Viewer</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedComponent.name}</h1>
                  <p className="text-gray-600">{selectedComponent.category}</p>
                </div>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold">
                  {selectedComponent.confidence}%
                </span>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Standard</p>
                    <p className="font-semibold text-gray-800">{selectedComponent.standard}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Material</p>
                    <p className="font-semibold text-gray-800">{selectedComponent.material}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Export Options</h3>
                <div className="space-y-3 mb-6">
                  <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none">
                    <option>STL - 3D Printing</option>
                    <option>DXF - CAD</option>
                    <option>STEP - Universal</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                    <Download size={20} />
                    Download
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 px-6 py-3 rounded-xl">
                    <Save size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => { setView('home'); setSelectedComponent(null); }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              MechLibrary
            </button>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setView('home')}
                className={`font-semibold ${view === 'home' && !selectedComponent ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Home
              </button>
              <button 
                onClick={() => setView('search')}
                className={`font-semibold ${view === 'search' && !selectedComponent ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Browse
              </button>
              <button 
                onClick={() => setView('upload')}
                className={`font-semibold ${view === 'upload' ? 'text-blue-600' : 'text-gray-600'}`}
              >
                Upload
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
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