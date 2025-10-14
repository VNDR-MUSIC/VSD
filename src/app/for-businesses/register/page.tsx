
import type { Metadata } from 'next';
import { AdvertiserRegistrationClient } from './AdvertiserRegistrationClient';

export const metadata: Metadata = {
  title: 'Advertiser Registration | VSD Network',
  description: 'Apply to become an advertiser on the VSD Network and reach our community of creators and innovators.',
};

export default function AdvertiserRegistrationPage() {
  return <AdvertiserRegistrationClient />;
}

    