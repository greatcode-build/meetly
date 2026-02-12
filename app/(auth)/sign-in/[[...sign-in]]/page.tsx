import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex h-screen justify-center items-center w-full">
      <SignIn routing="path" path="/sign-in" />
    </main>
  );
};

export default SignInPage;
