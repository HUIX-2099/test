'use client';

import { useState, useEffect } from 'react';

interface SystemInfo {
  country: string;
  countryCode: string;
  region: string;
  os: string;
  osVersion: string;
  hasUSB: boolean;
  usbDevices: number;
}

export function useSystemInfo() {
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    country: 'Unknown',
    countryCode: 'US',
    region: 'Unknown',
    os: 'Unknown',
    osVersion: 'Unknown',
    hasUSB: false,
    usbDevices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Detect OS
    const detectOS = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      
      if (/windows/i.test(userAgent)) {
        return { os: 'Windows', version: extractWindowsVersion(userAgent) };
      }
      if (/android/i.test(userAgent)) {
        return { os: 'Android', version: extractAndroidVersion(userAgent) };
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return { os: 'iOS', version: extractIOSVersion(userAgent) };
      }
      if (/Macintosh|Mac OS X/.test(userAgent)) {
        return { os: 'macOS', version: extractMacOSVersion(userAgent) };
      }
      if (/linux/i.test(userAgent)) {
        return { os: 'Linux', version: 'Unknown' };
      }
      
      return { os: 'Unknown', version: 'Unknown' };
    };

    const extractWindowsVersion = (ua: string) => {
      if (/Windows NT 10.0/.test(ua)) return '10/11';
      if (/Windows NT 6.3/.test(ua)) return '8.1';
      if (/Windows NT 6.2/.test(ua)) return '8';
      if (/Windows NT 6.1/.test(ua)) return '7';
      return 'Unknown';
    };

    const extractAndroidVersion = (ua: string) => {
      const match = ua.match(/Android (\d+(\.\d+)?)/);
      return match ? match[1] : 'Unknown';
    };

    const extractIOSVersion = (ua: string) => {
      const match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
      return match ? `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}` : 'Unknown';
    };

    const extractMacOSVersion = (ua: string) => {
      const match = ua.match(/Mac OS X (\d+)[._](\d+)[._]?(\d+)?/);
      return match ? `${match[1]}.${match[2]}${match[3] ? `.${match[3]}` : ''}` : 'Unknown';
    };

    // Detect USB devices
    const detectUSB = async () => {
      if ('usb' in navigator) {
        try {
          const devices = await (navigator as any).usb.getDevices();
          return { hasUSB: true, usbDevices: devices.length };
        } catch (error) {
          // USB API might require user permission
          return { hasUSB: true, usbDevices: 0 };
        }
      }
      return { hasUSB: false, usbDevices: 0 };
    };

    // Detect country and region using IP-based API (free service)
    const detectLocation = async () => {
      try {
        // Using a free IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        return {
          country: data.country_name || 'Unknown',
          countryCode: data.country_code || 'US',
          region: data.region || data.state || 'Unknown',
        };
      } catch (error) {
        // Fallback to timezone-based detection
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const region = timezone.split('/')[1] || 'Unknown';
          const country = timezone.split('/')[0] || 'Unknown';
          
          return {
            country: country.replace('_', ' '),
            countryCode: getCountryCodeFromTimezone(country),
            region: region.replace('_', ' '),
          };
        } catch (e) {
          return {
            country: 'Unknown',
            countryCode: 'US',
            region: 'Unknown',
          };
        }
      }
    };

    const getCountryCodeFromTimezone = (timezone: string): string => {
      const timezoneMap: Record<string, string> = {
        'America': 'US',
        'Europe': 'EU',
        'Asia': 'AS',
        'Africa': 'AF',
        'Australia': 'AU',
        'Pacific': 'PAC',
      };
      return timezoneMap[timezone] || 'US';
    };

    const initializeSystemInfo = async () => {
      const osInfo = detectOS();
      const usbInfo = await detectUSB();
      const locationInfo = await detectLocation();

      setSystemInfo({
        ...osInfo,
        osVersion: osInfo.version,
        ...usbInfo,
        ...locationInfo,
      });
      setLoading(false);
    };

    initializeSystemInfo();
  }, []);

  return { systemInfo, loading };
}
