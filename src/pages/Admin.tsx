
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageTransition from '@/components/ui/PageTransition';
import AdminPanel from '@/components/AdminPanel';

const Admin = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-24 pb-16">
          <AdminPanel />
        </main>
        
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Admin;
