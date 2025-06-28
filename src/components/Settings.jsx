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
  Edit3,
  Phone,
  MessageCircle,
  FileText,
  Settings as SettingsIcon
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
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400001',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Park, Floor 5',
      city: 'Mumbai',
      state: 'Maharashtra',
      zip: '400002',
      phone: '+91 9876543210',
      isDefault: false
    }
  ]);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'Credit Card',
      last4: '1234',
      brand: 'Visa',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'UPI',
      id_value: 'john@paytm',
      isDefault: false
    }
  ]);

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

  const renderAddressesSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saved Addresses</h3>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 text-xs font-medium rounded">
                  {address.type}
                </span>
                {address.isDefault && (
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 text-xs font-medium rounded">
                    Default
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  <Edit3 size={16} />
                </button>
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-gray-900 dark:text-white">
              <p className="font-medium">{address.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{address.address}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{address.city}, {address.state} {address.zip}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{address.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Methods</h3>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2">
          <Plus size={16} />
          Add Payment Method
        </button>
      </div>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {method.type === 'Credit Card' ? (
                    <CreditCard size={20} className="text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Smartphone size={20} className="text-gray-600 dark:text-gray-400" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {method.type === 'Credit Card' ? (
                      <>
                        {method.brand} •••• {method.last4}
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                          Expires {method.expiry}
                        </span>
                      </>
                    ) : (
                      method.id_value
                    )}
                  </div>
                  {method.isDefault && (
                    <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 text-xs font-medium rounded mt-1 inline-block">
                      Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  <Edit3 size={16} />
                </button>
                <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
      
      {Object.entries(notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-300">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about {key.toLowerCase()}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={() => setNotifications(prev => ({ ...prev, [key]: !value }))}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors duration-300 ${
              value 
                ? 'bg-blue-600 dark:bg-blue-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
          </label>
        </div>
      ))}
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Privacy & Security</h3>

      {/* Change Password */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Change Password</h4>
        {!showPasswordForm ? (
          <button 
            onClick={() => setShowPasswordForm(true)}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-3">
            <input 
              type="password" 
              placeholder="Current Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
            />
            <input 
              type="password" 
              placeholder="New Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
            />
            <input 
              type="password" 
              placeholder="Confirm New Password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300"
            />
            <div className="flex space-x-3">
              <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200">
                Update Password
              </button>
              <button 
                onClick={() => setShowPasswordForm(false)}
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Privacy Settings */}
      {Object.entries(privacy).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 transition-colors duration-300">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Control your {key.toLowerCase()} settings</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={() => setPrivacy(prev => ({ ...prev, [key]: !value }))}
              className="sr-only peer"
            />
            <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors duration-300 ${
              value 
                ? 'bg-blue-600 dark:bg-blue-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
          </label>
        </div>
      ))}

      {/* Delete Account */}
      <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-900/20 transition-colors duration-300">
        <h4 className="font-medium mb-2 text-red-900 dark:text-red-200">Delete Account</h4>
        <p className="text-sm text-red-700 dark:text-red-300 mb-3">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button 
          onClick={() => setShowDeleteAccount(true)}
          className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200"
        >
          Delete Account
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
            <div className={`w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-blue-600 dark:bg-blue-500' 
                : 'bg-gray-200 dark:bg-gray-700'
            }`}></div>
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

  const renderHelpSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Help & Support</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left bg-white dark:bg-gray-800">
          <MessageCircle size={20} className="text-blue-600 dark:text-blue-400 mb-2" />
          <div className="font-medium text-gray-900 dark:text-white">Live Chat</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Chat with our support team</div>
        </button>
        
        <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left bg-white dark:bg-gray-800">
          <Phone size={20} className="text-green-600 dark:text-green-400 mb-2" />
          <div className="font-medium text-gray-900 dark:text-white">Call Support</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">1800-123-4567 (Toll Free)</div>
        </button>
        
        <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left bg-white dark:bg-gray-800">
          <Mail size={20} className="text-purple-600 dark:text-purple-400 mb-2" />
          <div className="font-medium text-gray-900 dark:text-white">Email Support</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">support@thread.com</div>
        </button>
        
        <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-left bg-white dark:bg-gray-800">
          <FileText size={20} className="text-orange-600 dark:text-orange-400 mb-2" />
          <div className="font-medium text-gray-900 dark:text-white">FAQ</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Find answers to common questions</div>
        </button>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 transition-colors duration-300">
        <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h4>
        <div className="space-y-4">
          <div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">How can I track my order?</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">You can track your order from the Orders page or using the tracking link sent to your email.</div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">What is your return policy?</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">We offer 30-day returns for unworn items in original condition with tags attached.</div>
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white mb-1">How long does delivery take?</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Standard delivery takes 2-5 business days. Express delivery is available for next-day delivery.</div>
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