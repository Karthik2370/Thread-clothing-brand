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

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
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
      <h3 className="text-lg font-semibold">Account Information</h3>
      
      {/* Profile Picture */}
      <div className="flex items-center space-x-4">
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Profile" 
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
            Change Photo
          </button>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input 
            type="text" 
            defaultValue="John"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input 
            type="text" 
            defaultValue="Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            defaultValue="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            type="tel" 
            defaultValue="+91 9876543210"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          <input 
            type="date" 
            defaultValue="1990-01-01"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
          Save Changes
        </button>
        <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
          Cancel
        </button>
      </div>
    </div>
  );

  const renderAddressesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Saved Addresses</h3>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="space-y-4">
        {/* Default Address */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Home</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
              </div>
              <p className="text-gray-700">John Doe</p>
              <p className="text-gray-600">123 Main Street, Apartment 4B</p>
              <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Work Address */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Work</span>
              </div>
              <p className="text-gray-700">John Doe</p>
              <p className="text-gray-600">456 Business Park, Tower A</p>
              <p className="text-gray-600">Bangalore, Karnataka 560001</p>
              <p className="text-gray-600">+91 9876543210</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
          <Plus size={16} />
          Add Card
        </button>
      </div>

      <div className="space-y-4">
        {/* Saved Card */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <CreditCard size={16} className="text-white" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 1234</p>
                <p className="text-sm text-gray-500">Expires 12/25</p>
              </div>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Default</span>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 bg-orange-500 rounded flex items-center justify-center">
                <Smartphone size={16} className="text-white" />
              </div>
              <div>
                <p className="font-medium">john@paytm</p>
                <p className="text-sm text-gray-500">UPI ID</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Edit3 size={16} />
              </button>
              <button className="p-2 text-red-500 hover:text-red-700">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Billing Address */}
      <div className="border-t pt-6">
        <h4 className="font-medium mb-4">Billing Address</h4>
        <div className="flex items-center space-x-3">
          <input type="checkbox" id="same-as-shipping" defaultChecked className="rounded" />
          <label htmlFor="same-as-shipping" className="text-sm text-gray-700">
            Same as shipping address
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Notification Preferences</h3>

      <div className="space-y-4">
        {/* Email Notifications */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Mail size={18} />
            Email Notifications
          </h4>
          <div className="space-y-3">
            {[
              { key: 'orderUpdates', label: 'Order updates and shipping notifications', desc: 'Get notified about your order status' },
              { key: 'promotions', label: 'Promotions and offers', desc: 'Receive exclusive deals and discounts' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Weekly updates about new products' }
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Smartphone size={18} />
            SMS Notifications
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Order updates via SMS</p>
              <p className="text-xs text-gray-500">Receive important order updates on your phone</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Bell size={18} />
            Push Notifications
          </h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Browser notifications</p>
              <p className="text-xs text-gray-500">Get instant notifications in your browser</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Privacy & Security</h3>

      {/* Password */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium flex items-center gap-2">
            <Lock size={18} />
            Password
          </h4>
          <button 
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Change Password
          </button>
        </div>
        
        {showPasswordForm && (
          <div className="space-y-3 mt-4 pt-4 border-t">
            <input
              type="password"
              placeholder="Current password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="New password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <div className="flex space-x-2">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
                Update Password
              </button>
              <button 
                onClick={() => setShowPasswordForm(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Shield size={18} />
              Two-Factor Authentication
            </h4>
            <p className="text-sm text-gray-500 mt-1">Add an extra layer of security to your account</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors duration-200">
            Enable
          </button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Privacy Settings</h4>
        <div className="space-y-3">
          {[
            { key: 'dataSharing', label: 'Share data with partners', desc: 'Allow us to share anonymized data with trusted partners' },
            { key: 'analytics', label: 'Usage analytics', desc: 'Help us improve by sharing usage data' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy[key]}
                  onChange={(e) => setPrivacy(prev => ({ ...prev, [key]: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export */}
      <div className="border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium flex items-center gap-2">
              <Download size={18} />
              Export Data
            </h4>
            <p className="text-sm text-gray-500 mt-1">Download a copy of your account data</p>
          </div>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
            Request Export
          </button>
        </div>
      </div>

      {/* Delete Account */}
      <div className="border border-red-200 rounded-lg p-4 bg-red-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-red-900 flex items-center gap-2">
              <Trash2 size={18} />
              Delete Account
            </h4>
            <p className="text-sm text-red-700 mt-1">Permanently delete your account and all data</p>
          </div>
          <button 
            onClick={() => setShowDeleteAccount(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Preferences</h3>

      {/* Theme */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Theme</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {darkMode ? <Moon size={18} /> : <Sun size={18} />}
            <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
          </label>
        </div>
      </div>

      {/* Language */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Language</h4>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
          <option>English</option>
          <option>Hindi</option>
          <option>Tamil</option>
          <option>Telugu</option>
          <option>Bengali</option>
        </select>
      </div>

      {/* Currency */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Currency</h4>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
          <option>INR (₹)</option>
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
        </select>
      </div>

      {/* Size Preference */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">Default Size</h4>
        <div className="grid grid-cols-5 gap-2">
          {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button
              key={size}
              className="py-2 text-sm border border-gray-300 rounded-lg hover:border-black transition-colors duration-200"
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHelpSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Help & Support</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { icon: HelpCircle, title: 'FAQ', desc: 'Find answers to common questions' },
          { icon: Mail, title: 'Contact Support', desc: 'Get help from our support team' },
          { icon: Globe, title: 'Help Center', desc: 'Browse our comprehensive help guides' },
          { icon: Smartphone, title: 'Live Chat', desc: 'Chat with us in real-time' }
        ].map(({ icon: Icon, title, desc }) => (
          <button
            key={title}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
          >
            <div className="flex items-center space-x-3">
              <Icon size={20} className="text-gray-600" />
              <div>
                <h4 className="font-medium">{title}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-400 ml-auto" />
            </div>
          </button>
        ))}
      </div>

      {/* App Info */}
      <div className="border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-3">App Information</h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span>2.1.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span>Dec 15, 2024</span>
          </div>
          <div className="flex justify-between">
            <span>Build</span>
            <span>2024.12.15.001</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'account': return renderAccountSection();
      case 'addresses': return renderAddressesSection();
      case 'payment': return renderPaymentSection();
      case 'notifications': return renderNotificationsSection();
      case 'privacy': return renderPrivacySection();
      case 'preferences': return renderPreferencesSection();
      case 'help': return renderHelpSection();
      default: return renderAccountSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 sm:px-0">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4 bg-gray-50 border-r border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Settings</h2>
                <nav className="space-y-2">
                  {settingsSections.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveSection(id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                        activeSection === id
                          ? 'bg-black text-white'
                          : 'text-gray-700 hover:bg-gray-200'
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
            <div className="lg:w-3/4 p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteAccount && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-900">Delete Account</h3>
              <button 
                onClick={() => setShowDeleteAccount(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete your account? This action cannot be undone and will permanently remove:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Your profile and personal information</li>
                <li>• Order history and tracking data</li>
                <li>• Saved addresses and payment methods</li>
                <li>• Wishlist and preferences</li>
                <li>• All account data and settings</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowDeleteAccount(false);
                  alert('Account deletion process initiated. You will receive a confirmation email.');
                }}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Yes, Delete Account
              </button>
              <button
                onClick={() => setShowDeleteAccount(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;