import React, { useEffect } from "react";
function Profile() {
    useEffect(()=>{
           require('@passageidentity/passage-elements/passage-profile');
         }, []);       
  return (
    <div className="bg-slate-100 h-screen text-white">
        <passage-profile app-id="YkgyHbFAzEUIDk24xNeiDMJs"></passage-profile>
    </div>
  );
}

export default Profile;
