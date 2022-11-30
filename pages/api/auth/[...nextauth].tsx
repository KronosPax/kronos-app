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
            async authorize(credentials) {
                const { email, password} = credentials as {
                    email: string;
                    password: string;
                };
                const loginInfo = {
                    email: email,
                    pwd: password
                };
                // do db check for login
                const requestOptions = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(loginInfo)
                };

                const res: Response = await fetch('http://localhost:3000/api/auth/loginUser', requestOptions)
                if (!res.ok){
                    throw new Error('Bad Connection to DB')
                }

                const user = await res.json()
                if (user === null) {
                    throw new Error('Invalid Credentials')
                }

                //good login res
                return {id: user._id, name: user.fName +" "+ user.lName, email: user.email};
            },
        }),
    ],
};

export default NextAuth(authOptions);

