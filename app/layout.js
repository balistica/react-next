import './globals.css';

export const metadata = {
  title: 'Denis | Developer & Digital Creator',
  description: 'Full-stack developer portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
