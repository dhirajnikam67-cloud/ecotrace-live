export const metadata = {
  title: 'EcoTrace India',
  // PWA (Aug 2026): manifest.json + icons जोडले — "Add to Home Screen" साठी आवश्यक
  manifest: '/manifest.json',
  themeColor: '#059669',
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-192.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a', color: '#fff' }}>
        {children}
        {/* PWA (Aug 2026): service worker register करतो — installability साठी आवश्यक.
            v1 मध्ये sw.js कुठलंही caching करत नाही (pilot दरम्यान जुनं cache दाखवायचा धोका टाळण्यासाठी). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function (err) {
                    console.error('Service worker registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
