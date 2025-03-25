// components/Footer.tsx
import React from 'react';
import { FooterProps, SocialLink } from '../types/footer';
import Head from 'next/head';

const defaultSocialLinks: SocialLink[] = [
  {
    icon: 'fa-brands fa-facebook',
    url: '#',
    ariaLabel: 'Visit our Facebook',
    className: 'hover:text-blue-600'
  },
  {
    icon: 'fa-brands fa-twitter',
    url: '#',
    ariaLabel: 'Visit our Twitter',
    className: 'hover:text-sky-500'
  },
  {
    icon: 'fa-brands fa-linkedin',
    url: '#',
    ariaLabel: 'Visit our LinkedIn',
    className: 'hover:text-blue-700'
  }
];

const Footer: React.FC<FooterProps> = ({
  companyName = 'CareerSage',
  copyrightText,
  socialLinks = defaultSocialLinks,
  className = 'text-primary-500',
  containerClass = 'py-6',
  showSocialLinks = true,
  year = new Date().getFullYear()
}) => {
  return (
    <>
    <Head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </Head>
    <footer className={`w-full text-center mt-auto ${containerClass}`}>
      <div className={className}>
        {copyrightText || (
          <p>© {year} {companyName}. All Rights Reserved.</p>
        )}
        
        {showSocialLinks && (
            <div className="flex justify-center gap-6 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.ariaLabel}
                  href={link.url}
                  aria-label={link.ariaLabel}
                  className={`transition-colors duration-300 ${link.className}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          )}
      </div>
    </footer>
    </>
  );
};

export default Footer;
