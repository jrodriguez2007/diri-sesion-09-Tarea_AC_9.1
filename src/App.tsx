import { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "./ui/helpers/LanguageProvider";
import StudentsPage from '../src/students/pages/StudentsPage';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import './App.css'

initializeIcons();

function App() {

  const { changeLanguage, locale } = useContext(LanguageContext);

  return (
    <>
     <div className="min-h-screen bg-gray-200">
      {/* Header con selector de idioma */}
      <header className="relative bg-orange-600 text-white p-4 flex items-center">
        <h1 id="h1Title" className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          <FormattedMessage id="app.main.selector.title" defaultMessage="Aplicación de Matrículas" />
        </h1>
        <div id="selectLanguage" className="ml-auto flex items-center">
          <label htmlFor="language-select" className="mr-2">
            <FormattedMessage id="app.main.selector.language" defaultMessage="Seleccionar idioma" />:
          </label>
          <select
            id="language-select"
            onChange={(e) => changeLanguage(e.target.value)}
            value={locale}
            className="p-1 rounded text-black"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </header>

      <StudentsPage />
    </div>

    </>
  )
}

export default App
