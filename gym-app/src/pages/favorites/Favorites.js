import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import ExercisesMenu from '../../components/exercisesMenu/ExercisesMenu';
import { favoriteExercisesSelector, getFavorites,  userSelector } from '../../redux/userSlice';


const Favorites = () => {
    const favoriteExercises = useSelector(favoriteExercisesSelector);
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFavorites(user.userInfo.jwt))
    },[])
  return (
    user.isLogedin && <ExercisesMenu exercises={favoriteExercises}/>
  )
}

export default Favorites