import './globals.css';

export const metadata = {
  title: 'PGA Chamionship Pick 3 Live',
  description: 'Live Pick 3 golf pool leaderboard for the PGA Championship.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
