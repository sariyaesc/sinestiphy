import {useSession,signIn, signOut} from 'next-auth/react'

export default function LoginBtn(){
    const {data:session}=useSession()
    if (session){
        return(
            <>
            Estas logeado con {session.user.email}<br/>
            <button onClick={()=>signOut()}>Salir</button>
            </>
             
        )
    }
    return(
        <>
            No estas logeado <br />
            <button onClick={()=>signIn()}>Logerame con Github</button>
        </>
    )
}