import * as SecureStore from 'expo-secure-store';
import { Buffer } from "buffer";
import { router } from 'expo-router';

interface Token {
    AccessToken: string;
    Bearer: string;
    ExpiresIn: number;
    RefreshToken: string;
    IdToken: string;
}

export class AuthService {
    loggedIn: boolean = false;
    pathname: string;
    constructor (pathname: string) {
        this.pathname = pathname;
        this.checkAuth();
    }
    
    async checkAuth(): Promise<void> {
        const loginInfo = await SecureStore.getItemAsync('loginInfo');
        const username = await SecureStore.getItemAsync('username');
        const password = await SecureStore.getItemAsync('password');
        if (loginInfo) {
            const loginInfoObj = JSON.parse(loginInfo) as { token: string, expiration: Date };
            if (new Date(loginInfoObj.expiration) > new Date() && loginInfoObj.token) {
                this.loggedIn = true;
                return router.replace('/home');
            } else if(username && password) {
                return await this.login(username, password, false);
            } else {
                return await this.logout();
            }
        }
        return await this.logout();
    }
    async login(username: string, password: string, storeUserPassword: boolean): Promise<void> { 
        const response = await fetch(process.env.EXPO_PUBLIC_API_ADDRESS + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: username, password})
        });

        if (response.ok) {
            const { token } = await response.json() as { token: Token };
            if(storeUserPassword) { 
                await SecureStore.setItemAsync('username', username);
                await SecureStore.setItemAsync('password', password);
            }
            const expiration = new Date(Date.now() + token.ExpiresIn);
            await SecureStore.setItemAsync('loginInfo', JSON.stringify({token: token.AccessToken, expiration}));
            this.loggedIn = true;
            return router.replace('/home');
        }
        throw new Error('Invalid username or password');
    }

    async logout() {
        await SecureStore.deleteItemAsync('loginInfo');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('password');
        this.loggedIn = false;
        if(this.pathname !== '/')
         router.replace('/');
    }
}