import { MainContainer } from "../../common/layout/Layout.style"

const LoginContainer = ({ handleEmailChange, handlePasswordChange, handleSubmit }) => (
    <MainContainer>
        <div className="form-group">
            <label htmlFor="emailInput">Imejl adresa</label>
            <input type="email" className="form-control" id="emailInput" onChange={handleEmailChange} required />
        </div>
        <div className="form-group">
            <label htmlFor="passwordInput">Lozinka</label>
            <input type="password" className="form-control" id="passwordInput" onChange={handlePasswordChange} required />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>Prijavljivanje</button>
    </MainContainer>
)

export default LoginContainer;