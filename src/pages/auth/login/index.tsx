import AuthContainer from "../../../components/containers/AuthContainer";

const Login = () => {
  return (
    <AuthContainer>
      <div className="flex flex-col h-screen overflow-y-hidden items-center justify-center">
        <h2 className="text-[24px] font-semibold">Sign In to Qus</h2>
      </div>
    </AuthContainer>
  );
};

export default Login;
