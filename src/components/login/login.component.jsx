import { MainContainer } from "../../common/layout/Layout.style"
import TextDanger from "../../common/text-danger/TextDanger.component";

const LoginContainer = ({ handleEmailChange, handlePasswordChange, handleSubmit, errors }) => (
    <MainContainer>
        <div className="form-group">
            <label htmlFor="emailInput">Imejl adresa</label>
            <input type="email" className="form-control" id="emailInput" onChange={handleEmailChange} required />
            <TextDanger message={errors?.email} />
        </div>
        <div className="form-group">
            <label htmlFor="passwordInput">Lozinka</label>
            <input type="password" className="form-control" id="passwordInput" onChange={handlePasswordChange} required />
            <TextDanger message={errors?.password} />
        </div>
        <button className="btn btn-primary block-btn" onClick={handleSubmit}>Prijavljivanje</button>
    </MainContainer>
)

export default LoginContainer;