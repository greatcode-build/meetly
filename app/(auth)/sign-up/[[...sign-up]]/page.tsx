import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <main className="flex h-screen justify-center items-center w-full">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </main>
  );
};

export default SignUpPage;
