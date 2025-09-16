import React, { useState, useEffect } from 'react';
import { Receipt, Zap, Shield, Users, Star, ArrowRight, Check, Download, Edit3, Printer, Globe, Clock } from 'lucide-react';

const ReceiptGeneratorLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ users: 0, receipts: 0, businesses: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate stats
    const animateStats = () => {
      const targets = { users: 500, receipts: 2500, businesses: 150 };
      const duration = 2000;
      const steps = 60;
      const increment = {
        users: targets.users / steps,
        receipts: targets.receipts / steps,
        businesses: targets.businesses / steps
      };
      
      let current = { users: 0, receipts: 0, businesses: 0 };
      let step = 0;
      
      const timer = setInterval(() => {
        if (step < steps) {
          current.users += increment.users;
          current.receipts += increment.receipts;
          current.businesses += increment.businesses;
          setStats({
            users: Math.floor(current.users),
            receipts: Math.floor(current.receipts),
            businesses: Math.floor(current.businesses)
          });
          step++;
        } else {
          setStats(targets);
          clearInterval(timer);
        }
      }, duration / steps);
    };

    setTimeout(animateStats, 500);

    // Auto-rotate features
    const featureTimer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(featureTimer);
  }, []);

  const features = [
    {
      icon: <Edit3 className="w-8 h-8" />,
      title: "Easy Customization",
      description: "Create professional receipts with our intuitive drag-and-drop editor"
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Formats",
      description: "Export as PDF, PNG, or print directly from your browser"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Currency",
      description: "Support for 150+ currencies with real-time conversion rates"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Instant Generation",
      description: "Generate professional receipts in seconds, not minutes"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      content: "This tool saved me hours every week. The receipts look professional and my customers love them!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Freelance Designer",
      content: "Perfect for my freelance work. Clean, customizable, and incredibly easy to use.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Restaurant Manager",
      content: "Our customers appreciate the detailed, branded receipts. Great for our business image!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        
        .receipt-preview {
          background: white;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);
          transition: all 0.3s ease;
        }
        
        .receipt-preview:hover {
          transform: perspective(1000px) rotateY(-10deg) rotateX(2deg);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>

      {/* Header */}
       <header className="relative overflow-hidden">
       {/* <nav className="relative z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Receipt className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">ReceiptMaker</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Reviews</a>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all">
                Get Started
              </button>
            </div>
          </div>
        </nav> */}

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Create Professional
                  <span className="gradient-text block">Receipts Instantly</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Generate beautiful, customizable receipts in seconds. Perfect for businesses, freelancers, and professionals who value quality and efficiency.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105 transition-all">
                  <Zap className="w-5 h-5" />
                  <span>Start Creating Free</span>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free Forever Plan</span>
                </div>
              </div>
            </div>

            <div className={`relative ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
              <div className="receipt-preview w-80 mx-auto p-6 rounded-lg animate-float">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg">ACME Store</h3>
                  <p className="text-sm text-gray-600">123 Business Street</p>
                  <p className="text-sm text-gray-600">City, State 12345</p>
                </div>
                <div className="border-t border-b border-dashed py-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Premium Widget</span>
                    <span>$29.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$2.80</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg pt-4">
                  <span>Total</span>
                  <span>$37.79</span>
                </div>
                <div className="text-center text-sm text-gray-500 mt-4">
                  Thank you for your purchase!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-50 animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-50 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-200 rounded-full opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">{stats.users.toLocaleString()}+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">{stats.receipts.toLocaleString()}+</div>
              <div className="text-gray-600">Receipts Generated</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold gradient-text">{stats.businesses.toLocaleString()}+</div>
              <div className="text-gray-600">Businesses Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional receipts that impress your customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`glass-effect p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="text-blue-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Our Users Say</h2>
            <p className="text-xl text-blue-100">Join thousands of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="glass-effect p-12 rounded-2xl">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of businesses creating professional receipts every day
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 mx-auto hover:shadow-lg transform hover:scale-105 transition-all">
              <span>Start Creating Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-gray-500 mt-4">Free forever • No credit card required</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <Receipt className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">ReceiptMaker</span>
              </div>
              <p className="text-gray-400">
                The easiest way to create professional receipts for your business.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReceiptMaker. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default ReceiptGeneratorLanding;