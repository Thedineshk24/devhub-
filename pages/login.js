import { useEffect } from 'react';
import ThemeChanger from '../components/DarkSwitch';

function Login() {
  useEffect(() => {
    import('@passageidentity/passage-elements/passage-auth').then(() => {
      // Custom logic after dynamically importing passage-auth
    });
  }, []);
  return (
      <div>
        <ThemeChanger />
        <passage-auth app-id={"YkgyHbFAzEUIDk24xNeiDMJs"}></passage-auth>
      </div>
  );
}
export default Login;