import React, { useState, useEffect } from 'react';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Download,
  HelpCircle,
  ChevronRight,
  Check,
  X,
  Plus,
  Edit3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: false,
    newsletter: true,
    sms: false,
    push: true
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    dataSharing: false,
    analytics: true
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const settingsSections = [
    { id: 'account', label: 'Account Info', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  const renderAccountSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h3>
      
      {/* Profile Picture */}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left">
          <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
            Change Photo
          </button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
          <input 
            type="text" 
            defaultValue="John"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
          <input 
            type="text" 
            defaultValue="Doe"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            defaultValue="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
          <input 
            type="tel" 
            defaultValue="+91 9876543210"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
          <input 
            type="date" 
            defaultValue="1990-01-01"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Gender</label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <button className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
          Save Changes
        </button>
        <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
          Cancel
        </button>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Preferences</h3>

      {/* Theme */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Theme</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isDarkMode ? <Moon size={18} className="text-gray-700 dark:text-gray-300" /> : <Sun size={18} className="text-gray-700 dark:text-gray-300" />}
            <span className="text-gray-900 dark:text-white">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black dark:peer-checked:bg-white"></div>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Language</h4>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Telugu</option>
          <option>Bengali</option>
        </select>
      </div>

      {/* Currency */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Currency</h4>
        <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300">
          <option>INR (₹)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
        </select>
      </div>

      {/* Size Preference */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Default Size</h4>
        <div className="grid grid-cols-5 gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className="py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:border-black dark:hover:border-white transition-colors duration-200 text-gray-900 dark:text-white"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Add similar dark mode styling to other sections...
  const renderContent = () => {
    switch (activeSection) {
      case 'account': return renderAccountSection();
      case 'preferences': return renderPreferencesSection();
      // Add other sections with dark mode styling...
      default: return renderAccountSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-2 sm:px-0 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300">
          <div className="flex flex-col lg:flex-row">
            {/* Mobile Section Selector */}
            <div className="lg:hidden border-b border-gray-200 dark:border-gray-700">
              <div className="p-4">
                <select 
                  value={activeSection}
                  onChange={(e) => setActiveSection(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
                >
                  {settingsSections.map(({ id, label }) => (
                    <option key={id} value={id}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-1/4 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Settings</h2>
                <nav className="space-y-2">
                  {settingsSections.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeSection === id
                          ? 'bg-black dark:bg-white text-white dark:text-black'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-4 sm:p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;