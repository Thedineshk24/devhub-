import React, { useEffect } from "react";
import "@passageidentity/passage-elements/passage-profile";
import AuthWrapper from "../components/AuthWrapper";
function Profile() {
    useEffect(()=>{
           require('@passageidentity/passage-auth');
         }, []);       
  return (
    <div className="mt-8">
      <AuthWrapper>
        <passage-profile app-id="YkgyHbFAzEUIDk24xNeiDMJs"></passage-profile>
      </AuthWrapper>
    </div>
  );
}

export default Profile;
