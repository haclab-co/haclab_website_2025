import React from 'react';
import { JsonLd } from 'react-schemaorg';
import { Award } from 'schema-dts';

const AwardsSchema: React.FC = () => {
  const awards = [
    {
      name: 'Top Web Developer in Uganda',
      description: 'Recognized as a top web development company in Uganda',
      issuer: 'AppFutura',
      url: 'https://www.appfutura.com/web-developers/uganda'
    },
    {
      name: 'Top App Developer in Uganda',
      description: 'Recognized as a top mobile app development company in Uganda',
      issuer: 'AppFutura',
      url: 'https://www.appfutura.com/app-developers/uganda'
    },
    {
      name: 'Top Software Development Company in Uganda',
      description: 'Recognized as a top software development company in Uganda',
      issuer: 'AppFutura',
      url: 'https://www.appfutura.com/software-development-companies/uganda'
    },
    {
      name: 'Certified Development Company',
      description: 'Certified as a reliable development company',
      issuer: 'AppFutura',
      url: 'https://www.appfutura.com/companies/haclab-company-limited'
    },
    {
      name: 'Top Software Development Company',
      description: 'Recognized as a top software development company',
      issuer: 'GoodFirms',
      url: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      name: 'Top Web Development Company',
      description: 'Recognized as a top web development company',
      issuer: 'GoodFirms',
      url: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      name: 'Top Mobile App Development Company',
      description: 'Recognized as a top mobile app development company',
      issuer: 'GoodFirms',
      url: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      name: 'Top IT Services Company',
      description: 'Recognized as a top IT services company',
      issuer: 'GoodFirms',
      url: 'https://www.goodfirms.co/company/haclab-company-limited'
    },
    {
      name: 'Top Nearshore Software Development Company',
      description: 'Recognized as a top nearshore software development company',
      issuer: 'DesignRush',
      url: 'https://www.designrush.com/agency/software-development/nearshore'
    },
    {
      name: 'Top Software Development Company',
      description: 'Recognized as a top software development company',
      issuer: 'DesignRush',
      url: 'https://www.designrush.com/agency/profile/haclab-company-limited'
    }
  ];

  return (
    <>
      {awards.map((award, index) => (
        <JsonLd<Award>
          key={index}
          item={{
            "@context": "https://schema.org",
            "@type": "Award",
            "name": award.name,
            "description": award.description,
            "issuer": {
              "@type": "Organization",
              "name": award.issuer
            },
            "url": award.url
          }}
        />
      ))}
    </>
  );
};

export default AwardsSchema;
