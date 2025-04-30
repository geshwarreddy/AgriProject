import React,{useState} from 'react'
import { FileText, Leaf, Lock, Users, BarChart, Sprout } from 'lucide-react';
import '../styles/Service.css';
const services = [
    {
      id: 1,
      title: "Farmer Soil Reports Management",
      description: "Store and manage comprehensive soil test reports for better farming decisions",
      icon: FileText,
      details: "Access detailed soil analysis, track historical data, and receive actionable insights for soil improvement.",
      category: "soil"
    },
    {
      id: 2,
      title: "Crop & Farming Data",
      description: "Track and analyze crop performance and farming practices",
      icon: Leaf,
      details: "Monitor crop health, growth patterns, and optimize farming practices with data-driven recommendations.",
      category: "farming"
    },
    {
      id: 3,
      title: "Role-Based Access",
      description: "Secure, role-based access control for farm management",
      icon: Lock,
      details: "Manage user permissions, secure data access, and maintain privacy for sensitive farming information.",
      category: "access"
    },
    {
      id: 4,
      title: "Farmer Community",
      description: "Connect with other farmers and share knowledge",
      icon: Users,
      details: "Join discussions, share experiences, and learn from successful farming practices in your region.",
      category: "community"
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      description: "Visualize and analyze farming data trends",
      icon: BarChart,
      details: "Get insights through interactive charts and reports to make informed decisions about your farm.",
      category: "analytics"
    },
    {
      id: 6,
      title: "Crop Suggestion System",
      description: "AI-powered crop recommendations",
      icon: Sprout,
      details: "Receive personalized crop suggestions based on soil conditions and local climate data.",
      category: "farming"
    }
  ];
  
  function ServiceCard({ service, isExpanded, onToggle }) {
    const Icon = service.icon;
    
    return (
      <div className={`service-card ${isExpanded ? 'expanded' : ''}`} onClick={onToggle}>
        <div className="service-card-content">
          <div className="service-icon">
            <Icon size={32} />
          </div>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <button className="learn-more">
            {isExpanded ? 'Show Less' : 'Learn More'}
          </button>
        </div>
        <div className="service-details">
          <p>{service.details}</p>
        </div>
      </div>
    );
  }
  
  function ServicesGrid() {
    const [expandedId, setExpandedId] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
  
    const tabs = [
      { id: 'all', label: 'All Services' },
      { id: 'soil', label: 'Soil Reports' },
      { id: 'farming', label: 'Farming Data' },
      { id: 'access', label: 'Access & Security' }
    ];
  
    const filteredServices = services.filter(service => 
      activeTab === 'all' || service.category === activeTab
    );
  
    return (
      <section id="services" className="services-section">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="services-grid">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              isExpanded={expandedId === service.id}
              onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
            />
          ))}
        </div>
      </section>
    );
  }
  function Hero() {
    const scrollToServices = () => {
      document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
    };
  
    return (
      <div className="hero">
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Helping farmers with data-driven insights for better farming.</p>
          <button onClick={scrollToServices} className="cta-button">
            Explore Services
          </button>
        </div>
      </div>
    );
  }
export default function Service() {
  return (
    <div>
      
      <Hero />
      <ServicesGrid />
      {/* <CallToAction /> */}
    </div>
  )
}
