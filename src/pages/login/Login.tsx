import React, { useState } from "react"
import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import Stars from '../../components/shared/Animations/starsAnimation/starAnimation'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './Login.css'

function Login(){

    interface IFormValues {
        username: string;
        password: string;
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
          .required('Usuario é obrigatório')
          .min(5, 'Usuario deve ter ao menos 5 characters')
          .max(20, 'Usuario não deve exceder 20 characters'),
        password: Yup.string()
          .required('Senha é obrigatória')
          .min(5, 'Senha deve ter ao menos 5 characters')
          .max(40, 'Senha não deve exceder 40 characters'),
    });
    

    const {register, handleSubmit, formState: { errors, isValid, isDirty}} = useForm<IFormValues>({ mode: "onChange" ,resolver: yupResolver(validationSchema)});
    const [isPending, setIsPending] = useState(false);

    const { ref: usernameRef, ...usernameRest } = register("username");
    const { ref: passwordRef, ...passwordRest } = register("password");

    function onSubmit(data: IFormValues){        
        setIsPending(true)
        const payload = {
            username: data.username.trim() ,
            password: data.password.trim()
        }
        fetch(`http://localhost:5000/auth`, {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            setIsPending(false)
        }, 
        (error) =>{
            console.log('gluglu yeye')
            setIsPending(false)
        });
    }

    return(
        <div className="login">
            <Stars/>
            <h1>Login</h1>
            <Form>
                <FormGroup className="form-group">
                    <Label for="usuario">Usuario</Label>
                    <Input 
                        {...usernameRest} innerRef={usernameRef}
                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input 
                        {...passwordRest} innerRef={passwordRef} 
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </FormGroup>
                <Button disabled={!isDirty || !isValid || isPending} onClick={handleSubmit(onSubmit)}>Logar</Button>
            </Form>
      </div>
    )
}

export default Login;