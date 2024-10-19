import React from 'react'
import ExperienceSection from '@/components/Experience';
import PageHeader from '@/components/Pageheader';

const Aboutus = () => {
  return (
    <>
     <PageHeader title="About Us" breadcrumb="/ About Us" />
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center'>
       <ExperienceSection/>
      </div>
    </>
  )
}

export default Aboutus