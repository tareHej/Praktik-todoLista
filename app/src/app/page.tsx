import LanguageSwitcher from './components/languageSwitch'
import TodoList from './components/todoList'

export default function Home() {
  return (
    <div className="min-h-screen">
      

      <header className="bg-blue-500 h-16 flex items-center justify-end px-4">
        <LanguageSwitcher />
      </header>
      <div className="flex">
        <nav className="w-64 bg-gray-800 text-white p-4 h-screen">
          <ul className="space-y-2">
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Home</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Tasks</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Categories</a></li>
            <li><a href="#" className="block py-2 px-4 hover:bg-gray-700 rounded">Settings</a></li>
          </ul>
        </nav>
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold">Min to-do lista</h1>
          <TodoList />  
        </main>
      </div>
    </div>
  );
}
