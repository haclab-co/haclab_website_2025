/**
 * FAQ data for the website
 * This helps with SEO by providing structured content for FAQ schema
 */

export interface FAQItem {
  question: string;
  answer: string;
}

// General FAQs about Haclab
export const generalFaqs: FAQItem[] = [
  {
    question: "Where is Haclab Company Limited located?",
    answer: "Haclab Company Limited is headquartered in Kampala, Uganda, specifically on Kireka Kamuli Road. We serve clients throughout Uganda including Kampala, Entebbe, Jinja, Mukono, Wakiso, Mbarara, and Gulu, as well as across East Africa."
  },
  {
    question: "What services does Haclab offer?",
    answer: "Haclab offers a comprehensive range of software development services including web development, mobile app development, e-commerce solutions, SEO optimization, database design, and custom software development tailored for businesses in Uganda and East Africa."
  },
  {
    question: "How can I contact Haclab for a project inquiry?",
    answer: "You can contact us through our website contact form, by email at info@haclab.net, or by phone at +256 781 343 882. We're always ready to discuss your project requirements and provide tailored solutions for your business needs in Uganda."
  },
  {
    question: "Does Haclab work with businesses outside of Kampala?",
    answer: "Yes, while our office is in Kampala, we work with businesses throughout Uganda including Entebbe, Jinja, Mukono, Wakiso, Mbarara, Gulu, and other locations. We also serve clients across East Africa, providing remote services and on-site support when needed."
  },
  {
    question: "What makes Haclab different from other software companies in Uganda?",
    answer: "Haclab stands out through our deep understanding of the Ugandan market, our commitment to quality and innovation, and our focus on delivering solutions that address local business challenges. We combine global best practices with local expertise to create software that truly works for Ugandan businesses."
  }
];

// Web Development FAQs
export const webDevelopmentFaqs: FAQItem[] = [
  {
    question: "What types of websites does Haclab develop?",
    answer: "We develop all types of websites including corporate websites, e-commerce platforms, educational portals, government websites, NGO websites, and custom web applications. Our web solutions are tailored to meet the specific needs of businesses in Uganda and East Africa."
  },
  {
    question: "How long does it take to develop a website?",
    answer: "The timeline for website development varies depending on the complexity and requirements of the project. A simple informational website might take 2-4 weeks, while a complex e-commerce platform or custom web application could take 2-3 months or more. We provide detailed timelines during our project planning phase."
  },
  {
    question: "Does Haclab provide website hosting services?",
    answer: "Yes, we offer website hosting services optimized for businesses in Uganda, ensuring fast loading times for local visitors. We also provide domain registration, SSL certificates, and ongoing maintenance to keep your website secure and performing optimally."
  },
  {
    question: "Can Haclab help improve my existing website?",
    answer: "Absolutely! We offer website redesign, optimization, and enhancement services. Whether you need to improve performance, update the design, add new features, or optimize for search engines, our team can help upgrade your existing website to meet current standards and business needs."
  },
  {
    question: "Are websites developed by Haclab mobile-friendly?",
    answer: "Yes, all websites we develop are fully responsive and mobile-friendly by default. This is especially important in Uganda where mobile internet usage is predominant. Our websites adapt seamlessly to all screen sizes, ensuring an optimal experience for all users regardless of their device."
  }
];

// Mobile App Development FAQs
export const mobileAppFaqs: FAQItem[] = [
  {
    question: "What platforms can Haclab develop mobile apps for?",
    answer: "We develop mobile applications for both Android and iOS platforms. We also specialize in cross-platform development using frameworks like React Native and Flutter, allowing us to create apps that work on multiple platforms while maintaining native-like performance and user experience."
  },
  {
    question: "How much does it cost to develop a mobile app in Uganda?",
    answer: "The cost of developing a mobile app varies based on complexity, features, and platforms. Basic apps may start from $5,000-$10,000, while complex apps with advanced features can range from $15,000-$50,000+. We provide detailed quotes based on your specific requirements and budget constraints."
  },
  {
    question: "Can Haclab help publish my app to the app stores?",
    answer: "Yes, we provide complete app store submission services for both Google Play Store and Apple App Store. We handle the entire process including store listing optimization, screenshot preparation, and compliance with store guidelines to ensure your app is approved quickly."
  },
  {
    question: "Does Haclab provide app maintenance after development?",
    answer: "Yes, we offer ongoing maintenance and support services for all mobile apps we develop. This includes regular updates, bug fixes, performance optimization, and feature enhancements. We also provide monitoring to ensure your app continues to function optimally as operating systems and devices evolve."
  },
  {
    question: "Can Haclab develop apps that work offline for rural areas in Uganda?",
    answer: "Absolutely! We understand the connectivity challenges in many parts of Uganda. We specialize in developing apps with offline functionality that can sync data when connectivity is available. This is particularly important for apps used in rural areas where internet access may be limited or intermittent."
  }
];

// E-commerce FAQs
export const ecommerceFaqs: FAQItem[] = [
  {
    question: "What payment gateways can be integrated into e-commerce websites for Uganda?",
    answer: "We integrate various payment solutions suitable for the Ugandan market including Mobile Money (MTN, Airtel), Pesapal, PayWay, Flutterwave, Stripe, PayPal, and bank transfers. We ensure secure and convenient payment options for your customers throughout Uganda and East Africa."
  },
  {
    question: "Can Haclab develop a multilingual e-commerce store?",
    answer: "Yes, we can develop multilingual e-commerce stores that cater to diverse customer bases. This is particularly useful for businesses serving different language communities in Uganda and across East Africa. We ensure proper translation and localization for an optimal user experience."
  },
  {
    question: "Does Haclab provide training for managing an e-commerce website?",
    answer: "Yes, we provide comprehensive training for your team on how to manage your e-commerce platform. This includes product management, order processing, inventory control, content updates, and reporting. We ensure you're fully equipped to operate your online store effectively."
  },
  {
    question: "Can you help with product photography and content for my online store?",
    answer: "Yes, we offer product photography, content creation, and catalog management services to help showcase your products effectively. Quality product presentation is crucial for e-commerce success, and we ensure your products are displayed professionally to attract customers in Uganda and beyond."
  },
  {
    question: "How do you handle delivery logistics for e-commerce in Uganda?",
    answer: "We integrate with local delivery services in Uganda such as SafeBoda, Jumia Logistics, SendyUG, and others. We can also implement custom delivery zones, shipping rates, and delivery time estimates based on locations throughout Uganda to provide accurate information to your customers."
  }
];

// SEO FAQs
export const seoFaqs: FAQItem[] = [
  {
    question: "How can SEO help my business in Uganda?",
    answer: "SEO helps your business appear higher in search results when potential customers in Uganda search for your products or services. This increases visibility, drives more targeted traffic to your website, builds credibility, and ultimately leads to more inquiries and sales from the local market."
  },
  {
    question: "How long does it take to see results from SEO in Uganda?",
    answer: "SEO is a long-term strategy. Initial improvements can be seen within 1-3 months, but significant results typically take 4-6 months or longer. The timeline depends on your website's current state, competition in your industry, and the specific keywords you're targeting in the Ugandan market."
  },
  {
    question: "Does Haclab provide SEO services for specific locations in Uganda?",
    answer: "Yes, we specialize in local SEO for specific locations throughout Uganda including Kampala, Entebbe, Jinja, Mukono, Wakiso, Mbarara, and Gulu. We optimize your online presence to attract customers from your target locations with location-specific keywords, Google My Business optimization, and local content strategies."
  },
  {
    question: "What SEO strategies work best for the Ugandan market?",
    answer: "Effective SEO strategies for Uganda include local keyword optimization, mobile-first approach (given high mobile usage), content in both English and local languages where relevant, Google My Business optimization, and building backlinks from local Ugandan websites and directories."
  },
  {
    question: "How do you measure SEO success for Ugandan businesses?",
    answer: "We measure SEO success through various metrics including search engine rankings for targeted keywords, organic traffic growth, engagement metrics, conversion rates, and ultimately business inquiries or sales. We provide regular reports showing these metrics and the progress of your SEO campaign."
  }
];
