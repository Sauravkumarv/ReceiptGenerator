import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children, currentPage, setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-primary-50 to-purple-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
