'use client'

export default function LanguageSwitcher() {
  const changeLanguage = (locale: string) => {
    // Här ska kod för att byta språk läggas till
    console.log(`Switching to ${locale}`);
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