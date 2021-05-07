import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Spinner from "../layout/Spinner";
import axios from 'axios';

const Activate = props => {
    const {token} = useParams();
    const [loading, setLoading] = useState(true);
    const [userStatus, setUserStatus] = useState('');
    const [success, setSuccess] = useState('');
    useEffect(() => {
        axios.put(`/api/users/activate/${token}`).then(result => {
            setUserStatus(result.data.msg);
            setLoading(false);
            setSuccess(result.data.success);
        })
    },
    [token]);
  
    return (
        loading ? <div> <Spinner /></div> :
        <div className={success === true ? 'activation-success' : 'activation-fail'}>
          <h1>{userStatus}</h1>  
        </div>
    )
}



export default Activate
