import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Award, Users, Send } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Former blockchain developer with 10+ years of experience in fintech'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Cryptography expert and contributor to multiple open-source blockchain projects'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Head of Product',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Previously led product at a major cryptocurrency exchange'
    },
    {
      name: 'Priya Patel',
      role: 'Lead Designer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Award-winning UX designer with a passion for creating intuitive interfaces'
    }
  ];
  
  const values = [
    {
      icon: <Shield className="text-primary-500" size={32} />,
      title: 'Security First',
      description: 'We prioritize the security of your assets and information above all else.'
    },
    {
      icon: <Zap className="text-accent-500" size={32} />,
      title: 'Cutting-Edge Innovation',
      description: 'We continuously push the boundaries of what\'s possible in cryptocurrency technology.'
    },
    {
      icon: <Globe className="text-secondary-500" size={32} />,
      title: 'Global Accessibility',
      description: 'We believe in making cryptocurrency accessible to everyone, everywhere.'
    },
    {
      icon: <Award className="text-success-500" size={32} />,
      title: 'Transparency',
      description: 'We operate with complete transparency in all our processes and communications.'
    },
    {
      icon: <Users className="text-warning-500" size={32} />,
      title: 'Community Driven',
      description: 'Our community is at the heart of everything we do and build.'
    },
    {
      icon: <Send className="text-error-500" size={32} />,
      title: 'Continuous Improvement',
      description: 'We\'re committed to constantly improving our platform based on user feedback.'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Cryptoctabil</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're on a mission to make cryptocurrency accessible to everyone through innovative tools and real-time insights.
          </p>
        </div>
        
        {/* Our Story */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-dark-500 pb-2">Our Story</h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Cryptoctabil was founded in 2023 by a team of blockchain developers, financial experts, and design specialists who saw the need for a more intuitive and comprehensive cryptocurrency platform.
            </p>
            <p>
              We recognized that while cryptocurrency was gaining mainstream attention, the tools available to most users were complex, fragmented, and often intimidating for newcomers. Our goal was to create a unified platform that would provide real-time insights, portfolio management, and educational resources all in one place.
            </p>
            <p>
              Today, Cryptoctabil serves users across the globe, from cryptocurrency beginners to seasoned traders and institutional investors. We're constantly evolving our platform based on user feedback and technological advancements in the blockchain space.
            </p>
          </div>
        </motion.section>
        
        {/* Our Values */}
        <motion.section 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-dark-500 pb-2">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="glass-panel p-6 flex"
                variants={itemVariants}
              >
                <div className="mr-4">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Our Team */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-dark-500 pb-2">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index} 
                className="glass-card p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-24 h-24 object-cover rounded-full mx-auto mb-4" 
                />
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-primary-500 dark:text-primary-400 text-sm mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Roadmap */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-dark-500 pb-2">Roadmap</h2>
          <div className="relative border-l-2 border-primary-500 dark:border-primary-400 pl-8 py-4">
            <div className="mb-12 relative">
              <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-700"></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Q1 2025: Enhanced Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Advanced charting tools, predictive analytics, and custom indicators for detailed market analysis.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                  <li>Technical analysis toolkit with multiple indicators</li>
                  <li>Pattern recognition algorithms</li>
                  <li>Historical data comparison tools</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12 relative">
              <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-700"></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Q2 2025: Mobile App Launch</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Native mobile applications for iOS and Android with real-time notifications and portfolio tracking.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                  <li>Push notifications for price alerts</li>
                  <li>Biometric authentication</li>
                  <li>Offline portfolio viewing</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12 relative">
              <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-700"></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Q3 2025: Social Trading</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Follow and copy successful traders, share insights, and participate in community discussions.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                  <li>Trader leaderboards and rankings</li>
                  <li>Copy trading functionality</li>
                  <li>Social news feed and discussions</li>
                </ul>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -left-10 top-0 w-6 h-6 rounded-full bg-primary-500 dark:bg-primary-400 border-4 border-white dark:border-dark-700"></div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Q4 2025: DeFi Integration</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Seamless integration with DeFi protocols for staking, lending, and yield farming directly from our platform.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm">
                  <li>One-click staking and yield farming</li>
                  <li>DeFi protocol comparison tools</li>
                  <li>Risk assessment metrics for DeFi investments</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>
        
        {/* Contact */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 dark:border-dark-500 pb-2">Contact Us</h2>
          <div className="glass-panel p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have questions or feedback? We'd love to hear from you. Our team is always ready to assist with any inquiries.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Send Us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input type="text" className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea 
                      className="input-field resize-none h-32" 
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button className="button-primary w-full">
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Other Ways to Connect</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">General Inquiries</p>
                    <p className="text-gray-600 dark:text-gray-300">info@Cryptoctabil.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Support</p>
                    <p className="text-gray-600 dark:text-gray-300">support@Cryptoctabil.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Press</p>
                    <p className="text-gray-600 dark:text-gray-300">press@Cryptoctabil.com</p>
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-gray-600 dark:text-gray-300">123 Blockchain Street<br />San Francisco, CA 94103</p>
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                      <Shield size={20} />
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                      <Globe size={20} />
                    </a>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300">
                      <Send size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;