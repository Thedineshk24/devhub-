import React, { useEffect } from "react";
function Profile() {
    useEffect(()=>{
           require('@passageidentity/passage-elements/passage-profile');
         }, []);       
  return (
    <div className="bg-slate-100 h-screen text-white">
        <passage-profile app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-profile>
    </div>
  );
}

export default Profile;
