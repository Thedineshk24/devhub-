import React, { useEffect } from "react";
function Profile() {
    useEffect(()=>{
           require('@passageidentity/passage-elements/passage-profile');
         }, []);       
  return (
    <div className="mt-8">
        <passage-profile app-id="YkgyHbFAzEUIDk24xNeiDMJs"></passage-profile>
    </div>
  );
}

export default Profile;
