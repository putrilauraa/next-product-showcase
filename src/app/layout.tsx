// app/layout.tsx
import './globals.css'
import Link from 'next/link'
import type { ReactNode } from 'react';

type RootLayoutProps = {
    children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className="font-sans">
                <nav className="p-4">
                    <Link href="/" className="ml-2">Home</Link>
                </nav>
                {children}
            </body>
        </html>
    )
}
