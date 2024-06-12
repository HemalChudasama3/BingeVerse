"use client";

import { useCallback, useState } from "react";
import Input from "@/components/input";
import { register } from "module";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }, [email, password, router]);

    const register = useCallback(async () => {
        try {
            if ( variant !== 'login' ){

                await axios.post('/api/register', {
                    email,
                    name,
                    password
                });
            }

            login();
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password, login]);

    return(
        <div className="relative h-screen w-screen bg-[url('/images/back.webp')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-70">
                <nav className="px-10 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-75 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Create an account'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input 
                                label="Username"
                                onChange={(ev: any) => setName(ev.target.value)}
                                id="name"
                                value={name}
                                />
                            )}
                            <Input 
                                label="Email"
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input 
                                label="Password"
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={register} className="py-3 bg-yellow-500 text-red-800 font-medium rounded-md w-full mt-10 hover:bg-yellow-600 transition">
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>

                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn('google', {callbackUrl: '/'})}
                            className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            ">
                                < FcGoogle size={30} />
                            </div>
                            <div onClick={() => signIn('github', {callbackUrl: '/'})}
                            className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            ">
                                < FaGithub size={30} />
                            </div>
                        </div>

                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'New to BingeVerse?' : 'Already have an account?'} 
                            <span onClick={toggleVariant} className="text-white ml-3 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Sign in'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;