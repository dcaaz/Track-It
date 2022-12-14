import styled from "styled-components";
import Logo from "../Imagem/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Ayth";
import { ThreeDots } from "react-loader-spinner";

export default function LoginPage() {

    const [emailLogin, setEmailLogin] = useState("");
    const [senhaLogin, setSenhaLogin] = useState("");
    const [desabilitar, setDesabilitar] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const { setToken, setFoto } = useContext(AuthContext);


    function logar(e) {
        e.preventDefault();

        setDesabilitar(true);
        setCarregando(true);

        const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";

        const body = {
            email: emailLogin,
            password: senhaLogin
        }

        const promise = axios.post(URL, body);
        promise.then((res) => {
            setToken(res.data.token);
            setFoto(res.data.image)
            navigate("/hoje");
        })

        promise.catch((erro) => {
            console.log("erro pagina de login", erro.response.data.mensagem);
            alert(erro.response.data.mensagem);
            setDesabilitar(false);
        })

    }

    return (
        <Branco>
            <LogoTipo>
                <img src={Logo} alt="logo" />
            </LogoTipo>

            <form onSubmit={logar}>
                <Input data-identifier="input-email">
                    <input
                        id="email"
                        type="email"
                        placeholder="   email"
                        onChange={(e) => setEmailLogin(e.target.value)}
                        value={emailLogin}
                        required
                        disabled={desabilitar}
                    />
                </Input>
                <Input data-identifier="input-password">
                    <input
                        id="senha"
                        type="password"
                        placeholder="  senha"
                        onChange={(e) => setSenhaLogin(e.target.value)}
                        value={senhaLogin}
                        required
                        disabled={desabilitar}
                    />
                </Input>
                <Botao>
                    <button 
                    type="submit"
                    disabled={desabilitar}
                    data-identifier="login-btn">
                        {carregando ?
                            <ThreeDots
                                color={"white"}
                            />
                            :
                            <h1>Entrar</h1>
                        }
                    </button>
                </Botao>
            </form>

            <Cadastro>
                <Link to="/cadastro"  data-identifier="sign-up-action">
                    <h1>N??o tem uma conta? Cadastre-se!</h1>
                </Link>
            </Cadastro>
        </Branco>
    )
}

const Branco = styled.div`
    width: 100%;
    height: 100vh;
    align-items: center;

`

const LogoTipo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px 0px 97px;
    box-sizing: border-box;
   img{
        width: 180px;
        height: 178.38px;
   }
`

const Input = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        width: 303px;
        height: 45px;  
        border-radius: 5px;
        border-color: #D4D4D4;
        border-style: solid;
        margin-bottom: 6px;
    }
    input::placeholder{
        color: #DBDBDB;
        font-style: regular;
        font-weight: 400;
        font-size: 19.98px;
        line-height: 25px;
    }
`

const Botao = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 26px;
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 26px;
        background-color: #52B6FF;
        width: 309px;
        height: 45px;  
        border-radius: 4.64px;
        border-style: none;
        color: #FFFFFF;
        font-size: 27px;
    }
`

const Cadastro = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    vertical-align: top;
    vertical-align: #52B6FF;
    h1{
        color: #52B6FF;
        font-style: regular;
        font-weight: 400;
        font-size: 13.98px;
        line-height: 17px;  
    }
`