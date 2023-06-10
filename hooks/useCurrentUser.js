import {useState, useEffect} from "react";
import {PassageUser} from "@passageidentity/passage-elements/passage-user";
import {useRouter} from "next/router";

export function useCurrentUser() {
  const [result, setResult] = useState({
    isLoading: true,
    isAuthorized: false,
    username: "",
  });

  const router = useRouter();

  useEffect(() => {
    let cancelRequest = false;
    try {
      new PassageUser()?.userInfo()?.then((userInfo) => {
        if (cancelRequest) {
          return;
        }
        if (userInfo === undefined) {
          setResult({
            isLoading: false,
            isAuthorized: false,
            username: "",
          });
          return;
        }
        if (!userInfo?.id) {
          router.push("/login");
        }
        setResult({
          isLoading: false,
          isAuthorized: true,
          username: userInfo.email ? userInfo.email : userInfo.phone,
          userId: userInfo?.id,
        });
      });
    } catch {
      router.push("/login");
    }

    return () => {
      cancelRequest = true;
    };
  }, []);
  return result;
}
