import React, { useState } from "react"
// import {Button, Form, FormGroup, Label, Input} from 'reactstrap'
import Stars from '../../components/shared/Animations/starsAnimation/starAnimation'
import { LoginIcon } from '@heroicons/react/solid'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import logo from '../../components/shared/assets/logo.png'
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
    
    const {register, handleSubmit, formState: { errors, isValid, isDirty}} = useForm<IFormValues>({ mode: "all" ,resolver: yupResolver(validationSchema)});
    const [isPending, setIsPending] = useState(false);

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
            setIsPending(false)
            console.log(data)   
        }, 
        (error) =>{
            setIsPending(false)
            console.log('gluglu yeye')
        });
    }

    return(
        <div className="login" >
            <Stars/>            
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">

                    <div>
                        <img className="mx-auto h-12 w-auto" src={logo} alt="Garoto capricho"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold">Login</h2>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="py-2">
                                <label className="sr-only">Usuario</label>
                                <input className={`form-control ${errors.username ? 'is-invalid' : ''} 
                                    appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Usuário"
                                    {...register('username')}
                                />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div>
                                <label className="sr-only"> Password </label>
                                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}
                                    appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
                                    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                                    placeholder="Senha"
                                    {...register('password')}
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                        </div>

                        <div>
                        <button
                            type="submit"
                            disabled={!isDirty || !isValid || isPending}
                            className={` group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white
                             hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                            ${!isValid || !isDirty || isPending? 
                                'opacity-50'
                                :'bg-indigo-600'}
                            `}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <LoginIcon className="h-5 w-5 text-white-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Logar
                        </button>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    )
}

export default Login;