"use client";
import React from 'react'
import SupportAdminDataProvider from './context/SupportAdminDataProvider';
import SupportAdminTableSection from './SupportAdminTableSection';
import { useAuth2 } from '@/bik-lib/context/auth/Auth2Provider';

const SupportAdminPage = () => {

    const { authInfo } = useAuth2();


    return (
        <SupportAdminDataProvider authInfo={authInfo}>
            <div className='admin-section'>
                <SupportAdminTableSection />
            </div>
        </SupportAdminDataProvider >
    )
}

export default SupportAdminPage