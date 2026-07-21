export const metadata = {
  title: 'EcoTrace India',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#0f172a', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
