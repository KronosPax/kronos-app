import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions ={
    session: {
        strategy: "jwt"
    },
    providers:[
        CredentialsProvider({
            type:"credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password} = credentials as {
                    email: string;
                    password: string;
                };
                // do db check for login
                

                //bad login res
                if(email !== 'test@mail.com' || password !== 'test') {
                    throw new Error('Invalid Credentials')
                }

                //good login res
                // console.log('I made it to object res')
                return {id: '1', name: 'John Doe', email: 'test@mail.com'};
            },
        }),
    ],
};

export default NextAuth(authOptions);

