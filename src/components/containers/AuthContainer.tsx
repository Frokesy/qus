interface Props {
  children: React.ReactNode;
}

const AuthContainer = ({ children }: Props) => {
  return (
    <div className="flex justify-between min-h-screen">
      <div className="w-[50%] pt-[10vh] px-[10vw]">
        <img src="/assets/logo.png" alt="logo" className="w-[50px] h-[50px]" />
        {children}
      </div>
      <div className="w-[50%]">
        <img
          src="/assets/onboarding-hero.png"
          alt="onboarding"
          className="h-[100%]"
        />
      </div>
    </div>
  );
};

export default AuthContainer;
