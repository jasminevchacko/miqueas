import NavigationBar from '../frontend/components/NavigationBar';
import translate from '../frontend/components/translate.js';
export default function Profile({language, setLanguage}) {
  return (
    <div className="Clean">
        <h1>{translate("Profile", language)}</h1>
        <div className="Footer"><NavigationBar selector={0}/></div>
        <button onClick={() => {setLanguage("Spanish")}}> Switch to Spanish </button>
    </div>
  );
}
