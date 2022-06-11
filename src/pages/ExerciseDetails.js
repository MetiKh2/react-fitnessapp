import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import {exerciseOptions, fetchData, youtubeOpions} from '../utils/fetchData';
const ExerciseDetails = () => {
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([])
  const { id } = useParams();
  useEffect(() => {
    const fetchExerciseData = async () => {
      const exerciseDbUrl='https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      
      const exerciseDetailsData=await fetchData
      (`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailsData)

      const exerciseVideosData=await fetchData
      (`${youtubeSearchUrl}/search?query=${exerciseDetailsData.name}`, youtubeOpions);
      setExerciseVideos(exerciseVideosData.contents.filter(item=>item.video)) 
      
      const targetMuscleExerciseData=await fetchData
      (`${exerciseDbUrl}/exercises/target/${exerciseDetailsData.target}`, exerciseOptions);
     setTargetMuscleExercises(targetMuscleExerciseData)

        const equipmentExerciseData=await fetchData
        (`${exerciseDbUrl}/exercises/equipment/${exerciseDetailsData.equipment}`, exerciseOptions);
       setEquipmentExercises(equipmentExerciseData)
     
    };
    fetchExerciseData();
  }, [id]);
  return (
    <Box>
      <Details exerciseDetail={exerciseDetail} />
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name}/>
      <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
    </Box>
  );
};

export default ExerciseDetails;
