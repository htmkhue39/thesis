import "./CombinedTokenLogo.css";

const CombinedTokenLogo = ({ logo1, logo2 }) => {
  return (
    <div className="token-logo-combined">
      <img src={logo1} alt="First Token" className="token-logo-left" />
      <img src={logo2} alt="Second Token" className="token-logo-right" />
    </div>
  );
};

export default CombinedTokenLogo;
