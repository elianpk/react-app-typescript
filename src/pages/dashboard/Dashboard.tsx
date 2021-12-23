import { useSessionContext } from "../../components/auth/SessionContext";

function Dashboard(){
    const [session, setSession] = useSessionContext();
    function handleLogout(){
        setSession({...session, isAuth:false})
    }

    function viewSession(){
        console.log(session);
    }
    return (
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <div>
                <button onClick={handleLogout} className={'bg-indigo-600'}>Logout</button>
            </div>
            <div>
                <button onClick={viewSession} className={'bg-indigo-600'}>ViewSession</button>
            </div>
        </div>
    )
}

export default Dashboard