import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Budgeting from "./components/Budgeting";
import ChatBotWidget from "./components/ChatBotWidget";
import { useState } from "react";
import Planning from "./components/Planning";
import FinancialInclusion from "./components/FinancialInclusion";
import Goals from "./components/Goals";
import { useTranslation } from 'react-i18next';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("english")

  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
      console.log("App jsx changeLanguage :", lang);
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  return (
    <Router>
      <div className={darkMode ? "dark" : ""}>
        <div className="relative flex w-screen h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
          <Sidebar />
          <div className="flex flex-col flex-1 w-full overflow-hidden">
            <Navbar lang = {lang} setLang = {setLang} onChange={(e, lang )=> changeLanguage(lang)} toggleDark={() => setDarkMode(!darkMode)} />
            <main className="flex-1 w-full p-4 overflow-auto">
              <Routes>
                <Route path="/" element={<Budgeting />} />
                <Route path="/budgeting" element={<Budgeting  lang = {lang}/>} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/inclusion" element={<FinancialInclusion />} />
                <Route path="/goals" element={<Goals lang={lang} />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                {/* <Route path="/contact" element={<Contact />} /> */}
              </Routes>
            </main>
          </div>

          {/* Chatbot floating widget */}
          <ChatBotWidget />
        </div>
      </div>
    </Router>
  );
}

export default App;
