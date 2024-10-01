'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { setSelectedLanguage } from '../_actions/setSelectedLanguage'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = async (locale: string) => {
    const currentLang = pathname.split('/')[1]
    if (currentLang === locale) return

    try {
      // Set the language in the backend
      await setSelectedLanguage(locale)

      // Update the frontend route
      const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
      router.push(newPathname)
    } catch (error) {
      console.error('Failed to change language:', error)
    }
  };

  return (
    <div className="flex space-x-2">
      <button 
        className="text-2xl" 
        aria-label="Switch to Swedish"
        onClick={() => changeLanguage('sv')}
      >
        <span className="fi fi-se"></span>
      </button>
      <button 
        className="text-2xl" 
        aria-label="Switch to English"
        onClick={() => changeLanguage('en')}
      >
        <span className="fi fi-gb"></span>
      </button>
    </div>
  );
}