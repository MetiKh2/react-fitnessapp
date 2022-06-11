import { Button, Stack, TextField, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const SearchExercises = ({setExercises,setBodyPart,bodyPart}) => {
  const [searchTerm, setSearchTerm] = useState("");
 const [bodyParts, setBodyParts] = useState([])
  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData=await fetchData(
        'https://exercise.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions
        );
        setBodyParts(['all',...bodyPartsData]);
    }
    fetchExercisesData();
  }, [])
  const handleSearch = async () => {
    if (searchTerm) {
      const exerciseData=await fetchData(
        'https://exercise.p.rapidapi.com/exercises',
        exerciseOptions
      );
     const SearchExercisesData=exerciseData.filter(
      (exercise)=>exercise.name.toLowerCase().includes(searchTerm)||
      exercise.target.toLowerCase().includes(searchTerm)||
      exercise.bodyPart.toLowerCase().includes(searchTerm)||
      exercise.equipment.toLowerCase().includes(searchTerm)
      
     )
     setExercises(SearchExercisesData);
     setSearchTerm("");
    }
  };

  return (
    <Stack alignItems={"center"} mt="37px" p={20} justifyContent="center">
      <Typography
        fontWeight={700}
        sx={{
          fontSize: { lg: "44px", xs: "30px" },
        }}
        mb="50px"
        textAlign={"center"}
      >
        Awesome Exercises You Should Know
      </Typography>
      <Box position={"relative"} mb="72px">
        <TextField
          height="75px"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          placeholder="Search Exercises"
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
        />
        <Button
          variant="contained"
          color="error"
          className="search-btn"
          sx={{
            bgColor: "#ff2625",
            color: "#fff",
            textTransform: "none",
            width: { lg: "170px", xs: "80px" },
            fontSize: { lg: "18px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{position:'relative',width:'100%',p:'20px'}}>
          <HorizontalScrollBar isBodyParts={true} data={bodyParts}
           bodyPart={bodyPart} setBodyPart={setBodyPart}/>
      </Box>
    </Stack>
  );
};

export default SearchExercises;
