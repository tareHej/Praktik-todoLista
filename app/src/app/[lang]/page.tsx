import LanguageSwitcher from '../components/languageSwitch'
import { getDictionary } from './dictionaries'

type PageProps = {
  params: {
    lang: 'en' | 'sv';
  };
};

export default async function Page({ params: { lang } }: PageProps) {
  const dict = await getDictionary(lang)

  return (
    <div className="min-h-screen">
      <header className="bg-blue-500 h-16 flex items-center justify-end px-4">
        <LanguageSwitcher />
      </header>
      <div className="flex">
        <nav className="w-64 bg-gray-800 text-white p-4 h-screen">
          <ul className="space-y-2">
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{dict.home}</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{dict.tasks}</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{dict.categories}</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">{dict.settings}</a></li>
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold">{dict.title}</h1>
          <div>Current language: {lang}</div>
        </main>
      </div>
    </div>
  );
}
