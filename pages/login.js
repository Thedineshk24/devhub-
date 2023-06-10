import { useEffect } from 'react';

function Login() {
  useEffect(() => {
    import('@passageidentity/passage-elements/passage-auth').then(() => {
      // Custom logic after dynamically importing passage-auth
    });
  }, []);
  return (
      <div>
        <passage-auth app-id={"YkgyHbFAzEUIDk24xNeiDMJs"}></passage-auth>
      </div>
  );
}
export default Login;