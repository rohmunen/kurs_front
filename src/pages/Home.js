import React, {useContext} from 'react'
import {observer} from "mobx-react-lite";
import {Context} from "../index"

const Home = observer(() => {

    const {user} = useContext(Context)
    return (<h1>
        This is complete profile.
    </h1>);
})

export default Home;