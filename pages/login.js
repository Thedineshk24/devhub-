import { useEffect } from 'react';
import ThemeChanger from '../components/DarkSwitch';

function Login() {
  useEffect(() => {
    import('@passageidentity/passage-elements/passage-auth').then(() => {

    });
  }, []);

  return (
      <div>
        <ThemeChanger theme="light" />
        <passage-auth app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-auth>
      </div>
  );
}
export default Login;