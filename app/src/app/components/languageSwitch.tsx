'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (locale: string) => {
    const currentLang = pathname.split('/')[1]
    if (currentLang === locale) return // Don't change if it's already the current language

    const newPathname = pathname.replace(/^\/[a-z]{2}/, `/${locale}`)
    router.push(newPathname)
  };

  return (
    <div className="flex space-x-2">
      <button 
        className="text-2xl" 
        aria-label="Switch to Swedish"
        onClick={() => changeLanguage('sv')}
      >
        🇸🇪
      </button>
      <button 
        className="text-2xl" 
        aria-label="Switch to English"
        onClick={() => changeLanguage('en')}
      >
        🇬🇧
      </button>
    </div>
  );
}