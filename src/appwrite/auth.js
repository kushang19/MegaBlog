import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    clinet = new Client();
    account;

    constructor(){
        this.clinet
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.clinet)
    }

    async createAccount({name,email,password}){
        try {
           const userAccount = await this.account.create(ID.unique(),name,email,password);
           if(userAccount){
                // call another method
              return this.login({email,password})
           }else{
                return userAccount;
           }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession({email,password}) //.createEmailSession()
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService