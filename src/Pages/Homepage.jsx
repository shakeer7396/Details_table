import axios from "axios";
import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getProfileDetailsFailure, getProfileDetailsRequest, getProfileDetailsSuccess } from "../Redux/action";
import ProfileDataRow from "../Components/ProfileDataRow";

const Homepage = () => {
  const dispatch=useDispatch();
  const getProfile=useSelector((store)=>store.profileData)

  const getData=()=>{
    dispatch(getProfileDetailsRequest())
    return axios.get("http://localhost:8080/profile")
    .then((r)=>{
      dispatch(getProfileDetailsSuccess(r.data))
    })
    .catch((e)=>{
      dispatch(getProfileDetailsFailure())
    })
  }

  useEffect(()=>{
    getData()
  },[])
console.log(getProfile);
  return (
    <div>
      <table>
        <thead style={{ fontWeight: "700" }}>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody data-cy="profile-wrapper">
          {/* Map through the profileData received from the json-server on mounting the component to show it in a table format */}
          {getProfile.map((item)=>{
            return(
              <>
              {/* <ProfileDataRow key={item.id} profile={item.profile}/> */}
              <tr key={item.id}>
                <th>{item.id}</th>
                <th><img src={item.profile_pic} /></th>
                <th>{item.first_name}</th>
                <th>{item.last_name}</th>
                <th>{item.email}</th>
                <th>{item.gender}</th>
                <th>{item.country}</th>







              </tr>
              </>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
