import LoginPageRight from '../components/LoginPageRight';

const RegisterFlowLayout = ({ title, children }) => {
  return (
    <div className="flex-center-content min-h-screen flex-col">
      <main className="login-register-container container">
        <div>
          <div className="login-register-heading">{title}</div>
          <div>{children}</div>
        </div>
        <LoginPageRight />
      </main>
    </div>
  );
};

export default RegisterFlowLayout;
