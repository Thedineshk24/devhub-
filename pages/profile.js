import React, { useEffect } from "react";
import dynamic from 'next/dynamic';
dynamic(() => import('@passageidentity/passage-elements/passage-profile'), {
  ssr: false,
});
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
