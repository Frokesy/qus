interface Props {
  children: React.ReactNode;
}

const AuthContainer = ({ children }: Props) => {
  return (
    <div className="flex lg:justify-between lg:flex-row flex-col h-screen overflow-hidden">
      <div className="lg:w-[50%] pt-[10vh] lg:px-[10vw] px-6">
        <img src="/assets/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        {children}
      </div>
      <div className="w-[50%] lg:block hidden">
        <img
          src="/assets/onboarding-hero.png"
          alt="onboarding"
          className="h-screen"
        />
      </div>
    </div>
  );
};

export default AuthContainer;
