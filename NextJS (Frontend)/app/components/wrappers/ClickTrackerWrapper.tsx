'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type ClickWrapperProps = {
    children: React.ReactNode;
};

export default function ClickTrackerWrapper({ children }: ClickWrapperProps) {
    const currentPath= usePathname();

    useEffect(() => {

        const handleClick = async () => {

            await fetch('/api/track-click', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: currentPath }),
            });
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [currentPath]);

    return <>{children}</>;
}
