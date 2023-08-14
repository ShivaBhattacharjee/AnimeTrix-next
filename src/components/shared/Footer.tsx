import { Github, Instagram } from 'lucide-react';
import React from 'react';

const socialMediaLinks = [
  {
    icon: <Github className=' scale-125' />,
    url: 'https://github.com/ShivaBhattacharjee/AnimeTrix-next',
  },
  {
    icon: <Instagram className=' scale-125' />,
    url: 'https://www.instagram.com/animetrix.200/',
  },
  // Add more social media links as needed
];

const Footer = () => {
  return (
    <div className='bg-white/10 hidden md:block p-4 '>
      <div className='flex flex-col gap-7 justify-between items-center'>
        <h1 className='text-3xl font-bold'>AnimeTrix</h1>
        <p className='text-sm text-center font-semibold m-auto max-w-4xl'>
        AnimeTrix is not affiliated with or endorsed by any of the anime studios behind the creation of the anime presented on this site. This website is only an user interface presenting/linking various self-hosted files across the internet by other third-party providers for easy access. AnimeTrix never downloads the video from any source provider, link will be returned from the response hence it is completely not subjected to DMCA compliant.
        </p>
        <div className="flex gap-6 pb-6">
          {socialMediaLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target='_blank'
              className='duration-200 hover:scale-125'
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
