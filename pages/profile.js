import React, { useEffect } from "react";
import "@passageidentity/passage-elements/passage-profile";
function Profile() {
    useEffect(()=>{
           require('@passageidentity/passage-auth');
         }, []);       
  return (
    <div className="mt-8">
        <passage-profile app-id="YkgyHbFAzEUIDk24xNeiDMJs"></passage-profile>
    </div>
  );
}

export default Profile;
