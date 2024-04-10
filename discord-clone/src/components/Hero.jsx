import React from 'react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

function Hero() {
  return (
    <div className="bg-discord_blue pb-8 md:pb-0">
      <div className="p-7 py-9 h-screen md:flex relative">
        <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className='text-5xl text-white font-bold'>Your place to talk</h1>
          <h2 className='text-white text-lg font-light tracking-wide lg:max-w-3xl w-full'>
            Whether you’re part of a school club, gaming group, worldwide art
            community, or just a handful of friends that want to spend time
            together, ChatterBox makes it easy to talk every day and hang out more
            often.
          </h2>
          <div className='flex flex-col sm:flex-row sm:items-center md:flex-col md:items-start lg:flex-row gap-6'>
            <button className='bg-white w-90 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out'>
              <ArrowDownTrayIcon className='w-6 mr-2'/>
              Download (currently unavailable)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero