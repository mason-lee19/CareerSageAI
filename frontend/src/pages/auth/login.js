import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utils/firebase";
//import { useRouter } from "next/router";

export default function Login() {
  //const route = useRouter();
  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      //route.push("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow px-6 py-12 min-h-[800px]">
      <div className="w-[25%] bg-white rounded-lg shadow-lg min-h-[300px] flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl justify-center items-center">Join Today</h2>
        <div className="py-4">
          <h3 className="text-lg py-4 justify-center items-center ">
            Sign in with one of the providers
          </h3>
          <button
            onClick={GoogleLogin}
            className="w-[250px] h-[50px] bg-primary-500 text-white justify-center items-center font-medium rounded-lg flex p-4"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
