import   React, { useEffect,useState }      from 'react';
import          { useSelector,useDispatch } from 'react-redux';
import          { useNavigate }             from 'react-router-dom';

import          { update_data }             from '../auth/authSlice';

import './Profile.css';

export const Profile = () => {
    // const [username   , setUsername]    = useState();
    // const [email      , setEmail   ]    = useState();   
    // const [password   , setPassword]    = useState();
    // const [newPassword, setNewPassword] = useState();
    // const [date       , setDate    ]    = useState();
    const  navigate                     = useNavigate();
    const  dispatch                     = useDispatch();
    const  profile                      = useSelector(state => state.auth);

    useEffect(() => { if(!profile.authenticated) {navigate('/');} },  [navigate,profile.authenticated]);
    useEffect(() => console.log(profile.status), [profile.status]);

    const updateAccount = async (username,email,password,newPassword,date) => {
        let UN; let E; let NP; let D;
        !username    ? UN = profile.user_name     : UN = username;
        !email       ? E  = profile.email         : E  = email;
        !newPassword ? NP = password              : NP = newPassword;
        !date        ? D  = profile.date_of_birth : D  = date;
        dispatch(update_data({  user_id:      profile.user_id, 
                                user_name:    UN,
                                oldEmail :    profile.email, 
                                email:        E, 
                                oldPassword:  password, 
                                password:     NP, 
                                date_of_birth:D
                        }));
    };

    const URL = generateURL(profile.refferal_code);

    if      (profile.status === 'loading')   { return (<p>...Loading</p>) }
    else if (profile.status === 'succeeded') {
        return (
            <div>
                <div id="profileCard">
                    <div>
                        <h2>Name</h2>
                            <h3>{profile.user_name}</h3>
                        <h2>E-mail</h2>
                            <h3>{profile.email}</h3>
                        <h2>Date of birth</h2>
                            <h3>{profile.date_of_birth}</h3>
                    </div>
                    <div>
                        <h2>Refferals</h2>
                            <input type="text" value={profile.refferal_code} id="refCode" readOnly></input>
                                <button onclick={() => copyValue("refCode")}>Copy text</button>

                            <input type="text" value={URL} id="refLink" readOnly></input>
                                <button onclick={() => copyValue("refLink")}>Copy text</button>
                    </div>
                </div>
                <div id="updateProfile">
                     
                </div>
            </div>
            
        )
    }
};

function copyValue(id) {
    // Get the text field
    var copyText = document.getElementById(id);
    
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    console.log(copyText.value);
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied the text: " + copyText.value);
};

function generateURL(refCode) {
    const  baseURL = 'http://localhost:3000';
    const  newUrl  = new URL(`${refCode}`,baseURL);
    return newUrl;
}