import { useEffect } from 'react'
import { useActivity } from '../../hooks/useActivity'

const ActivityAdmin = () => {

    const {activityData, fetchActivities, deleteActivity} = useActivity();
    useEffect(()=>{
        fetchActivities();
    }, [fetchActivities])
  return (
    <ul className='grid col-span-7 gap-4'>
        {activityData.map((activity)=> (
            <li className="border-2" key = {activity.id}>
                {activity.id} {activity.name} 
                {activity.caloriesBurnedPerHour} cal/h 
                <button onClick={() => deleteActivity(activity.id)}>Delete</button>, 
                <button>Edit</button>, 
                <button>Details</button>
            </li> 
        ))}
    </ul>
  )
}

export default ActivityAdmin             