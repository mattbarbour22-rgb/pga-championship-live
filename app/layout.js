import './globals.css';

export const metadata = {
  title: 'PGA Championship Pick 3 Live',
  description: 'Live PGA Championship Pick 3 leaderboard and pool standings.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
