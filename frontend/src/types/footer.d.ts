import { ReactNode } from 'react';

export interface SocialLink {
  icon: string;
  url: string;
  ariaLabel: string;
  className?: string;
}

export interface FooterProps {
  companyName?: string;
  copyrightText?: ReactNode;
  socialLinks?: SocialLink[];
  className?: string;
  containerClass?: string;
  showSocialLinks?: boolean;
  year?: number;
}