import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"

// using nextauth for session management with json webtoken credential manager to interface with internal DB
// protected pages should import {useSession} from "next-auth/react"; to have access to session for auth
// ex: const {status, data} = useSession()
//     useEffect(() => {
//         if (status === "unauthenticated") router.replace("/");
//     }, [status]);

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

                //json response on good login
                return {id: user._id, name: user.fName +" "+ user.lName, email: user.email};
            },
        }),
    ],
};

export default NextAuth(authOptions);

